// controllers/sosController.js
const SOSAlert = require("../models/SOSAlert");
const Contact = require("../models/Contact");
const { sendSOSAlertToContacts } = require("../services/smsServices");
const { sendSOSAlertEmail } = require("../services/emailService");

// @desc    Trigger a new SOS alert
// @route   POST /api/sos/trigger
// @access  Private
const triggerSOS = async (req, res) => {
  try {
    const { lat, lng, address } = req.body;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Location (lat/lng) is required" });
    }

    // 1. Get all emergency contacts for this user
    const contacts = await Contact.find({ user: req.user.id });

    if (contacts.length === 0) {
      return res
        .status(400)
        .json({ message: "No emergency contacts found. Add contacts first." });
    }

    // 2. Create the SOS alert record in DB
    const sosAlert = await SOSAlert.create({
      user: req.user.id,
      location: { lat, lng, address },
      contactsNotified: contacts.map((c) => c._id),
      status: "active",
    });

    // 3. Actually send SMS to all contacts at once via Twilio
    const smsResults = await sendSOSAlertToContacts(
      contacts,
      req.user.name,
      lat,
      lng,
    );

    // 3b. Also send an email to any contact that has an email saved (extra redundancy)
    const emailResults = await sendSOSAlertEmail(
      contacts,
      req.user.name,
      lat,
      lng,
    );

    // 4. Also push an INSTANT real-time alert via Socket.IO (in case contact's app is open)
    // This works alongside SMS -- SMS reaches them even if app is closed, socket is instant if app is open
    const io = req.app.get("io");
    contacts.forEach((contact) => {
      // Each contact's socket must have joined a room matching their own contact._id
      // (frontend does this via socket.emit('joinRoom', contact._id) on login)
      io.to(contact._id.toString()).emit("sosAlert", {
        userId: req.user.id,
        userName: req.user.name,
        lat,
        lng,
        timestamp: new Date(),
      });
    });

    res.status(201).json({
      smsResults,
      emailResults,
      message: "SOS alert triggered successfully",
      sosAlert,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all SOS alerts of logged-in user (history)
// @route   GET /api/sos/history
// @access  Private
const getMySOSHistory = async (req, res) => {
  try {
    const alerts = await SOSAlert.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark an SOS alert as resolved/cancelled
// @route   PUT /api/sos/:id/resolve
// @access  Private
const resolveSOS = async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: "SOS alert not found" });
    }

    if (alert.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    alert.status = "resolved";
    alert.resolvedAt = new Date();
    await alert.save();

    res.status(200).json({ message: "SOS alert resolved", alert });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { triggerSOS, getMySOSHistory, resolveSOS };
