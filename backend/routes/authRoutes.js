// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleAuth,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser); // POST /api/auth/register
router.post("/login", loginUser); // POST /api/auth/login
router.post("/google", googleAuth); // POST /api/auth/google
router.get("/me", protect, getMe); // GET  /api/auth/me  (protected)

module.exports = router;
