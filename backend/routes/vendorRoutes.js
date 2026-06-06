const express = require("express");
const router = express.Router();

const {
  getVendors,
  createVendor,
  getVendorBySlug,
  createReview,
  deleteVendor,
  getVendorById,
  updateVendor,
  getVendorAnalytics
} = require("../controllers/vendorController");

const {
  createEvent,
} = require(
  "../controllers/vendorEventController"
);

router.get("/", getVendors);

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

router.get(
  "/:id/analytics",
  getVendorAnalytics
);

router.get("/:slug", getVendorBySlug);

router.put(
  "/:id",
  updateVendor
);

router.post(
  "/:vendorId/events",
  createEvent
);




module.exports = router;