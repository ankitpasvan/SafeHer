import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Loader from "../common/Loader";
import { EmptyAlertState } from "../sos/alertstatus";
import { getSOSHistory, resolveSOS } from "../../services/sosApi";
import { getNearbyIncidents } from "../../services/incidentApi";
import { useGeolocation } from "../../hook/useGeolocation";
import {
  AlertTriangleIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
} from "../common/Icons";

const STATUS_BADGE = {
  active: "badge--danger",
  resolved: "badge--success",
  cancelled: "badge--neutral",
};

export default function Alerts() {
  const navigate = useNavigate();
  const { position, getCurrentPosition } = useGeolocation();
  const [history, setHistory] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState(null);
  const [tab, setTab] = useState("alerts");

  useEffect(() => {
    getSOSHistory()
      .then(setHistory)
      .catch(() => {})
      .finally(() => setLoading(false));
    getCurrentPosition().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (position) {
      getNearbyIncidents(position.lat, position.lng, 5)
        .then(setIncidents)
        .catch(() => {});
    }
  }, [position]);

  const handleResolve = async (id) => {
    setResolvingId(id);
    try {
      await resolveSOS(id);
      setHistory((h) => h.map((a) => (a._id === id ? { ...a, status: "resolved" } : a)));
    } catch {
      // surfaced via inline state below if needed
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div>
      <Navbar title="Alerts" subtitle="Your safety timeline" avatarLetter="A" />

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          className={`btn btn--sm ${tab === "alerts" ? "btn--primary" : "btn--ghost"}`}
          onClick={() => setTab("alerts")}
        >
          My SOS Alerts
        </button>
        <button
          className={`btn btn--sm ${tab === "incidents" ? "btn--primary" : "btn--ghost"}`}
          onClick={() => setTab("incidents")}
        >
          Nearby Incidents
        </button>
        <button
          className="btn btn--sm btn--ghost"
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/report")}
        >
          <PlusIcon width={14} height={14} /> Report
        </button>
      </div>

      {tab === "alerts" && (
        <>
          {loading && <Loader label="Loading your alerts..." />}
          {!loading && history.length === 0 && <EmptyAlertState />}
          {!loading &&
            history.map((alert) => (
              <div className="card" key={alert._id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span className={`badge ${STATUS_BADGE[alert.status]} badge--dot`}>{alert.status}</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <ClockIcon width={13} height={13} />
                    {new Date(alert.triggeredAt || alert.createdAt).toLocaleString([], {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
                {alert.location?.address && (
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-secondary)", display: "flex", gap: 6 }}>
                    <MapPinIcon width={14} height={14} /> {alert.location.address}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)" }}>
                  {alert.contactsNotified?.length || 0} contact(s) notified
                </p>
                {alert.status === "active" && (
                  <button
                    className="btn btn--ghost btn--sm"
                    style={{ marginTop: 10 }}
                    onClick={() => handleResolve(alert._id)}
                    disabled={resolvingId === alert._id}
                  >
                    {resolvingId === alert._id ? "Resolving..." : "Mark resolved"}
                  </button>
                )}
              </div>
            ))}
        </>
      )}

      {tab === "incidents" && (
        <>
          {incidents.length === 0 && (
            <div className="empty-state">
              <AlertTriangleIcon />
              <p>No incidents reported near you recently.</p>
            </div>
          )}
          {incidents.map((inc) => (
            <div className="card" key={inc._id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span className="badge badge--warning">{inc.category?.replace("_", " ")}</span>
                <span className="badge badge--neutral" style={{ marginLeft: "auto" }}>{inc.severity} severity</span>
              </div>
              <p style={{ margin: "0 0 6px", fontSize: 13.5 }}>{inc.description}</p>
              {inc.location?.address && (
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)" }}>{inc.location.address}</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
