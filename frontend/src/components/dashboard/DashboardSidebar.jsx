import { useNavigate, useLocation } from "react-router-dom";
import { SafeHerLogo } from "../auth/AuthIcons";
import {
  DashboardGridIcon,
  NavPinIcon,
  NavSirenIcon,
  NavShieldCheckIcon,
  NavHeadsetIcon,
  NavUsersIcon,
  NavBookIcon,
  NavGearIcon,
} from "./DashboardIcons";
import { HomeZoneIcon } from "../common/SuiteIcons";

export default function DashboardSidebar({ onOpenGuide, onOpenHelpline, onOpenSettings }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "/dashboard";
  const isTracking = location.pathname === "/tracking" || location.pathname === "/explore";
  const isAlerts = location.pathname === "/alerts";
  const isZones = location.pathname === "/safe-zones" || location.pathname === "/community";
  const isSafetyScore = location.pathname === "/safety-score" || location.pathname === "/score" || location.pathname === "/safety";
  const isContacts = location.pathname === "/contacts" || location.pathname === "/profile";
  const isFlow = location.pathname === "/flow" || location.pathname === "/panic-flow";
  const isTips = location.pathname === "/tips" || location.pathname === "/tools";

  return (
    <aside className="dashboard-sidebar" aria-label="Main Navigation">
      <div className="dashboard-sidebar-top">
        {/* Brand Shield Logo */}
        <div
          className="dashboard-sidebar-logo"
          onClick={() => navigate("/")}
          title="SafeHer Home"
          role="button"
          tabIndex={0}
        >
          <SafeHerLogo width={42} height={46} />
        </div>

        {/* Navigation Rail Buttons */}
        <nav className="dashboard-nav-list">
          {/* 1. Slide 2: Dashboard Overview */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isHome ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
            title="Slide 2: Dashboard Overview"
            aria-label="Dashboard Overview"
          >
            <DashboardGridIcon width={22} height={22} />
          </button>

          {/* 2. Slide 3: Live Tracking */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isTracking ? "active" : ""}`}
            onClick={() => navigate("/tracking")}
            title="Slide 3: Live Route & Tracking"
            aria-label="Live Tracking"
          >
            <NavPinIcon width={22} height={22} />
          </button>

          {/* 3. Slide 7: Recent Alerts */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isAlerts ? "active" : ""}`}
            onClick={() => navigate("/alerts")}
            title="Slide 7: Recent Emergency Alerts"
            aria-label="Recent Alerts"
          >
            <NavSirenIcon width={22} height={22} />
          </button>

          {/* 4. Slide 8: Safe Zones & Community */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isZones ? "active" : ""}`}
            onClick={() => navigate("/safe-zones")}
            title="Slide 8: Safe Zones & Community Safety"
            aria-label="Safe Zones & Community"
          >
            <HomeZoneIcon width={21} height={21} color="currentColor" />
          </button>

          {/* 5. Slide 6: Safety Score */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isSafetyScore ? "active" : ""}`}
            onClick={() => navigate("/safety-score")}
            title="Slide 6: Safety Score & Progress"
            aria-label="Safety Score"
          >
            <NavShieldCheckIcon width={22} height={22} />
          </button>

          {/* 6. Slide 5: Emergency Contacts */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isContacts ? "active" : ""}`}
            onClick={() => navigate("/contacts")}
            title="Slide 5: Emergency Contacts & Trusted Circle"
            aria-label="Emergency Contacts"
          >
            <NavUsersIcon width={22} height={22} />
          </button>

          {/* 7. Slide 4: Panic Emergency Flow */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isFlow ? "active" : ""}`}
            onClick={() => navigate("/flow")}
            title="Slide 4: Panic Button Emergency Flow"
            aria-label="Panic Flow"
          >
            <NavBookIcon width={22} height={22} />
          </button>

          {/* 8. Slide 9: Self Defense Tips & Safety Tools */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isTips ? "active" : ""}`}
            onClick={() => navigate("/tips")}
            title="Slide 9: Self Defense Tips & Safety Tools"
            aria-label="Tips and Tools"
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>

          {/* 9. Helpline & Crisis Support (24/7) */}
          <button
            type="button"
            className="dashboard-nav-btn"
            onClick={onOpenHelpline || (() => { window.location.href = "tel:18001234567"; })}
            title="24/7 Crisis Helpline (1800-123-4567)"
            aria-label="Helplines"
          >
            <NavHeadsetIcon width={22} height={22} />
          </button>
        </nav>
      </div>

      {/* Bottom Settings Gear */}
      <div className="dashboard-sidebar-bottom">
        <button
          type="button"
          className="dashboard-nav-btn"
          onClick={onOpenSettings}
          title="Account & App Settings"
          aria-label="Settings"
        >
          <NavGearIcon width={22} height={22} />
        </button>
      </div>
    </aside>
  );
}
