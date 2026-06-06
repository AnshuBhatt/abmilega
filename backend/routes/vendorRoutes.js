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
  getVendorAnalytics,
  getVendorEvents
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

router.get(
  "/id/:id",
  getVendorById
);

router.delete(
  "/:id",
  deleteVendor
);

router.get(
  "/:id/analytics",
  getVendorAnalytics
);

router.get(
  "/:id/events",
  getVendorEvents
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