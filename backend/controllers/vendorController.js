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

const createVendor = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      phone,
      whatsapp,
      categoryId,
      cityId,
      stats,
      amenities,
      imageUrl
    } = req.body;

    const vendor =
      await prisma.vendor.create({
        data: {
          name,
          slug,
          description,
          phone,
          whatsapp,
          imageUrl,

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
        feature: true
      }
    }

  }
}
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
}