import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import MapView from "../map/Mapview";
import Emergency from "../contacts/Emergency";
import { useAuth } from "../../hook/useAuth";
import { useGeolocation } from "../../hook/useGeolocation";
import { getContacts } from "../../services/contactApi";
import { updateLocation } from "../../services/locationApi";
import { getSOSHistory, resolveSOS } from "../../services/sosApi";
import { SocketContext } from "../../context/SocketContext";
import {
  AlertTriangleIcon,
  CheckIcon,
  MapPinIcon,
  MicIcon,
} from "../common/Icons";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { position, getCurrentPosition } = useGeolocation();
  const { emitLocationUpdate } = useContext(SocketContext);

  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);
  const [banner, setBanner] = useState(null);
  const [busyAction, setBusyAction] = useState(null);

  useEffect(() => {
    getCurrentPosition().catch(() => {});
    getContacts()
      .then(setContacts)
      .catch(() => {})
      .finally(() => setContactsLoading(false));
    getSOSHistory()
      .then((history) => setActiveAlert(history.find((a) => a.status === "active") || null))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showBanner = (type, text) => {
    setBanner({ type, text });
    setTimeout(() => setBanner(null), 3500);
  };

  const handleShareLocation = async () => {
    setBusyAction("share");
    try {
      const coords = position || (await getCurrentPosition());
      await updateLocation(coords);
      emitLocationUpdate(coords.lat, coords.lng, contacts.map((c) => c._id));
      setSharing(true);
      setLastCheckIn(new Date());
      showBanner("success", "Live location shared with your trusted circle.");
    } catch (err) {
      showBanner("error", err.message || "Could not share your location.");
    } finally {
      setBusyAction(null);
    }
  };

  const handleMarkSafe = async () => {
    setBusyAction("safe");
    try {
      if (activeAlert) {
        await resolveSOS(activeAlert._id);
        setActiveAlert(null);
      }
      setLastCheckIn(new Date());
      showBanner("success", "You're marked as safe.");
    } catch (err) {
      showBanner("error", err.message);
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <div>
      <Navbar
        title={`Hello, ${user?.name?.split(" ")[0] || "there"}`}
        subtitle="Stay safe"
        avatarLetter={user?.name?.[0]?.toUpperCase() || "S"}
        onAction={() => (window.location.href = "tel:112")}
      />

      {banner && (
        <div className={`alert-banner alert-banner--${banner.type === "error" ? "error" : "success"}`}>
          {banner.text}
        </div>
      )}

      {activeAlert && (
        <div className="alert-banner alert-banner--error" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangleIcon width={16} height={16} />
          You have an active SOS alert.
          <button
            className="btn--link"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate("/alerts")}
          >
            View
          </button>
        </div>
      )}

      <MapView center={position} markers={[]} height={200} />

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14.5, fontWeight: 700 }}>Safety Status</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Row label="Location sharing" value={sharing ? "Active" : "Off"} valueColor={sharing ? "var(--success)" : undefined} />
          <Row label="Trusted circle" value={`${contacts.length} contact${contacts.length === 1 ? "" : "s"}`} />
          <Row
            label="Last check-in"
            value={lastCheckIn ? timeAgo(lastCheckIn) : "Not yet today"}
          />
        </div>
      </div>

      <h3 className="section-title">Quick Actions</h3>
      <div className="tile-grid">
        <button className="tile tile--info" onClick={handleShareLocation} disabled={busyAction === "share"}>
          <MapPinIcon />
          {busyAction === "share" ? "Sharing..." : "Share Location"}
        </button>
        <button className="tile tile--teal" onClick={handleMarkSafe} disabled={busyAction === "safe"}>
          <CheckIcon />
          {busyAction === "safe" ? "Updating..." : "Mark Safe"}
        </button>
        <button className="tile tile--danger" onClick={() => navigate("/safety")}>
          <AlertTriangleIcon />
          SOS Alert
        </button>
        <button className="tile tile--danger" onClick={() => navigate("/profile")} style={{ opacity: 0.9 }}>
          <MicIcon />
          Voice Command
        </button>
      </div>

      <div style={{ marginTop: 22 }}>
        <Emergency contacts={contacts} loading={contactsLoading} />
      </div>
    </div>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ fontWeight: 700, color: valueColor }}>{value}</span>
    </div>
  );
}

function timeAgo(date) {
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} mins ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
}
