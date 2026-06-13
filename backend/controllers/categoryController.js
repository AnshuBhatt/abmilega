const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();

  res.json(categories);
};

const getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      vendors: {
        include: {
          city: true,
          category: true,
        },
      },
    },
  });

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.json(category);
};

const getOnboardingConfig = async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      statTemplates: {
        orderBy: {
          sortOrder: "asc",
        },
      },

      amenityTemplates: {
        include: {
          amenity: true,
        },
      },
      packageTemplates: {
      orderBy: {
        sortOrder: "asc",
      },
    },

    },
    
    
  });

const packageFeatureTemplates =
  await prisma.categoryPackageFeatureTemplate.findMany({

    where: {
      categoryId: Number(id),
    },

    include: {
      feature: true,
    },

  });
console.log(category.packageTemplates);
  res.json({
    id: category.id,
    name: category.name,

    stats: category.statTemplates,

    amenities:
      category.amenityTemplates.map(
        (item) => item.amenity
      ),

      packageTemplates:
    category.packageTemplates,

 packageFeatureTemplates:
  packageFeatureTemplates.map(
    (item) => item.feature
  ),
  });
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  getOnboardingConfig
};