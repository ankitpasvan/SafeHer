import api from "./api";

// GET /api/zones
export const getSafeZones = () => api.get("/zones").then((res) => res.data);

// POST /api/zones
export const createSafeZone = (payload) =>
  api.post("/zones", payload).then((res) => res.data);

// PUT /api/zones/:id/toggle
export const toggleSafeZone = (id) =>
  api.put(`/zones/${id}/toggle`).then((res) => res.data);

// DELETE /api/zones/:id
export const deleteSafeZone = (id) =>
  api.delete(`/zones/${id}`).then((res) => res.data);
