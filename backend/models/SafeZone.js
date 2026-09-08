// models/SafeZone.js
const mongoose = require("mongoose");

const safeZoneSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Zone name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["home", "college", "work", "custom"],
      default: "custom",
    },
    active: {
      type: Boolean,
      default: true,
    },
    radiusMeters: {
      type: Number,
      default: 300,
    },
    lat: {
      type: Number,
      default: 28.6139,
    },
    lng: {
      type: Number,
      default: 77.209,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SafeZone", safeZoneSchema);
