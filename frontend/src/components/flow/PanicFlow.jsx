import { useState } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import BottomNav from "../common/BottomNav";
import { SafeHerLogo } from "../auth/AuthIcons";
import { PanicTriangleIcon } from "../dashboard/DashboardIcons";
import SlideQuickSwitcher from "../common/SlideQuickSwitcher";
import "../../styles/panic-flow.css";
import "../../styles/slides-7-8-9.css";

// Step 3 Bell Icon
function BellRingIcon({ width = 48, height = 48, color = "#F43F86" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

// Step 4 Shield Check Icon
function ShieldSuccessIcon({ width = 72, height = 80 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shield-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      <path
        d="M22 2L4 8.8V21.6C4 32.7 11.6 42.9 22 46C32.4 42.9 40 32.7 40 21.6V8.8L22 2Z"
        fill="url(#shield-purple-grad)"
        stroke="#A78BFA"
        strokeWidth="2.5"
      />
      <path
        d="M14 23L20 29L30 18"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arrow Between Steps
function StepArrowIcon() {
  return (
    <div className="flow-arrow-separator" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </div>
  );
}

export default function PanicFlow() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="flow-shell">
      {/* Left Navigation Rail */}
      <DashboardSidebar
        onOpenGuide={() => {}}
        onOpenHelpline={() => {
          window.location.href = "tel:112";
        }}
        onOpenSettings={() => {}}
      />

      {/* Main Flow Stage */}
      <main className="flow-main">
        {/* Top Slide Quick Switcher */}
        <SlideQuickSwitcher currentSlide={4} />

        {/* Header */}
        <header className="flow-header">
          <div className="flow-slide-tag">Slide 4</div>
          <h1 className="flow-title">Panic Button Flow</h1>
          <p className="flow-subtitle">One tap. Instant help.</p>
        </header>

        {/* 4-Step Flow Grid */}
        <section className="flow-steps-container" aria-label="Emergency SOS Process Flow">
          {/* Step 1 */}
          <div
            className={`flow-step-card ${activeStep === 1 ? "active-step" : ""}`}
            onClick={() => setActiveStep(1)}
          >
            <div className="flow-visual-stage">
              <div className="flow-panic-btn-3d">
                <PanicTriangleIcon width={24} height={24} />
                <span className="flow-panic-label">PANIC</span>
              </div>
            </div>
            <h2 className="flow-step-title">1. Press &amp; Hold</h2>
            <p className="flow-step-desc">Press the panic button for 3 seconds.</p>
          </div>

          <StepArrowIcon />

          {/* Step 2 */}
          <div
            className={`flow-step-card ${activeStep === 2 ? "active-step" : ""}`}
            onClick={() => setActiveStep(2)}
          >
            <div className="flow-visual-stage">
              <div className="flow-phone-mockup">
                <div className="flow-phone-notch" />
                <div className="flow-phone-sos-badge">SOS</div>
              </div>
            </div>
            <h2 className="flow-step-title">2. Alert Sent</h2>
            <p className="flow-step-desc">Instant alert sent to your contacts.</p>
          </div>

          <StepArrowIcon />

          {/* Step 3 */}
          <div
            className={`flow-step-card ${activeStep === 3 ? "active-step" : ""}`}
            onClick={() => setActiveStep(3)}
          >
            <div className="flow-visual-stage">
              <div className="flow-bell-visual">
                <BellRingIcon width={44} height={44} color="#F43F86" />
              </div>
            </div>
            <h2 className="flow-step-title">3. They Respond</h2>
            <p className="flow-step-desc">Your contacts get your location.</p>
          </div>

          <StepArrowIcon />

          {/* Step 4 */}
          <div
            className={`flow-step-card ${activeStep === 4 ? "active-step" : ""}`}
            onClick={() => setActiveStep(4)}
          >
            <div className="flow-visual-stage">
              <div className="flow-shield-visual">
                <ShieldSuccessIcon width={68} height={74} />
              </div>
            </div>
            <h2 className="flow-step-title">4. Help is on the Way</h2>
            <p className="flow-step-desc">Stay calm, help is on the way!</p>
          </div>
        </section>

        {/* Bottom Assurance Card */}
        <section className="flow-reassurance-card" aria-label="Brand Assurance">
          <div className="flow-reassurance-badge">
            <SafeHerLogo width={26} height={28} />
          </div>
          <span className="flow-reassurance-text">We are always with you.</span>
        </section>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="dashboard-mobile-nav">
        <BottomNav />
      </div>
    </div>
  );
}
