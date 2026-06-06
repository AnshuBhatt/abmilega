const express = require("express");
const router = express.Router();

const {
  getVendors,
  createVendor,
  getVendorBySlug,
  createReview,
} = require("../controllers/vendorController");



router.get("/", getVendors);

router.get("/:slug", getVendorBySlug);

router.post("/", createVendor);

router.post(
  "/:vendorId/reviews",
  createReview
);


module.exports = router;