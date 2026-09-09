// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleAuth,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser); // POST /api/auth/register
router.post("/login", loginUser); // POST /api/auth/login
router.post("/google", googleAuth); // POST /api/auth/google
router.post("/forgot-password", forgotPassword); // POST /api/auth/forgot-password
router.post("/reset-password", resetPassword); // POST /api/auth/reset-password
router.get("/me", protect, getMe); // GET  /api/auth/me  (protected)

module.exports = router;
