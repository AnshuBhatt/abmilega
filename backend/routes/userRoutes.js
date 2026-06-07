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
  getMyVendors
} = require(
  "../controllers/userController"
);

router.get(

  "/me/saved-vendors",

  authMiddleware,

  getMySavedVendors

);

router.get(

  "/me/vendors",

  authMiddleware,

  getMyVendors

);

module.exports =
  router;