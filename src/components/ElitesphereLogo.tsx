import React from "react";

interface ElitesphereLogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export const ElitesphereLogo: React.FC<ElitesphereLogoProps> = ({
  className = "w-10 h-10",
  iconOnly = false,
  light = false,
}) => {
  // Use white for dark backgrounds (like the footer) and dark blue for light backgrounds (like the navbar)
  const networkColor = light ? "#FFFFFF" : "#071A3D";
  const opacityValue = light ? "0.9" : "0.75";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Rich metallic gold gradient for the E, Arrow, and Spear */}
          <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6615" />
            <stop offset="30%" stopColor="#D4A038" />
            <stop offset="70%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          
          {/* Glowing filter for the light spear */}
          <filter id="spearGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Subtle drop shadow for depth */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodOpacity="0.15" />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* ========================================== */}
          {/* 1. LEFT SIDE - STYLIZED GOLDEN "E" GLOBE HALF */}
          {/* ========================================== */}
          {/* Outer arc rim of "E" */}
          <path
            d="M 45 14 C 28 14, 15 28, 15 48 C 15 68, 28 82, 45 82 L 45 74 C 32 74, 23 63, 23 48 C 23 33, 32 22, 45 22 Z"
            fill="url(#goldGrad)"
          />
          {/* Top Bar of "E" */}
          <path
            d="M 23 30 L 45 30 L 45 37 L 27 37 C 25 35, 24 32, 23 30 Z"
            fill="url(#goldGrad)"
          />
          {/* Middle Bar of "E" */}
          <path
            d="M 23 45 L 39 45 L 39 51 L 23 51 C 23 49, 23 47, 23 45 Z"
            fill="url(#goldGrad)"
          />
          {/* Bottom Bar of "E" */}
          <path
            d="M 23 66 L 45 66 L 45 59 L 27 59 C 25 61, 24 64, 23 66 Z"
            fill="url(#goldGrad)"
          />

          {/* ========================================== */}
          {/* 2. RIGHT SIDE - INTEL/NETWORK WEB */}
          {/* ========================================== */}
          {/* Outer right hemisphere arc boundary */}
          <path
            d="M 45 14 C 62 14, 75 28, 75 48 C 75 68, 62 82, 45 82"
            stroke={networkColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="0"
            opacity={opacityValue}
          />

          {/* Network Grid Web Lines */}
          <g stroke={networkColor} strokeWidth="1.2" opacity="0.7" strokeLinecap="round">
            {/* Horizontal-ish grid line waves */}
            <path d="M 45 24 C 55 24, 62 28, 68 33" />
            <path d="M 45 48 C 58 48, 68 48, 75 48" />
            <path d="M 45 72 C 55 72, 62 68, 68 63" />

            {/* Diagonal interconnectors */}
            <line x1="45" y1="14" x2="56" y2="26" />
            <line x1="56" y1="26" x2="68" y2="33" />
            <line x1="68" y1="33" x2="75" y2="48" />
            <line x1="75" y1="48" x2="68" y2="63" />
            <line x1="68" y1="63" x2="56" y2="70" />
            <line x1="56" y1="70" x2="45" y2="82" />

            {/* Central hub connections */}
            <line x1="58" y1="48" x2="56" y2="26" />
            <line x1="58" y1="48" x2="68" y2="33" />
            <line x1="58" y1="48" x2="75" y2="48" />
            <line x1="58" y1="48" x2="68" y2="63" />
            <line x1="58" y1="48" x2="56" y2="70" />

            <line x1="56" y1="26" x2="45" y2="37" />
            <line x1="56" y1="70" x2="45" y2="59" />
          </g>

          {/* Network Nodes (Solid matching joints) */}
          <g fill={networkColor}>
            <circle cx="56" cy="26" r="2.5" />
            <circle cx="68" cy="33" r="2.5" />
            <circle cx="75" cy="48" r="2.5" />
            <circle cx="68" cy="63" r="2.5" />
            <circle cx="56" cy="70" r="2.5" />
            <circle cx="58" cy="48" r="2.5" />
          </g>

          {/* ========================================== */}
          {/* 3. SWEEPING GROWTH ARROW */}
          {/* ========================================== */}
          {/* Sweeping gold ribbon */}
          <path
            d="M 12 55 C 10 74, 30 88, 55 88 C 72 88, 83 76, 88 62 L 81 60 C 77 71, 67 81, 55 81 C 34 81, 18 70, 19 55 Z"
            fill="url(#goldGrad)"
          />
          {/* Arrow Tip */}
          <path
            d="M 88 62 L 94 48 L 78 55 L 83 58 Z"
            fill="url(#goldGrad)"
          />

          {/* ========================================== */}
          {/* 4. THE LIGHT SPEAR (CENTRAL VERTICAL spine) */}
          {/* ========================================== */}
          <g filter="url(#spearGlow)">
            {/* Spear Shaft dividing the globe halves in solid glowing Gold */}
            <line
              x1="45"
              y1="11"
              x2="45"
              y2="83"
              stroke="url(#goldGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Elegant Golden Spearhead at the top */}
            <path
              d="M 45 4 L 49 14 L 45 11 L 41 14 Z"
              fill="url(#goldGrad)"
            />
            {/* Detailed Golden Fletching/Weight at the bottom */}
            <path
              d="M 42 83 L 48 83 L 45 87 Z"
              fill="url(#goldGrad)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
