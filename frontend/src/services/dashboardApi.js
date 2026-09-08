import api from "./api";

// GET /api/dashboard/overview
export const getDashboardOverview = () =>
  api.get("/dashboard/overview").then((res) => res.data);

// PUT /api/sos/resolve-latest
export const markLatestSOSSafe = () =>
  api.put("/sos/resolve-latest").then((res) => res.data);
