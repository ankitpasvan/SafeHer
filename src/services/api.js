import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach the JWT (if present) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("safeher_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages and auto-retry on alternate port if port 5000/7000 mismatch
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If network error occurred and we haven't retried alternate port yet
    if (
      (!error.response || error.code === "ERR_NETWORK" || error.message === "Network Error") &&
      originalRequest &&
      !originalRequest._retryPort
    ) {
      originalRequest._retryPort = true;
      const currentUrl = originalRequest.baseURL || API_BASE_URL;
      const alternateBase = currentUrl.includes(":7000")
        ? currentUrl.replace(":7000", ":5000")
        : currentUrl.replace(":5000", ":7000");

      try {
        const retryInstance = axios.create({
          ...originalRequest,
          baseURL: alternateBase,
        });
        return await retryInstance(originalRequest);
      } catch (_) {
        // Fall through to error reporting below
      }
    }

    if (error.response?.status === 401) {
      // Token invalid/expired -- clear local session
      localStorage.removeItem("safeher_token");
      localStorage.removeItem("safeher_user");
    }

    let message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      error.message;

    if (!error.response && (error.code === "ERR_NETWORK" || error.message === "Network Error")) {
      message = "Network Error: Cannot reach backend server on port 7000 or 5000. Please ensure 'node server.js' is running.";
    }

    return Promise.reject(new Error(message || "Something went wrong. Please try again."));
  },
);

export default api;
export { API_BASE_URL };
