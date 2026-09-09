// routes/sosRoutes.js
const express = require("express");
const router = express.Router();
const {
  triggerSOS,
  getMySOSHistory,
  resolveSOS,
  resolveLatestSOS,
} = require("../controllers/sosController");
const { protect } = require("../middleware/authMiddleware");

router.post("/trigger", protect, triggerSOS); // POST /api/sos/trigger
router.get("/history", protect, getMySOSHistory); // GET  /api/sos/history
router.put("/resolve-latest", protect, resolveLatestSOS); // PUT /api/sos/resolve-latest
router.put("/:id/resolve", protect, resolveSOS); // PUT  /api/sos/:id/resolve

module.exports = router;
