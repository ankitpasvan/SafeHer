// controllers/alertController.js
const AlertLog = require("../models/AlertLog");

// Default alerts matching the design
const DEFAULT_ALERTS = [
  {
    title: "Panic Alert",
    timeString: "Today, 08:24 PM",
    status: "Resolved",
    badgeClass: "badge-resolved",
    type: "panic",
    details: "Triggered via 3D Panic Button. Live GPS dispatched to all emergency contacts. Safe status confirmed at 08:31 PM.",
    location: "Sector 62, Noida (Lat: 28.6280° N, Lng: 77.3649° E)",
  },
  {
    title: "Safe Zone Exited",
    timeString: "Today, 07:10 PM",
    status: "Warning",
    badgeClass: "badge-warning",
    type: "safezone",
    details: "GPS telemetry detected exit from designated 'College Geofence' outside usual scheduled hours.",
    location: "AKGEC Campus perimeter, Ghaziabad",
  },
  {
    title: "Check-in Missed",
    timeString: "Today, 06:30 PM",
    status: "Info",
    badgeClass: "badge-info",
    type: "checkin",
    details: "Automated 30-minute safety confirmation prompt was not acknowledged within 5 minutes.",
    location: "Connaught Place transit hub, New Delhi",
  },
  {
    title: "Route Variance Detected",
    timeString: "Yesterday, 10:15 PM",
    status: "Resolved",
    badgeClass: "badge-resolved",
    type: "panic",
    details: "Auto-rerouting suggested safer, well-lit corridors after a 200m diversion.",
    location: "Outer Ring Road, New Delhi",
  },
];

// @desc    Get user recent alerts
// @route   GET /api/alerts
// @access  Private
const getRecentAlerts = async (req, res) => {
  try {
    let alerts = await AlertLog.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (alerts.length === 0) {
      const seeded = DEFAULT_ALERTS.map((a) => ({ ...a, user: req.user.id }));
      alerts = await AlertLog.insertMany(seeded);
    }

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new alert log
// @route   POST /api/alerts
// @access  Private
const createAlert = async (req, res) => {
  try {
    const { title, status, badgeClass, type, details, location } = req.body;

    const alert = await AlertLog.create({
      user: req.user.id,
      title: title || "Security Notification",
      timeString: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: status || "Active",
      badgeClass: badgeClass || "badge-resolved",
      type: type || "panic",
      details: details || "",
      location: location || "Live GPS perimeter",
    });

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark alert as resolved
// @route   PUT /api/alerts/:id/resolve
// @access  Private
const resolveAlert = async (req, res) => {
  try {
    const alert = await AlertLog.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    if (alert.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    alert.status = "Resolved";
    await alert.save();

    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getRecentAlerts, createAlert, resolveAlert };
