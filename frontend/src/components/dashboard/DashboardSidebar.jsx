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
  const isZones = location.pathname === "/safe-zones" || location.pathname === "/community";
  const isSafety = location.pathname === "/safety" || location.pathname === "/safety-score" || location.pathname === "/score";
  const isProfile = location.pathname === "/profile" || location.pathname === "/contacts";
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

          {/* 3. Siren / SOS Alerts (Slide 7) */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isAlerts ? "active" : ""}`}
            onClick={() => navigate("/alerts")}
            title="SOS Alerts & Siren (Slide 7)"
            aria-label="Alerts"
          >
            <NavSirenIcon width={22} height={22} />
          </button>

          {/* 4. Safe Zones & Community (Slide 8) */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isZones ? "active" : ""}`}
            onClick={() => navigate("/safe-zones")}
            title="Safe Zones & Community (Slide 8)"
            aria-label="Safe Zones"
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>

          {/* 5. Safety Score (Slide 6) */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isSafety ? "active" : ""}`}
            onClick={() => navigate("/safety-score")}
            title="Safety Score & Progress (Slide 6)"
            aria-label="Safety Score"
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
            onClick={() => navigate("/contacts")}
            title="Emergency Contacts & Trusted Circle (Slide 5)"
            aria-label="Emergency Contacts"
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

          {/* 8. Self Defense Tips & Safety Tools (Slide 9) */}
          <button
            type="button"
            className={`dashboard-nav-btn ${isTips ? "active" : ""}`}
            onClick={() => navigate("/tips")}
            title="Self Defense Tips & Safety Tools (Slide 9)"
            aria-label="Tips & Tools"
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
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
