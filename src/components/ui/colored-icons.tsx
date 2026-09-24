'use client';

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * 🌸 Sakura / Cute Blushing Flower Icon
 */
export function ColoredFlower({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAAA6" />
          <stop offset="100%" stopColor="#FF6B8B" />
        </linearGradient>
        <linearGradient id="sakuraCenter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE66D" />
          <stop offset="100%" stopColor="#FFAA00" />
        </linearGradient>
      </defs>
      {/* 5 Petals */}
      <circle cx="12" cy="6" r="4.2" fill="url(#sakuraGrad)" />
      <circle cx="17.7" cy="10.1" r="4.2" fill="url(#sakuraGrad)" />
      <circle cx="15.5" cy="17" r="4.2" fill="url(#sakuraGrad)" />
      <circle cx="8.5" cy="17" r="4.2" fill="url(#sakuraGrad)" />
      <circle cx="6.3" cy="10.1" r="4.2" fill="url(#sakuraGrad)" />
      {/* Center Stamen */}
      <circle cx="12" cy="12" r="3.2" fill="url(#sakuraCenter)" />
      <circle cx="12" cy="12" r="1.6" fill="#FFFDF9" opacity="0.8" />
    </svg>
  );
}

/**
 * ✨ Radiant Magic Sparkle
 */
export function ColoredSparkle({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#FF6B8B" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
        fill="url(#sparkleGrad)"
      />
      <circle cx="19" cy="5" r="2" fill="#FFE066" />
      <circle cx="5" cy="19" r="1.5" fill="#FFAAA6" />
    </svg>
  );
}

/**
 * 💖 Sweet Heart / Love
 */
export function ColoredHeart({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF758C" />
          <stop offset="100%" stopColor="#FF3860" />
        </linearGradient>
      </defs>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#heartGrad)"
      />
      <path
        d="M6.5 6C5.5 7 5.5 8.5 6 9.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * ⭐ Warm Golden Star
 */
export function ColoredStar({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD32A" />
          <stop offset="100%" stopColor="#FFA801" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="url(#starGrad)"
      />
      <path
        d="M12 4.5L14.2 9L19.2 9.7L15.6 13.2L16.4 18.2L12 15.8L7.6 18.2L8.4 13.2L4.8 9.7L9.8 9L12 4.5Z"
        fill="#FFEAA7"
        opacity="0.4"
      />
    </svg>
  );
}

/**
 * 📅 Cute Binder Calendar
 */
export function ColoredCalendar({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="calTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B8B" />
          <stop offset="100%" stopColor="#FA5274" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="17" rx="3.5" fill="#FFF5F7" stroke="#FF6B8B" strokeWidth="1.5" />
      <path d="M3 7.5C3 5.57 4.57 4 6.5 4H17.5C19.43 4 21 5.57 21 7.5V8.5H3V7.5Z" fill="url(#calTop)" />
      <circle cx="7.5" cy="3.5" r="1.2" fill="#382A2C" />
      <circle cx="16.5" cy="3.5" r="1.2" fill="#382A2C" />
      {/* Cute grid dots */}
      <circle cx="7.5" cy="12" r="1" fill="#FF6B8B" />
      <circle cx="12" cy="12" r="1" fill="#FF6B8B" />
      <circle cx="16.5" cy="12" r="1" fill="#FF6B8B" />
      <circle cx="7.5" cy="16" r="1" fill="#FF6B8B" />
      <circle cx="12" cy="16" r="1" fill="#FFAAA6" />
      <circle cx="16.5" cy="16" r="1" fill="#FFAAA6" />
    </svg>
  );
}

/**
 * 🎀 Satin Gift Ribbon
 */
export function ColoredRibbon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF94A8" />
          <stop offset="100%" stopColor="#FF4D6D" />
        </linearGradient>
      </defs>
      <ellipse cx="6.5" cy="9.5" rx="4.5" ry="3.5" transform="rotate(-20 6.5 9.5)" fill="url(#ribbonGrad)" />
      <ellipse cx="17.5" cy="9.5" rx="4.5" ry="3.5" transform="rotate(20 17.5 9.5)" fill="url(#ribbonGrad)" />
      <circle cx="12" cy="10" r="2.8" fill="#FF2E56" />
      <path d="M10 12L7 20L10 18L12 21L12 13" fill="url(#ribbonGrad)" />
      <path d="M14 12L17 20L14 18L12 21L12 13" fill="url(#ribbonGrad)" />
    </svg>
  );
}

/**
 * 🎨 Artist Color Palette
 */
export function ColoredPalette({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="paletteBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="100%" stopColor="#F5D2A4" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.1 22 14 21.1 14 20C14 19.49 13.8 19.02 13.46 18.66C13.14 18.32 12.94 17.86 12.94 17.36C12.94 16.26 13.84 15.36 14.94 15.36H16.84C19.6 15.36 21.84 13.12 21.84 10.36C21.84 5.74 17.44 2 12 2Z"
        fill="url(#paletteBody)"
        stroke="#E0B680"
        strokeWidth="1.2"
      />
      <circle cx="6.5" cy="11.5" r="1.6" fill="#FF6B8B" />
      <circle cx="9.5" cy="6.5" r="1.6" fill="#48DBFB" />
      <circle cx="15" cy="6.5" r="1.6" fill="#1DD1A1" />
      <circle cx="18" cy="11.5" r="1.6" fill="#FECA57" />
    </svg>
  );
}

/**
 * 📓 Hardcover Study Planner Book
 */
export function ColoredBook({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A29BFE" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>
      <rect x="4" y="3" width="16" height="18" rx="2.5" fill="url(#bookCover)" />
      <rect x="7" y="3" width="2" height="18" fill="#5848C2" />
      <path d="M4 6H20" stroke="#FFEAA7" strokeWidth="1.5" />
      {/* Golden Bookmark ribbon */}
      <path d="M14 3V10L16 8.5L18 10V3H14Z" fill="#FFEAA7" />
    </svg>
  );
}

/**
 * 🚚 Islandwide Delivery Van
 */
export function ColoredTruck({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="truckBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF758C" />
          <stop offset="100%" stopColor="#FF6B8B" />
        </linearGradient>
      </defs>
      <rect x="2" y="7" width="12" height="9" rx="2" fill="url(#truckBody)" />
      <path d="M14 9H18.5L21 12V16H14V9Z" fill="#FF9EB1" />
      <circle cx="6.5" cy="16.5" r="2" fill="#382A2C" />
      <circle cx="6.5" cy="16.5" r="0.8" fill="#FFFFFF" />
      <circle cx="17.5" cy="16.5" r="2" fill="#382A2C" />
      <circle cx="17.5" cy="16.5" r="0.8" fill="#FFFFFF" />
      {/* Speed lines */}
      <path d="M1 9H0" stroke="#FF6B8B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 12H-1" stroke="#FF6B8B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 💬 WhatsApp / Chat Bubble
 */
export function ColoredWhatsApp({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="waGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#128C7E" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#waGrad)" />
      <path
        d="M8.5 16.5L9 14C8.3 12.8 8.3 11.2 9 10C10 8.3 12 7.7 13.8 8.4C15.5 9.1 16.5 10.9 16.3 12.7C16 14.5 14.3 15.8 12.5 15.6L10.2 16.2L8.5 16.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * 🔥 Hot Bestseller Flame
 */
export function ColoredFlame({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="flameOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="100%" stopColor="#FF9F43" />
        </linearGradient>
        <linearGradient id="flameInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="100%" stopColor="#FFD32A" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C10.5 4.5 9 6.5 9 9C9 10.2 9.5 11.3 10.2 12C9.5 12 6 13.5 6 17C6 20.3 8.7 23 12 23C15.3 23 18 20.3 18 17C18 12.5 14 7 12 2Z"
        fill="url(#flameOuter)"
      />
      <path
        d="M12 12C11.2 13.2 10.5 14.5 10.5 16C10.5 17.4 11.2 18.5 12 19C12.8 18.5 13.5 17.4 13.5 16C13.5 14.5 12.8 13.2 12 12Z"
        fill="url(#flameInner)"
      />
    </svg>
  );
}

/**
 * ⏳ Sandy Hourglass / Timekeeper
 */
export function ColoredHourglass({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAAA6" />
          <stop offset="100%" stopColor="#FF6B8B" />
        </linearGradient>
      </defs>
      <path d="M5 2H19" stroke="#FF6B8B" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 22H19" stroke="#FF6B8B" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 3V7C6 9.5 8 11.5 10 12C8 12.5 6 14.5 6 17V21H18V17C18 14.5 16 12.5 14 12C16 11.5 18 9.5 18 7V3H6Z"
        fill="#FFF0F5"
        stroke="#FF6B8B"
        strokeWidth="1.5"
      />
      {/* Cute Sand */}
      <path d="M8 18H16L12 14L8 18Z" fill="url(#glassGrad)" />
      <circle cx="12" cy="15.5" r="0.8" fill="#FF6B8B" />
    </svg>
  );
}

/**
 * 👑 Cute Crown / Premium Finish
 */
export function ColoredCrown({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#F59F00" />
        </linearGradient>
      </defs>
      <path
        d="M3 18L5 8L9.5 13L12 5L14.5 13L19 8L21 18H3Z"
        fill="url(#crownGrad)"
        stroke="#E67700"
        strokeWidth="1"
      />
      <circle cx="5" cy="7" r="1.5" fill="#FF6B8B" />
      <circle cx="12" cy="4" r="1.8" fill="#FF6B8B" />
      <circle cx="19" cy="7" r="1.5" fill="#FF6B8B" />
    </svg>
  );
}

/**
 * 🌿 Zero-Bleed Fresh Leaf
 */
export function ColoredLeaf({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86E3CE" />
          <stop offset="100%" stopColor="#1DD1A1" />
        </linearGradient>
      </defs>
      <path
        d="M20.5 3.5C14.5 3.5 6 8.5 6 15.5C6 18.5 8.5 21 11.5 21C18.5 21 20.5 9.5 20.5 3.5Z"
        fill="url(#leafGrad)"
      />
      <path d="M6 16L14 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 📝 Cute Notepad / To-Do List
 */
export function ColoredNote({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="100%" stopColor="#FFEAA7" />
        </linearGradient>
      </defs>
      <rect x="4" y="3" width="16" height="18" rx="3" fill="url(#noteGrad)" stroke="#FFD166" strokeWidth="1.5" />
      <path d="M8 8H16" stroke="#FF9F43" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12H16" stroke="#FF9F43" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 16H13" stroke="#FF9F43" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="6" cy="3" r="1" fill="#FF6B8B" />
      <circle cx="18" cy="3" r="1" fill="#FF6B8B" />
    </svg>
  );
}

/**
 * 🏷️ Pastel Sticky Tab / Index Flag
 */
export function ColoredTag({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8E6CF" />
          <stop offset="100%" stopColor="#86E3CE" />
        </linearGradient>
      </defs>
      <path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        fill="url(#tagGrad)"
        stroke="#48BB78"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="7" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * 🧸 Cute Teddy Bear / Sticker Icon
 */
export function ColoredBear({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="bearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D2A4" />
          <stop offset="100%" stopColor="#E0A96D" />
        </linearGradient>
      </defs>
      {/* Ears */}
      <circle cx="6.5" cy="7.5" r="3.2" fill="url(#bearGrad)" />
      <circle cx="6.5" cy="7.5" r="1.8" fill="#FFCCD5" />
      <circle cx="17.5" cy="7.5" r="3.2" fill="url(#bearGrad)" />
      <circle cx="17.5" cy="7.5" r="1.8" fill="#FFCCD5" />
      {/* Head */}
      <circle cx="12" cy="13.5" r="7.5" fill="url(#bearGrad)" />
      {/* Snout */}
      <ellipse cx="12" cy="15" rx="3.2" ry="2.4" fill="#FFFDF9" />
      <circle cx="12" cy="14.2" r="1" fill="#382A2C" />
      {/* Eyes */}
      <circle cx="9.5" cy="11.5" r="1.2" fill="#382A2C" />
      <circle cx="14.5" cy="11.5" r="1.2" fill="#382A2C" />
      {/* Blush */}
      <ellipse cx="8" cy="14" rx="1.4" ry="0.8" fill="#FF6B8B" opacity="0.6" />
      <ellipse cx="16" cy="14" rx="1.4" ry="0.8" fill="#FF6B8B" opacity="0.6" />
    </svg>
  );
}

/**
 * 📸 Camera / Photo Cover
 */
export function ColoredCamera({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81ECEC" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
      </defs>
      <path d="M4 7H8L9.5 5H14.5L16 7H20C21.1 7 22 7.9 22 9V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V9C2 7.9 2.9 7 4 7Z" fill="url(#camGrad)" />
      <circle cx="12" cy="14" r="4" fill="#FFFFFF" />
      <circle cx="12" cy="14" r="2.5" fill="#382A2C" />
      <circle cx="18" cy="10" r="1" fill="#FFEAA7" />
    </svg>
  );
}

