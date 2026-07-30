// services/aiRiskService.js
const Incident = require("../models/Incident");

// Rule-based risk scoring (MVP — swap for a trained ML model later without
// changing this function's signature, so controllers won't need to change)
const calculateRiskScore = async (lat, lng, radiusKm = 2) => {
  try {
    const latDelta = radiusKm / 111;
    const lngDelta = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));

    const nearbyIncidents = await Incident.find({
      "location.lat": {
        $gte: lat - latDelta,
        $lte: parseFloat(lat) + latDelta,
      },
      "location.lng": {
        $gte: lng - lngDelta,
        $lte: parseFloat(lng) + lngDelta,
      },
    });

    const severityWeight = { low: 5, medium: 10, high: 20 };
    let score = nearbyIncidents.reduce((total, incident) => {
      return total + (severityWeight[incident.severity] || 5);
    }, 0);

    // Night-time (10 PM - 5 AM) adds extra risk
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 5) {
      score += 15;
    }

    score = Math.min(score, 100);

    let riskLevel = "low";
    if (score >= 60) riskLevel = "high";
    else if (score >= 30) riskLevel = "medium";

    return { score, riskLevel, incidentCount: nearbyIncidents.length };
  } catch (error) {
    console.error("Error calculating risk score:", error.message);
    throw new Error("Failed to calculate risk score");
  }
};

// Ranks multiple route options (from mapService.getDirections) by risk score
const findSafestRoute = async (routes) => {
  try {
    const scoredRoutes = [];

    for (const route of routes) {
      const leg = route.legs[0];
      const midStep = leg.steps[Math.floor(leg.steps.length / 2)];
      const midLat = midStep.start_location.lat;
      const midLng = midStep.start_location.lng;

      const risk = await calculateRiskScore(midLat, midLng);

      scoredRoutes.push({
        route,
        riskScore: risk.score,
        riskLevel: risk.riskLevel,
      });
    }

    scoredRoutes.sort((a, b) => a.riskScore - b.riskScore);
    return scoredRoutes;
  } catch (error) {
    console.error("Error finding safest route:", error.message);
    throw new Error("Failed to evaluate route safety");
  }
};

module.exports = { calculateRiskScore, findSafestRoute };
