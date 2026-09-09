import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import SOSButton from "../sos/SOSbutton";
import { SOSCallingOverlay } from "../sos/alertstatus";
import { useAuth } from "../../hook/useAuth";
import { useGeolocation } from "../../hook/useGeolocation";
import { getContacts } from "../../services/contactApi";
import { updateLocation } from "../../services/locationApi";
import { getSOSHistory, resolveSOS, triggerSOS } from "../../services/sosApi";
import { SocketContext } from "../../context/SocketContext";
import {
  ArrowRightIcon,
  BatteryIcon,
  CompassIcon,
  FlashlightIcon,
  MapPinIcon,
  ShieldIcon,
  SignalIcon,
  UsersIcon,
} from "../common/Icons";

const PLACEHOLDERS = [
  { key: "mom", name: "Mom", relation: "Family", hue: "linear-gradient(145deg,#7c6af7,#4c3bd4)" },
  { key: "sister", name: "Sister", relation: "Family", hue: "linear-gradient(145deg,#e8a4c4,#c45d8a)" },
  { key: "friend", name: "Best Friend", relation: "Circle", hue: "linear-gradient(145deg,#5b8cff,#3b5bdb)" },
  { key: "partner", name: "Partner", relation: "Trusted", hue: "linear-gradient(145deg,#1ecf96,#0f9f73)" },
];

const TIPS = [
  {
    icon: MapPinIcon,
    bg: "rgba(91,140,255,0.14)",
    color: "#3b5bdb",
    text: "Share your trip when traveling alone.",
  },
  {
    icon: UsersIcon,
    bg: "rgba(139,108,246,0.14)",
    color: "#6d4de8",
    text: "Keep your emergency contacts updated.",
  },
  {
    icon: CompassIcon,
    bg: "rgba(15,159,115,0.14)",
    color: "#0b7d5b",
    text: "Stay aware of your surroundings.",
  },
];

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
  const [safetyMode, setSafetyMode] = useState(true);
  const [sosSubmitting, setSosSubmitting] = useState(false);
  const [battery, setBattery] = useState(null);
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);

  const firstName = user?.name?.split(" ")[0] || "there";

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

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    let batteryRef = null;
    const readBattery = (b) => setBattery(Math.round(b.level * 100));
    if (navigator.getBattery) {
      navigator.getBattery().then((b) => {
        batteryRef = b;
        readBattery(b);
        b.addEventListener("levelchange", () => readBattery(b));
      }).catch(() => {});
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      if (batteryRef) batteryRef.removeEventListener("levelchange", () => readBattery(batteryRef));
    };
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

  const handleTriggerSos = async () => {
    setSosSubmitting(true);
    try {
      const coords = position || (await getCurrentPosition());
      const res = await triggerSOS({ lat: coords.lat, lng: coords.lng });
      setActiveAlert(res.sosAlert);
      showBanner("success", "SOS sent to your safety circle.");
    } catch (err) {
      showBanner("error", err.message || "Could not send SOS. Try again.");
    } finally {
      setSosSubmitting(false);
    }
  };

  const handleTestSos = () => {
    showBanner("success", "Test complete. Your SOS is armed and ready.");
  };

  const handleMarkSafe = async () => {
    try {
      if (activeAlert) {
        await resolveSOS(activeAlert._id);
        setActiveAlert(null);
      }
      setLastCheckIn(new Date());
      showBanner("success", "You're marked as safe.");
    } catch (err) {
      showBanner("error", err.message);
    }
  };

  const locationLabel = useMemo(() => {
    if (!position) return "Locating…";
    return `${position.lat.toFixed(3)}°, ${position.lng.toFixed(3)}°`;
  }, [position]);

  const circlePeople = contacts.length
    ? contacts.slice(0, 4).map((c, i) => ({
        key: c._id,
        name: c.name?.split(" ")[0] || "Contact",
        relation: c.relationship || c.relation || "Trusted",
        hue: PLACEHOLDERS[i % PLACEHOLDERS.length].hue,
        letter: c.name?.[0]?.toUpperCase() || "?",
      }))
    : PLACEHOLDERS.map((p) => ({ ...p, letter: p.name[0] }));

  return (
    <div className="home">
      {sosSubmitting && <SOSCallingOverlay contacts={contacts} />}

      <Navbar
        title={`Hello, ${firstName}`}
        subtitle="NARI SHIELD is watching over you"
        eyebrow="NARI SHIELD"
        avatarLetter={user?.name?.[0]?.toUpperCase() || "N"}
        onAction={() => {
          window.location.href = "tel:112";
        }}
      />

      {banner && (
        <div className={`alert-banner alert-banner--${banner.type === "error" ? "error" : "success"}`}>
          {banner.text}
        </div>
      )}

      {activeAlert && (
        <div className="alert-banner alert-banner--error" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Active SOS in progress.
          <button className="btn--link" style={{ marginLeft: "auto" }} onClick={() => navigate("/alerts")}>
            View
          </button>
          <button className="btn--link" onClick={handleMarkSafe}>
            I&apos;m safe
          </button>
        </div>
      )}

      <div className="home__grid">
        <section className="hero-sos reveal">
          <div className="hero-sos__copy">
            <div className="hero-sos__brand">
              <span className="hero-sos__brand-mark">
                <ShieldIcon width={12} height={12} />
              </span>
              Emergency
            </div>
            <h2>Your safety, one tap away.</h2>
            <p className="hero-sos__sub">Stay connected with the people who matter most.</p>
          </div>
          <div className="hero-sos__stage">
            <SOSButton onTrigger={handleTriggerSos} submitting={sosSubmitting} disabled={!!activeAlert} />
            <p className="hero-sos__hint">Press and hold for 3 seconds</p>
            <button type="button" className="hero-sos__test" onClick={handleTestSos}>
              Test SOS
            </button>
          </div>
        </section>

        <section className={`status-card reveal reveal-2 ${safetyMode ? "" : "is-off"}`}>
          <div className="status-card__head">
            <div className="status-card__live">
              <span className={`status-dot ${activeAlert ? "status-dot--alert" : ""}`} />
              <div>
                <h3>{activeAlert ? "SOS Active" : "You’re Safe"}</h3>
                <p>
                  {safetyMode
                    ? "Your safety system is active and monitoring."
                    : "Safety Mode is paused. Enable it to stay protected."}
                </p>
              </div>
            </div>
          </div>

          <div className="status-metrics">
            <div className="status-metric">
              <span>Location</span>
              <strong>{locationLabel}</strong>
            </div>
            <div className="status-metric">
              <span>GPS</span>
              <strong>{position ? "Locked" : "Searching"}</strong>
            </div>
            <div className="status-metric">
              <span>Battery</span>
              <strong>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <BatteryIcon width={14} height={14} />
                  {battery != null ? `${battery}%` : "—"}
                </span>
              </strong>
            </div>
            <div className="status-metric">
              <span>Network</span>
              <strong>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <SignalIcon width={14} height={14} />
                  {online ? "Connected" : "Offline"}
                </span>
              </strong>
            </div>
          </div>

          <p style={{ margin: "10px 2px 0", fontSize: 12, color: "var(--muted)" }}>
            Last location update · {lastCheckIn ? timeAgo(lastCheckIn) : sharing ? "Just now" : "Waiting for check-in"}
          </p>

          <div className={`status-toggle ${safetyMode ? "" : "is-off"}`}>
            <div>
              <h4>Safety Mode {safetyMode ? "ON" : "OFF"}</h4>
              <p>{safetyMode ? "Live monitoring enabled" : "Monitoring paused"}</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={safetyMode}
                onChange={(e) => setSafetyMode(e.target.checked)}
                aria-label="Toggle Safety Mode"
              />
              <span className="switch-track" />
            </label>
          </div>
        </section>
      </div>

      <h3 className="section-title reveal reveal-3">Quick actions</h3>
      <div className="qa-grid reveal reveal-3">
        <button className="qa-card qa-card--loc" onClick={handleShareLocation} disabled={busyAction === "share"}>
          <span className="qa-card__icon">
            <MapPinIcon width={18} height={18} />
          </span>
          <div>
            <h3>Live Location</h3>
            <p>Share your real-time location</p>
          </div>
          <div className="qa-card__cta">
            {busyAction === "share" ? "Sharing…" : "Share now"}
            <span className="qa-card__arrow">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </div>
        </button>

        <button className="qa-card qa-card--circle" onClick={() => navigate("/profile")}>
          <span className="qa-card__icon">
            <UsersIcon width={18} height={18} />
          </span>
          <div>
            <h3>Safety Circle</h3>
            <p>Manage trusted contacts</p>
          </div>
          <div className="qa-card__cta">
            Open circle
            <span className="qa-card__arrow">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </div>
        </button>

        <button className="qa-card qa-card--journey" onClick={() => navigate("/explore")}>
          <span className="qa-card__icon">
            <ShieldIcon width={18} height={18} />
          </span>
          <div>
            <h3>Safe Journey</h3>
            <p>Protect your trip</p>
          </div>
          <div className="qa-card__cta">
            Plan route
            <span className="qa-card__arrow">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </div>
        </button>

        <button className="qa-card qa-card--tools" onClick={() => navigate("/safety")}>
          <span className="qa-card__icon">
            <FlashlightIcon width={18} height={18} />
          </span>
          <div>
            <h3>Safety Tools</h3>
            <p>Access emergency tools</p>
          </div>
          <div className="qa-card__cta">
            Open tools
            <span className="qa-card__arrow">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </div>
        </button>
      </div>

      <section className="journey-card reveal reveal-4">
        <div className="journey-card__intro">
          <div>
            <h3>Going somewhere?</h3>
            <p>Let your safety circle know where you&apos;re headed.</p>
          </div>
        </div>
        <div className="journey-map" aria-hidden="true">
          <svg viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice">
            <g className="journey-map__drift">
              <rect width="640" height="260" fill="#d7e2de" />
              <path d="M0 40h640M0 90h640M0 140h640M0 190h640" stroke="#c5d2cd" strokeWidth="1" />
              <path d="M80 0v260M160 0v260M240 0v260M320 0v260M400 0v260M480 0v260M560 0v260" stroke="#c5d2cd" strokeWidth="1" />
              <rect x="40" y="30" width="90" height="60" rx="8" fill="#cfdcd6" />
              <rect x="170" y="70" width="120" height="80" rx="10" fill="#c4d4cc" />
              <rect x="430" y="20" width="140" height="70" rx="10" fill="#c9d8d1" />
              <rect x="500" y="150" width="90" height="70" rx="8" fill="#cfdcd6" />
              <rect x="60" y="160" width="150" height="55" rx="8" fill="#c3d3cb" />
              <path
                d="M120 170 C 180 160, 240 90, 340 110 S 470 70, 530 70"
                fill="none"
                stroke="#0f9f73"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="12 8"
              />
              <path
                d="M120 170 C 190 190, 280 150, 360 130 S 480 90, 530 70"
                fill="none"
                stroke="rgba(11,18,32,0.12)"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </g>
          </svg>
          <div className="journey-pin journey-pin--you">
            <span>You</span>
            <div className="journey-pin__dot" />
          </div>
          <div className="journey-pin journey-pin--dest">
            <div className="journey-pin__dot" />
            <span>Home</span>
          </div>
          <div className="journey-eta">ETA 14 min</div>
        </div>
        <button className="btn btn--primary btn--full journey-card__cta" onClick={() => navigate("/explore")}>
          Start Safe Journey
        </button>
      </section>

      <div className="circle-head reveal reveal-5">
        <h3 className="section-title" style={{ margin: 0 }}>
          Your Safety Circle
        </h3>
        <Link to="/profile">Manage</Link>
      </div>
      <div className="circle-row reveal reveal-5">
        {contactsLoading && <p style={{ color: "var(--muted)", fontSize: 13 }}>Loading circle…</p>}
        {!contactsLoading &&
          circlePeople.map((person) => (
            <div className="circle-card" key={person.key}>
              <div className="circle-card__avatar" style={{ background: person.hue }}>
                {person.letter}
                <span className="circle-card__status" />
              </div>
              <h4>{person.name}</h4>
              <p>{person.relation}</p>
            </div>
          ))}
        <button className="circle-card circle-card--add" onClick={() => navigate("/profile")}>
          <div className="circle-card__avatar">+</div>
          <h4>Add Contact</h4>
          <p>Expand circle</p>
        </button>
      </div>

      <h3 className="section-title reveal reveal-6">Smart Safety Tips</h3>
      <div className="tips-grid reveal reveal-6">
        {TIPS.map((tip) => (
          <div className="tip-card" key={tip.text}>
            <span className="tip-card__icon" style={{ background: tip.bg, color: tip.color }}>
              <tip.icon width={18} height={18} />
            </span>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>
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
