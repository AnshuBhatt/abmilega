const { PrismaClient } =
  require("@prisma/client");

const prisma =
  new PrismaClient();

 const getMySavedVendors =
  async (req, res) => {

    try {

      const savedVendors =
        await prisma.userSavedVendor.findMany({

          where: {
            userId:
              req.user.userId,
          },

          include: {

            vendor: true,

          },

        });

      res.json(
        savedVendors
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

};

const getMyVendors =
  async (req, res) => {

    try {

      const vendors =
        await prisma.vendor.findMany({

          where: {

            ownerId:
              req.user.userId,

          },

          include: {

            city: true,

            category: true,

          },

        });

      res.json(vendors);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

};

module.exports = {

  getMySavedVendors,
  getMyVendors,

};