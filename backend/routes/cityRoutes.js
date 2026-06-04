const express = require("express");

const router = express.Router();

const {
  getCities,
  getCityBySlug,
} = require("../controllers/cityController");

router.get("/", getCities);

router.get("/:slug", getCityBySlug);

module.exports = router;