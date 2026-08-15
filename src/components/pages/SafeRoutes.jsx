import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../map/Mapview";
import RouteSuggestions from "../map/routesuggestions";
import { useGeolocation } from "../../hook/useGeolocation";
import { getNearbyPolice, getNearbyHospitals, getRiskScore } from "../../services/mapApi";
import { ChevronLeftIcon, RefreshIcon } from "../common/Icons";

const RISK_COLOR = { low: "badge--success", medium: "badge--warning", high: "badge--danger" };

export default function SafeRoutes() {
  const navigate = useNavigate();
  const { position, getCurrentPosition, loading: locating } = useGeolocation();
  const [type, setType] = useState("police");
  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    getCurrentPosition().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!position) return;
    setPlacesLoading(true);
    const fetcher = type === "hospital" ? getNearbyHospitals : getNearbyPolice;
    fetcher(position.lat, position.lng)
      .then(setPlaces)
      .catch(() => setPlaces([]))
      .finally(() => setPlacesLoading(false));

    getRiskScore(position.lat, position.lng)
      .then(setRisk)
      .catch(() => setRisk(null));
  }, [position, type]);

  return (
    <div>
      <div className="topbar" style={{ paddingLeft: 0 }}>
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ChevronLeftIcon width={18} height={18} />
        </button>
        <div className="topbar__greeting">
          <h1>Nearby Help</h1>
          <p>Police, hospitals &amp; area risk</p>
        </div>
        <button className="icon-btn" onClick={() => getCurrentPosition()} aria-label="Refresh location">
          <RefreshIcon width={17} height={17} />
        </button>
      </div>

      <MapView
        center={position}
        markers={places.filter((p) => p.lat && p.lng).map((p) => ({ lat: p.lat, lng: p.lng, label: p.name, color: type === "hospital" ? "#2b9fd8" : "#16b8a6" }))}
        height={220}
      />

      {risk && (
        <div className="card" style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h4 style={{ margin: "0 0 3px", fontSize: 13.5 }}>Area risk level</h4>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)" }}>
              Based on {risk.incidentCount} nearby report{risk.incidentCount === 1 ? "" : "s"}
            </p>
          </div>
          <span className={`badge ${RISK_COLOR[risk.riskLevel] || "badge--neutral"}`}>{risk.riskLevel}</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, margin: "18px 0 14px" }}>
        <button className={`btn btn--sm ${type === "police" ? "btn--primary" : "btn--ghost"}`} onClick={() => setType("police")}>
          Police
        </button>
        <button className={`btn btn--sm ${type === "hospital" ? "btn--primary" : "btn--ghost"}`} onClick={() => setType("hospital")}>
          Hospitals
        </button>
      </div>

      <RouteSuggestions origin={position} places={places} type={type} loading={placesLoading || locating} />
    </div>
  );
}
