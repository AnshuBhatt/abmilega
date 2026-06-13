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
  getVendorEvents,
  saveVendor,
  isVendorSaved,
  unsaveVendor,
  submitVendor,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  getVendorCompletion,
  checkVendorOwnership,
} = require("../controllers/vendorController");

const {
  createEvent,
} = require(
  "../controllers/vendorEventController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

router.get("/", getVendors);

router.post("/", createVendor);

router.post(

  "/submit",

  authMiddleware,

  submitVendor

);

router.get(
  "/:id/owner-check",
  authMiddleware,
  checkVendorOwnership
);

router.post(
  "/:vendorId/reviews",
  createReview
);

router.get(
  "/pending",
  getPendingVendors
);

router.put(
  "/:id/approve",
  approveVendor
);

router.put(
  "/:id/reject",
  rejectVendor
);

router.get(
  "/:id/completion",
  getVendorCompletion
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

router.post(
  "/:id/save",

  authMiddleware,

  saveVendor
);

router.get(

  "/:id/is-saved",

  authMiddleware,

  isVendorSaved

);

router.delete(

  "/:id/save",

  authMiddleware,

  unsaveVendor

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