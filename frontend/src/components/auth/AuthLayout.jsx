import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SafeHerLogo,
  ShieldCheckIcon,
  PinIcon,
  CommunityIcon,
  GlobeIcon,
  TabUserIcon,
  TabUserPlusIcon,
  ChevronDownIcon,
  HeartFilledIcon,
  QuoteMarksIcon,
  LockIcon,
} from "./AuthIcons";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import "../../styles/auth-split.css";

export default function AuthLayout({ initialTab = "login" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  // Keep state in sync with URL
  useEffect(() => {
    if (location.pathname.includes("register")) {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [location.pathname]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === "login" && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    } else if (tab === "register" && location.pathname !== "/register") {
      navigate("/register", { replace: true });
    }
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  return (
    <div className="auth-split-wrapper">
      <div className="auth-split-card">
        {/* =========================================================
            LEFT COLUMN: Atmospheric Dark Hero & Value Propositions
            ========================================================= */}
        <div className="auth-hero-panel">
          {/* Background image & atmospheric overlay */}
          <div className="auth-hero-bg" />
          <div className="auth-hero-overlay" />
          <div className="auth-hero-watermark" />

          {/* Dot grid decoration in bottom-left */}
          <div className="auth-dot-grid" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          <div className="auth-hero-content">
            {/* Top Brand Header */}
            <div className="auth-brand">
              <SafeHerLogo width={44} height={48} />
              <div className="auth-brand-info">
                <div className="auth-brand-title">
                  Safe<span>Her</span>
                </div>
                <div className="auth-brand-tagline">Stay Safe, Stay Strong</div>
              </div>
            </div>

            {/* Central Main Headings & Features */}
            <div className="auth-hero-main">
              <div className="auth-hero-headings">
                <h1 className="auth-hero-title">
                  Your Safety.
                  <br />
                  Our <span className="priority-highlight">Priority.</span>
                </h1>
                <p className="auth-hero-desc">
                  Empowering women with smart tools, instant support &amp; a safer tomorrow.
                </p>
              </div>

              {/* 3 Value Proposition Features */}
              <div className="auth-features-list">
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">
                    <ShieldCheckIcon width={22} height={22} />
                  </div>
                  <div className="auth-feature-texts">
                    <div className="auth-feature-title">Instant Protection</div>
                    <div className="auth-feature-sub">One tap SOS &amp; real-time alerts</div>
                  </div>
                </div>

                <div className="auth-feature-item">
                  <div className="auth-feature-icon">
                    <PinIcon width={22} height={22} />
                  </div>
                  <div className="auth-feature-texts">
                    <div className="auth-feature-title">Live Tracking</div>
                    <div className="auth-feature-sub">Share location with your trusted ones</div>
                  </div>
                </div>

                <div className="auth-feature-item">
                  <div className="auth-feature-icon">
                    <CommunityIcon width={22} height={22} />
                  </div>
                  <div className="auth-feature-texts">
                    <div className="auth-feature-title">Stronger Together</div>
                    <div className="auth-feature-sub">Community support &amp; safety tips</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspirational Quote Card */}
            <div className="auth-quote-card">
              <span className="auth-quote-marks">
                <QuoteMarksIcon width={22} height={22} />
              </span>
              <p className="auth-quote-text">
                You are braver than you believe, stronger than you seem, and smarter than you think.
              </p>
              <div className="auth-quote-heart" title="Made for women empowerment">
                <HeartFilledIcon width={15} height={15} />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: Modern Luminous Authentication Container
            ========================================================= */}
        <div className="auth-form-panel">
          {/* Decorative Vertical Dots Indicator on far right edge */}
          <div className="auth-vertical-dots" aria-hidden="true">
            <span className="dot" />
            <span className="dot active" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>

          <div>
            {/* Top Bar: Language Selector */}
            <div className="auth-top-util">
              <button
                type="button"
                className="auth-lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-label="Select Language"
              >
                <GlobeIcon width={16} height={16} color="#64748B" />
                <span>{currentLang}</span>
                <ChevronDownIcon width={13} height={13} color="#64748B" />
              </button>

              {langOpen && (
                <div className="auth-lang-dropdown">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`auth-lang-option ${currentLang === l.name ? "active" : ""}`}
                      onClick={() => {
                        setCurrentLang(l.name);
                        setLangOpen(false);
                      }}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header Titles */}
            <div className="auth-form-header">
              <h2 className="auth-form-title">
                {activeTab === "login" ? (
                  <>
                    Welcome Back! <span role="img" aria-label="wave">👋</span>
                  </>
                ) : (
                  <>
                    Create Account <span role="img" aria-label="sparkles">✨</span>
                  </>
                )}
              </h2>
              <p className="auth-form-sub">
                {activeTab === "login"
                  ? "Login to continue your safety journey"
                  : "Join SafeHer to empower and protect your safety"}
              </p>
            </div>

            {/* Segmented Pill Switcher */}
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "login"}
                className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => handleTabSwitch("login")}
              >
                <TabUserIcon width={16} height={16} />
                <span>Login</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "register"}
                className={`auth-tab-btn ${activeTab === "register" ? "active" : ""}`}
                onClick={() => handleTabSwitch("register")}
              >
                <TabUserPlusIcon width={16} height={16} />
                <span>Create Account</span>
              </button>
            </div>

            {/* Tab Form Content */}
            {activeTab === "login" ? (
              <LoginForm onSwitchToRegister={() => handleTabSwitch("register")} />
            ) : (
              <RegisterForm onSwitchToLogin={() => handleTabSwitch("login")} />
            )}
          </div>

          {/* Bottom Security Trust Card & Footer Support */}
          <div>
            <div className="auth-security-pill">
              <div className="auth-security-left">
                <div className="auth-security-icon-badge">
                  <ShieldCheckIcon width={18} height={18} color="#FFFFFF" />
                </div>
                <div className="auth-security-text">
                  <span className="auth-security-title">Your data is 100% secure with us.</span>
                  <span className="auth-security-sub">We never share your information.</span>
                </div>
              </div>
              <div className="auth-security-lock">
                <LockIcon width={18} height={18} />
              </div>
            </div>

            <p className="auth-footer">
              Need help?{" "}
              <a
                href="mailto:support@safeher.org"
                className="auth-support-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("SafeHer Support Team: Available 24/7 for assistance at support@safeher.org or toll-free helpline.");
                }}
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
