// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

// All contact routes are protected -> user must be logged in
router.post("/", protect, addContact); // POST   /api/contacts
router.get("/", protect, getContacts); // GET    /api/contacts
router.put("/:id", protect, updateContact); // PUT    /api/contacts/:id
router.delete("/:id", protect, deleteContact); // DELETE /api/contacts/:id

module.exports = router;
