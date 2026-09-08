// routes/communityRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCommunityPosts,
  createCommunityPost,
  toggleLikePost,
  addCommentToPost,
} = require("../controllers/communityController");
const { protect } = require("../middleware/authMiddleware");

router.get("/posts", getCommunityPosts); // GET /api/community/posts
router.post("/posts", protect, createCommunityPost); // POST /api/community/posts
router.post("/posts/:id/like", protect, toggleLikePost); // POST /api/community/posts/:id/like
router.post("/posts/:id/comment", protect, addCommentToPost); // POST /api/community/posts/:id/comment

module.exports = router;
