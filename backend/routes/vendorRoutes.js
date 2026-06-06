const express = require("express");
const router = express.Router();

const {
  getVendors,
  createVendor,
  getVendorBySlug,
  createReview,
  deleteVendor,
  getVendorById,
  updateVendor
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

router.get(
  "/id/:id",
  getVendorById
);

router.put(
  "/:id",
  updateVendor
);


module.exports = router;