import React from "react";

// Slide 8: 4 Women in Purple/Pink Solidarity Vector Graphic
export const WomenSolidarityGraphic = ({ className = "" }) => (
  <svg
    viewBox="0 0 400 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ width: "100%", height: "auto", display: "block" }}
  >
    <defs>
      <linearGradient id="solidarity-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E1035" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#2A1245" stopOpacity="0.9" />
      </linearGradient>

      {/* Woman 1 Gradient: Magenta */}
      <linearGradient id="w1-dress" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>

      {/* Woman 2 Gradient: Indigo */}
      <linearGradient id="w2-dress" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>

      {/* Woman 3 Gradient: Violet */}
      <linearGradient id="w3-dress" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>

      {/* Woman 4 Gradient: Rose */}
      <linearGradient id="w4-dress" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F43F86" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>

      {/* Hair Gradients */}
      <linearGradient id="hair-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2E1065" />
        <stop offset="100%" stopColor="#170438" />
      </linearGradient>
      <linearGradient id="hair-warm" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4C1D95" />
        <stop offset="100%" stopColor="#2E1065" />
      </linearGradient>
    </defs>

    {/* Background Glow */}
    <rect width="400" height="160" rx="16" fill="url(#solidarity-bg)" />

    {/* Heart floating accents */}
    <path d="M70 30 C70 26 73 23 77 23 C80 23 82 25 83 27 C84 25 86 23 89 23 C93 23 96 26 96 30 C96 36 83 43 83 43 C83 43 70 36 70 30 Z" fill="#F43F86" fillOpacity="0.35" />
    <path d="M320 25 C320 22 322 20 325 20 C327 20 329 21 330 23 C331 21 333 20 335 20 C338 20 340 22 340 25 C340 30 330 35 330 35 C330 35 320 30 320 25 Z" fill="#A855F7" fillOpacity="0.3" />

    {/* =====================
        WOMAN 1 (Far Left)
        ===================== */}
    <g transform="translate(45, 30)">
      {/* Hair Behind */}
      <ellipse cx="25" cy="45" rx="19" ry="24" fill="url(#hair-dark)" />
      {/* Torso / Dress */}
      <path d="M 5 95 Q 25 70 45 95 L 48 130 L 2 130 Z" fill="url(#w1-dress)" />
      {/* Neck */}
      <rect x="21" y="60" width="8" height="15" rx="3" fill="#D97706" />
      {/* Head */}
      <ellipse cx="25" cy="46" rx="14" ry="17" fill="#F59E0B" />
      {/* Hair Front */}
      <path d="M 12 36 Q 25 22 38 36 Q 32 46 25 38 Q 18 46 12 36 Z" fill="url(#hair-dark)" />
      {/* Smile */}
      <path d="M 22 53 Q 25 56 28 53" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* =====================
        WOMAN 2 (Center Left)
        ===================== */}
    <g transform="translate(130, 22)">
      {/* Hair Behind */}
      <ellipse cx="30" cy="50" rx="22" ry="28" fill="url(#hair-warm)" />
      {/* Torso / Dress */}
      <path d="M 6 102 Q 30 75 54 102 L 58 138 L 2 138 Z" fill="url(#w2-dress)" />
      {/* Neck */}
      <rect x="25" y="65" width="10" height="16" rx="4" fill="#EAB308" />
      {/* Head */}
      <ellipse cx="30" cy="49" rx="16" ry="19" fill="#FDE047" />
      {/* Hair Buns / Curls */}
      <path d="M 14 38 Q 30 20 46 38 Q 40 50 30 40 Q 20 50 14 38 Z" fill="url(#hair-warm)" />
      {/* Smile */}
      <path d="M 27 57 Q 30 60 33 57" stroke="#854D0E" strokeWidth="1.6" strokeLinecap="round" />
    </g>

    {/* =====================
        WOMAN 3 (Center Right)
        ===================== */}
    <g transform="translate(215, 18)">
      {/* Hair Long */}
      <path d="M 12 40 Q 30 18 48 40 Q 56 75 50 100 Q 30 90 10 100 Q 4 75 12 40 Z" fill="url(#hair-dark)" />
      {/* Torso / Dress */}
      <path d="M 6 106 Q 30 78 54 106 L 58 142 L 2 142 Z" fill="url(#w3-dress)" />
      {/* Neck */}
      <rect x="25" y="68" width="10" height="16" rx="4" fill="#FBBF24" />
      {/* Head */}
      <ellipse cx="30" cy="52" rx="16" ry="19" fill="#FCD34D" />
      {/* Bangs */}
      <path d="M 14 42 Q 30 28 46 42 Q 38 52 30 45 Q 22 52 14 42 Z" fill="url(#hair-dark)" />
      {/* Smile */}
      <path d="M 27 60 Q 30 63 33 60" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
    </g>

    {/* =====================
        WOMAN 4 (Far Right)
        ===================== */}
    <g transform="translate(295, 30)">
      {/* Hair Behind */}
      <ellipse cx="25" cy="45" rx="19" ry="24" fill="url(#hair-warm)" />
      {/* Torso / Dress */}
      <path d="M 5 95 Q 25 70 45 95 L 48 130 L 2 130 Z" fill="url(#w4-dress)" />
      {/* Neck */}
      <rect x="21" y="60" width="8" height="15" rx="3" fill="#D97706" />
      {/* Head */}
      <ellipse cx="25" cy="46" rx="14" ry="17" fill="#F59E0B" />
      {/* Hair Front */}
      <path d="M 12 36 Q 25 24 38 36 Q 32 46 25 38 Q 18 46 12 36 Z" fill="url(#hair-warm)" />
      {/* Smile */}
      <path d="M 22 53 Q 25 56 28 53" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Slide 9: Self Defense Video Lesson Thumbnail Graphic
export const SelfDefenseVideoGraphic = ({ className = "" }) => (
  <svg
    viewBox="0 0 380 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  >
    <defs>
      <linearGradient id="vid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A154B" />
        <stop offset="50%" stopColor="#6B21A8" />
        <stop offset="100%" stopColor="#831843" />
      </linearGradient>
      <radialGradient id="play-pulse" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background */}
    <rect width="380" height="160" rx="14" fill="url(#vid-grad)" />

    {/* Martial Arts Dynamic Silhouette Background */}
    <g opacity="0.25">
      {/* Silhouette 1: Guard Stance */}
      <circle cx="280" cy="50" r="14" fill="#FFFFFF" />
      <path d="M265 68 Q280 62 295 68 L300 110 L260 110 Z" fill="#FFFFFF" />
      <line x1="265" y1="75" x2="245" y2="60" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
      <line x1="295" y1="75" x2="315" y2="70" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />

      {/* Silhouette 2: High Block Stance */}
      <circle cx="340" cy="45" r="12" fill="#FFFFFF" />
      <path d="M328 62 Q340 56 352 62 L356 105 L324 105 Z" fill="#FFFFFF" />
      <line x1="328" y1="68" x2="315" y2="40" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    </g>

    {/* Ambient radial glow around play area */}
    <circle cx="270" cy="80" r="45" fill="url(#play-pulse)" />
  </svg>
);
