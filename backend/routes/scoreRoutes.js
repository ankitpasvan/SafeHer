// routes/scoreRoutes.js
const express = require("express");
const router = express.Router();
const { getSafetyScore } = require("../controllers/scoreController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getSafetyScore); // GET /api/score

module.exports = router;
