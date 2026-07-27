// controllers/contactController.js
const Contact = require("../models/Contact");

// @desc    Add a new emergency contact
// @route   POST /api/contacts
// @access  Private
const addContact = async (req, res) => {
  try {
    const { name, phone, email, relation, isPrimary } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    // req.user.id comes from authMiddleware -> the logged-in user
    const contact = await Contact.create({
      user: req.user.id,
      name,
      phone,
      email,
      relation,
      isPrimary,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all emergency contacts of logged-in user
// @route   GET /api/contacts
// @access  Private
const getContacts = async (req, res) => {
  try {
    // Only fetch contacts belonging to this user (data isolation)
    const contacts = await Contact.find({ user: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update an emergency contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Security check: make sure this contact belongs to the logged-in user
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this contact" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the updated document instead of the old one
      },
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete an emergency contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this contact" });
    }

    await contact.deleteOne();
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addContact, getContacts, updateContact, deleteContact };
