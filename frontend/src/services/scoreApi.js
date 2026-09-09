import api from "./api";

// GET /api/score
export const getSafetyScore = () => api.get("/score").then((res) => res.data);
