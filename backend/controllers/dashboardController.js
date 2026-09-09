// controllers/dashboardController.js
const Contact = require("../models/Contact");
const SafeZone = require("../models/SafeZone");
const AlertLog = require("../models/AlertLog");
const SOSAlert = require("../models/SOSAlert");

// @desc    Get aggregated dashboard stats and overview metrics
// @route   GET /api/dashboard/overview
// @access  Private
const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const [contactsCount, activeZonesCount, recentAlerts, activeSOS] = await Promise.all([
      Contact.countDocuments({ user: userId }),
      SafeZone.countDocuments({ user: userId, active: true }),
      AlertLog.find({ user: userId }).sort({ createdAt: -1 }).limit(3),
      SOSAlert.findOne({ user: userId, status: "active" }),
    ]);

    // Safety score calculation
    let safetyScore = 70;
    safetyScore += Math.min(contactsCount * 5, 15);
    safetyScore += Math.min(activeZonesCount * 7.5, 15);
    if (activeSOS) safetyScore -= 20;
    safetyScore = Math.min(100, Math.max(0, Math.round(safetyScore)));

    res.status(200).json({
      userName: req.user.name || "Ankit",
      systemStatus: "Operational",
      allSystemsOperational: true,
      weather: {
        temp: "28°C",
        condition: "Haze",
        city: "New Delhi",
      },
      stats: {
        contactsCount,
        activeZonesCount,
        safetyScore,
        scoreRating: safetyScore >= 85 ? "Excellent" : "Good",
        sosActive: Boolean(activeSOS),
        recentAlertsCount: recentAlerts.length,
      },
      recentAlerts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getDashboardOverview };
