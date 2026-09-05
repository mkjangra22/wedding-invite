import React from 'react';

// Ganesha Icon in refined line art
export const GaneshaIcon = ({ className = "w-12 h-12 text-gold", ...props }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} {...props}>
    {/* Stylized Minimal Ganesha */}
    <path d="M50 15 C45 15 40 18 38 23 C34 22 30 25 29 29 C27 35 29 42 33 46 C32 49 31 53 31 58 C31 70 40 78 50 82 C60 78 69 70 69 58 C69 53 68 49 67 46 C71 42 73 35 71 29 C70 25 66 22 62 23 C60 18 55 15 50 15 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Forehead Tilak */}
    <path d="M50 24 L50 38 M44 29 C48 33 52 33 56 29" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="50" cy="27" r="1.8" fill="currentColor" />
    {/* Trunk Swirl */}
    <path d="M50 44 C47 50 47 62 53 66 C57 69 62 67 61 62 C60 58 56 59 55 62" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
    {/* Tusk Left & Right */}
    <path d="M43 47 L38 49 M57 47 L60 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Ear Details */}
    <path d="M34 32 C30 35 30 41 33 44 M66 32 C70 35 70 41 67 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Traditional Paisley / Kalka motif
export const PaisleyMotif = ({ className = "w-8 h-8 text-gold", ...props }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} {...props}>
    <path d="M32 4C24 4 18 10 18 18C18 24 21 28 25 32C19 36 14 43 14 50C14 57 20 62 32 62C44 62 50 54 50 44C50 32 40 22 40 14C40 8 36 4 32 4ZM32 56C23 56 20 52 20 48C20 42 26 36 32 36C38 36 44 42 44 48C44 52 41 56 32 56Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="46" r="3" fill="currentColor"/>
    <path d="M32 12C30 12 28 14 28 16C28 18 30 20 32 20C34 20 36 18 36 16C36 14 34 12 32 12Z" fill="currentColor"/>
  </svg>
);

// Luxury Indian Arch / Jaali
export const RoyalArch = ({ className = "w-full text-gold", ...props }) => (
  <svg viewBox="0 0 400 60" fill="none" className={className} preserveAspectRatio="none" {...props}>
    <path d="M0 50 Q100 50 150 30 Q180 15 200 5 Q220 15 250 30 Q300 50 400 50" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M0 55 Q100 55 150 35 Q180 20 200 10 Q220 20 250 35 Q300 55 400 55" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" fill="none"/>
    <circle cx="200" cy="5" r="3" fill="currentColor"/>
  </svg>
);

// Ornate Mandala Divider
export const MandalaDivider = ({ className = "w-48 h-8 text-gold", ...props }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} {...props}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold"></div>
    <div className="flex items-center gap-1.5 text-gold">
      <span className="text-xs">✦</span>
      <svg className="w-5 h-5 animate-pulse-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8"/>
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>
      </svg>
      <span className="text-xs">✦</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-gold"></div>
  </div>
);

// Sacred Kalash Motif
export const KalashMotif = ({ className = "w-10 h-10 text-gold", ...props }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className} {...props}>
    {/* Coconut on top */}
    <path d="M32 6 C28 12 24 18 32 24 C40 18 36 12 32 6 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5"/>
    {/* Mango Leaves */}
    <path d="M22 20 C26 16 30 18 32 24 M42 20 C38 16 34 18 32 24" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Pot neck */}
    <path d="M24 24 H40 L42 28 H22 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
    {/* Pot Body */}
    <path d="M22 28 C16 34 16 46 24 54 C28 58 36 58 40 54 C48 46 48 34 42 28 Z" strokeWidth="1.8"/>
    {/* Swastik / Tilak on Kalash */}
    <path d="M32 36 V46 M27 41 H37 M27 36 H32 M32 46 H37 M37 36 V41 M27 46 V41" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Base */}
    <path d="M26 56 H38" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Lotus Blossom
export const LotusMotif = ({ className = "w-10 h-10 text-gold", ...props }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className} {...props}>
    {/* Center petal */}
    <path d="M32 14 C27 24 27 38 32 46 C37 38 37 24 32 14 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5"/>
    {/* Inner side petals */}
    <path d="M32 22 C23 28 20 40 25 46 C29 44 31 38 32 34 M32 22 C41 28 44 40 39 46 C35 44 33 38 32 34" strokeWidth="1.5"/>
    {/* Outer petals */}
    <path d="M25 34 C16 38 14 46 19 50 C24 48 27 44 28 42 M39 34 C48 38 50 46 45 50 C40 48 37 44 36 42" strokeWidth="1.5"/>
    {/* Lotus Base */}
    <path d="M18 52 C26 55 38 55 46 52" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Ornate Corner Accent
export const OrnateCorner = ({ className = "w-16 h-16 text-gold/40" }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className}>
    <path d="M4 60 V12 C4 7.57 7.57 4 12 4 H60" strokeWidth="1.5"/>
    <path d="M10 60 V16 C10 12.68 12.68 10 16 10 H60" strokeWidth="0.8" strokeDasharray="2 2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.5"/>
    <path d="M4 24 Q14 24 24 14 Q24 4 24 4" strokeWidth="1.2"/>
  </svg>
);
