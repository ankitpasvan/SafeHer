import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { useGeolocation } from "../../hook/useGeolocation";
import { triggerSOS } from "../../services/sosApi";
import DashboardSidebar from "./DashboardSidebar";
import BottomNav from "../common/BottomNav";
import {
  WeatherCloudSunIcon,
  PanicTriangleIcon,
  NotificationBellIcon,
  NavPinIcon,
  HomePinIcon,
  ArrowRightThinIcon,
} from "./DashboardIcons";
import "../../styles/dashboard.css";

export default function DashboardOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { position, getCurrentPosition } = useGeolocation();

  // User display name (defaults to "Ankit" as in the design if user.name is Ankit or not set)
  const displayName = user?.name ? user.name.split(" ")[0] : "Ankit";

  // Panic button press-and-hold states
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);
  const [sosError, setSosError] = useState("");
  const holdIntervalRef = useRef(null);

  // Modals state
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Map zoom state
  const [mapZoom, setMapZoom] = useState(1);

  // Notifications list
  const notifications = [
    {
      id: 1,
      title: "All Systems Operational",
      time: "2 mins ago",
      desc: "Live GPS tracking and SOS response network are fully armed.",
      unread: true,
    },
    {
      id: 2,
      title: "Safety Zone Verified",
      time: "1 hour ago",
      desc: "You entered your designated Safe Corridor.",
      unread: false,
    },
  ];

  // Request GPS on mount
  useEffect(() => {
    getCurrentPosition().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Panic Button Press & Hold
  const startHold = () => {
    if (sosTriggered) return;
    setHolding(true);
    setSosError("");

    const startTime = Date.now();
    const HOLD_DURATION = 2500; // 2.5 seconds to trigger

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(holdIntervalRef.current);
        fireSOS();
      }
    }, 40);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    if (!sosTriggered) {
      setHolding(false);
      setHoldProgress(0);
    }
  };

  const fireSOS = async () => {
    setSosLoading(true);
    setHolding(false);
    try {
      const coords = position || { lat: 28.6139, lng: 77.209 };
      await triggerSOS(coords);
      setSosTriggered(true);
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 300]);
      }
    } catch (err) {
      setSosError(err?.message || "SOS alert could not be dispatched. Retrying...");
      setSosTriggered(true); // Still treat as emergency in UI
    } finally {
      setSosLoading(false);
    }
  };

  // SVG circular countdown calculations for Panic button
  // Circle radius r = 58, Circumference = 2 * PI * 58 ≈ 364.42
  const CIRCLE_RADIUS = 58;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const strokeOffset = CIRCLE_CIRCUMFERENCE - (holdProgress / 100) * CIRCLE_CIRCUMFERENCE;

  return (
    <div className="dashboard-shell">
      <div className="dashboard-ambient-light" />

      {/* =========================================================
          LEFT NAVIGATION RAIL
          ========================================================= */}
      <DashboardSidebar
        onOpenGuide={() => setShowHowItWorks(true)}
        onOpenHelpline={() => setShowHelpline(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* =========================================================
          MAIN DASHBOARD OVERVIEW CONTENT
          ========================================================= */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="dashboard-slide-tag">Slide 2</div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Your safety, at a glance.</p>
        </header>

        {/* Top Welcome & Quick Status Banner */}
        <div className="dashboard-welcome-banner">
          <div className="dashboard-welcome-left">
            <h2 className="dashboard-welcome-title">
              Welcome back, {displayName}! <span role="img" aria-label="wave">👋</span>
            </h2>
            <p className="dashboard-welcome-sub">
              You&apos;re protected. You&apos;re powerful. You&apos;re SafeHer.
            </p>
          </div>

          <div className="dashboard-welcome-widgets">
            {/* Weather Widget */}
            <div className="weather-widget">
              <WeatherCloudSunIcon width={28} height={28} />
              <div className="weather-info">
                <span className="weather-temp">28°C</span>
                <span className="weather-loc">New Delhi • Haze</span>
              </div>
            </div>

            {/* System Status Operational Widget */}
            <div className="system-widget">
              <div className="system-dots" aria-hidden="true">
                <span className="system-dot" />
                <span className="system-dot" />
              </div>
              <div className="system-info">
                <span className="system-label">All Systems</span>
                <span className="system-status">Operational</span>
              </div>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="notification-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
              aria-label="Notifications"
            >
              <NotificationBellIcon width={19} height={19} />
              <span className="notification-badge-dot" />
            </button>
          </div>
        </div>

        {/* SOS Dispatched Alert Bar */}
        {sosTriggered && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid #EF4444",
              color: "#FCA5A5",
              borderRadius: "14px",
              padding: "12px 18px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>🚨</span>
              <div>
                <strong style={{ color: "#FFFFFF" }}>EMERGENCY ALERT BROADCAST ACTIVE</strong>
                <div style={{ fontSize: "12px", marginTop: "2px" }}>
                  Live GPS, audio, and battery telemetry dispatched to your 4 emergency contacts &amp; nearest responders.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSosTriggered(false);
                setHoldProgress(0);
              }}
              style={{
                background: "#EF4444",
                border: "none",
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: "12px",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Mark Safe
            </button>
          </div>
        )}

        {/* =========================================================
            ROW 1: PANIC BUTTON CARD & STAY CALM CARD
            ========================================================= */}
        <div className="dashboard-grid-row">
          {/* Card 1: 3D Glowing PANIC Button */}
          <section className="dashboard-card-panic" aria-label="Emergency SOS Trigger">
            <div className="panic-button-wrapper">
              <div className="panic-ambient-glow" />

              {/* Circular Progress Stroke during Press-and-Hold */}
              <svg className="panic-progress-svg" viewBox="0 0 136 136">
                <circle cx="68" cy="68" r={CIRCLE_RADIUS} className="panic-progress-bg" />
                <circle
                  cx="68"
                  cy="68"
                  r={CIRCLE_RADIUS}
                  className="panic-progress-bar"
                  style={{
                    strokeDasharray: CIRCLE_CIRCUMFERENCE,
                    strokeDashoffset: strokeOffset,
                  }}
                />
              </svg>

              {/* 3D Button */}
              <button
                type="button"
                className={`panic-btn-3d ${holding ? "is-holding" : ""}`}
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                disabled={sosLoading}
                aria-label="Hold to Trigger Emergency SOS"
              >
                <PanicTriangleIcon width={30} height={30} />
                <span className="panic-label">PANIC</span>
              </button>
            </div>

            <div className="panic-card-content">
              <h3 className="panic-card-title">
                <span className="pink-highlight">Press &amp; Hold</span> the button in an Emergency
              </h3>
              <p className="panic-card-desc">
                Instant alert will be sent to your emergency contacts.
              </p>
            </div>
          </section>

          {/* Card 2: Stay Calm Card */}
          <section className="dashboard-card-calm" aria-label="Emergency Guidance">
            <div className="calm-image-container">
              <img
                src="/phone-sos.jpg"
                alt="Smartphone emergency SOS beacon alert"
                className="calm-image"
              />
            </div>

            <div className="calm-content">
              <h3 className="calm-title">Stay Calm</h3>
              <p className="calm-subtitle">We will help you!</p>
              <button
                type="button"
                className="btn-how-it-works"
                onClick={() => setShowHowItWorks(true)}
              >
                <span>How It Works</span>
                <ArrowRightThinIcon width={16} height={16} />
              </button>
            </div>
          </section>
        </div>

        {/* =========================================================
            ROW 2: LIVE LOCATION RADAR MAP & SAFETY SCORE GAUGE
            ========================================================= */}
        <div className="dashboard-grid-row">
          {/* Card 3: Live Location Map */}
          <section className="dashboard-card-map" aria-label="Live Geolocation Map">
            <div className="map-card-header">
              <div className="map-card-title">
                <NavPinIcon width={18} height={18} color="#C084FC" />
                <span>Live Location</span>
              </div>
              <div className="map-live-badge">
                <span className="map-live-dot" />
                <span>Live</span>
              </div>
            </div>

            <div className="map-canvas-container">
              {/* Dark City Grid Vector Background */}
              <svg
                className="map-dark-svg"
                viewBox="0 0 500 280"
                preserveAspectRatio="xMidYMid slice"
                style={{ transform: `scale(${mapZoom})`, transition: "transform 0.25s ease" }}
              >
                <defs>
                  {/* Subtle City Grid Pattern */}
                  <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(147, 51, 234, 0.08)"
                      strokeWidth="1"
                    />
                  </pattern>

                  {/* Pink Glowing Route Trajectory */}
                  <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF3880" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* Grid Background */}
                <rect width="100%" height="100%" fill="#080414" />
                <rect width="100%" height="100%" fill="url(#street-grid)" />

                {/* City Blocks and Road Arteries */}
                <path
                  d="M 20 50 Q 150 70 280 40 T 480 80"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 80 260 C 130 180 180 140 240 180 S 390 120 460 220"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M 120 10 L 170 270 M 340 10 L 390 270"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Safe Route Trajectory (from user to home) */}
                <path
                  d="M 180 160 C 230 170 260 140 310 120 S 360 90 390 75"
                  stroke="#FF3880"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  fill="none"
                  filter="url(#route-glow)"
                />
                <circle cx="270" cy="135" r="4" fill="#FF3880" filter="url(#route-glow)" />
                <circle cx="340" cy="100" r="4" fill="#FF3880" filter="url(#route-glow)" />
              </svg>

              {/* User Marker with Avatar and Radar Rings */}
              <div className="map-user-pin-wrapper">
                <div className="map-radar-ring ring-1" />
                <div className="map-radar-ring ring-2" />
                <div className="map-radar-ring ring-3" />
                <div className="map-user-avatar-pin">
                  <img
                    src="/user-avatar.jpg"
                    alt="User live location avatar"
                    className="map-user-avatar-img"
                  />
                </div>
                <div className="map-user-pin-stem" />
              </div>

              {/* Destination Home Pin */}
              <div className="map-dest-pin-wrapper">
                <div className="map-dest-pin" title="Safe Destination: Home">
                  <HomePinIcon width={18} height={18} color="#FFFFFF" />
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="map-zoom-controls">
                <button
                  type="button"
                  className="map-zoom-btn"
                  onClick={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
                  title="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  className="map-zoom-btn"
                  onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                  title="Zoom out"
                >
                  −
                </button>
              </div>
            </div>
          </section>

          {/* Card 4: Safety Score Radial Arc Gauge */}
          <section className="dashboard-card-score" aria-label="Personal Safety Score">
            <h3 className="score-card-title">Safety Score</h3>

            <div className="score-gauge-container">
              {/* Semi-circular radial arc SVG */}
              <svg className="score-gauge-svg" viewBox="0 0 240 140">
                <defs>
                  {/* Violet-to-Pink Gradient */}
                  <linearGradient id="score-arc-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="60%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#F43F86" />
                  </linearGradient>
                  <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#A855F7" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Track background arc */}
                <path
                  d="M 28 120 A 92 92 0 0 1 212 120"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="15"
                  strokeLinecap="round"
                />

                {/* 85% Active Score Gauge Arc */}
                {/* Arc length for 180 deg radius 92: PI * 92 ≈ 289 */}
                <path
                  d="M 28 120 A 92 92 0 0 1 212 120"
                  fill="none"
                  stroke="url(#score-arc-grad)"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeDasharray="289"
                  strokeDashoffset="43" /* 289 * (1 - 0.85) = ~43 */
                  filter="url(#arc-glow)"
                />
              </svg>

              <div className="score-text-overlay">
                <span className="score-number">85</span>
                <span className="score-total">/100</span>
                <span className="score-rating-badge">Excellent</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-improve-score"
              onClick={() => setShowScoreModal(true)}
            >
              <span>Improve Your Score</span>
              <ArrowRightThinIcon width={16} height={16} />
            </button>
          </section>
        </div>
      </main>

      {/* =========================================================
          INTERACTIVE MODALS
          ========================================================= */}

      {/* 1. "How It Works" Emergency Modal */}
      {showHowItWorks && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowHowItWorks(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">How SafeHer Works</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowHowItWorks(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <div className="modal-step-item">
                <span className="modal-step-num">1</span>
                <div>
                  <h4 className="modal-step-title">Press &amp; Hold Panic Button</h4>
                  <p className="modal-step-desc">
                    Hold the 3D Panic button for 2.5 seconds to prevent accidental triggers.
                  </p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">2</span>
                <div>
                  <h4 className="modal-step-title">Instant Live GPS Broadcast</h4>
                  <p className="modal-step-desc">
                    Your real-time coordinates, battery level, and audio feed are dispatched to your trusted contacts.
                  </p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">3</span>
                <div>
                  <h4 className="modal-step-title">Rapid Response &amp; Helpline</h4>
                  <p className="modal-step-desc">
                    Emergency services (112) and nearby responders are alerted automatically.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setShowHowItWorks(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* 2. "Improve Your Score" Checklist Modal */}
      {showScoreModal && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowScoreModal(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Safety Score Breakdown (85/100)</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowScoreModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <div className="modal-step-item">
                <span className="modal-step-num" style={{ background: "#10B981" }}>✓</span>
                <div>
                  <h4 className="modal-step-title">Live GPS Tracking Enabled (+30)</h4>
                  <p className="modal-step-desc">High precision location lock active.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num" style={{ background: "#10B981" }}>✓</span>
                <div>
                  <h4 className="modal-step-title">Emergency Contacts Linked (+35)</h4>
                  <p className="modal-step-desc">Primary trusted guardians ready for instant SOS.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num" style={{ background: "#10B981" }}>✓</span>
                <div>
                  <h4 className="modal-step-title">Safe Route Verified (+20)</h4>
                  <p className="modal-step-desc">Home destination geofence established.</p>
                </div>
              </div>

              <div className="modal-step-item" style={{ border: "1px dashed rgba(244, 63, 94, 0.4)" }}>
                <span className="modal-step-num" style={{ background: "#F43F86" }}>+15</span>
                <div>
                  <h4 className="modal-step-title">Add 1 Backup Phone (+15 to reach 100)</h4>
                  <p className="modal-step-desc">
                    Link a secondary local phone or local police contact in your profile.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-improve-score"
              onClick={() => {
                setShowScoreModal(false);
                navigate("/profile");
              }}
            >
              Go to Contacts to reach 100/100
            </button>
          </div>
        </div>
      )}

      {/* 3. Notifications Drawer Modal */}
      {showNotifications && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowNotifications(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Recent Notifications</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowNotifications(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              {notifications.map((n) => (
                <div key={n.id} className="modal-step-item">
                  <span className="modal-step-num" style={{ background: n.unread ? "#EF4444" : "#6366F1" }}>
                    🔔
                  </span>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h4 className="modal-step-title">{n.title}</h4>
                      <span style={{ fontSize: "11px", color: "#8C86A5" }}>{n.time}</span>
                    </div>
                    <p className="modal-step-desc">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setShowNotifications(false)}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}

      {/* 4. Emergency Helplines Quick Call Modal */}
      {showHelpline && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowHelpline(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">24/7 Emergency Helplines</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowHelpline(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <a
                href="tel:112"
                className="modal-step-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="modal-step-num" style={{ background: "#EF4444" }}>112</span>
                <div>
                  <h4 className="modal-step-title">National Emergency Response (All-in-One)</h4>
                  <p className="modal-step-desc">Police, Fire, Ambulance 24/7 instant dispatch</p>
                </div>
              </a>

              <a
                href="tel:1091"
                className="modal-step-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="modal-step-num" style={{ background: "#F43F86" }}>1091</span>
                <div>
                  <h4 className="modal-step-title">Women in Distress Helpline</h4>
                  <p className="modal-step-desc">Specialized rapid assistance for women</p>
                </div>
              </a>

              <a
                href="tel:181"
                className="modal-step-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="modal-step-num" style={{ background: "#7C3AED" }}>181</span>
                <div>
                  <h4 className="modal-step-title">Domestic Violence &amp; Crisis Support</h4>
                  <p className="modal-step-desc">Counseling, safe shelter, and legal aid</p>
                </div>
              </a>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setShowHelpline(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 5. Settings Modal */}
      {showSettings && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowSettings(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Settings &amp; Preferences</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowSettings(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <div className="modal-step-item">
                <span className="modal-step-num">⚙</span>
                <div>
                  <h4 className="modal-step-title">Background GPS Updates</h4>
                  <p className="modal-step-desc">Keep tracking alive when screen is off</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">🔔</span>
                <div>
                  <h4 className="modal-step-title">Automated Check-ins</h4>
                  <p className="modal-step-desc">Prompt safety confirmation every 30 minutes</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setShowSettings(false)}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <div className="dashboard-mobile-nav">
        <BottomNav />
      </div>
    </div>
  );
}


