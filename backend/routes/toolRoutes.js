// routes/toolRoutes.js
const express = require("express");
const router = express.Router();
const { getDefenseTips, logToolAction } = require("../controllers/toolController");
const { protect } = require("../middleware/authMiddleware");

router.get("/tips", getDefenseTips); // GET /api/tools/tips
router.post("/log-action", protect, logToolAction); // POST /api/tools/log-action

module.exports = router;
