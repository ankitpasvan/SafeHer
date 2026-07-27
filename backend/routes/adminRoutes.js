// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getAllSOSAlerts,
  updateIncidentStatus,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

router.get("/stats", protect, adminOnly, getDashboardStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/sos-alerts", protect, adminOnly, getAllSOSAlerts);
router.put("/incidents/:id", protect, adminOnly, updateIncidentStatus);

module.exports = router;
