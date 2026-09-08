import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import SlideQuickSwitcher from "../common/SlideQuickSwitcher";
import {
  HomeZoneIcon,
  CollegeZoneIcon,
  WorkZoneIcon,
  PlusIcon,
  HeartIcon,
  CommentIcon,
} from "../common/SuiteIcons";
import { WomenSolidarityGraphic } from "../common/SuiteGraphics";
import "../../styles/slides-7-8-9.css";

export default function SafeZonesCommunity() {
  const navigate = useNavigate();

  // Safe Zones list with active/inactive toggle state
  const [zones, setZones] = useState([
    {
      id: "zone-1",
      name: "Home",
      address: "12, Green Park, New Delhi",
      type: "home",
      active: true,
    },
    {
      id: "zone-2",
      name: "College",
      address: "AKGEC, Ghaziabad",
      type: "college",
      active: true,
    },
    {
      id: "zone-3",
      name: "Work",
      address: "Connaught Place, New Delhi",
      type: "work",
      active: false,
    },
  ]);

  // Community Post interactions
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(128);
  const [commentsCount, setCommentsCount] = useState(24);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneAddress, setNewZoneAddress] = useState("");

  // Toggle zone state
  const toggleZone = (id) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z))
    );
  };

  // Add new safe zone
  const handleAddZone = (e) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    const newZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName,
      address: newZoneAddress.trim() || "Designated Safe Geofence",
      type: "home",
      active: true,
    };
    setZones((prev) => [...prev, newZone]);
    setNewZoneName("");
    setNewZoneAddress("");
    setShowAddModal(false);
  };

  // Handle like toggle
  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikesCount((c) => c + 1);
    }
  };

  const renderZoneIcon = (type) => {
    switch (type) {
      case "home":
        return <HomeZoneIcon width={22} height={22} color="#10B981" />;
      case "college":
        return <CollegeZoneIcon width={22} height={22} color="#14B8A6" />;
      case "work":
      default:
        return <WorkZoneIcon width={22} height={22} color="#F59E0B" />;
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
        <SlideQuickSwitcher currentSlide={8} />

        {/* Master Slide Header */}
        <header className="suite-page-header">
          <div className="suite-slide-tag">Slide 8</div>
          <h1 className="suite-page-title">Safe Zones &amp; Community</h1>
          <p className="suite-page-subtitle">Your trusted perimeter. Your mutual aid network.</p>
        </header>

        {/* Two-Column Grid: Safe Zones (Left) & Community Safety (Right) */}
        <div className="zones-community-grid">
          {/* =========================================================
              LEFT CARD: SAFE ZONES
              ========================================================= */}
          <section className="suite-glass-card" aria-label="Designated Safe Zones">
            <div className="suite-card-header">
              <h2 className="suite-card-title">Safe Zones</h2>
              <button
                type="button"
                className="suite-view-all-link"
                onClick={() => setShowAddModal(true)}
              >
                View all
              </button>
            </div>

            {/* List of Safe Zones */}
            <div className="safe-zones-list">
              {zones.map((z) => (
                <div key={z.id} className="safe-zone-item">
                  <div className="safe-zone-left">
                    <div className={`safe-zone-icon-circle zone-${z.type}`}>
                      {renderZoneIcon(z.type)}
                    </div>
                    <div className="safe-zone-info">
                      <h3 className="safe-zone-name">{z.name}</h3>
                      <span className="safe-zone-address">{z.address}</span>
                    </div>
                  </div>

                  {/* iOS Style Interactive Toggle Switch */}
                  <button
                    type="button"
                    className={`zone-toggle-switch ${z.active ? "is-on" : ""}`}
                    onClick={() => toggleZone(z.id)}
                    aria-label={`Toggle geofence for ${z.name}`}
                    title={z.active ? "Active safe zone" : "Inactive zone"}
                  >
                    <span className="zone-toggle-knob" />
                  </button>
                </div>
              ))}
            </div>

            {/* "+ Add Safe Zone" Action Button */}
            <button
              type="button"
              className="btn-add-safe-zone"
              onClick={() => setShowAddModal(true)}
            >
              <PlusIcon width={16} height={16} />
              <span>Add Safe Zone</span>
            </button>
          </section>

          {/* =========================================================
              RIGHT CARD: COMMUNITY SAFETY
              ========================================================= */}
          <section className="suite-glass-card" aria-label="Community Mutual Aid Feed">
            <div className="suite-card-header">
              <h2 className="suite-card-title">Community Safety</h2>
              <button
                type="button"
                className="suite-view-all-link"
                onClick={() => setCommentsCount((c) => c + 1)}
              >
                View all
              </button>
            </div>

            {/* Author Post Header */}
            <div className="community-author-row">
              <img
                src="/hero-woman.jpg"
                alt="Neha Sharma profile"
                className="community-avatar"
                onError={(e) => {
                  e.target.src = "/user-avatar.jpg";
                }}
              />
              <div className="community-author-info">
                <h3 className="community-author-name">Neha Sharma</h3>
                <span className="community-post-time">2 hours ago</span>
              </div>
            </div>

            {/* Post Message */}
            <p className="community-post-content">
              Always trust your instincts. You are stronger than you think! 💪
            </p>

            {/* Metrics: Likes & Comments */}
            <div className="community-metrics-row">
              <button
                type="button"
                className={`community-metric-btn ${liked ? "is-liked" : ""}`}
                onClick={handleLikeToggle}
                aria-label="Like post"
              >
                <HeartIcon width={17} height={17} filled={liked} color={liked ? "#F43F86" : "#8C86A5"} />
                <span>{likesCount}</span>
              </button>

              <button
                type="button"
                className="community-metric-btn"
                onClick={() => setCommentsCount((c) => c + 1)}
                aria-label="Comment on post"
              >
                <CommentIcon width={17} height={17} color="#8C86A5" />
                <span>{commentsCount}</span>
              </button>
            </div>

            {/* Women Solidarity Illustration */}
            <div className="community-illustration-box">
              <WomenSolidarityGraphic />
            </div>
          </section>
        </div>
      </main>

      {/* Add Safe Zone Modal */}
      {showAddModal && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Add New Safe Zone</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddZone} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#8C86A5", marginBottom: "6px" }}>
                  Safe Zone Label (e.g. Gym, Library, Sister&apos;s Place)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metro Station Gate 3"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "#0E0824",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#8C86A5", marginBottom: "6px" }}>
                  Location / Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sector 18, Noida"
                  value={newZoneAddress}
                  onChange={(e) => setNewZoneAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "#0E0824",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-improve-score"
                style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
              >
                Save Safe Zone
              </button>
            </form>
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
