import { HospitalIcon, MapPinIcon, PoliceIcon } from "../common/Icons";

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Ranked list of nearby police stations / hospitals, sorted by distance from
// the user's current position. (Turn-by-turn safe-route directions aren't
// available yet -- the backend's routing provider isn't configured -- so this
// focuses on the part of the feature that already works well: knowing where
// the nearest help actually is.)
export default function RouteSuggestions({ origin, places = [], type = "police", loading }) {
  const Icon = type === "hospital" ? HospitalIcon : PoliceIcon;

  const ranked = origin
    ? [...places]
        .map((p) => ({
          ...p,
          distanceKm: p.lat && p.lng ? haversineKm(origin.lat, origin.lng, p.lat, p.lng) : null,
        }))
        .sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999))
    : places;

  if (loading) {
    return <p style={{ fontSize: 12.5, color: "var(--text-tertiary)" }}>Searching nearby...</p>;
  }

  if (ranked.length === 0) {
    return (
      <div className="empty-state">
        <MapPinIcon />
        <p>No nearby {type === "hospital" ? "hospitals" : "police stations"} found.</p>
      </div>
    );
  }

  return (
    <div>
      {ranked.slice(0, 8).map((p, i) => (
        <div className="contact-row" key={i}>
          <div
            className="tile--icon-wrap"
            style={{ background: type === "hospital" ? "rgba(43,159,216,0.18)" : "rgba(22,184,166,0.18)" }}
          >
            <Icon width={18} height={18} color={type === "hospital" ? "var(--info)" : "var(--teal)"} />
          </div>
          <div className="contact-row__info">
            <h4>{p.name || "Unnamed location"}</h4>
            <p>
              {p.address || "Address unavailable"}
              {p.distanceKm != null && ` \u00b7 ${p.distanceKm.toFixed(1)} km away`}
            </p>
          </div>
          {p.lat && p.lng && (
            <a
              className="icon-btn"
              href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Get directions"
            >
              <MapPinIcon width={15} height={15} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
