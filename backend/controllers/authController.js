const { PrismaClient } =
  require("@prisma/client");

const prisma =
  new PrismaClient();

const jwt =
  require("jsonwebtoken");

  const sendOtp = async (
  req,
  res
) => {

  try {

    const { phone } =
      req.body;

    const otp =
      Math.floor(
        100000 +
        Math.random() *
        900000
      ).toString();

    const expiresAt =
      new Date(
        Date.now() +
        5 * 60 * 1000
      );

    await prisma.otpVerification.create({

      data: {

        phone,

        otp,

        expiresAt,

      },

    });

    console.log(
      `OTP for ${phone} = ${otp}`
    );

    res.json({

      message:
        "OTP sent",

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const verifyOtp = async (
  req,
  res
) => {

  try {

    const {
      phone,
      otp,
    } = req.body;

    const otpRecord =
      await prisma.otpVerification.findFirst({

        where: {

          phone,

          otp,

          expiresAt: {
            gt: new Date(),
          },

        },

        orderBy: {
          createdAt:
            "desc",
        },

      });

    if (!otpRecord) {

      return res.status(400)
        .json({

          message:
            "Invalid OTP",

        });

    }

    let user =
      await prisma.user.findUnique({

        where: {
          phone,
        },

      });

    if (!user) {

      user =
        await prisma.user.create({

          data: {

            phone,

            role:
              "CUSTOMER",

          },

        });

    }

    const token =
      jwt.sign(

        {

          userId:
            user.id,

          role:
            user.role,

        },

        "abmilega-secret",

        {

          expiresIn:
            "30d",

        }

      );

    res.json({

      token,

      user,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};

module.exports = {

  sendOtp,

  verifyOtp,

};