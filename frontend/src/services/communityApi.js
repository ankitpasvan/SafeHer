import api from "./api";

// GET /api/community/posts
export const getCommunityPosts = () =>
  api.get("/community/posts").then((res) => res.data);

// POST /api/community/posts
export const createCommunityPost = (payload) =>
  api.post("/community/posts", payload).then((res) => res.data);

// POST /api/community/posts/:id/like
export const toggleLikePost = (id) =>
  api.post(`/community/posts/${id}/like`).then((res) => res.data);

// POST /api/community/posts/:id/comment
export const addCommentToPost = (id, payload) =>
  api.post(`/community/posts/${id}/comment`, payload).then((res) => res.data);
