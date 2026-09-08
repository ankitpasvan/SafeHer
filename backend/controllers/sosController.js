// controllers/sosController.js
const SOSAlert = require("../models/SOSAlert");
const Contact = require("../models/Contact");
const AlertLog = require("../models/AlertLog");
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

    // 1. Get all emergency contacts for this user (seed defaults if empty)
    let contacts = await Contact.find({ user: req.user.id });

    if (contacts.length === 0) {
      const defaultContacts = [
        {
          user: req.user.id,
          name: "Mom",
          phone: "+91 98765 43210",
          relation: "Family",
          relationship: "Family",
          avatar: "/avatar-mom.jpg",
          isPrimary: true,
        },
        {
          user: req.user.id,
          name: "Bestie",
          phone: "+91 87654 32109",
          relation: "Best Friend",
          relationship: "Best Friend",
          avatar: "/user-avatar.jpg",
          isPrimary: false,
        },
        {
          user: req.user.id,
          name: "Brother",
          phone: "+91 76543 21098",
          relation: "Family",
          relationship: "Family",
          avatar: "/avatar-brother.jpg",
          isPrimary: false,
        },
      ];
      contacts = await Contact.insertMany(defaultContacts);
    }

    // 2. Create the SOS alert record in DB
    const sosAlert = await SOSAlert.create({
      user: req.user.id,
      location: { lat, lng, address: address || "Near India Gate, New Delhi" },
      contactsNotified: contacts.map((c) => c._id),
      status: "active",
    });

    // 2b. Also log in AlertLog for Slide 7 Recent Alerts
    try {
      await AlertLog.create({
        user: req.user.id,
        title: "Panic Alert",
        timeString: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "Active",
        badgeClass: "badge-resolved",
        type: "panic",
        details: "Triggered via 3D Panic Button. Live GPS dispatched to all emergency contacts.",
        location: address || `Lat: ${lat.toFixed(4)}° N, Lng: ${lng.toFixed(4)}° E`,
      });
    } catch (_) {}

    // 3. Actually send SMS to all contacts at once via Twilio (non-blocking)
    let smsResults = [];
    try {
      smsResults = await sendSOSAlertToContacts(
        contacts,
        req.user.name || "User",
        lat,
        lng,
      );
    } catch (err) {
      console.warn("SMS send warning:", err.message);
    }

    // 3b. Also send an email to any contact that has an email saved
    let emailResults = [];
    try {
      emailResults = await sendSOSAlertEmail(
        contacts,
        req.user.name || "User",
        lat,
        lng,
      );
    } catch (err) {
      console.warn("Email send warning:", err.message);
    }

    // 4. Push real-time alert via Socket.IO
    const io = req.app.get("io");
    if (io) {
      contacts.forEach((contact) => {
        io.to(contact._id.toString()).emit("sosAlert", {
          userId: req.user.id,
          userName: req.user.name || "SafeHer User",
          lat,
          lng,
          timestamp: new Date(),
        });
      });
    }

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

// @desc    Mark latest active SOS as safe
// @route   PUT /api/sos/resolve-latest
// @access  Private
const resolveLatestSOS = async (req, res) => {
  try {
    const alert = await SOSAlert.findOne({ user: req.user.id, status: "active" }).sort({ createdAt: -1 });
    if (alert) {
      alert.status = "resolved";
      alert.resolvedAt = new Date();
      await alert.save();
    }
    res.status(200).json({ message: "SOS marked safe", alert });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { triggerSOS, getMySOSHistory, resolveSOS, resolveLatestSOS };
