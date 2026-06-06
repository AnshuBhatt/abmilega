const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getVendors = async (req, res) => {
  const { category, city, elite } = req.query;

  const where = {};

  if (category) {
    where.category = {
      slug: category,
    };
  }

  if (city) {
    where.city = {
      slug: city,
    };
  }

  if (elite === "true") {
    where.isElite = true;
  }

  const vendors = await prisma.vendor.findMany({
    where,
    include: {
      category: true,
      city: true,
    },
  });

  res.json(vendors);
};

const createReview = async (req, res) => {

  try {

    const { vendorId } = req.params;

    const {
      reviewerName,
      rating,
      comment,
    } = req.body;

    const review =
      await prisma.vendorReview.create({

        data: {

          vendorId: Number(vendorId),

          reviewerName,

          rating: Number(rating),

          comment,

        },

      });

    res.status(201).json(review);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

const createVendor = async (req, res) => {
  try {
    const {

      name,
      description,

      phone,
      whatsapp,

      imageUrl,

      address,
      zipcode,

      websiteUrl,
      instagramUrl,

      startingPrice,
      pricingUnit,

      categoryId,
      cityId,

      stats,
      amenities,

      packages,

    } = req.body;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const vendor =
      await prisma.vendor.create({
        data: {
          name,
          slug,

          description,

          phone,
          whatsapp,

          imageUrl,

          address,
          zipcode,

          websiteUrl,
          instagramUrl,

          startingPrice,
          pricingUnit,



          categoryId: Number(categoryId),
          cityId: Number(cityId),

          stats: {
            create: stats.map((stat) => ({
              templateId: stat.templateId,
              value: stat.value,
            })),
          },

          amenities: {
            create: amenities.map(
              (amenityId) => ({
                amenityId,
              })
            ),
          },


        },

        include: {
          stats: true,
          amenities: true,
        },
      });

    if (packages?.length) {

      for (const pkg of packages) {

        const vendorPackage =
          await prisma.vendorPackage.create({

            data: {

              vendorId: vendor.id,

              packageTemplateId:
                pkg.packageTemplateId,

              price: pkg.price,

            },

          });

        if (pkg.features?.length) {

          await prisma.vendorPackageFeature.createMany({

            data: pkg.features.map(
              (featureId) => ({

                packageId:
                  vendorPackage.id,

                featureId,

              })
            ),

          });

        }

      }

    }

    res.status(201).json(vendor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getVendorBySlug = async (req, res) => {

  const { slug } = req.params;

  const vendor = await prisma.vendor.findUnique({

    where: {
      slug,
    },

    include: {

      category: true,

      city: true,

      stats: {
        include: {
          template: true,
        },
      },

      amenities: {
        include: {
          amenity: true,
        },
      },

      packages: {
        include: {

          packageTemplate: true,

          features: {
            include: {
              feature: true,
            },
          },

        },
      },

      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },

    },

  });

  if (!vendor) {
    return res.status(404).json({
      message: "Vendor not found",
    });
  }

  res.json(vendor);

};

const deleteVendor = async (req, res) => {

  try {

    const vendorId =
      Number(req.params.id);

    const packages =
      await prisma.vendorPackage.findMany({

        where: {
          vendorId,
        },

        select: {
          id: true,
        },

      });

    const packageIds =
      packages.map(
        (p) => p.id
      );

    if (packageIds.length) {

      await prisma.vendorPackageFeature.deleteMany({

        where: {

          packageId: {
            in: packageIds,
          },

        },

      });

    }

    await prisma.vendorPackage.deleteMany({

      where: {
        vendorId,
      },

    });

    await prisma.vendorStat.deleteMany({

      where: {
        vendorId,
      },

    });

    await prisma.vendorAmenity.deleteMany({

      where: {
        vendorId,
      },

    });

    await prisma.vendorReview.deleteMany({

      where: {
        vendorId,
      },

    });

    await prisma.vendor.delete({

      where: {
        id: vendorId,
      },

    });

    res.json({
      message:
        "Vendor deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

const getVendorById = async (req, res) => {

  const { id } = req.params;

  const vendor =
    await prisma.vendor.findUnique({

      where: {
        id: Number(id),
      },

      include: {

        category: true,

        city: true,

        stats: true,

        amenities: true,

        packages: {
          include: {
            features: true,
          },
        },

        reviews: true,

      },

    });

  if (!vendor) {

    return res.status(404).json({
      message: "Vendor not found",
    });

  }

  res.json(vendor);

};

const updateVendor = async (req, res) => {

  try {

    const { id } = req.params;

    const {

      name,
      description,

      phone,
      whatsapp,

      imageUrl,

      address,
      zipcode,

      websiteUrl,
      instagramUrl,

      startingPrice,
      pricingUnit,

      categoryId,
      cityId,

      stats,
      amenities,

      packages,

    } = req.body;

    const vendorId =
      Number(id);

    await prisma.vendor.update({

      where: {
        id: vendorId,
      },

      data: {

        name,
        description,

        phone,
        whatsapp,

        imageUrl,

        address,
        zipcode,

        websiteUrl,
        instagramUrl,

        startingPrice,
        pricingUnit,

        categoryId:
          Number(categoryId),

        cityId:
          Number(cityId),

      },

    });

    await prisma.vendorStat.deleteMany({
  where: {
    vendorId,
  },
});

if (stats?.length) {

  await prisma.vendorStat.createMany({

    data: stats.map(
      (stat) => ({

        vendorId,

        templateId:
          stat.templateId,

        value:
          stat.value,

      })
    ),

  });

}

await prisma.vendorAmenity.deleteMany({

  where: {
    vendorId,
  },

});

if (amenities?.length) {

  await prisma.vendorAmenity.createMany({

    data: amenities.map(
      (amenityId) => ({

        vendorId,

        amenityId,

      })
    ),

  });

}

const existingPackages =
  await prisma.vendorPackage.findMany({

    where: {
      vendorId,
    },

    select: {
      id: true,
    },

  });

  const packageIds =
  existingPackages.map(
    (p) => p.id
  );

if (packageIds.length) {

  await prisma.vendorPackageFeature.deleteMany({

    where: {

      packageId: {
        in: packageIds,
      },

    },

  });

}

await prisma.vendorPackage.deleteMany({

  where: {
    vendorId,
  },

});

if (packages?.length) {

  for (const pkg of packages) {

    const vendorPackage =
      await prisma.vendorPackage.create({

        data: {

          vendorId,

          packageTemplateId:
            pkg.packageTemplateId,

          price:
            pkg.price,

        },

      });

    if (pkg.features?.length) {

      await prisma.vendorPackageFeature.createMany({

        data: pkg.features.map(
          (featureId) => ({

            packageId:
              vendorPackage.id,

            featureId,

          })
        ),

      });

    }

  }

}

    res.json({
      message:
        "Vendor updated",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getVendorAnalytics = async (
  req,
  res
) => {

  const { id } = req.params;

  const vendorId =
    Number(id);

  const events =
    await prisma.vendorEvent.groupBy({

      by: ["eventType"],

      where: {
        vendorId,
      },

      _count: true,

    });

  const analytics = {

    views: 0,

    callClicks: 0,

    whatsappClicks: 0,

    mapClicks: 0,

  };

  events.forEach((event) => {

    if (
      event.eventType ===
      "VIEW"
    ) {
      analytics.views =
        event._count;
    }

    if (
      event.eventType ===
      "CALL_CLICK"
    ) {
      analytics.callClicks =
        event._count;
    }

    if (
      event.eventType ===
      "WHATSAPP_CLICK"
    ) {
      analytics.whatsappClicks =
        event._count;
    }

    if (
      event.eventType ===
      "MAP_CLICK"
    ) {
      analytics.mapClicks =
        event._count;
    }

  });

  res.json(
    analytics
  );

};

const getVendorEvents = async (
  req,
  res
) => {

  const { id } = req.params;

  const events =
    await prisma.vendorEvent.findMany({

      where: {
        vendorId:
          Number(id),
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 50,

    });

  res.json(events);

};

module.exports = {
  getVendors,
  createVendor,
  getVendorBySlug,
  createReview,
  deleteVendor,
  getVendorById,
  updateVendor,
  getVendorAnalytics,
  getVendorEvents,
}