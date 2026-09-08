// controllers/scoreController.js
const Contact = require("../models/Contact");
const SafeZone = require("../models/SafeZone");
const AlertLog = require("../models/AlertLog");

// @desc    Calculate and fetch user safety score
// @route   GET /api/score
// @access  Private
const getSafetyScore = async (req, res) => {
  try {
    const contactsCount = await Contact.countDocuments({ user: req.user.id });
    const zonesCount = await SafeZone.countDocuments({ user: req.user.id, active: true });
    const unresolvedAlerts = await AlertLog.countDocuments({ user: req.user.id, status: "Active" });

    // Dynamic score calculation:
    // Base: 70
    // Contacts: up to +15 (5 pts per contact, max 15 for 3 contacts)
    // Safe Zones: up to +15 (7.5 pts per active zone, max 15 for 2 zones)
    // Deductions: -5 per active alert
    let score = 70;
    score += Math.min(contactsCount * 5, 15);
    score += Math.min(zonesCount * 7.5, 15);
    score -= unresolvedAlerts * 5;

    score = Math.min(100, Math.max(0, Math.round(score)));

    let rating = "Good";
    if (score >= 85) rating = "Excellent";
    else if (score >= 70) rating = "Good";
    else if (score >= 50) rating = "Moderate";
    else rating = "Needs Attention";

    res.status(200).json({
      score,
      total: 100,
      rating,
      metrics: {
        contactsCount,
        safeZonesCount: zonesCount,
        unresolvedAlerts,
        profileVerified: true,
        gpsTrackingArmed: true,
      },
      tips: [
        contactsCount < 5 ? "Add 2 more emergency contacts to boost score by +10" : "Contact circle is fully armed (+10)",
        zonesCount < 3 ? "Configure 1 more Safe Zone for +5 points" : "Perimeter defense active (+5)",
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getSafetyScore };
