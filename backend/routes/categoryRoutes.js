const express = require("express");

const router = express.Router();

const {
  getCategories,
  getCategoryBySlug,
  getOnboardingConfig,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.get(
    "/:id/onboarding-config",
    getOnboardingConfig
);

router.get("/:slug", getCategoryBySlug);


module.exports = router;