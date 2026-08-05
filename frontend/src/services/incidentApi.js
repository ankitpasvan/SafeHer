import api from "./api";

// POST /api/incidents
export const reportIncident = (payload) =>
  api.post("/incidents", payload).then((res) => res.data);

// GET /api/incidents
export const getAllIncidents = () =>
  api.get("/incidents").then((res) => res.data);

// GET /api/incidents/nearby?lat=&lng=&radius=
export const getNearbyIncidents = (lat, lng, radius = 5) =>
  api
    .get("/incidents/nearby", { params: { lat, lng, radius } })
    .then((res) => res.data);
