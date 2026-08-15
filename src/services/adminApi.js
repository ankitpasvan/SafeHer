import api from "./api";

// GET /api/admin/stats
export const getDashboardStats = () =>
  api.get("/admin/stats").then((res) => res.data);

// GET /api/admin/users
export const getAllUsers = () =>
  api.get("/admin/users").then((res) => res.data);

// GET /api/admin/sos-alerts
export const getAllSOSAlerts = () =>
  api.get("/admin/sos-alerts").then((res) => res.data);

// PUT /api/admin/incidents/:id
export const updateIncidentStatus = (id, status) =>
  api.put(`/admin/incidents/${id}`, { status }).then((res) => res.data);
