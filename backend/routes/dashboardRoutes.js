// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboardOverview } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

router.get("/overview", protect, getDashboardOverview); // GET /api/dashboard/overview

module.exports = router;
