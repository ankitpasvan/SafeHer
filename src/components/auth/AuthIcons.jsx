import React from "react";

// SafeHer Logo: Shield with Venus (♀) symbol
export const SafeHerLogo = ({ width = 42, height = 42, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 44 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="safeher-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="50%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#9333EA" />
      </linearGradient>
      <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F43F5E" floodOpacity="0.4" />
      </filter>
    </defs>
    <path
      d="M22 2L4 8.8V21.6C4 32.7 11.6 42.9 22 46C32.4 42.9 40 32.7 40 21.6V8.8L22 2Z"
      fill="url(#safeher-shield-grad)"
      filter="url(#glow-pink)"
    />
    <circle cx="22" cy="19" r="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
    <line x1="22" y1="25" x2="22" y2="34" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="29.5" x2="26" y2="29.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Mail Icon
export const MailIcon = ({ width = 18, height = 18, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="3" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Lock Icon
export const LockIcon = ({ width = 18, height = 18, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Shield Check Icon (for buttons and feature pills)
export const ShieldCheckIcon = ({ width = 20, height = 20, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// Map Pin Location Icon
export const PinIcon = ({ width = 20, height = 20, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Users / Community Icon
export const CommunityIcon = ({ width = 20, height = 20, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Globe Icon (for Language Selector)
export const GlobeIcon = ({ width = 16, height = 16, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// User Icon
export const TabUserIcon = ({ width = 16, height = 16, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// User Plus Icon (Create Account)
export const TabUserPlusIcon = ({ width = 16, height = 16, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

// Google 4-Color Logo
export const GoogleLogo = ({ width = 18, height = 18, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" className={className}>
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.6 7.2C.6 9.2 0 10.5 0 12.4s.6 3.2 1.6 5.2l3.7-2.9z"
    />
    <path
      fill="#34A853"
      d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.2-6.7-5.3L1.6 16.4C3.5 20.3 7.4 23.5 12 23.5z"
    />
  </svg>
);

// Apple Logo
export const AppleLogo = ({ width = 18, height = 18, color = "#000000", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 170 170" fill={color} className={className}>
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-5.35-8.37-9.59-17.7-12.74-28-3.15-10.3-4.73-20.2-4.73-29.7 0-14.42 3.69-26.65 11.06-36.68 7.37-10.04 16.85-15.17 28.43-15.4 4.58 0 9.77 1.23 15.58 3.7 5.81 2.47 9.87 3.76 12.18 3.87 1.85 0 6.07-1.34 12.67-4.02 6.6-2.68 12.35-3.88 17.27-3.6 13.06.77 23.47 5.56 31.25 14.39-11.45 6.94-17.06 16.5-16.84 28.69.22 9.53 3.86 17.5 10.92 23.9 7.07 6.41 15.42 10.07 25.07 10.98-2.17 6.31-4.89 12.98-8.17 20.02zm-33.15-107.8c0 7.4-2.73 14.28-8.17 20.65-5.45 6.36-12.24 10.4-20.37 12.11-.22-1.09-.33-2.18-.33-3.26 0-7.18 2.94-14.4 8.81-21.65 5.88-7.25 12.89-11.49 21.03-12.72.11 1.63.22 3.25.22 4.87z" />
  </svg>
);

// Phone Icon
export const PhoneCallIcon = ({ width = 18, height = 18, color = "#1E293B", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Chevron Down
export const ChevronDownIcon = ({ width = 14, height = 14, color = "currentColor", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// Heart Icon
export const HeartFilledIcon = ({ width = 14, height = 14, color = "#FF3377", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    stroke="none"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Quote Icon
export const QuoteMarksIcon = ({ width = 24, height = 24, color = "#F43F86", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 2.638-3.995 4.849h4v11h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 2.638-3.996 4.849h3.983v11h-9.983z" />
  </svg>
);
