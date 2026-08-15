import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SOSButton from "../sos/SOSbutton";
import { SOSCallingOverlay, ActiveAlertCard } from "../sos/alertstatus";
import MapView from "../map/Mapview";
import Emergency from "../contacts/Emergency";
import { useGeolocation } from "../../hook/useGeolocation";
import { getContacts } from "../../services/contactApi";
import { triggerSOS, getSOSHistory, resolveSOS } from "../../services/sosApi";
import { PhoneIcon, MapPinIcon, MicIcon } from "../common/Icons";

// The dedicated "Safety" tab: press-and-hold SOS trigger, quick actions,
// and current alert / emergency contact context -- mirrors the reference
// SOS screen.
export default function Dashboard() {
  const navigate = useNavigate();
  const { position, getCurrentPosition } = useGeolocation();
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null);
  const [error, setError] = useState("");
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    getCurrentPosition().catch(() => {});
    getContacts().then(setContacts).catch(() => {}).finally(() => setContactsLoading(false));
    refreshActiveAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshActiveAlert = () => {
    getSOSHistory()
      .then((history) => setActiveAlert(history.find((a) => a.status === "active") || null))
      .catch(() => {});
  };

  const handleTrigger = async () => {
    setError("");
    setSubmitting(true);
    try {
      const coords = position || (await getCurrentPosition());
      const res = await triggerSOS({ lat: coords.lat, lng: coords.lng });
      setActiveAlert(res.sosAlert);
    } catch (err) {
      setError(err.message || "Could not send SOS alert. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async (id) => {
    setResolving(true);
    try {
      await resolveSOS(id);
      setActiveAlert(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setResolving(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {submitting && <SOSCallingOverlay contacts={contacts} />}

      <h2 style={{ margin: "10px 0 6px", fontSize: 19, fontWeight: 800 }}>Are you in danger?</h2>
      <p style={{ margin: "0 0 22px", fontSize: 13, color: "var(--text-secondary)", maxWidth: 300, marginInline: "auto" }}>
        Hold the SOS button for 1.5 seconds. Your live location and an alert will be sent to your trusted contacts instantly.
      </p>

      {error && <div className="alert-banner alert-banner--error" style={{ textAlign: "left" }}>{error}</div>}

      <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 26px" }}>
        <SOSButton onTrigger={handleTrigger} submitting={submitting} disabled={!!activeAlert} />
      </div>

      <div className="action-row" style={{ marginBottom: 26 }}>
        <a className="action-square" style={{ background: "linear-gradient(155deg, var(--teal), var(--teal-dark))", boxShadow: "var(--shadow-teal)" }} href="tel:112">
          <PhoneIcon />
        </a>
        <button
          className="action-square"
          style={{ background: "linear-gradient(155deg, var(--info), var(--info-dark))", boxShadow: "var(--shadow-info)" }}
          onClick={() => navigate("/explore")}
        >
          <MapPinIcon />
        </button>
        <button
          className="action-square"
          style={{ background: "linear-gradient(155deg, var(--danger), var(--danger-strong))", boxShadow: "var(--shadow-danger)" }}
          onClick={() => navigate("/profile")}
        >
          <MicIcon />
        </button>
      </div>

      <div style={{ textAlign: "left" }}>
        {activeAlert && (
          <ActiveAlertCard alert={activeAlert} onResolve={handleResolve} resolving={resolving} />
        )}

        <Emergency contacts={contacts} loading={contactsLoading} />

        <h3 className="section-title">Current Location</h3>
        <div className="card card--tight" style={{ marginBottom: 10 }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--text-secondary)" }}>
            {position ? `${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}` : "Locating you..."}
          </p>
          <MapView center={position} height={160} />
        </div>
      </div>
    </div>
  );
}
