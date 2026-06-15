const jwt =
  require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET;

const authMiddleware =
  (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;

      if (!authHeader) {

        return res.status(401)
          .json({

            message:
              "Unauthorized",

          });

      }

      const token =
        authHeader.replace(
          "Bearer ",
          ""
        );

      const decoded =
        jwt.verify(
          token,
          JWT_SECRET
        );

      req.user =
        decoded;

      next();

    } catch (error) {

      return res.status(401)
        .json({

          message:
            "Invalid Token",

        });

    }

  };

module.exports =
  authMiddleware;