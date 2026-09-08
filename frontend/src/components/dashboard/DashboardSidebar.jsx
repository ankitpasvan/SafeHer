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

export default function DashboardSidebar({ onOpenGuide, onOpenHelpline, onOpenSettings }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "/dashboard";
  const isExplore = location.pathname === "/explore" || location.pathname === "/tracking";
  const isAlerts = location.pathname === "/alerts";
  const isSafety = location.pathname === "/safety";
  const isProfile = location.pathname === "/profile";
  const isFlow = location.pathname === "/flow" || location.pathname === "/panic-flow";

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
          {/* 1. Dashboard Overview (Active Tile) */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isHome ? "active" : ""}`}
            onClick={() => navigate("/")}
            title="Dashboard Overview"
            aria-label="Dashboard"
          >
            <DashboardGridIcon width={22} height={22} />
          </button>

          {/* 2. Live Tracking / Map */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isExplore ? "active" : ""}`}
            onClick={() => navigate("/tracking")}
            title="Live Route & Tracking"
            aria-label="Live Tracking"
          >
            <NavPinIcon width={22} height={22} />
          </button>

          {/* 3. Siren / SOS Alerts */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isAlerts ? "active" : ""}`}
            onClick={() => navigate("/alerts")}
            title="SOS Alerts & Siren"
            aria-label="Alerts"
          >
            <NavSirenIcon width={22} height={22} />
          </button>

          {/* 4. Safe Zones & Safety Tools */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isSafety ? "active" : ""}`}
            onClick={() => navigate("/safety")}
            title="Safety Protection Tools"
            aria-label="Safety Tools"
          >
            <NavShieldCheckIcon width={22} height={22} />
          </button>

          {/* 5. Helpline & Crisis Support */}
          <button
            type="button"
            className="dashboard-nav-btn"
            onClick={onOpenHelpline}
            title="Emergency Helplines (24/7)"
            aria-label="Helplines"
          >
            <NavHeadsetIcon width={22} height={22} />
          </button>

          {/* 6. Community & Safety Circle */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isProfile ? "active" : ""}`}
            onClick={() => navigate("/profile")}
            title="Safety Circle & Community"
            aria-label="Community"
          >
            <NavUsersIcon width={22} height={22} />
          </button>

          {/* 7. Panic Button Flow / Resources */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isFlow ? "active" : ""}`}
            onClick={() => navigate("/flow")}
            title="Panic Button Emergency Flow (Slide 4)"
            aria-label="Panic Flow"
          >
            <NavBookIcon width={22} height={22} />
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
