import React from "react";

// Dashboard Grid / Tiles Icon (2x2 rounded squares)
export const DashboardGridIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.2" />
    <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.2" />
    <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.2" />
    <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Location Pin Nav Icon
export const NavPinIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Siren / Emergency Alarm Icon with radiating dots
export const NavSirenIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 18a5 5 0 0 1 10 0" />
    <path d="M5 21h14" />
    <path d="M12 4v4" />
    <path d="m4.93 6.93 2.83 2.83" />
    <path d="m19.07 6.93-2.83 2.83" />
    <circle cx="12" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

// Safe Shield Nav Icon
export const NavShieldCheckIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// Headset Helpline Nav Icon
export const NavHeadsetIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

// Community / Users Nav Icon
export const NavUsersIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Book / Resources Nav Icon
export const NavBookIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
  </svg>
);

// Settings Gear Nav Icon
export const NavGearIcon = ({ width = 22, height = 22, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Weather Sun Cloud Icon
export const WeatherCloudSunIcon = ({ width = 28, height = 28, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="20" cy="12" r="6" fill="#FBBF24" />
    <path
      d="M22 22H10a6 6 0 0 1-1.2-11.88A7.5 7.5 0 0 1 23.3 12.5 5 5 0 0 1 22 22Z"
      fill="#94A3B8"
      fillOpacity="0.85"
    />
  </svg>
);

// Panic Warning Triangle Icon
export const PanicTriangleIcon = ({ width = 36, height = 36, color = "#FFFFFF", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Bell Notification Icon
export const NotificationBellIcon = ({ width = 18, height = 18, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

// Home Destination Pin Icon
export const HomePinIcon = ({ width = 18, height = 18, color = "#FFFFFF", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// Arrow Right
export const ArrowRightThinIcon = ({ width = 16, height = 16, color = "currentColor", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
