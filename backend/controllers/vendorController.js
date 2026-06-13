const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getVendors = async (req, res) => {
  const { category, city, elite } = req.query;

  const where = { status: "APPROVED",};

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

          status: "APPROVED",

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

const submitVendor = async (
  req,
  res
) => {

  try {

    const {

      name,
      description,

      phone,
      whatsapp,

      categoryId,
      cityId,

    } = req.body;

    const slug =
      name
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

          categoryId:
            Number(categoryId),

          cityId:
            Number(cityId),

          status:
            "PENDING",

          ownerId:
            req.user.userId,

        },

      });

    res.status(201)
      .json(vendor);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};
const getVendorBySlug = async (req, res) => {

  const { slug } = req.params;

  const vendor = await prisma.vendor.findUnique({

    where: {
      slug,
       status:
        "APPROVED",
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

  return res
    .status(404)
    .json({
      error:
        "Vendor not found"
    });

}

  res.json(vendor);

};

const deleteVendor = async (req, res) => {

  try {

    const vendorId =
      Number(req.params.id);
      if (
  vendor.ownerId &&
  vendor.ownerId !== req.user.userId &&
  req.user.role !== "ADMIN"
) {
  return res.status(403).json({
    message: "Forbidden",
  });
}

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

  if (
  vendor.ownerId &&
  vendor.ownerId !== req.user.userId &&
  req.user.role !== "ADMIN"
) {
  return res.status(403).json({
    message: "Forbidden",
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

      if (
  vendor.ownerId &&
  vendor.ownerId !== req.user.userId &&
  req.user.role !== "ADMIN"
) {
  return res.status(403).json({
    message: "Forbidden",
  });
}

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

const saveVendor = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const userId =
      req.user.userId;

    const savedVendor =
      await prisma.userSavedVendor.create({

        data: {

          userId,

          vendorId:
            Number(id),

        },

      });

    res.status(201)
      .json(savedVendor);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const isVendorSaved = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const savedVendor =
      await prisma.userSavedVendor.findUnique({

        where: {

          userId_vendorId: {

            userId:
              req.user.userId,

            vendorId:
              Number(id),

          },

        },

      });

    res.json({

      saved:
        !!savedVendor,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const unsaveVendor = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    await prisma.userSavedVendor.delete({

      where: {

        userId_vendorId: {

          userId:
            req.user.userId,

          vendorId:
            Number(id),

        },

      },

    });

    res.json({

      message:
        "Vendor removed",

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const getPendingVendors =
  async (req, res) => {

    const vendors =
      await prisma.vendor.findMany({

        where: {

          status:
            "PENDING",

        },

        include: {

          city: true,

          category: true,

        },

      });

    res.json(vendors);

};

const approveVendor =
  async (req, res) => {

    const { id } =
      req.params;

    const vendor =
      await prisma.vendor.update({

        where: {
          id: Number(id),
        },

        data: {
          status:
            "APPROVED",
        },

      });

    res.json(vendor);

};

const rejectVendor =
  async (req, res) => {

    const { id } =
      req.params;

    const vendor =
      await prisma.vendor.update({

        where: {
          id: Number(id),
        },

        data: {
          status:
            "REJECTED",
        },

      });

    res.json(vendor);

};

const getVendorCompletion = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const vendor =
      await prisma.vendor.findUnique({

        where: {
          id: Number(id),
        },

        include: {

          amenities: true,

          packages: true,

          stats: true,

        },

      });

    if (!vendor) {

      return res.status(404)
        .json({

          message:
            "Vendor not found",

        });

    }

    let completion = 0;

    const missing = [];

    if (vendor.name) {

      completion += 10;

    } else {

      missing.push("Name");

    }

    if (vendor.description) {

      completion += 20;

    } else {

      missing.push("Description");

    }

    if (vendor.imageUrl) {

      completion += 20;

    } else {

      missing.push("Image");

    }

    if (vendor.whatsapp) {

      completion += 10;

    } else {

      missing.push("WhatsApp");

    }

    if (
      vendor.amenities.length > 0
    ) {

      completion += 20;

    } else {

      missing.push(
        "Amenities"
      );

    }

    if (
      vendor.packages.length > 0
    ) {

      completion += 20;

    } else {

      missing.push(
        "Packages"
      );

    }

    res.json({

      completion,

      missing,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const checkVendorOwnership =
  async (req, res) => {

    const vendor =
      await prisma.vendor.findUnique({

        where: {
          id:
            Number(
              req.params.id
            ),
        },

      });

       if (!vendor) {

      return res.status(404)
        .json({
          message:
            "Vendor not found",
        });

    }

    if (
      vendor.ownerId !==
      req.user.userId
    ) {

      return res.status(403)
        .json({

          message:
            "Forbidden",

        });

    }

    res.json({
      success: true,
    });

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
  saveVendor,
  isVendorSaved,
  unsaveVendor,
  submitVendor,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  getVendorCompletion,
  checkVendorOwnership,
}