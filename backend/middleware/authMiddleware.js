// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware runs BEFORE the controller on protected routes.
// It checks for a valid JWT in the Authorization header,
// verifies it, and attaches the logged-in user to req.user
const protect = async (req, res, next) => {
  let token;

  // Token is sent as: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token using the same secret used to sign it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (without password) to request object
      req.user = await User.findById(decoded.id).select("-password");

      next(); // move on to the actual controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
