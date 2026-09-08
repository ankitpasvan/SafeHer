// controllers/zoneController.js
const SafeZone = require("../models/SafeZone");

// Default zones matching the design
const DEFAULT_ZONES = [
  {
    name: "Home",
    address: "12, Green Park, New Delhi",
    type: "home",
    active: true,
    radiusMeters: 300,
    lat: 28.5589,
    lng: 77.2028,
  },
  {
    name: "College",
    address: "AKGEC, Ghaziabad",
    type: "college",
    active: true,
    radiusMeters: 500,
    lat: 28.6756,
    lng: 77.5029,
  },
  {
    name: "Work",
    address: "Connaught Place, New Delhi",
    type: "work",
    active: false,
    radiusMeters: 400,
    lat: 28.6315,
    lng: 77.2167,
  },
];

// @desc    Get user's safe zones
// @route   GET /api/zones
// @access  Private
const getSafeZones = async (req, res) => {
  try {
    let zones = await SafeZone.find({ user: req.user.id });

    // Seed defaults if user has no zones yet
    if (zones.length === 0) {
      const seeded = DEFAULT_ZONES.map((z) => ({ ...z, user: req.user.id }));
      zones = await SafeZone.insertMany(seeded);
    }

    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new safe zone
// @route   POST /api/zones
// @access  Private
const createSafeZone = async (req, res) => {
  try {
    const { name, address, type, radiusMeters, lat, lng } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }

    const zone = await SafeZone.create({
      user: req.user.id,
      name: name.trim(),
      address: address.trim(),
      type: type || "custom",
      radiusMeters: Number(radiusMeters) || 300,
      lat: Number(lat) || 28.6139,
      lng: Number(lng) || 77.209,
      active: true,
    });

    res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Toggle active status of a safe zone
// @route   PUT /api/zones/:id/toggle
// @access  Private
const toggleSafeZone = async (req, res) => {
  try {
    const zone = await SafeZone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({ message: "Safe zone not found" });
    }

    if (zone.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    zone.active = !zone.active;
    await zone.save();

    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a safe zone
// @route   DELETE /api/zones/:id
// @access  Private
const deleteSafeZone = async (req, res) => {
  try {
    const zone = await SafeZone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({ message: "Safe zone not found" });
    }

    if (zone.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await zone.deleteOne();
    res.status(200).json({ message: "Safe zone removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getSafeZones, createSafeZone, toggleSafeZone, deleteSafeZone };
