// middleware/rateLimitMiddleware.js
const rateLimit = require("express-rate-limit");

// Limits SOS triggers -- allow max 5 SOS triggers per 10 minutes per IP
// Prevents accidental/malicious spam-clicking of the SOS button from flooding contacts
const sosLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    message: "Too many SOS triggers. Please wait before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limits login attempts -- max 10 attempts per 15 minutes per IP
// Helps prevent brute-force password guessing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { sosLimiter, loginLimiter };
