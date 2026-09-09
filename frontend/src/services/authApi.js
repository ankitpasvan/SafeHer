import api from "./api";

// POST /api/auth/register
export const registerUser = (payload) =>
  api.post("/auth/register", payload).then((res) => res.data);

// POST /api/auth/login
export const loginUser = (payload) =>
  api.post("/auth/login", payload).then((res) => res.data);

// POST /api/auth/google
export const googleLoginApi = (payload = {}) =>
  api.post("/auth/google", payload).then((res) => res.data);

// POST /api/auth/forgot-password
export const forgotPasswordApi = (payload) =>
  api.post("/auth/forgot-password", payload).then((res) => res.data);

// POST /api/auth/reset-password
export const resetPasswordApi = (payload) =>
  api.post("/auth/reset-password", payload).then((res) => res.data);

// GET /api/auth/me
export const fetchMe = () => api.get("/auth/me").then((res) => res.data);
