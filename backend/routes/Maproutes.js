// routes/mapRoutes.js
const express = require("express");
const router = express.Router();
const {
  getSafeRoute,
  getNearbyPolice,
  getNearbyHospitals,
  getRiskScore,
  geocode,
} = require("../controllers/mapController");
const { protect } = require("../middleware/authMiddleware");

router.post("/safe-route", protect, getSafeRoute); // POST /api/map/safe-route
router.get("/nearby/police", protect, getNearbyPolice); // GET  /api/map/nearby/police
router.get("/nearby/hospital", protect, getNearbyHospitals); // GET  /api/map/nearby/hospital
router.get("/risk-score", protect, getRiskScore); // GET  /api/map/risk-score
router.get("/geocode", protect, geocode); // GET  /api/map/geocode

module.exports = router;
