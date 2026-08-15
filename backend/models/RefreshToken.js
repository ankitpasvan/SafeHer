// models/RefreshToken.js
const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // We never store the raw refresh token -- only a SHA-256 hash of it,
    // the same way passwords are hashed. If the DB ever leaks, the stored
    // values can't be replayed as tokens.
    tokenHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    userAgent: String,
    ip: String,
  },
  { timestamps: true },
);

// TTL index: MongoDB automatically deletes the document once expiresAt
// has passed, so the collection doesn't grow forever.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
