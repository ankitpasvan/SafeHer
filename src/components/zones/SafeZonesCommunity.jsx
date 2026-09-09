import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import "../../styles/safe-zones.css";

// SVG Icons
function HomeZoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CollegeZoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 10v4" />
      <path d="M15 10v4" />
      <path d="M12 10v4" />
    </svg>
  );
}

function WorkZoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function HeartIcon({ filled = false, color = "currentColor" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function CommentIcon({ color = "currentColor" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

// 4 Women Solidarity Vector Illustration matching media_1788903179597.png
function WomenSolidarityIllustration() {
  return (
    <svg
      viewBox="0 0 420 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1038" />
          <stop offset="100%" stopColor="#281145" />
        </linearGradient>

        <linearGradient id="w1-dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>

        <linearGradient id="w2-dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        <linearGradient id="w3-dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>

        <linearGradient id="w4-dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F43F86" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>

        <linearGradient id="hair-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#31135E" />
          <stop offset="100%" stopColor="#190635" />
        </linearGradient>

        <linearGradient id="hair-warm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A1D96" />
          <stop offset="100%" stopColor="#2E1065" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="420" height="170" rx="16" fill="url(#bg-grad)" />

      {/* Floating gentle hearts */}
      <path d="M60 28 C60 24 63 21 67 21 C70 21 72 23 73 25 C74 23 76 21 79 21 C83 21 86 24 86 28 C86 34 73 40 73 40 C73 40 60 34 60 28 Z" fill="#F43F86" fillOpacity="0.3" />
      <path d="M350 24 C350 21 352 19 355 19 C357 19 359 20 360 22 C361 20 363 19 365 19 C368 19 370 21 370 24 C370 29 360 34 360 34 C360 34 350 29 350 24 Z" fill="#A855F7" fillOpacity="0.25" />

      {/* =======================
          WOMAN 1 (Far Left - Pink)
          ======================= */}
      <g transform="translate(48, 32)">
        <ellipse cx="26" cy="46" rx="20" ry="25" fill="url(#hair-dark)" />
        <path d="M 4 96 Q 26 72 48 96 L 52 138 L 0 138 Z" fill="url(#w1-dress)" />
        <rect x="22" y="62" width="8" height="16" rx="3" fill="#D97706" />
        <ellipse cx="26" cy="48" rx="14" ry="17" fill="#F59E0B" />
        <path d="M 12 38 Q 26 25 40 38 Q 34 48 26 40 Q 18 48 12 38 Z" fill="url(#hair-dark)" />
        <path d="M 23 54 Q 26 57 29 54" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* =======================
          WOMAN 2 (Center Left - Indigo)
          ======================= */}
      <g transform="translate(138, 24)">
        <ellipse cx="30" cy="50" rx="23" ry="29" fill="url(#hair-warm)" />
        <path d="M 5 104 Q 30 76 55 104 L 60 146 L 0 146 Z" fill="url(#w2-dress)" />
        <rect x="25" y="66" width="10" height="17" rx="4" fill="#EAB308" />
        <ellipse cx="30" cy="50" rx="16" ry="19" fill="#FDE047" />
        <path d="M 14 40 Q 30 22 46 40 Q 40 52 30 42 Q 20 52 14 40 Z" fill="url(#hair-warm)" />
        <path d="M 27 58 Q 30 61 33 58" stroke="#854D0E" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* =======================
          WOMAN 3 (Center Right - Purple)
          ======================= */}
      <g transform="translate(228, 20)">
        <path d="M 12 40 Q 30 18 48 40 Q 56 75 50 102 Q 30 92 10 102 Q 4 75 12 40 Z" fill="url(#hair-dark)" />
        <path d="M 5 108 Q 30 80 55 108 L 60 150 L 0 150 Z" fill="url(#w3-dress)" />
        <rect x="25" y="70" width="10" height="17" rx="4" fill="#FBBF24" />
        <ellipse cx="30" cy="54" rx="16" ry="19" fill="#FCD34D" />
        <path d="M 14 44 Q 30 30 46 44 Q 38 54 30 47 Q 22 54 14 44 Z" fill="url(#hair-dark)" />
        <path d="M 27 62 Q 30 65 33 62" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* =======================
          WOMAN 4 (Far Right - Coral)
          ======================= */}
      <g transform="translate(312, 32)">
        <ellipse cx="26" cy="46" rx="20" ry="25" fill="url(#hair-warm)" />
        <path d="M 4 96 Q 26 72 48 96 L 52 138 L 0 138 Z" fill="url(#w4-dress)" />
        <rect x="22" y="62" width="8" height="16" rx="3" fill="#D97706" />
        <ellipse cx="26" cy="48" rx="14" ry="17" fill="#F59E0B" />
        <path d="M 12 38 Q 26 26 40 38 Q 32 48 26 40 Q 20 48 12 38 Z" fill="url(#hair-warm)" />
        <path d="M 22 54 Q 26 57 30 54" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function SafeZonesCommunity() {
  const navigate = useNavigate();

  // 3 Safe Zones matching media_1788903179597.png
  const [zones, setZones] = useState([
    {
      id: "zone-home",
      name: "Home",
      address: "12, Green Park, New Delhi",
      type: "home",
      active: true, // ON in screenshot
    },
    {
      id: "zone-college",
      name: "College",
      address: "AKGEC, Ghaziabad",
      type: "college",
      active: true, // ON in screenshot
    },
    {
      id: "zone-work",
      name: "Work",
      address: "Connaught Place, New Delhi",
      type: "work",
      active: false, // OFF in screenshot
    },
  ]);

  // Community Post interactions
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(128);
  const [commentsCount, setCommentsCount] = useState(24);

  // Add Safe Zone Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneAddress, setNewZoneAddress] = useState("");

  // Toggle switch
  const toggleZone = (id) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z))
    );
  };

  // Add zone submission
  const handleAddZone = (e) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    const newZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName.trim(),
      address: newZoneAddress.trim() || "Designated Safe Geofence",
      type: "home",
      active: true,
    };
    setZones((prev) => [...prev, newZone]);
    setNewZoneName("");
    setNewZoneAddress("");
    setShowAddModal(false);
  };

  // Like button toggle
  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikesCount((c) => c + 1);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case "home":
        return <HomeZoneIcon />;
      case "college":
        return <CollegeZoneIcon />;
      case "work":
      default:
        return <WorkZoneIcon />;
    }
  };

  return (
    <div className="zones-page-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => navigate("/flow")}
        onOpenHelpline={() => {
          window.location.href = "tel:112";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Content Stage */}
      <main className="zones-page-main">
        {/* Page Header */}
        <header className="zones-header">
          <div className="slide-header-top-row">
            <button
              type="button"
              className="slide-back-btn"
              onClick={() => navigate("/")}
              title="Return to Dashboard Overview"
            >
              ← Back to Dashboard
            </button>
            <div className="zones-slide-tag">Slide 8</div>
          </div>
          <h1 className="zones-page-title">Safe Zones &amp; Community</h1>
          <p className="zones-page-subtitle">Your trusted perimeter. Your mutual aid network.</p>
        </header>

        {/* 2-Column Master Grid */}
        <div className="zones-community-grid">
          {/* =========================================================
              LEFT CARD: SAFE ZONES
              ========================================================= */}
          <section className="zones-card" aria-label="Designated Safe Zones">
            <div>
              {/* Header */}
              <div className="zones-card-header">
                <h2 className="zones-card-title">Safe Zones</h2>
                <button
                  type="button"
                  className="zones-view-all-link"
                  onClick={() => setShowAddModal(true)}
                >
                  View all
                </button>
              </div>

              {/* Safe Zones List */}
              <div className="safe-zones-list">
                {zones.map((z) => (
                  <div key={z.id} className="safe-zone-row">
                    <div className="safe-zone-left-info">
                      <div className={`zone-icon-circle icon-${z.type}`}>
                        {renderIcon(z.type)}
                      </div>
                      <div className="zone-meta-texts">
                        <h3 className="zone-label-title">{z.name}</h3>
                        <span className="zone-label-sub">{z.address}</span>
                      </div>
                    </div>

                    {/* Interactive Toggle Switch matching design */}
                    <button
                      type="button"
                      className={`zone-switch-btn ${z.active ? "is-active" : ""}`}
                      onClick={() => toggleZone(z.id)}
                      aria-label={`Toggle safe zone for ${z.name}`}
                      title={z.active ? "Safe zone armed" : "Safe zone inactive"}
                    >
                      <span className="zone-switch-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* "+ Add Safe Zone" Button */}
            <button
              type="button"
              className="btn-add-safe-zone"
              onClick={() => setShowAddModal(true)}
            >
              <PlusIcon />
              <span>Add Safe Zone</span>
            </button>
          </section>

          {/* =========================================================
              RIGHT CARD: COMMUNITY SAFETY
              ========================================================= */}
          <section className="zones-card" aria-label="Community Mutual Aid Safety">
            <div>
              {/* Header */}
              <div className="zones-card-header">
                <h2 className="zones-card-title">Community Safety</h2>
                <button
                  type="button"
                  className="zones-view-all-link"
                  onClick={() => setCommentsCount((c) => c + 1)}
                >
                  View all
                </button>
              </div>

              {/* Author Header */}
              <div className="community-author-block">
                <img
                  src="/hero-woman.jpg"
                  alt="Neha Sharma"
                  className="community-avatar-img"
                  onError={(e) => {
                    e.target.src = "/user-avatar.jpg";
                  }}
                />
                <div className="community-author-meta">
                  <h3 className="community-author-name">Neha Sharma</h3>
                  <span className="community-time-text">2 hours ago</span>
                </div>
              </div>

              {/* Post Content */}
              <p className="community-text-body">
                Always trust your instincts. You are stronger than you think! 💪
              </p>

              {/* Metrics: Likes & Comments */}
              <div className="community-actions-row">
                <button
                  type="button"
                  className={`community-action-btn ${liked ? "is-liked" : ""}`}
                  onClick={handleLikeToggle}
                  aria-label="Like post"
                >
                  <HeartIcon filled={liked} color={liked ? "#F43F86" : "#8C86A5"} />
                  <span>{likesCount}</span>
                </button>

                <button
                  type="button"
                  className="community-action-btn"
                  onClick={() => setCommentsCount((c) => c + 1)}
                  aria-label="Comment on post"
                >
                  <CommentIcon color="#8C86A5" />
                  <span>{commentsCount}</span>
                </button>
              </div>
            </div>

            {/* 4-Women Solidarity Illustration */}
            <div className="community-vector-container">
              <WomenSolidarityIllustration />
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
                className="btn-add-safe-zone"
                style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
              >
                Save Safe Zone
              </button>
            </form>
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
