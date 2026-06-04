const express = require("express");
const router = express.Router();

const {
  getVendors,
  createVendor,
  getVendorBySlug,
} = require("../controllers/vendorController");

router.get("/", getVendors);

router.get("/:slug", getVendorBySlug);

router.post("/", createVendor);


module.exports = router;