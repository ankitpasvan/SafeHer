// models/CommunityPost.js
const mongoose = require("mongoose");

const communityPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      required: true,
      default: "Community Guardian",
    },
    authorRole: {
      type: String,
      default: "SafeHer Ally",
    },
    avatar: {
      type: String,
      default: "/user-avatar.jpg",
    },
    timeAgo: {
      type: String,
      default: "Just now",
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: String,
      },
    ],
    comments: [
      {
        authorName: String,
        avatar: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("CommunityPost", communityPostSchema);
