// routes/incidentRoutes.js
const express = require("express");
const router = express.Router();
const {
  reportIncident,
  getAllIncidents,
  getNearbyIncidents,
} = require("../controllers/incidentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, reportIncident); // POST /api/incidents
router.get("/", protect, getAllIncidents); // GET  /api/incidents
router.get("/nearby", protect, getNearbyIncidents); // GET  /api/incidents/nearby

module.exports = router;
