import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import SlideQuickSwitcher from "../common/SlideQuickSwitcher";
import {
  AlertTriangleIcon,
  AlertBellIcon,
  AlertShieldIcon,
} from "../common/SuiteIcons";
import "../../styles/slides-7-8-9.css";

export default function RecentAlerts() {
  const navigate = useNavigate();

  // State for alerts list
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      title: "Panic Alert",
      time: "Today, 08:24 PM",
      status: "Resolved",
      statusType: "resolved",
      iconType: "panic",
      details: "Triggered via 3D Panic Button. Emergency circle notified. User confirmed safe at 08:31 PM.",
      location: "Sector 62, Noida (Lat: 28.628, Lng: 77.364)",
    },
    {
      id: "alert-2",
      title: "Safe Zone Exited",
      time: "Today, 07:10 PM",
      status: "Warning",
      statusType: "warning",
      iconType: "safezone",
      details: "GPS telemetry detected exit from designated 'College Geofence' outside usual schedule.",
      location: "AKGEC Campus boundary, Ghaziabad",
    },
    {
      id: "alert-3",
      title: "Check-in Missed",
      time: "Today, 06:30 PM",
      status: "Info",
      statusType: "info",
      iconType: "checkin",
      details: "Automated 30-minute safety confirmation prompt was not acknowledged within 5 minutes.",
      location: "Connaught Place transit hub, New Delhi",
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  // Additional mock historical alerts when "View all" is clicked
  const extendedAlerts = [
    ...alerts,
    {
      id: "alert-4",
      title: "Route Deviation Detected",
      time: "Yesterday, 10:15 PM",
      status: "Resolved",
      statusType: "resolved",
      iconType: "panic",
      details: "Auto-rerouting suggested safer lit streets after 200m corridor variance.",
      location: "Outer Ring Road, Delhi",
    },
    {
      id: "alert-5",
      title: "Safe Corridor Entry",
      time: "Yesterday, 06:45 PM",
      status: "Info",
      statusType: "info",
      iconType: "checkin",
      details: "User successfully arrived inside Green Park home safe perimeter.",
      location: "12, Green Park, New Delhi",
    },
  ];

  const displayedAlerts = showAllHistory ? extendedAlerts : alerts;

  const renderIcon = (type) => {
    switch (type) {
      case "panic":
        return <AlertTriangleIcon width={22} height={22} color="#F43F5E" />;
      case "safezone":
        return <AlertBellIcon width={22} height={22} color="#F59E0B" />;
      case "checkin":
      default:
        return <AlertShieldIcon width={22} height={22} color="#38BDF8" />;
    }
  };

  return (
    <div className="suite-page-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => navigate("/flow")}
        onOpenHelpline={() => {
          window.location.href = "tel:18001234567";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Content Area */}
      <main className="suite-page-main">
        {/* Top Slide Quick Switcher */}
        <SlideQuickSwitcher currentSlide={7} />

        {/* Master Slide Header */}
        <header className="suite-page-header">
          <div className="suite-slide-tag">Slide 7</div>
          <h1 className="suite-page-title">Recent Alerts</h1>
          <p className="suite-page-subtitle">Stay informed. Stay safe.</p>
        </header>

        {/* Master Glass Card Container */}
        <section className="suite-glass-card" aria-label="Recent Emergency Alerts">
          {/* Card Top Title & View All */}
          <div className="suite-card-header">
            <h2 className="suite-card-title">Recent Alerts</h2>
            <button
              type="button"
              className="suite-view-all-link"
              onClick={() => setShowAllHistory(!showAllHistory)}
            >
              {showAllHistory ? "Show less" : "View all"}
            </button>
          </div>

          {/* Vertical Alert Cards */}
          <div className="alerts-card-list">
            {displayedAlerts.map((item) => (
              <div
                key={item.id}
                className="alert-row-item"
                onClick={() => setSelectedAlert(item)}
                role="button"
                tabIndex={0}
              >
                {/* Left Side: Circular Icon + Alert Title & Time */}
                <div className="alert-item-left">
                  <div className={`alert-icon-circle is-${item.iconType}`}>
                    {renderIcon(item.iconType)}
                  </div>
                  <div className="alert-meta">
                    <h3 className="alert-name">{item.title}</h3>
                    <span className="alert-timestamp">{item.time}</span>
                  </div>
                </div>

                {/* Right Side: Status Badge */}
                <div className={`alert-status-badge badge-${item.statusType}`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Detail Modal when clicking an alert */}
      {selectedAlert && (
        <div className="dashboard-modal-backdrop" onClick={() => setSelectedAlert(null)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className={`alert-icon-circle is-${selectedAlert.iconType}`} style={{ width: 36, height: 36 }}>
                  {renderIcon(selectedAlert.iconType)}
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
                  <h4 className="modal-step-title">Incident Location</h4>
                  <p className="modal-step-desc">{selectedAlert.location}</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">🛡️</span>
                <div>
                  <h4 className="modal-step-title">Telemetry &amp; Audit Log</h4>
                  <p className="modal-step-desc">{selectedAlert.details}</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">⚡</span>
                <div>
                  <h4 className="modal-step-title">Current Status</h4>
                  <p className="modal-step-desc">
                    Marked as <strong style={{ color: "#F43F86" }}>{selectedAlert.status}</strong>. All contacts informed.
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
              Close Alert Summary
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="dashboard-mobile-nav">
        <BottomNav />
      </div>
    </div>
  );
}
