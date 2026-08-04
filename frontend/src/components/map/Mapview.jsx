import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;

const TILE_URL = MAPTILER_KEY
  ? `https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`
  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function makeDivIcon(color = "#16b8a6", pulse = false) {
  return L.divIcon({
    className: "",
    html: `<div style="
        width:16px;height:16px;border-radius:50%;
        background:${color};
        box-shadow:0 0 0 4px ${color}33, 0 2px 6px rgba(0,0,0,0.4);
        ${pulse ? "animation:mapPulse 1.6s ease-out infinite;" : ""}
      "></div>
      <style>@keyframes mapPulse{0%{box-shadow:0 0 0 4px ${color}33;}70%{box-shadow:0 0 0 14px ${color}00;}100%{box-shadow:0 0 0 4px ${color}00;}}</style>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center?.lat, center?.lng]);
  return null;
}

// Reusable Leaflet map on MapTiler dark tiles.
// markers: [{ lat, lng, label, color, pulse }]
export default function MapView({ center, zoom = 14, markers = [], height = 220 }) {
  if (!center) {
    return (
      <div
        className="card"
        style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Waiting for your location...</p>
      </div>
    );
  }

  return (
    <div style={{ height, borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--surface-border)" }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url={TILE_URL} />
        <Recenter center={center} />
        <Marker position={[center.lat, center.lng]} icon={makeDivIcon("#16b8a6", true)}>
          <Popup>You are here</Popup>
        </Marker>
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={makeDivIcon(m.color || "#ef4462")}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
