// models/SOSAlert.js
const mongoose = require("mongoose");

const sosAlertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    contactsNotified: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    status: {
      type: String,
      enum: ["active", "resolved", "cancelled"],
      default: "active",
    },
    triggeredAt: {
      type: Date,
      default: Date.now,
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SOSAlert", sosAlertSchema);
