// controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendWelcomeEmail } = require("../services/emailService");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Check if all fields are provided
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash the password before saving (never store plain text passwords)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // 5. Send a welcome email (don't block the response if it fails)
    if (user) {
      sendWelcomeEmail(user.email, user.name).catch((err) =>
        console.error("Welcome email failed:", err.message),
      );
    }

    // 6. Send back user info + JWT token so they're logged in immediately
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login existing user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = (email || "").trim();

    // 1. Find user by email or phone number
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email/phone or password" });
    }

    // 2. Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Send back user info + token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Google OAuth / 1-Click Secure Login
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const { name, email, googleId, avatar } = req.body || {};
    const userEmail = (email || "ankit@gmail.com").toLowerCase().trim();
    const userName = name || "Ankit";

    // Find or create user in MongoDB
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      user = await User.create({
        name: userName,
        email: userEmail,
        phone: "+91 98765 43210",
        avatar: avatar || "/user-avatar.jpg",
        googleId: googleId || `google-${Date.now()}`,
        role: "user",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get logged-in user's own profile
// @route   GET /api/auth/me
// @access  Private (needs token)
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { registerUser, loginUser, googleAuth, getMe };
