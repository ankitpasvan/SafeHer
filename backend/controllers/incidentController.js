// controllers/incidentController.js
const Incident = require("../models/Incident");
const { sendIncidentConfirmationEmail } = require("../services/emailService");

// @desc    Report an unsafe location/incident
// @route   POST /api/incidents
// @access  Private
const reportIncident = async (req, res) => {
  try {
    const { lat, lng, address, description, category, severity } = req.body;

    if (!lat || !lng || !description) {
      return res
        .status(400)
        .json({ message: "Location and description are required" });
    }

    const incident = await Incident.create({
      reportedBy: req.user.id,
      location: { lat, lng, address },
      description,
      category,
      severity,
    });

    // Fire-and-forget confirmation email -- don't make the user wait for it
    if (req.user.email) {
      sendIncidentConfirmationEmail(req.user.email, description).catch((err) =>
        console.error("Incident confirmation email failed:", err.message),
      );
    }

    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all reported incidents (for map display)
// @route   GET /api/incidents
// @access  Private
const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get incidents reported near a specific lat/lng (basic radius filter)
// @route   GET /api/incidents/nearby?lat=..&lng=..&radius=..
// @access  Private
const getNearbyIncidents = async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query; // radius in km, default 5km

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "lat and lng query params are required" });
    }

    // Simple bounding-box filter (good enough for MVP; use geospatial index later for accuracy)
    const latDelta = radius / 111; // ~111km per degree latitude
    const lngDelta = radius / (111 * Math.cos((lat * Math.PI) / 180));

    const incidents = await Incident.find({
      "location.lat": {
        $gte: lat - latDelta,
        $lte: parseFloat(lat) + latDelta,
      },
      "location.lng": {
        $gte: lng - lngDelta,
        $lte: parseFloat(lng) + lngDelta,
      },
    });

    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { reportIncident, getAllIncidents, getNearbyIncidents };
