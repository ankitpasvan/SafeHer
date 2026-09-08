import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import SlideQuickSwitcher from "../common/SlideQuickSwitcher";
import {
  VideoPlayIcon,
  EyeViewsIcon,
  ToolMicIcon,
  ToolFakeCallIcon,
  ToolFlashlightIcon,
  ToolSirenIcon,
  ToolScreenshotIcon,
  HelplinePhoneIcon,
} from "../common/SuiteIcons";
import { SelfDefenseVideoGraphic } from "../common/SuiteGraphics";
import { ArrowRightThinIcon } from "../dashboard/DashboardIcons";
import "../../styles/slides-7-8-9.css";

export default function SelfDefenseTools() {
  const navigate = useNavigate();

  // Interactive tool states
  const [activeToolModal, setActiveToolModal] = useState(null); // 'fakeCall' | 'siren' | 'recorder' | 'flashlight' | 'screenshot' | 'video'
  const [isRecording, setIsRecording] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [screenshotFlashed, setScreenshotFlashed] = useState(false);

  // Audio ref for Siren alarm
  const audioCtxRef = useRef(null);

  // Trigger audio siren simulation via Web Audio API (cross-platform, zero assets needed)
  const toggleSiren = () => {
    if (sirenPlaying) {
      setSirenPlaying(false);
      setActiveToolModal(null);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
        audioCtxRef.current = null;
      }
    } else {
      setSirenPlaying(true);
      setActiveToolModal("siren");
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.4);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          setTimeout(() => {
            try {
              osc.stop();
            } catch (_) {}
          }, 4000);
        }
      } catch (_) {}
    }
  };

  // Trigger screenshot flash
  const triggerScreenshot = () => {
    setScreenshotFlashed(true);
    setActiveToolModal("screenshot");
    setTimeout(() => {
      setScreenshotFlashed(false);
    }, 800);
  };

  return (
    <div className="suite-page-shell">
      {/* Screenshot Flash Overlay */}
      {screenshotFlashed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#FFFFFF",
            zIndex: 99999,
            animation: "screenshotPulse 0.6s ease forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Flashlight Fullscreen Lantern Mode */}
      {flashlightOn && (
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
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>💡</div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 8px" }}>
            MAX ILLUMINATION TORCH ACTIVE
          </h2>
          <p style={{ fontSize: "14px", color: "#4B5563", marginBottom: "24px" }}>
            Screen set to 100% white luminance for disorientation and night illumination.
          </p>
          <button
            type="button"
            onClick={() => setFlashlightOn(false)}
            style={{
              padding: "12px 28px",
              background: "#111827",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "999px",
              fontWeight: "700",
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

      {/* Main Content Area */}
      <main className="suite-page-main">
        {/* Top Slide Quick Switcher */}
        <SlideQuickSwitcher currentSlide={9} />

        {/* Master Slide Header */}
        <header className="suite-page-header">
          <div className="suite-slide-tag">Slide 9</div>
          <h1 className="suite-page-title">Self Defense Tips &amp; Safety Tools</h1>
          <p className="suite-page-subtitle">Arm your awareness. Instant crisis tools at your fingertips.</p>
        </header>

        {/* Two-Column Master Grid */}
        <div className="defense-tools-layout">
          {/* =========================================================
              LEFT CARD: SELF DEFENSE TIPS
              ========================================================= */}
          <section className="suite-glass-card" aria-label="Self Defense Training Video">
            <div className="suite-card-header">
              <h2 className="suite-card-title">Self Defense Tips</h2>
              <button
                type="button"
                className="suite-view-all-link"
                onClick={() => setActiveToolModal("video")}
              >
                View all
              </button>
            </div>

            {/* Video Lesson Preview Thumbnail */}
            <div
              className="video-preview-wrapper"
              onClick={() => setActiveToolModal("video")}
              role="button"
              tabIndex={0}
            >
              <SelfDefenseVideoGraphic />

              {/* Overlay Content */}
              <div className="video-overlay-details">
                <span className="video-overlay-title">
                  5 Basic Moves Every Women Should Know
                </span>

                <div className="video-overlay-bottom">
                  <div className="video-views-badge">
                    <EyeViewsIcon width={14} height={14} />
                    <span>35</span>
                  </div>
                  <span className="video-duration-pill">04:35</span>
                </div>
              </div>

              {/* Centered Play Button */}
              <div className="video-center-play">
                <VideoPlayIcon width={22} height={22} color="#FFFFFF" />
              </div>
            </div>

            {/* Bullet Points */}
            <div className="defense-bullets-list">
              <div className="defense-bullet-item">
                <span className="defense-bullet-dot">✦</span>
                <span>Watch &amp; Learn</span>
              </div>
              <div className="defense-bullet-item">
                <span className="defense-bullet-dot">✦</span>
                <span>Practice Daily</span>
              </div>
              <div className="defense-bullet-item">
                <span className="defense-bullet-dot">✦</span>
                <span>Stay Strong, Stay Safe</span>
              </div>
            </div>

            {/* "Explore More Tips ->" Button */}
            <button
              type="button"
              className="btn-explore-tips"
              onClick={() => setActiveToolModal("video")}
            >
              <span>Explore More Tips</span>
              <ArrowRightThinIcon width={16} height={16} />
            </button>
          </section>

          {/* =========================================================
              RIGHT COLUMN: SAFETY TOOLS & 24/7 HELPLINE
              ========================================================= */}
          <div className="right-stacked-container">
            {/* Top Right Card: Safety Tools */}
            <section className="suite-glass-card" aria-label="Rapid Safety Tools">
              <div className="suite-card-header">
                <h2 className="suite-card-title">Safety Tools</h2>
              </div>

              <div className="safety-tools-row">
                {/* 1. Voice Recorder */}
                <button
                  type="button"
                  className="safety-tool-btn"
                  onClick={() => {
                    setIsRecording(!isRecording);
                    setActiveToolModal("recorder");
                  }}
                  title="Record audio discreetly"
                >
                  <div className="tool-square-icon color-violet">
                    <ToolMicIcon />
                  </div>
                  <span className="tool-btn-label">Voice<br />Recorder</span>
                </button>

                {/* 2. Fake Call */}
                <button
                  type="button"
                  className="safety-tool-btn"
                  onClick={() => setActiveToolModal("fakeCall")}
                  title="Simulate incoming rescue call"
                >
                  <div className="tool-square-icon color-green">
                    <ToolFakeCallIcon />
                  </div>
                  <span className="tool-btn-label">Fake<br />Call</span>
                </button>

                {/* 3. Flash Light */}
                <button
                  type="button"
                  className="safety-tool-btn"
                  onClick={() => setFlashlightOn(true)}
                  title="Strobe lantern beam"
                >
                  <div className="tool-square-icon color-amber">
                    <ToolFlashlightIcon />
                  </div>
                  <span className="tool-btn-label">Flash<br />Light</span>
                </button>

                {/* 4. Siren */}
                <button
                  type="button"
                  className="safety-tool-btn"
                  onClick={toggleSiren}
                  title="High-decibel emergency siren"
                >
                  <div className="tool-square-icon color-red">
                    <ToolSirenIcon />
                  </div>
                  <span className="tool-btn-label">Siren</span>
                </button>

                {/* 5. Screenshot */}
                <button
                  type="button"
                  className="safety-tool-btn"
                  onClick={triggerScreenshot}
                  title="Instant covert snapshot capture"
                >
                  <div className="tool-square-icon color-cyan">
                    <ToolScreenshotIcon />
                  </div>
                  <span className="tool-btn-label">Screenshot</span>
                </button>
              </div>
            </section>

            {/* Bottom Right Card: Need Immediate Help? */}
            <section className="immediate-help-card" aria-label="24/7 Immediate Emergency Helpline">
              <div className="immediate-help-left">
                <h3 className="immediate-help-title">Need Immediate Help?</h3>
                <span className="immediate-help-sub">Call our 24/7 Helpline</span>
                <a
                  href="tel:18001234567"
                  className="immediate-helpline-number"
                  title="Click to dial 1800-123-4567"
                >
                  1800-123-4567
                </a>
              </div>

              <a
                href="tel:18001234567"
                className="immediate-call-circle-btn"
                title="Instant Call 1800-123-4567"
                aria-label="Call 24/7 Helpline"
              >
                <HelplinePhoneIcon width={28} height={28} />
              </a>
            </section>
          </div>
        </div>
      </main>

      {/* =========================================================
          INTERACTIVE SIMULATION MODALS
          ========================================================= */}

      {/* 1. Fake Call Simulation Modal */}
      {activeToolModal === "fakeCall" && (
        <div className="dashboard-modal-backdrop" onClick={() => setActiveToolModal(null)}>
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
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#2D1854",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                border: "2px solid #7C3AED",
                boxShadow: "0 0 24px rgba(124, 58, 237, 0.4)",
              }}
            >
              📞
            </div>
            <h3 style={{ fontSize: "22px", margin: "0 0 4px", color: "#FFFFFF" }}>Dad (Safety Check)</h3>
            <p style={{ color: "#A855F7", fontSize: "14px", margin: "0 0 32px" }}>Incoming Rescue Call...</p>

            <div style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}>
              {/* Decline */}
              <button
                type="button"
                onClick={() => setActiveToolModal(null)}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#EF4444",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
                title="Decline"
              >
                ✕
              </button>

              {/* Accept */}
              <button
                type="button"
                onClick={() => {
                  alert("Simulated call connected: 'Hey, I'm waiting outside for you right now, come out.'");
                  setActiveToolModal(null);
                }}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#10B981",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
                title="Accept"
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Siren Playing Modal */}
      {activeToolModal === "siren" && (
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
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>🚨</div>
            <h3 style={{ color: "#EF4444", fontSize: "20px", margin: "0 0 8px" }}>
              HIGH-DECIBEL SIREN BROADCASTING
            </h3>
            <p style={{ color: "#E2E0EE", fontSize: "13px", marginBottom: "20px" }}>
              Emitting piercing acoustic distress beacon to attract bystanders and deter threats.
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
      {activeToolModal === "recorder" && (
        <div className="dashboard-modal-backdrop" onClick={() => setActiveToolModal(null)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">Discreet Audio Evidence Vault</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setActiveToolModal(null)}
              >
                ✕
              </button>
            </div>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: isRecording ? "#EF4444" : "#6D28D9",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  boxShadow: isRecording ? "0 0 20px #EF4444" : "0 0 16px #6D28D9",
                }}
              >
                🎙️
              </div>
              <h4 style={{ margin: "0 0 6px", color: "#FFFFFF" }}>
                {isRecording ? "Recording Encrypted Ambient Audio..." : "Audio Recorder Ready"}
              </h4>
              <p style={{ fontSize: "12px", color: "#8C86A5", margin: "0 0 20px" }}>
                Encrypted with AES-256 and synchronized in real-time to your emergency contact vault.
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
      {activeToolModal === "video" && (
        <div className="dashboard-modal-backdrop" onClick={() => setActiveToolModal(null)}>
          <div className="dashboard-modal" style={{ maxWidth: "560px" }} onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-header">
              <h3 className="dashboard-modal-title">5 Basic Moves Every Woman Should Know</h3>
              <button
                type="button"
                className="dashboard-modal-close"
                onClick={() => setActiveToolModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-step-list">
              <div className="modal-step-item">
                <span className="modal-step-num">1</span>
                <div>
                  <h4 className="modal-step-title">The Palm Heel Strike</h4>
                  <p className="modal-step-desc">Target the assailant&apos;s nose or chin using the hard heel of your open palm with full hip rotation.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">2</span>
                <div>
                  <h4 className="modal-step-title">The Groin Kick / Knee Strike</h4>
                  <p className="modal-step-desc">Deliver an upward knee drive or straight instep kick for immediate incapacitation.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">3</span>
                <div>
                  <h4 className="modal-step-title">Elbow Strike from Behind</h4>
                  <p className="modal-step-desc">Pivot and drive your elbow horizontally into the solar plexus or chin if grabbed from the back.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">4</span>
                <div>
                  <h4 className="modal-step-title">Wrist Grab Release</h4>
                  <p className="modal-step-desc">Rotate your wrist toward the attacker&apos;s thumb (the weakest point of grip) and pull sharply.</p>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">5</span>
                <div>
                  <h4 className="modal-step-title">Hammer Fist &amp; Sprint</h4>
                  <p className="modal-step-desc">Strike downward with clenched bottom of fist onto vulnerable pressure points, then escape.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-how-it-works"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setActiveToolModal(null)}
            >
              Completed Lesson
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
