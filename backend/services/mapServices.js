const axios = require("axios");

const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

const MAPTILER_BASE_URL = "https://api.maptiler.com";

// ===============================
// Geocode address -> coordinates
// ===============================
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `${MAPTILER_BASE_URL}/geocoding/${encodeURIComponent(address)}.json`,
      {
        params: {
          key: MAPTILER_API_KEY,
        },
      },
    );

    const feature = response.data.features?.[0];

    if (!feature) {
      throw new Error("Address not found");
    }

    return {
      lat: feature.center[1],
      lng: feature.center[0],
      formattedAddress: feature.place_name,
    };
  } catch (error) {
    console.error("MapTiler geocoding error:", error.message);

    throw new Error("Failed to geocode address");
  }
};

// =================================
// Reverse geocode coordinates
// =================================
const reverseGeocode = async (lat, lng) => {
  try {
    const response = await axios.get(
      `${MAPTILER_BASE_URL}/geocoding/${lng},${lat}.json`,
      {
        params: {
          key: MAPTILER_API_KEY,
        },
      },
    );

    const feature = response.data.features?.[0];

    if (!feature) {
      throw new Error("Location not found");
    }

    return {
      address: feature.place_name,
      lat,
      lng,
    };
  } catch (error) {
    console.error("Reverse geocode error:", error.message);

    throw new Error("Failed reverse geocoding");
  }
};

// =================================
// Get nearby places
// NOTE:
// MapTiler does not provide Google Places equivalent.
// Use OpenStreetMap Overpass API here.
// =================================

const getNearbyPlaces = async (lat, lng, type = "police", radius = 5000) => {
  try {
    const query = `
      [out:json];
      (
        node["amenity"="${type}"]
        (around:${radius},${lat},${lng});

        way["amenity"="${type}"]
        (around:${radius},${lat},${lng});
      );

      out center;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );

    return response.data.elements.map((place) => ({
      name: place.tags?.name || "Unknown",

      lat: place.lat || place.center?.lat,

      lng: place.lon || place.center?.lon,

      address: place.tags?.["addr:street"] || null,
    }));
  } catch (error) {
    console.error("Nearby places error:", error.message);

    throw new Error("Failed to fetch nearby places");
  }
};

// =================================
// Directions
// MapTiler does not provide routing.
// Use OpenRouteService here.
// =================================

const getDirections = async (originLat, originLng, destLat, destLng) => {
  throw new Error(
    "Routing is not available in MapTiler. Use OpenRouteService or GraphHopper.",
  );
};

module.exports = {
  geocodeAddress,
  reverseGeocode,
  getNearbyPlaces,
  getDirections,
};
