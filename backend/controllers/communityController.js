// controllers/communityController.js
const CommunityPost = require("../models/CommunityPost");

// Default community solidarity feed matching the design
const DEFAULT_POSTS = [
  {
    authorName: "Ananya Sharma",
    authorRole: "Campus Ambassador",
    avatar: "/user-avatar.jpg",
    timeAgo: "15 mins ago",
    content: "Green Park metro station gate #2 has good street lighting active now. Safe passage verified for commuters tonight! 🌸",
    likes: 24,
    comments: [
      {
        authorName: "Pooja Verma",
        text: "Thanks for the update Ananya, really helpful!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorName: "Ritu Kapoor",
    authorRole: "Guardian Network",
    avatar: "/avatar-mom.jpg",
    timeAgo: "1 hour ago",
    content: "SafeHer buddy walk scheduled for Connaught Place outer circle at 8:30 PM. Feel free to join if you are walking to Rajiv Chowk metro.",
    likes: 42,
    comments: [],
  },
  {
    authorName: "Sneha Patel",
    authorRole: "AKGEC Student",
    avatar: "/avatar-brother.jpg",
    timeAgo: "3 hours ago",
    content: "Reminder: Keep your 24/7 helpline speed dial updated. Test your SOS silent beacon in app once every week! Stay powerful sisters 💪",
    likes: 58,
    comments: [],
  },
];

// @desc    Get community feed
// @route   GET /api/community/posts
// @access  Public or Private
const getCommunityPosts = async (req, res) => {
  try {
    let posts = await CommunityPost.find().sort({ createdAt: -1 });

    if (posts.length === 0) {
      posts = await CommunityPost.insertMany(DEFAULT_POSTS);
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new community post
// @route   POST /api/community/posts
// @access  Private
const createCommunityPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await CommunityPost.create({
      user: req.user ? req.user.id : null,
      authorName: req.user ? req.user.name : "Community Member",
      authorRole: "Verified Member",
      avatar: (req.user && req.user.avatar) || "/user-avatar.jpg",
      timeAgo: "Just now",
      content: content.trim(),
      likes: 0,
      comments: [],
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Toggle like on a community post
// @route   POST /api/community/posts/:id/like
// @access  Private
const toggleLikePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIdStr = req.user ? req.user.id.toString() : "anon";
    const hasLiked = post.likedBy && post.likedBy.includes(userIdStr);

    if (hasLiked) {
      post.likes = Math.max(0, post.likes - 1);
      post.likedBy = post.likedBy.filter((id) => id !== userIdStr);
    } else {
      post.likes += 1;
      if (!post.likedBy) post.likedBy = [];
      post.likedBy.push(userIdStr);
    }

    await post.save();
    res.status(200).json({ likes: post.likes, liked: !hasLiked });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add comment to a community post
// @route   POST /api/community/posts/:id/comment
// @access  Private
const addCommentToPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      authorName: req.user ? req.user.name : "Community Member",
      avatar: (req.user && req.user.avatar) || "/user-avatar.jpg",
      text: text.trim(),
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCommunityPosts,
  createCommunityPost,
  toggleLikePost,
  addCommentToPost,
};
