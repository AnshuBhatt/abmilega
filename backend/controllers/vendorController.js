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

module.exports = {
  getVendors,
  createVendor,
  getVendorBySlug,
  createReview,
}