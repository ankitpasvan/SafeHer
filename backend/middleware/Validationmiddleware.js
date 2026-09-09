// middleware/validationMiddleware.js
const { body, validationResult } = require("express-validator");

// This function checks if any validation errors were collected
// and stops the request with a 400 if so. Runs AFTER the rule chains below.
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for registration
// Usage in routes: router.post('/register', validateRegister, registerUser)
const validateRegister = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("phone")
    .isLength({ min: 10 })
    .withMessage("Valid phone number is required"),
  handleValidationErrors,
];

// Validation rules for login
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// Validation rules for adding an emergency contact
const validateContact = [
  body("name").trim().notEmpty().withMessage("Contact name is required"),
  body("phone")
    .isLength({ min: 10 })
    .withMessage("Valid contact phone number is required"),
  handleValidationErrors,
];

// Validation rules for triggering SOS (lat/lng must be valid numbers)
const validateSOS = [
  body("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Valid latitude is required"),
  body("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Valid longitude is required"),
  handleValidationErrors,
];

// Validation rules for reporting an incident
const validateIncident = [
  body("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Valid latitude is required"),
  body("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Valid longitude is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateContact,
  validateSOS,
  validateIncident,
};
