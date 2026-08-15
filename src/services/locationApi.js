import api from "./api";

// POST /api/location/update
export const updateLocation = ({ lat, lng }) =>
  api.post("/location/update", { lat, lng }).then((res) => res.data);

// GET /api/location/me
export const getMyLocation = () =>
  api.get("/location/me").then((res) => res.data);

// GET /api/location/:userId
export const getUserLocation = (userId) =>
  api.get(`/location/${userId}`).then((res) => res.data);

// PUT /api/location/stop-sharing
export const stopSharing = () =>
  api.put("/location/stop-sharing").then((res) => res.data);
