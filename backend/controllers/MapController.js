// controllers/mapController.js
const {
  getDirections,
  getNearbyPlaces,
  geocodeAddress,
} = require("../services/mapService");
const {
  calculateRiskScore,
  findSafestRoute,
} = require("../services/aiRiskService");

// @desc    Get the safest route between two points (ranked by AI risk score)
// @route   POST /api/map/safe-route
// @access  Private
const getSafeRoute = async (req, res) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.body;

    if (!originLat || !originLng || !destLat || !destLng) {
      return res
        .status(400)
        .json({ message: "origin and destination coordinates are required" });
    }

    // 1. Get all possible route options from Google Maps
    const routes = await getDirections(originLat, originLng, destLat, destLng);

    if (!routes || routes.length === 0) {
      return res.status(404).json({ message: "No routes found" });
    }

    // 2. Rank them by risk score (lowest risk first = safest)
    const rankedRoutes = await findSafestRoute(routes);

    res.status(200).json({
      safestRoute: rankedRoutes[0], // best pick
      allRoutes: rankedRoutes, // full ranked list, in case user wants alternatives
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get nearby police stations
// @route   GET /api/map/nearby/police?lat=..&lng=..
// @access  Private
const getNearbyPolice = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "lat and lng query params are required" });
    }

    const places = await getNearbyPlaces(lat, lng, "police");
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get nearby hospitals
// @route   GET /api/map/nearby/hospital?lat=..&lng=..
// @access  Private
const getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "lat and lng query params are required" });
    }

    const places = await getNearbyPlaces(lat, lng, "hospital");
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get the AI risk score for a specific location (used to show a "danger meter" on map)
// @route   GET /api/map/risk-score?lat=..&lng=..
// @access  Private
const getRiskScore = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "lat and lng query params are required" });
    }

    const risk = await calculateRiskScore(parseFloat(lat), parseFloat(lng));
    res.status(200).json(risk);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Convert a typed address into coordinates
// @route   GET /api/map/geocode?address=..
// @access  Private
const geocode = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res
        .status(400)
        .json({ message: "address query param is required" });
    }

    const result = await geocodeAddress(address);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSafeRoute,
  getNearbyPolice,
  getNearbyHospitals,
  getRiskScore,
  geocode,
};
