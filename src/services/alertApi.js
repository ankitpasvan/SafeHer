import api from "./api";

// GET /api/alerts
export const getRecentAlerts = () => api.get("/alerts").then((res) => res.data);

// POST /api/alerts
export const createAlert = (payload) =>
  api.post("/alerts", payload).then((res) => res.data);

// PUT /api/alerts/:id/resolve
export const resolveAlert = (id) =>
  api.put(`/alerts/${id}/resolve`).then((res) => res.data);
