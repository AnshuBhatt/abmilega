const { PrismaClient } =
  require("@prisma/client");

const prisma =
  new PrismaClient();

const createEvent =
  async (req, res) => {

    try {

      const { vendorId } =
        req.params;

      const { eventType } =
        req.body;

      const event =
        await prisma.vendorEvent.create({

          data: {

            vendorId:
              Number(vendorId),

            eventType,

          },

        });

      res.status(201)
        .json(event);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  createEvent,
};