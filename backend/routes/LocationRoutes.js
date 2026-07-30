// routes/locationRoutes.js
const express = require("express");
const router = express.Router();
const {
  updateLocation,
  getMyLocation,
  getUserLocation,
  stopSharing,
} = require("../controllers/locationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/update", protect, updateLocation); // POST /api/location/update
router.get("/me", protect, getMyLocation); // GET  /api/location/me
router.get("/:userId", protect, getUserLocation); // GET  /api/location/:userId
router.put("/stop-sharing", protect, stopSharing); // PUT  /api/location/stop-sharing

module.exports = router;
