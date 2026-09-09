// controllers/locationController.js
const Location = require("../models/Location");
const User = require("../models/User");
const Contact = require("../models/Contact");

// @desc    Update/save the logged-in user's current live location
// @route   POST /api/location/update
// @access  Private
const updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ message: "lat and lng are required" });
    }

    // 1. Save a location history record (useful for tracking a journey)
    const location = await Location.create({
      user: req.user.id,
      lat,
      lng,
      sharingActive: true,
    });

    // 2. Also update the "latest known location" directly on the User document
    // so anyone checking the user's profile gets the freshest location instantly
    await User.findByIdAndUpdate(req.user.id, {
      currentLocation: { lat, lng, updatedAt: new Date() },
    });

    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get the logged-in user's own latest location
// @route   GET /api/location/me
// @access  Private
const getMyLocation = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("currentLocation");
    res.status(200).json(user.currentLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a specific user's live location (used by a trusted contact viewing a shared link)
// @route   GET /api/location/:userId
// @access  Private
const getUserLocation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name currentLocation",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      currentLocation: user.currentLocation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Stop sharing live location
// @route   PUT /api/location/stop-sharing
// @access  Private
const stopSharing = async (req, res) => {
  try {
    // Mark the most recent location record(s) as no longer actively sharing
    await Location.updateMany(
      { user: req.user.id, sharingActive: true },
      { sharingActive: false },
    );

    res.status(200).json({ message: "Live location sharing stopped" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateLocation,
  getMyLocation,
  getUserLocation,
  stopSharing,
};
