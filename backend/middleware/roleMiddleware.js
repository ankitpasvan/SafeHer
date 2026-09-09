// middleware/roleMiddleware.js

// This middleware runs AFTER authMiddleware (protect), because it needs req.user
// It blocks the request if the logged-in user's role isn't "admin"
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user is admin, continue to controller
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { adminOnly };
