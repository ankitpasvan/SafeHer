import api from "./api";

// GET /api/map/nearby/police?lat=&lng=
export const getNearbyPolice = (lat, lng) =>
  api.get("/map/nearby/police", { params: { lat, lng } }).then((r) => r.data);

// GET /api/map/nearby/hospital?lat=&lng=
export const getNearbyHospitals = (lat, lng) =>
  api.get("/map/nearby/hospital", { params: { lat, lng } }).then((r) => r.data);

// GET /api/map/risk-score?lat=&lng=
export const getRiskScore = (lat, lng) =>
  api.get("/map/risk-score", { params: { lat, lng } }).then((r) => r.data);

// GET /api/map/geocode?address=
export const geocodeAddress = (address) =>
  api.get("/map/geocode", { params: { address } }).then((r) => r.data);

// POST /api/map/safe-route -- backend has no routing provider configured yet;
// call is still wired up so it starts working the moment the backend adds one.
export const getSafeRoute = (payload) =>
  api.post("/map/safe-route", payload).then((r) => r.data);
