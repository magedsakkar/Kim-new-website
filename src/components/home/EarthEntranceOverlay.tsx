'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const STORAGE_KEY = 'kim-entrance-v4';

/* ─────────────────────────────────────────────────────────────────────────────
   Islamic 8-pointed star SVG background — slowly rotating tile pattern
───────────────────────────────────────────────────────────────────────────── */
const IslamicPatternBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
    <div
      className="absolute inset-[-20%] w-[140%] h-[140%]"
      style={{ animation: 'islamicSpin 120s linear infinite' }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamicStar" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,5 95,50 50,95 5,50" stroke="#C9973A" strokeWidth="0.5" fill="none" opacity="0.06" />
            <polygon points="50,5 95,50 50,95 5,50" transform="rotate(45 50 50)" stroke="#C9973A" strokeWidth="0.5" fill="none" opacity="0.06" />
            <circle cx="50" cy="50" r="2.5" stroke="#C9973A" strokeWidth="0.4" fill="none" opacity="0.04" />
            <circle cx="50" cy="50" r="6"   stroke="#C9973A" strokeWidth="0.3" fill="none" opacity="0.03" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicStar)" />
      </svg>
    </div>

    {/* Corner arcs */}
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
      <circle cx="0"   cy="0"   r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="0"   cy="0"   r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      <circle cx="100" cy="0"   r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="100" cy="0"   r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      <circle cx="0"   cy="100" r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="0"   cy="100" r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      <circle cx="100" cy="100" r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="100" cy="100" r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      <circle cx="50"  cy="50"  r="42" stroke="#C9973A" strokeWidth="0.15" fill="none" opacity="0.035" />
    </svg>

    {/* Radial vignette */}
    <div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(2,4,9,0.7) 100%)' }}
    />
  </div>
);

const STARS = Array.from({ length: 100 }, (_, i) => ({
  x: ((i * 137.5) % 100),
  y: ((i * 79.3)  % 100),
  r: 0.35 + (i % 3) * 0.3,
  o: 0.05 + (i % 5) * 0.045,
  d: (i % 7) * 0.5,
}));

/* ═════════════════════════════════════════════════════════════════════════════
   Main component
═════════════════════════════════════════════════════════════════════════════ */
export function EarthEntranceOverlay({ onDone }: { onDone: () => void }) {
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const STEPS = 60;
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      const t = i / STEPS;
      // easeInOut
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setLoadProgress(Math.round(eased * 100));
      if (i >= STEPS) {
        clearInterval(intervalRef.current!);
        setTimeout(() => setReady(true), 280);
      }
    }, 50); // 60 steps × 50ms = 3000ms total
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    onDone(); // triggers AnimatePresence exit → curtain lifts
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.9 } }}
      exit={{ y: '-100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999] overflow-hidden"
      style={{ background: '#020409' }}
    >
      <style>{`
        @keyframes islamicSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-o, 0.1); }
          50%       { opacity: calc(var(--star-o, 0.1) * 1.9); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      {/* Islamic animated background */}
      <IslamicPatternBackground />

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              opacity: s.o,
              animation: `twinkle ${3.5 + (i % 5) * 0.8}s ease-in-out ${s.d}s infinite`,
              ['--star-o' as string]: s.o,
            }}
          />
        ))}
      </div>

      {/* Gold reveal edge — sweeps upward with the curtain on exit */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,151,58,0.5) 20%, #FFE49A 50%, rgba(201,151,58,0.5) 80%, transparent 100%)',
        }}
      />

      {/* ── Centered content column ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 select-none">

        {/* Top ornament — 8-spoke star wheel */}
        <motion.div
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
          style={{ animation: 'floatY 6s ease-in-out infinite' }}
        >
          <svg width="56" height="56" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="30" y1="9" x2="30" y2="19"
                stroke="#C9973A" strokeWidth="1.2" strokeLinecap="round" opacity="0.65"
                transform={`rotate(${i * 45} 30 30)`}
              />
            ))}
            <circle cx="30" cy="30" r="21" stroke="#C9973A" strokeWidth="0.5" fill="none" opacity="0.28" />
            <circle cx="30" cy="30" r="14" stroke="#C9973A" strokeWidth="0.5" fill="none" opacity="0.45" />
            <circle cx="30" cy="30" r="4.5" fill="rgba(201,151,58,0.65)" />
            <circle cx="30" cy="30" r="2"   fill="rgba(255,228,154,0.9)" />
          </svg>
        </motion.div>

        {/* Logo circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.48, duration: 0.9, type: 'spring', stiffness: 160, damping: 18 }}
          className="relative mb-7"
        >
          {/* Outer pulsing ring */}
          <motion.div
            className="absolute rounded-full border border-kim-gold/15"
            style={{ inset: '-20px' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeOut' }}
          />
          {/* Inner pulsing ring */}
          <motion.div
            className="absolute rounded-full border border-kim-gold/25"
            style={{ inset: '-10px' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.05, 0.6] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
          />
          {/* Logo circle */}
          <div
            className="w-[84px] h-[84px] rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: 'rgba(201,151,58,0.55)',
              background: 'radial-gradient(circle at 40% 35%, rgba(201,151,58,0.13), rgba(2,4,9,0.6) 70%)',
              boxShadow: '0 0 50px rgba(201,151,58,0.22), 0 0 100px rgba(201,151,58,0.08), inset 0 0 24px rgba(201,151,58,0.06)',
            }}
          >
            <Image
              src="/images/logo_kim_aklamasz-removebg-preview.png"
              alt="KİM Vakfı"
              width={46}
              height={46}
              className="w-[46px] h-[46px] object-contain"
              style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(1.8) hue-rotate(5deg)', opacity: 0.88 }}
              priority
            />
          </div>
        </motion.div>

        {/* KİM Vakfı heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.85 }}
          className="font-serif font-bold text-white text-center leading-none mb-2"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            textShadow: '0 4px 48px rgba(201,151,58,0.22), 0 0 100px rgba(201,151,58,0.08)',
          }}
        >
          KİM Vakfı
        </motion.h1>

        {/* Cross Cultural Center */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.75 }}
          className="uppercase text-center mb-1.5"
          style={{
            color: 'rgba(201,151,58,0.78)',
            letterSpacing: '0.28em',
            fontSize: 'clamp(0.65rem, 2vw, 0.875rem)',
          }}
        >
          Cross Cultural Center
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.65 }}
          className="uppercase text-center mb-10"
          style={{
            color: 'rgba(255,255,255,0.22)',
            letterSpacing: '0.22em',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
          }}
        >
          İstanbul · Turkey
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.55 }}
          className="w-[200px] sm:w-[260px] mb-7"
        >
          <div className="relative h-[1px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, rgba(201,151,58,0.5) 0%, #C9973A 70%, #FFE49A 100%)',
                transition: 'width 0.08s linear',
                boxShadow: '0 0 8px rgba(201,151,58,0.6)',
              }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span
              className="uppercase"
              style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.22em', fontSize: '9px' }}
            >
              {ready ? 'Ready' : 'Loading'}
            </span>
            <span className="font-mono" style={{ color: 'rgba(201,151,58,0.45)', fontSize: '9px' }}>
              {loadProgress}%
            </span>
          </div>
        </motion.div>

        {/* Enter button */}
        <AnimatePresence>
          {ready && (
            <motion.button
              key="enter-btn"
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={handleEnter}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                padding: '14px 44px',
                border: '1px solid rgba(201,151,58,0.5)',
                background: 'transparent',
                outline: 'none',
              }}
              aria-label="Enter the website"
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                style={{ background: 'rgba(201,151,58,0.07)' }}
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: 'rgba(201,151,58,0.7)' }} />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: 'rgba(201,151,58,0.7)' }} />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: 'rgba(201,151,58,0.7)' }} />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: 'rgba(201,151,58,0.7)' }} />
              {/* Label */}
              <span
                className="relative z-10 font-bold uppercase group-hover:tracking-[0.42em] transition-all duration-300"
                style={{
                  color: 'rgba(201,151,58,0.92)',
                  letterSpacing: '0.35em',
                  fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                  boxShadow: '0 0 24px rgba(201,151,58,0.15)',
                }}
              >
                Enter Website
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Coordinates */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="font-mono uppercase mt-9"
          style={{ color: 'rgba(255,255,255,0.1)', letterSpacing: '0.32em', fontSize: '9px' }}
        >
          41°02′N · 28°58′E
        </motion.p>
      </div>
    </motion.div>
  );
}
