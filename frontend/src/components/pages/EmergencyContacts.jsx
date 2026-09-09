import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import ContactList from "../contacts/contactlist";
import ContactForm from "../contacts/contactform";
import { useAuth } from "../../hook/useAuth";
import { useGeolocation } from "../../hook/useGeolocation";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../../services/contactApi";
import { triggerSOS } from "../../services/sosApi";
import { updateLocation } from "../../services/locationApi";
import {
  AlertTriangleIcon,
  LogoutIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  StatsIcon,
} from "../common/Icons";

const SETTINGS_KEY = "safeher_settings";
const defaultSettings = {
  locationTracking: true,
  autoEmergencyAlerts: true,
  voiceCommand: false,
};

export default function EmergencyContacts() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getCurrentPosition } = useGeolocation();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [banner, setBanner] = useState(null);
  const [busy, setBusy] = useState(null);
  const [settings, setSettings] = useState(() => {
    try {
      return { ...defaultSettings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    refreshContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const refreshContacts = () => {
    setLoading(true);
    getContacts()
      .then(setContacts)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const showBanner = (type, text) => {
    setBanner({ type, text });
    setTimeout(() => setBanner(null), 3000);
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (contact) => {
    setEditing(contact);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateContact(editing._id, form);
        setContacts((cs) => cs.map((c) => (c._id === updated._id ? updated : c)));
      } else {
        const created = await addContact(form);
        setContacts((cs) => [...cs, created]);
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this trusted contact?")) return;
    setDeletingId(id);
    try {
      await deleteContact(id);
      setContacts((cs) => cs.filter((c) => c._id !== id));
    } catch (err) {
      showBanner("error", err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleQuickSOS = async () => {
    setBusy("sos");
    try {
      const coords = await getCurrentPosition();
      await triggerSOS({ lat: coords.lat, lng: coords.lng });
      showBanner("success", "SOS alert sent to your trusted circle.");
    } catch (err) {
      showBanner("error", err.message);
    } finally {
      setBusy(null);
    }
  };

  const handleQuickShare = async () => {
    setBusy("share");
    try {
      const coords = await getCurrentPosition();
      await updateLocation(coords);
      showBanner("success", "Location shared.");
    } catch (err) {
      showBanner("error", err.message);
    } finally {
      setBusy(null);
    }
  };

  const toggleSetting = (key) => (e) =>
    setSettings((s) => ({ ...s, [key]: e.target.checked }));

  return (
    <div>
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div
          className="avatar-fallback"
          style={{ width: 56, height: 56, fontSize: 20 }}
        >
          {user?.name?.[0]?.toUpperCase() || "?"}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: "0 0 3px", fontSize: 16.5, fontWeight: 800 }}>{user?.name}</h2>
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-secondary)" }}>{user?.email}</p>
          <span className="badge badge--success badge--dot" style={{ marginTop: 6 }}>
            Safe &amp; Protected
          </span>
        </div>
        <button className="icon-btn" onClick={logout} aria-label="Log out" title="Log out">
          <LogoutIcon width={17} height={17} />
        </button>
      </div>

      {banner && (
        <div className={`alert-banner alert-banner--${banner.type}`}>{banner.text}</div>
      )}

      <div className="action-row" style={{ marginBottom: 22 }}>
        <button className="action-square" style={{ background: "linear-gradient(155deg, var(--danger), var(--danger-strong))", boxShadow: "var(--shadow-danger)", flexDirection: "column", gap: 6 }} onClick={handleQuickSOS} disabled={busy === "sos"}>
          <AlertTriangleIcon />
          <span style={{ fontSize: 11, fontWeight: 700 }}>SOS</span>
        </button>
        <a className="action-square" style={{ background: "linear-gradient(155deg, var(--teal), var(--teal-dark))", boxShadow: "var(--shadow-teal)", flexDirection: "column", gap: 6 }} href="tel:112">
          <PhoneIcon />
          <span style={{ fontSize: 11, fontWeight: 700 }}>Quick Call</span>
        </a>
        <button className="action-square" style={{ background: "linear-gradient(155deg, var(--info), var(--info-dark))", boxShadow: "var(--shadow-info)", flexDirection: "column", gap: 6 }} onClick={handleQuickShare} disabled={busy === "share"}>
          <MapPinIcon />
          <span style={{ fontSize: 11, fontWeight: 700 }}>Share Location</span>
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className="section-title" style={{ margin: "0 0 12px" }}>Trusted Circle</h3>
        <button className="btn btn--sm btn--ghost" onClick={openAdd}>
          <PlusIcon width={14} height={14} /> Add
        </button>
      </div>
      {loading ? (
        <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Loading contacts...</p>
      ) : (
        <ContactList contacts={contacts} onEdit={openEdit} onDelete={handleDelete} deletingId={deletingId} />
      )}

      <h3 className="section-title">Safety Settings</h3>
      <div className="card">
        <div className="toggle-row">
          <div className="toggle-row__text">
            <h4>Location Tracking</h4>
            <p>Share location with your trusted circle</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={settings.locationTracking} onChange={toggleSetting("locationTracking")} />
            <span className="switch-track" />
          </label>
        </div>
        <div className="toggle-row">
          <div className="toggle-row__text">
            <h4>Auto Emergency Alerts</h4>
            <p>Send alerts automatically in dangerous situations</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={settings.autoEmergencyAlerts} onChange={toggleSetting("autoEmergencyAlerts")} />
            <span className="switch-track" />
          </label>
        </div>
        <div className="toggle-row">
          <div className="toggle-row__text">
            <h4>Voice Command</h4>
            <p>Activate safety features by voice (coming soon)</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={settings.voiceCommand} onChange={toggleSetting("voiceCommand")} disabled />
            <span className="switch-track" style={{ opacity: 0.5 }} />
          </label>
        </div>
      </div>

      {user?.role === "admin" && (
        <button className="btn btn--full btn--ghost" style={{ marginTop: 18 }} onClick={() => navigate("/admin")}>
          <StatsIcon width={16} height={16} /> Open Admin Dashboard
        </button>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit contact" : "Add trusted contact"}>
        <ContactForm
          initial={editing}
          submitting={saving}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
