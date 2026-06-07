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

module.exports = {

  getMySavedVendors,

};