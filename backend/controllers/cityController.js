const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCities = async (req, res) => {
  const cities = await prisma.city.findMany();

  res.json(cities);
};

const getCityBySlug = async (req, res) => {
  const { slug } = req.params;

  const city = await prisma.city.findUnique({
    where: {
      slug,
    },
    include: {
      vendors: {
        include: {
          category: true,
          city: true,
        },
      },
    },
  });

  if (!city) {
    return res.status(404).json({
      message: "City not found",
    });
  }

  res.json(city);
};

module.exports = {
  getCities,
  getCityBySlug,
};