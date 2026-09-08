import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import { ArrowRightThinIcon } from "../dashboard/DashboardIcons";
import "../../styles/safety-score.css";

// Checkmark Badge Icon
function MiniCheckIcon({ width = 12, height = 12 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SafetyScoreDetail() {
  const navigate = useNavigate();

  // Dynamic progress state
  const [contactsCount, setContactsCount] = useState(3);
  const [safeZonesCount, setSafeZonesCount] = useState(2);
  const [showImproveModal, setShowImproveModal] = useState(false);

  // Score calculation: 85 base, +10 for contacts (5/5), +5 for safe zones (3/3)
  const currentScore =
    70 + (contactsCount >= 5 ? 15 : 10) + (safeZonesCount >= 3 ? 15 : 5);

  // SVG arc calculation: Radius 92, Arc length = PI * 92 ≈ 289
  const ARC_LENGTH = 289;
  const strokeOffset = ARC_LENGTH * (1 - currentScore / 100);

  return (
    <div className="score-detail-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => navigate("/flow")}
        onOpenHelpline={() => {
          window.location.href = "tel:112";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Content Stage */}
      <main className="score-detail-main">
        {/* Header */}
        <header className="score-detail-header">
          <div className="score-detail-slide-tag">Slide 6</div>
          <h1 className="score-detail-title">Safety Score</h1>
          <p className="score-detail-subtitle">Your safety. Your progress.</p>
        </header>

        {/* Master Card Container */}
        <section className="score-master-card" aria-label="Safety Score and Progress Breakdown">
          {/* Two-Column Grid */}
          <div className="score-two-columns">
            {/* Left Column: Radial Arc Gauge */}
            <div className="score-gauge-card">
              <svg className="score-gauge-svg" viewBox="0 0 240 140">
                <defs>
                  {/* Electric Violet to Magenta Gradient */}
                  <linearGradient id="score-detail-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="60%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#F43F86" />
                  </linearGradient>
                  <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#A855F7" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* Track background arc */}
                <path
                  d="M 28 120 A 92 92 0 0 1 212 120"
                  fill="none"
                  stroke="#241846"
                  strokeWidth="16"
                  strokeLinecap="round"
                />

                {/* Active Arc Meter */}
                <path
                  d="M 28 120 A 92 92 0 0 1 212 120"
                  fill="none"
                  stroke="url(#score-detail-grad)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={ARC_LENGTH}
                  strokeDashoffset={strokeOffset}
                  filter="url(#gauge-glow)"
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>

              <div className="score-gauge-readout">
                <span className="score-gauge-val">{currentScore}</span>
                <span className="score-gauge-denom">/100</span>
                <span className="score-gauge-rating">
                  {currentScore === 100 ? "Maximum Protection" : "Excellent"}
                </span>
              </div>
            </div>

            {/* Right Column: Progress Checklist */}
            <div className="score-checklist-card">
              {/* Row 1: Profile Completed */}
              <div className="score-checklist-row">
                <div className="score-checklist-left">
                  <span className="score-diamond-bullet">✦</span>
                  <span className="score-checklist-label">Profile Completed</span>
                </div>
                <div className="score-checklist-right">
                  <span className="score-badge-val is-green">100%</span>
                  <div className="score-check-circle circle-green">
                    <MiniCheckIcon />
                  </div>
                </div>
              </div>

              {/* Row 2: Emergency Contacts */}
              <div className="score-checklist-row">
                <div className="score-checklist-left">
                  <span className="score-diamond-bullet">✦</span>
                  <span className="score-checklist-label">Emergency Contacts</span>
                </div>
                <div className="score-checklist-right">
                  <span className={`score-badge-val ${contactsCount >= 5 ? "is-green" : "is-amber"}`}>
                    {contactsCount}/5
                  </span>
                  <div className={`score-check-circle ${contactsCount >= 5 ? "circle-green" : "circle-amber"}`}>
                    <MiniCheckIcon />
                  </div>
                </div>
              </div>

              {/* Row 3: Safe Zone Added */}
              <div className="score-checklist-row">
                <div className="score-checklist-left">
                  <span className="score-diamond-bullet">✦</span>
                  <span className="score-checklist-label">Safe Zone Added</span>
                </div>
                <div className="score-checklist-right">
                  <span className={`score-badge-val ${safeZonesCount >= 3 ? "is-green" : "is-amber"}`}>
                    {safeZonesCount}/3
                  </span>
                  <div className={`score-check-circle ${safeZonesCount >= 3 ? "circle-green" : "circle-amber"}`}>
                    <MiniCheckIcon />
                  </div>
                </div>
              </div>

              {/* Row 4: Self Defense Trained */}
              <div className="score-checklist-row">
                <div className="score-checklist-left">
                  <span className="score-diamond-bullet">✦</span>
                  <span className="score-checklist-label">Self Defense Trained</span>
                </div>
                <div className="score-checklist-right">
                  <span className="score-badge-val is-green">Yes</span>
                  <div className="score-check-circle circle-green">
                    <MiniCheckIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Action Button */}
          <button
            type="button"
            className="btn-improve-score-master"
            onClick={() => setShowImproveModal(true)}
          >
            <span>Improve Your Score</span>
            <ArrowRightThinIcon width={17} height={17} />
          </button>
        </section>
      </main>

      {/* Interactive Improvement Modal */}
      {showImproveModal && (
        <div className="dashboard-modal-backdrop" onClick={() => setShowImproveModal(false)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Boost Your Safety Score to 100</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setShowImproveModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              {/* Task 1 */}
              <div className="modal-step-item">
                <span className="modal-step-num" style={{ background: contactsCount >= 5 ? "#10B981" : "#F59E0B" }}>
                  {contactsCount >= 5 ? "✓" : "+10"}
                </span>
                <div style={{ flex: 1 }}>
                  <h4 className="modal-step-title">Add 2 More Emergency Contacts (3/5)</h4>
                  <p className="modal-step-desc">
                    Having 5 trusted contacts maximizes rapid response coverage in danger zones.
                  </p>
                  {contactsCount < 5 && (
                    <button
                      type="button"
                      style={{
                        marginTop: "8px",
                        background: "#7C3AED",
                        border: "none",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      onClick={() => setContactsCount(5)}
                    >
                      Complete Task (+10 pts)
                    </button>
                  )}
                </div>
              </div>

              {/* Task 2 */}
              <div className="modal-step-item">
                <span className="modal-step-num" style={{ background: safeZonesCount >= 3 ? "#10B981" : "#F59E0B" }}>
                  {safeZonesCount >= 3 ? "✓" : "+5"}
                </span>
                <div style={{ flex: 1 }}>
                  <h4 className="modal-step-title">Add 1 More Safe Zone (2/3)</h4>
                  <p className="modal-step-desc">
                    Establish safe geofence for your office or university campus.
                  </p>
                  {safeZonesCount < 3 && (
                    <button
                      type="button"
                      style={{
                        marginTop: "8px",
                        background: "#7C3AED",
                        border: "none",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      onClick={() => setSafeZonesCount(3)}
                    >
                      Complete Task (+5 pts)
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setShowImproveModal(false)}
            >
              Done
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
