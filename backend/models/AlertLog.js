// models/AlertLog.js
const mongoose = require("mongoose");

const alertLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true, // e.g. "Panic Alert", "Safe Zone Exited", "Check-in Missed"
    },
    timeString: {
      type: String,
      default: "Just now",
    },
    status: {
      type: String,
      enum: ["Resolved", "Warning", "Info", "Active"],
      default: "Active",
    },
    badgeClass: {
      type: String,
      default: "badge-resolved",
    },
    type: {
      type: String,
      enum: ["panic", "safezone", "checkin", "route"],
      default: "panic",
    },
    details: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AlertLog", alertLogSchema);
