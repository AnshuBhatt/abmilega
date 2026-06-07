const express =
  require("express");

const router =
  express.Router();

const {

  sendOtp,

  verifyOtp,

} = require(
  "../controllers/authController"
);

router.post(
  "/send-otp",
  sendOtp
);

router.post(
  "/verify-otp",
  verifyOtp
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

  router.get(
  "/me",
  authMiddleware,

  (req, res) => {

    res.json(
      req.user
    );

  }
);

module.exports =
  router;