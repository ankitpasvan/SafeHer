import { useState, useEffect } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import { useGeolocation } from "../../hook/useGeolocation";
import {
  ShareNodesIcon,
  TrackingShieldIcon,
  AccuracyTargetIcon,
  ClockHistoryIcon,
  HomeBadgeIcon,
} from "./TrackingIcons";
import "../../styles/tracking.css";

export default function LiveTracking() {
  const { position, getCurrentPosition } = useGeolocation();
  const [zoom, setZoom] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("Just now");

  useEffect(() => {
    getCurrentPosition().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format coordinates: use live GPS if available, else default to design coordinates
  const latStr = position ? `${position.lat.toFixed(4)}° N` : "28.6129° N";
  const lngStr = position ? `${position.lng.toFixed(4)}° E` : "77.2295° E";
  const locationTitle = position ? "Near India Gate, New Delhi" : "Near India Gate, New Delhi";

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: "SafeHer Live Location",
      text: `Tracking live location for emergency safety: ${latStr}, ${lngStr}`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setToastMessage("Live location broadcast sent successfully!");
      } catch {
        // user canceled share
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareUrl}`);
      setToastMessage("Live location link copied to clipboard!");
    }

    setLastUpdated("Just now");
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className="tracking-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => {}}
        onOpenHelpline={() => {
          window.location.href = "tel:112";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Stage */}
      <main className="tracking-main">
        {/* Header */}
        <header className="tracking-header">
          <div className="tracking-slide-tag">Slide 3</div>
          <h1 className="tracking-title">Live Tracking</h1>
          <p className="tracking-subtitle">Track your real-time location.</p>
        </header>

        {/* Master Live Map Card */}
        <section className="tracking-map-card" aria-label="Interactive Map">
          {/* Top-Left Live Status Pill */}
          <div className="tracking-live-pill">
            <span className="tracking-live-dot" />
            <span>Live</span>
          </div>

          {/* Dark Vector Map Canvas */}
          <div className="tracking-map-canvas">
            <svg
              className="tracking-map-svg"
              viewBox="0 0 850 500"
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `scale(${zoom})`, transformOrigin: "35% 50%" }}
            >
              <defs>
                {/* Street Grid Texture */}
                <pattern id="live-street-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(167, 139, 250, 0.06)" strokeWidth="1" />
                </pattern>

                {/* Glowing Route Trajectory Drop Shadow */}
                <filter id="live-route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FF3880" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Background */}
              <rect width="100%" height="100%" fill="#080414" />
              <rect width="100%" height="100%" fill="url(#live-street-grid)" />

              {/* City Road Network Arteries */}
              <path d="M 40 90 Q 220 120 420 80 T 820 140" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="3.5" fill="none" />
              <path d="M 90 480 C 180 320 280 260 380 320 S 620 220 780 380" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="3" fill="none" />
              <path d="M 220 10 L 290 490 M 520 10 L 590 490" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2.5" fill="none" />
              <path d="M 20 280 C 120 250 250 310 380 240 S 650 180 820 290" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" fill="none" />

              {/* Safe Route Trajectory (from user to destination) */}
              <path
                d="M 272 240 C 310 242 340 255 365 242 C 395 228 415 195 448 162"
                stroke="#FF3880"
                strokeWidth="3.5"
                strokeDasharray="8 5"
                fill="none"
                filter="url(#live-route-glow)"
              />

              {/* Route Waypoint Nodes */}
              <circle cx="320" cy="246" r="4.5" fill="#FF3880" filter="url(#live-route-glow)" />
              <circle cx="365" cy="242" r="5" fill="#FF3880" filter="url(#live-route-glow)" />
              <circle cx="410" cy="200" r="5" fill="#FF3880" filter="url(#live-route-glow)" />
            </svg>

            {/* User Marker with Avatar and Radar Pulse Waves */}
            <div className="tracking-user-pin-wrapper">
              <div className="tracking-radar-ring ring-1" />
              <div className="tracking-radar-ring ring-2" />
              <div className="tracking-radar-ring ring-3" />
              <div className="tracking-user-avatar">
                <img src="/user-avatar.jpg" alt="User live tracking pin" />
              </div>
              <div className="tracking-user-dot" />
            </div>

            {/* Destination Home Pin */}
            <div className="tracking-dest-pin-wrapper">
              <div className="tracking-dest-pin" title="Destination: Home">
                <HomeBadgeIcon width={22} height={22} />
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="tracking-zoom-controls">
              <button
                type="button"
                className="tracking-zoom-btn"
                onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
                title="Zoom in"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                className="tracking-zoom-btn"
                onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
                title="Zoom out"
                aria-label="Zoom out"
              >
                −
              </button>
            </div>
          </div>

          {/* Floating Glassmorphic Location Info Card (Right Side) */}
          <div className="tracking-info-card">
            <div className="tracking-info-top">
              <h2 className="tracking-location-name">{locationTitle}</h2>
              <div className="tracking-location-updated">Last updated: {lastUpdated}</div>
              <div className="tracking-info-divider" />
              <div className="tracking-coords">
                {latStr}, {lngStr}
              </div>
            </div>

            <button type="button" className="btn-share-live" onClick={handleShare}>
              <ShareNodesIcon width={18} height={18} />
              <span>Share Live Location</span>
            </button>
          </div>
        </section>

        {/* Bottom Telemetry Cards (Row of 3) */}
        <section className="tracking-telemetry-grid" aria-label="Tracking Telemetry">
          {/* Card 1: Tracking Mode */}
          <div className="telemetry-card">
            <div className="telemetry-icon-badge badge-mode">
              <TrackingShieldIcon width={24} height={24} />
            </div>
            <div className="telemetry-content">
              <span className="telemetry-label">Tracking Mode</span>
              <span className="telemetry-value">Live</span>
            </div>
          </div>

          {/* Card 2: Accuracy */}
          <div className="telemetry-card">
            <div className="telemetry-icon-badge badge-accuracy">
              <AccuracyTargetIcon width={24} height={24} />
            </div>
            <div className="telemetry-content">
              <span className="telemetry-label">Accuracy</span>
              <span className="telemetry-value">High (10m)</span>
            </div>
          </div>

          {/* Card 3: Last Updated */}
          <div className="telemetry-card">
            <div className="telemetry-icon-badge badge-time">
              <ClockHistoryIcon width={24} height={24} />
            </div>
            <div className="telemetry-content">
              <span className="telemetry-label">Last Updated</span>
              <span className="telemetry-value">{lastUpdated}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && <div className="tracking-toast">{toastMessage}</div>}

      {/* Mobile Bottom Navigation Bar */}
      <div className="dashboard-mobile-nav">
        <BottomNav />
      </div>
    </div>
  );
}
