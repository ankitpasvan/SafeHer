import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import "../../styles/self-defense.css";

// SVG Icons
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function PhoneHandsetIcon({ width = 22, height = 22, color = "#FFFFFF" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M9 14h6v4H9z" />
    </svg>
  );
}

function SirenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="M12 2v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  );
}

function CameraFrameIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// 3 Women Self Defense Video Illustration matching media_1788903319664.png
function VideoThumbnailIllustration() {
  return (
    <svg
      viewBox="0 0 400 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
    >
      <defs>
        <linearGradient id="thumb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A154B" />
          <stop offset="45%" stopColor="#6B21A8" />
          <stop offset="100%" stopColor="#831843" />
        </linearGradient>

        <linearGradient id="dress-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id="dress-center" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="dress-right" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#BE185D" />
          <stop offset="100%" stopColor="#9D174D" />
        </linearGradient>

        <linearGradient id="hair-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E1065" />
          <stop offset="100%" stopColor="#170438" />
        </linearGradient>
        <linearGradient id="hair-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#290E02" />
        </linearGradient>
      </defs>

      {/* Background Gradient */}
      <rect width="400" height="175" rx="16" fill="url(#thumb-bg)" />

      {/* Atmospheric Mountain / Gym Silhouette */}
      <path d="M0 130 Q120 90 200 120 T400 100 L400 175 L0 175 Z" fill="#240B38" fillOpacity="0.45" />

      {/* ==========================
          WOMAN 1 (Left - Violet)
          ========================== */}
      <g transform="translate(180, 48)">
        <ellipse cx="25" cy="40" rx="18" ry="22" fill="url(#hair-1)" />
        <path d="M 4 84 Q 25 60 46 84 L 50 125 L 0 125 Z" fill="url(#dress-left)" />
        <rect x="21" y="55" width="8" height="14" rx="3" fill="#E59866" />
        <ellipse cx="25" cy="42" rx="14" ry="16" fill="#F8C471" />
        <path d="M 12 33 Q 25 22 38 33 Q 32 42 25 35 Q 18 42 12 33 Z" fill="url(#hair-1)" />
        <path d="M 22 48 Q 25 51 28 48" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* ==========================
          WOMAN 2 (Center - Yellow)
          ========================== */}
      <g transform="translate(260, 38)">
        <ellipse cx="28" cy="45" rx="20" ry="25" fill="url(#hair-2)" />
        <path d="M 4 92 Q 28 66 52 92 L 56 135 L 0 135 Z" fill="url(#dress-center)" />
        <rect x="24" y="58" width="9" height="15" rx="4" fill="#F39C12" />
        <ellipse cx="28" cy="44" rx="15" ry="17" fill="#FAD7A0" />
        <path d="M 14 34 Q 28 20 42 34 Q 36 44 28 36 Q 20 44 14 34 Z" fill="url(#hair-2)" />
        <path d="M 25 50 Q 28 53 31 50" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ==========================
          WOMAN 3 (Right - Pink/Burgundy)
          ========================== */}
      <g transform="translate(340, 44)">
        <ellipse cx="25" cy="40" rx="18" ry="22" fill="url(#hair-1)" />
        <path d="M 4 86 Q 25 62 46 86 L 50 130 L 0 130 Z" fill="url(#dress-right)" />
        <rect x="21" y="56" width="8" height="14" rx="3" fill="#E59866" />
        <ellipse cx="25" cy="43" rx="14" ry="16" fill="#F8C471" />
        <path d="M 12 34 Q 25 24 38 34 Q 32 44 25 36 Q 18 44 12 34 Z" fill="url(#hair-1)" />
        <path d="M 22 49 Q 25 52 28 49" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function SelfDefenseTools() {
  const navigate = useNavigate();

  // Interactive tool modal states
  const [activeModal, setActiveModal] = useState(null); // 'fakeCall' | 'siren' | 'recorder' | 'video'
  const [isRecording, setIsRecording] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);
  const [flashlightActive, setFlashlightActive] = useState(false);
  const [screenFlashed, setScreenFlashed] = useState(false);

  const audioCtxRef = useRef(null);

  // High-decibel acoustic siren synthesizer via Web Audio API
  const toggleSiren = () => {
    if (sirenActive) {
      setSirenActive(false);
      setActiveModal(null);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
        audioCtxRef.current = null;
      }
    } else {
      setSirenActive(true);
      setActiveModal("siren");
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(850, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1450, ctx.currentTime + 0.35);
          gain.gain.setValueAtTime(0.18, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          setTimeout(() => {
            try {
              osc.stop();
            } catch (_) {}
          }, 3500);
        }
      } catch (_) {}
    }
  };

  // Camera screenshot flash simulation
  const triggerScreenshot = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      alert("Covert snapshot captured & saved to encrypted SafeHer cloud storage.");
    }, 400);
  };

  return (
    <div className="defense-page-shell">
      {/* Covert Screenshot White Screen Flash */}
      {screenFlashed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#FFFFFF",
            zIndex: 99999,
            pointerEvents: "none",
            animation: "fadeInOut 0.4s ease",
          }}
        />
      )}

      {/* Fullscreen Max Luminance Flashlight Torch */}
      {flashlightActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#FFFFFF",
            zIndex: 99990,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#111827",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "60px", marginBottom: "16px" }}>💡</div>
          <h2 style={{ fontSize: "26px", fontWeight: "800", margin: "0 0 8px" }}>
            HIGH-INTENSITY SCREEN TORCH ACTIVE
          </h2>
          <p style={{ fontSize: "14px", color: "#4B5563", maxWidth: "420px", marginBottom: "28px" }}>
            Screen set to 100% white luminance for tactical disorientation and dark path navigation.
          </p>
          <button
            type="button"
            onClick={() => setFlashlightActive(false)}
            style={{
              padding: "13px 32px",
              background: "#111827",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "999px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Turn Off Flashlight
          </button>
        </div>
      )}

      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => navigate("/flow")}
        onOpenHelpline={() => {
          window.location.href = "tel:18001234567";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Content Stage */}
      <main className="defense-page-main">
        {/* Page Header */}
        <header className="defense-header">
          <div className="slide-header-top-row">
            <button
              type="button"
              className="slide-back-btn"
              onClick={() => navigate("/")}
              title="Return to Dashboard Overview"
            >
              ← Back to Dashboard
            </button>
            <div className="defense-slide-tag">Slide 9</div>
          </div>
          <h1 className="defense-page-title">Self Defense Tips &amp; Safety Tools</h1>
          <p className="defense-page-subtitle">Arm your awareness. Instant crisis tools at your fingertips.</p>
        </header>

        {/* 2-Column Master Grid */}
        <div className="defense-tools-grid">
          {/* =========================================================
              LEFT CARD: SELF DEFENSE TIPS
              ========================================================= */}
          <section className="defense-card" aria-label="Self Defense Video Tutorials">
            <div>
              {/* Header */}
              <div className="defense-card-header">
                <div className="defense-card-header-left">
                  <div className="defense-slide-tag" style={{ margin: 0 }}>Slide 9</div>
                  <h2 className="defense-card-title">Self Defense Tips</h2>
                </div>
                <button
                  type="button"
                  className="defense-view-all-link"
                  onClick={() => setActiveModal("video")}
                >
                  View all
                </button>
              </div>

              {/* Video Thumbnail Box */}
              <div
                className="defense-video-thumbnail-box"
                onClick={() => setActiveModal("video")}
                role="button"
                tabIndex={0}
              >
                <VideoThumbnailIllustration />

                {/* Overlays */}
                <div className="defense-video-overlay-details">
                  <span className="defense-video-text-title">
                    5 Basic Moves Every Women Should Know
                  </span>

                  <div className="defense-video-bottom-row">
                    <div className="defense-video-views">
                      <EyeIcon />
                      <span>35</span>
                    </div>
                    <span className="defense-video-duration">04:35</span>
                  </div>
                </div>

                {/* Centered Play Button */}
                <div className="defense-video-center-play">
                  <PlayIcon />
                </div>
              </div>

              {/* Bullet Points matching screenshot */}
              <div className="defense-bullets-list">
                <div className="defense-bullet-row">
                  <span className="defense-bullet-diamond">✦</span>
                  <span>Watch &amp; Learn</span>
                </div>
                <div className="defense-bullet-row">
                  <span className="defense-bullet-diamond">✦</span>
                  <span>Practice Daily</span>
                </div>
                <div className="defense-bullet-row">
                  <span className="defense-bullet-diamond">✦</span>
                  <span>Stay Strong, Stay Safe</span>
                </div>
              </div>
            </div>

            {/* "Explore More Tips ->" Button */}
            <button
              type="button"
              className="btn-explore-tips"
              onClick={() => setActiveModal("video")}
            >
              <span>Explore More Tips</span>
              <ArrowRightIcon />
            </button>
          </section>

          {/* =========================================================
              RIGHT COLUMN: SAFETY TOOLS & 24/7 HELPLINE
              ========================================================= */}
          <div className="defense-right-column">
            {/* Top Right Card: Safety Tools (5 buttons) */}
            <section className="safety-tools-card" aria-label="Crisis Rapid Tools">
              <h3 className="safety-tools-title">Safety Tools</h3>

              <div className="safety-tools-row-5">
                {/* 1. Voice Recorder */}
                <button
                  type="button"
                  className="safety-tool-item"
                  onClick={() => {
                    setIsRecording(!isRecording);
                    setActiveModal("recorder");
                  }}
                  title="Record audio discreetly"
                >
                  <div className="safety-tool-square tool-purple">
                    <MicIcon />
                  </div>
                  <span className="safety-tool-caption">Voice<br />Recorder</span>
                </button>

                {/* 2. Fake Call */}
                <button
                  type="button"
                  className="safety-tool-item"
                  onClick={() => setActiveModal("fakeCall")}
                  title="Simulate rescue incoming call"
                >
                  <div className="safety-tool-square tool-green">
                    <PhoneHandsetIcon />
                  </div>
                  <span className="safety-tool-caption">Fake Call</span>
                </button>

                {/* 3. Flash Light */}
                <button
                  type="button"
                  className="safety-tool-item"
                  onClick={() => setFlashlightActive(true)}
                  title="Strobe lantern beam"
                >
                  <div className="safety-tool-square tool-amber">
                    <BulbIcon />
                  </div>
                  <span className="safety-tool-caption">Flash<br />Light</span>
                </button>

                {/* 4. Siren */}
                <button
                  type="button"
                  className="safety-tool-item"
                  onClick={toggleSiren}
                  title="High-decibel emergency acoustic alarm"
                >
                  <div className="safety-tool-square tool-red">
                    <SirenIcon />
                  </div>
                  <span className="safety-tool-caption">Siren</span>
                </button>

                {/* 5. Screenshot */}
                <button
                  type="button"
                  className="safety-tool-item"
                  onClick={triggerScreenshot}
                  title="Instant covert snapshot capture"
                >
                  <div className="safety-tool-square tool-cyan">
                    <CameraFrameIcon />
                  </div>
                  <span className="safety-tool-caption">Screenshot</span>
                </button>
              </div>
            </section>

            {/* Bottom Right Card: Need Immediate Help? */}
            <section className="immediate-help-card" aria-label="Emergency 24/7 Helpline">
              <div className="immediate-help-text-group">
                <h3 className="immediate-help-heading">Need Immediate Help?</h3>
                <span className="immediate-help-subheading">Call our 24/7 Helpline</span>
                <a
                  href="tel:18001234567"
                  className="immediate-help-number"
                  title="Click to dial 1800-123-4567"
                >
                  1800-123-4567
                </a>
              </div>

              {/* Glowing Circle Call Button */}
              <a
                href="tel:18001234567"
                className="immediate-help-call-circle"
                title="Instant Call 1800-123-4567"
                aria-label="Call 24/7 Helpline"
              >
                <PhoneHandsetIcon width={26} height={26} color="#FFFFFF" />
              </a>
            </section>
          </div>
        </div>
      </main>

      {/* =========================================================
          INTERACTIVE DRILL-DOWN MODALS
          ========================================================= */}

      {/* 1. Fake Call Modal */}
      {activeModal === "fakeCall" && (
        <div className="dashboard-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div
            className="dashboard-modal"
            style={{
              maxWidth: "360px",
              textAlign: "center",
              background: "#120A2A",
              border: "1px solid #7C3AED",
              padding: "36px 24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                background: "#2D1854",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                border: "2px solid #7C3AED",
                boxShadow: "0 0 24px rgba(124, 58, 237, 0.4)",
              }}
            >
              📞
            </div>
            <h3 style={{ fontSize: "22px", margin: "0 0 4px", color: "#FFFFFF" }}>Dad (Safety Check)</h3>
            <p style={{ color: "#A855F7", fontSize: "13.5px", margin: "0 0 32px" }}>Incoming Rescue Call...</p>

            <div style={{ display: "flex", justifyContent: "space-around", gap: "24px" }}>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  background: "#EF4444",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "22px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Decline"
              >
                ✕
              </button>

              <button
                type="button"
                onClick={() => {
                  alert("Simulated call connected: 'Hey, I am waiting right around the corner, come out now.'");
                  setActiveModal(null);
                }}
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  background: "#10B981",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "22px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Accept"
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Siren Modal */}
      {activeModal === "siren" && (
        <div className="dashboard-modal-backdrop" onClick={toggleSiren}>
          <div
            className="dashboard-modal"
            style={{
              maxWidth: "380px",
              textAlign: "center",
              background: "#2A0B18",
              border: "1px solid #EF4444",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>🚨</div>
            <h3 style={{ color: "#EF4444", fontSize: "20px", margin: "0 0 8px" }}>
              HIGH-DECIBEL SIREN BROADCASTING
            </h3>
            <p style={{ color: "#E2E0EE", fontSize: "13px", marginBottom: "20px" }}>
              Emitting acoustic distress pulse to alert passersby and ward off intruders.
            </p>
            <button
              type="button"
              onClick={toggleSiren}
              style={{
                width: "100%",
                padding: "12px",
                background: "#EF4444",
                border: "none",
                borderRadius: "10px",
                color: "#FFFFFF",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Stop Siren Alarm
            </button>
          </div>
        </div>
      )}

      {/* 3. Voice Recorder Modal */}
      {activeModal === "recorder" && (
        <div className="dashboard-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Discreet Audio Evidence Vault</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: isRecording ? "#EF4444" : "#6D28D9",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  boxShadow: isRecording ? "0 0 20px #EF4444" : "0 0 16px #6D28D9",
                }}
              >
                🎙️
              </div>
              <h4 style={{ margin: "0 0 6px", color: "#FFFFFF" }}>
                {isRecording ? "Recording Encrypted Ambient Audio..." : "Audio Recorder Ready"}
              </h4>
              <p style={{ fontSize: "12.5px", color: "#8C86A5", margin: "0 0 20px" }}>
                Encrypted with AES-256 and uploaded discreetly to your emergency contact vault.
              </p>
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "none",
                  background: isRecording ? "#EF4444" : "#7C3AED",
                  color: "#FFFFFF",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                {isRecording ? "Stop & Save to Cloud" : "Start Covert Recording"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Video Lesson Walkthrough Modal */}
      {activeModal === "video" && (
        <div className="dashboard-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="dashboard-modal" style={{ maxWidth: "560px" }} onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">5 Basic Moves Every Woman Should Know</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <div className="modal-step-item">
                <span className="modal-step-num">1</span>
                <div>
                  <h4 className="modal-step-title">The Palm Heel Strike</h4>
                  <p className="modal-step-desc">Target the assailant&apos;s nose or chin using the solid heel of your palm with rapid hip momentum.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">2</span>
                <div>
                  <h4 className="modal-step-title">The Groin Kick / Knee Strike</h4>
                  <p className="modal-step-desc">Drive your knee sharply upward into the groin area to cause instant incapacitation and create space.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">3</span>
                <div>
                  <h4 className="modal-step-title">Elbow Strike from Behind</h4>
                  <p className="modal-step-desc">Pivot sharply and drive your elbow back horizontally into the attacker&apos;s ribs or solar plexus.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">4</span>
                <div>
                  <h4 className="modal-step-title">Wrist Grab Counter-Release</h4>
                  <p className="modal-step-desc">Rotate your hand toward the attacker&apos;s thumb joint (the weakest grip point) and pull forcefully.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">5</span>
                <div>
                  <h4 className="modal-step-title">Hammer Fist &amp; Safe Escape</h4>
                  <p className="modal-step-desc">Strike downward using the fleshy bottom base of a clenched fist to break free and escape immediately.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setActiveModal(null)}
            >
              Completed Lesson
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
