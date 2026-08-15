import api from "./api";

// POST /api/sos/trigger
export const triggerSOS = ({ lat, lng, address }) =>
  api.post("/sos/trigger", { lat, lng, address }).then((res) => res.data);

// GET /api/sos/history
export const getSOSHistory = () =>
  api.get("/sos/history").then((res) => res.data);

// PUT /api/sos/:id/resolve
export const resolveSOS = (id) =>
  api.put(`/sos/${id}/resolve`).then((res) => res.data);
