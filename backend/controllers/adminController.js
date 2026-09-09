// controllers/adminController.js
const User = require("../models/User");
const SOSAlert = require("../models/SOSAlert");
const Incident = require("../models/Incident");

// @desc    Get overall dashboard stats
// @route   GET /api/admin/stats
// @access  Private (admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSOSAlerts = await SOSAlert.countDocuments();
    const activeSOSAlerts = await SOSAlert.countDocuments({ status: "active" });
    const totalIncidents = await Incident.countDocuments();
    const pendingIncidents = await Incident.countDocuments({
      status: "pending",
    });

    res.status(200).json({
      totalUsers,
      totalSOSAlerts,
      activeSOSAlerts,
      totalIncidents,
      pendingIncidents,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all users (admin monitoring)
// @route   GET /api/admin/users
// @access  Private (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all SOS alerts across all users (live monitoring)
// @route   GET /api/admin/sos-alerts
// @access  Private (admin only)
const getAllSOSAlerts = async (req, res) => {
  try {
    // populate() replaces the 'user' ObjectId with actual user details
    const alerts = await SOSAlert.find()
      .populate("user", "name phone email")
      .sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update incident status (mark reviewed/resolved)
// @route   PUT /api/admin/incidents/:id
// @access  Private (admin only)
const updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllSOSAlerts,
  updateIncidentStatus,
};
