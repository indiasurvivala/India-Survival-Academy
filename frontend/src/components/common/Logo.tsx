import React, { useState } from 'react';
import { siteConfig } from '../../data/siteConfig';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension mapping
  const dimensions = {
    sm: { width: 36, height: 42, iconSize: 'h-9 w-9' },
    md: { width: 48, height: 56, iconSize: 'h-12 w-12' },
    lg: { width: 64, height: 76, iconSize: 'h-16 w-16' }
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exact Logo Image with Fallback Vector Replica */}
      <div className={`relative flex items-center justify-center shrink-0 ${dimensions.iconSize}`}>
        {!imageError ? (
          <img
            src={siteConfig.logoPath}
            alt="India Survival Academy Shield Emblem"
            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-Fidelity SVG Shield Replica matching user emblem exactly */
          <svg
            viewBox="0 0 100 115"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="India Survival Academy Shield"
          >
            {/* Outer Gold Border */}
            <path
              d="M50 4 L94 24 C94 65 50 110 50 110 C50 110 6 65 6 24 Z"
              fill="#dfb86c"
            />
            {/* Dark Olive Inner Shield */}
            <path
              d="M50 8 L90 26 C90 63 50 105 50 105 C50 105 10 63 10 26 Z"
              fill="#222b1e"
              stroke="#0a0f0a"
              strokeWidth="2"
            />
            {/* Subtle Gradient Shadow */}
            <path
              d="M50 10 L88 27 C88 61 50 102 50 102 C50 102 12 61 12 27 Z"
              fill="url(#shieldGlow)"
              opacity="0.8"
            />

            {/* VAYAM Logo mark */}
            <path d="M42 16 L46 22 L50 16 L54 22 L58 16" stroke="#f4f1ea" strokeWidth="1.5" strokeLinecap="round" />
            <text x="50" y="25" textAnchor="middle" fill="#cba358" fontSize="4.5" letterSpacing="1" fontWeight="bold">ADVENTURE</text>

            {/* Central "INDIA" */}
            <text x="50" y="36" textAnchor="middle" fill="#f4f1ea" fontSize="9" fontWeight="900" letterSpacing="1.5" fontFamily="Cinzel, serif">INDIA</text>

            {/* Wolf & Lion heads silhouettes */}
            <circle cx="25" cy="45" r="7" fill="#151d13" stroke="#dfb86c" strokeWidth="0.8" />
            <path d="M22 41 L25 43 L28 41 L27 46 L25 48 L23 46 Z" fill="#dfb86c" />
            <circle cx="75" cy="45" r="7" fill="#151d13" stroke="#dfb86c" strokeWidth="0.8" />
            <path d="M72 41 L75 43 L78 41 L77 46 L75 48 L73 46 Z" fill="#dfb86c" />

            {/* Compass Star in Center */}
            <polygon points="50,40 52,44 56,45 52,46 50,50 48,46 44,45 48,44" fill="#141a13" stroke="#dfb86c" strokeWidth="0.8" />

            {/* Crossed Arrows */}
            <line x1="32" y1="42" x2="68" y2="72" stroke="#d5b271" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="42" x2="32" y2="72" stroke="#d5b271" strokeWidth="2" strokeLinecap="round" />
            <polygon points="68,42 63,44 66,47" fill="#dfb86c" />
            <polygon points="32,42 37,44 34,47" fill="#dfb86c" />

            {/* Campfire (left) */}
            <path d="M36 56 C34 60 33 63 35 65 C37 67 40 66 41 63 C42 59 39 58 36 56 Z" fill="#dfb86c" />
            <line x1="33" y1="65" x2="42" y2="67" stroke="#8f6c2f" strokeWidth="1.5" strokeLinecap="round" />

            {/* Kukri Knife (right) */}
            <path d="M60 55 C65 57 66 61 63 65 C61 63 60 60 59 57 Z" fill="#dfb86c" />

            {/* Tent (center bottom) */}
            <polygon points="50,60 42,75 58,75" fill="#f4f1ea" stroke="#222b1e" strokeWidth="0.8" />
            <line x1="50" y1="60" x2="50" y2="75" stroke="#222b1e" strokeWidth="0.8" />

            {/* Arched Ribbon Text: INDIA SURVIVAL ACADEMY */}
            <path id="curve" d="M18 78 C28 98 72 98 82 78" fill="none" />
            <text fill="#f4f1ea" fontSize="5" fontWeight="bold" letterSpacing="0.8">
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                INDIA SURVIVAL ACADEMY
              </textPath>
            </text>

            <defs>
              <radialGradient id="shieldGlow" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#3d4e36" />
                <stop offset="100%" stopColor="#141a12" />
              </radialGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Brand Wordmark (Editorial Serif + Wilderness Tag) */}
      {showText && (
        <div className="flex flex-col text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-400 font-bold leading-none mb-0.5 sm:mb-1">
            {siteConfig.parentBrand}
          </span>
          <span className="font-heading font-black text-xs sm:text-base md:text-lg tracking-wider text-earth-100 uppercase leading-tight group-hover:text-gold-300 transition-colors">
            {siteConfig.academyName}
          </span>
        </div>
      )}
    </div>
  );
};
