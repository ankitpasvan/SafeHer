// controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
} = require("../services/EmailService");

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

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email/phone and password" });
    }

    const cleanEmail = identifier.toLowerCase();
    const digitsOnly = identifier.replace(/\D/g, "");
    const last10 = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;

    // Search query: match lowercase email, or phone matching last 10 digits
    const queryConditions = [
      { email: cleanEmail },
      { email: identifier },
      { phone: identifier },
    ];

    if (last10.length >= 7) {
      queryConditions.push({ phone: { $regex: last10, $options: "i" } });
    }

    const user = await User.findOne({ $or: queryConditions });

    if (!user) {
      return res
        .status(401)
        .json({ message: "No account found with this email or phone number" });
    }

    // If user registered with OAuth and has no password set
    if (!user.password) {
      return res.status(401).json({
        message:
          "This account was created via 1-Click Sign-In. Please sign in with Google or reset your password.",
      });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          message: "Incorrect password. Click 'Forgot Password?' to reset it.",
        });
    }

    // Send back user info + token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar || "/user-avatar.jpg",
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

// @desc    Request password reset code (Forgot Password)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body;
    const rawId = (identifier || "").trim();

    if (!rawId) {
      return res
        .status(400)
        .json({
          message: "Please provide your registered email or phone number",
        });
    }

    const cleanEmail = rawId.toLowerCase();
    const digitsOnly = rawId.replace(/\D/g, "");
    const last10 = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;

    const queryConditions = [
      { email: cleanEmail },
      { email: rawId },
      { phone: rawId },
    ];

    if (last10.length >= 7) {
      queryConditions.push({ phone: { $regex: last10, $options: "i" } });
    }

    const user = await User.findOne({ $or: queryConditions });

    if (!user) {
      return res
        .status(404)
        .json({
          message: "No account registered with this email or phone number",
        });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    await user.save();

    // Send email if user has an email
    if (user.email) {
      sendPasswordResetEmail(user.email, user.name, otp).catch((err) =>
        console.warn("Reset email warning:", err.message),
      );
    }

    res.status(200).json({
      success: true,
      message: `Verification code sent to ${user.email || user.phone}.`,
      otp, // Included for quick testing convenience
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Reset password using OTP or verification
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { identifier, otp, newPassword } = req.body;
    const rawId = (identifier || "").trim();

    if (!rawId || !newPassword) {
      return res
        .status(400)
        .json({ message: "Identifier and new password are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const cleanEmail = rawId.toLowerCase();
    const digitsOnly = rawId.replace(/\D/g, "");
    const last10 = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;

    const queryConditions = [
      { email: cleanEmail },
      { email: rawId },
      { phone: rawId },
    ];

    if (last10.length >= 7) {
      queryConditions.push({ phone: { $regex: last10, $options: "i" } });
    }

    const user = await User.findOne({ $or: queryConditions });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Verify OTP if user.resetOTP was set and OTP was provided
    if (user.resetOTP && otp) {
      const isExpired =
        user.resetOTPExpires && user.resetOTPExpires < new Date();
      if (isExpired) {
        return res
          .status(400)
          .json({
            message: "Verification code has expired. Please request a new one.",
          });
      }
      if (user.resetOTP !== otp.toString().trim()) {
        return res.status(400).json({ message: "Invalid verification code" });
      }
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully! You can now log in.",
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

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
  forgotPassword,
  resetPassword,
  getMe,
};
