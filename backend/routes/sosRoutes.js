// routes/sosRoutes.js
const express = require("express");
const router = express.Router();
const {
  triggerSOS,
  getMySOSHistory,
  resolveSOS,
} = require("../controllers/sosController");
const { protect } = require("../middleware/authMiddleware");

router.post("/trigger", protect, triggerSOS); // POST /api/sos/trigger
router.get("/history", protect, getMySOSHistory); // GET  /api/sos/history
router.put("/:id/resolve", protect, resolveSOS); // PUT  /api/sos/:id/resolve

module.exports = router;
