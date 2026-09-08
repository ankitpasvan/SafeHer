// routes/alertRoutes.js
const express = require("express");
const router = express.Router();
const {
  getRecentAlerts,
  createAlert,
  resolveAlert,
} = require("../controllers/alertController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getRecentAlerts); // GET /api/alerts
router.post("/", protect, createAlert); // POST /api/alerts
router.put("/:id/resolve", protect, resolveAlert); // PUT /api/alerts/:id/resolve

module.exports = router;
