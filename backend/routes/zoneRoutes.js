// routes/zoneRoutes.js
const express = require("express");
const router = express.Router();
const {
  getSafeZones,
  createSafeZone,
  toggleSafeZone,
  deleteSafeZone,
} = require("../controllers/zoneController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getSafeZones); // GET /api/zones
router.post("/", protect, createSafeZone); // POST /api/zones
router.put("/:id/toggle", protect, toggleSafeZone); // PUT /api/zones/:id/toggle
router.delete("/:id", protect, deleteSafeZone); // DELETE /api/zones/:id

module.exports = router;
