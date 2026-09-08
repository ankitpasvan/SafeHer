import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import "../../styles/recent-alerts.css";

// SVG Icons for the 3 alert types
function AlertTriangleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function AlertBellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function AlertShieldLockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M12 13.5v2.5" />
    </svg>
  );
}

export default function RecentAlerts() {
  const navigate = useNavigate();

  // Core 3 alerts exactly matching the Slide 7 design
  const [alerts] = useState([
    {
      id: "panic-1",
      title: "Panic Alert",
      time: "Today, 08:24 PM",
      status: "Resolved",
      badgeClass: "badge-resolved",
      type: "panic",
      details: "Triggered via 3D Panic Button. Live GPS dispatched to all emergency contacts. Safe status confirmed at 08:31 PM.",
      location: "Sector 62, Noida (Lat: 28.6280° N, Lng: 77.3649° E)",
    },
    {
      id: "zone-1",
      title: "Safe Zone Exited",
      time: "Today, 07:10 PM",
      status: "Warning",
      badgeClass: "badge-warning",
      type: "safezone",
      details: "GPS telemetry detected exit from designated 'College Geofence' outside usual scheduled hours.",
      location: "AKGEC Campus perimeter, Ghaziabad",
    },
    {
      id: "checkin-1",
      title: "Check-in Missed",
      time: "Today, 06:30 PM",
      status: "Info",
      badgeClass: "badge-info",
      type: "checkin",
      details: "Automated 30-minute safety confirmation prompt was not acknowledged within 5 minutes.",
      location: "Connaught Place transit hub, New Delhi",
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Additional mock logs when "View all" is clicked
  const extendedLogs = [
    ...alerts,
    {
      id: "route-1",
      title: "Route Variance Detected",
      time: "Yesterday, 10:15 PM",
      status: "Resolved",
      badgeClass: "badge-resolved",
      type: "panic",
      details: "Auto-rerouting suggested safer, well-lit corridors after a 200m diversion.",
      location: "Outer Ring Road, New Delhi",
    },
    {
      id: "entry-1",
      title: "Safe Corridor Entry",
      time: "Yesterday, 06:45 PM",
      status: "Info",
      badgeClass: "badge-info",
      type: "checkin",
      details: "User safely entered Green Park verified perimeter.",
      location: "12, Green Park, New Delhi",
    },
  ];

  const currentList = showAll ? extendedLogs : alerts;

  const renderIcon = (type) => {
    switch (type) {
      case "panic":
        return <AlertTriangleIcon />;
      case "safezone":
        return <AlertBellIcon />;
      case "checkin":
      default:
        return <AlertShieldLockIcon />;
    }
  };

  return (
    <div className="alerts-page-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => navigate("/flow")}
        onOpenHelpline={() => {
          window.location.href = "tel:112";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Content Stage */}
      <main className="alerts-page-main">
        {/* Master Card Container matching the Slide 7 layout */}
        <section className="alerts-master-card" aria-label="Recent Emergency Alerts">
          {/* Card Top Header */}
          <div className="alerts-card-header">
            <div className="alerts-header-left">
              <div className="alerts-slide-tag">Slide 7</div>
              <div className="alerts-header-titles">
                <h1 className="alerts-title">Recent Alerts</h1>
                <p className="alerts-subtitle">Stay informed. Stay safe.</p>
              </div>
            </div>

            <button
              type="button"
              className="alerts-view-all-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : "View all"}
            </button>
          </div>

          {/* Vertical Alert Cards */}
          <div className="alerts-list">
            {currentList.map((item) => (
              <div
                key={item.id}
                className="alert-item-card"
                onClick={() => setSelectedAlert(item)}
                role="button"
                tabIndex={0}
              >
                {/* Left: Circular Icon + Title + Timestamp */}
                <div className="alert-left-content">
                  <div className={`alert-icon-wrap type-${item.type}`}>
                    {renderIcon(item.type)}
                  </div>
                  <div className="alert-text-info">
                    <h3 className="alert-text-title">{item.title}</h3>
                    <span className="alert-text-time">{item.time}</span>
                  </div>
                </div>

                {/* Right: Colored Status Pill Badge */}
                <span className={`alert-badge ${item.badgeClass}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Detail Modal when clicking on any Alert */}
      {selectedAlert && (
        <div className="dashboard-modal-backdrop" onClick={() => setSelectedAlert(null)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className={`alert-icon-wrap type-${selectedAlert.type}`} style={{ width: 38, height: 38 }}>
                  {renderIcon(selectedAlert.type)}
                </div>
                <div>
                  <h3 className="dashboard-modal-title">{selectedAlert.title}</h3>
                  <span style={{ fontSize: "12px", color: "#8C86A5" }}>{selectedAlert.time}</span>
                </div>
              </div>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setSelectedAlert(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <div className="modal-step-item">
                <span className="modal-step-num">📍</span>
                <div>
                  <h4 className="modal-step-title">Location</h4>
                  <p className="modal-step-desc">{selectedAlert.location}</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">🛡️</span>
                <div>
                  <h4 className="modal-step-title">Incident Telemetry</h4>
                  <p className="modal-step-desc">{selectedAlert.details}</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">⚡</span>
                <div>
                  <h4 className="modal-step-title">Status</h4>
                  <p className="modal-step-desc">
                    Marked as <strong style={{ color: "#F43F86" }}>{selectedAlert.status}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setSelectedAlert(null)}
            >
              Close
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
