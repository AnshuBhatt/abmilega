const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  getMySavedVendors,
} = require(
  "../controllers/userController"
);

router.get(

  "/me/saved-vendors",

  authMiddleware,

  getMySavedVendors

);

module.exports =
  router;