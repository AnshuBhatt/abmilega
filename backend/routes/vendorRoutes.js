const express = require("express");
const router = express.Router();

const {
  getVendors,
  createVendor,
  getVendorBySlug,
  createReview,
  deleteVendor
} = require("../controllers/vendorController");



router.get("/", getVendors);

router.get("/:slug", getVendorBySlug);

router.post("/", createVendor);

router.post(
  "/:vendorId/reviews",
  createReview
);

router.delete(
  "/:id",
  deleteVendor
);


module.exports = router;