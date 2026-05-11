'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GlobeCanvas, type Phase } from './GlobeCanvas';

export const STORAGE_KEY = 'kim-entrance-v4';

/* ─────────────────────────────────────────────────────────────────────────────
   Islamic 8-pointed star SVG background — two overlapping rotated squares
   rendered as a tiling <pattern> then slowly rotated via CSS keyframes.
───────────────────────────────────────────────────────────────────────────── */
const IslamicPatternBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
    {/* Main rotating star-grid layer */}
    <div
      className="absolute inset-[-20%] w-[140%] h-[140%]"
      style={{ animation: 'islamicSpin 120s linear infinite' }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamicStar" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Diamond / rotated square 1 */}
            <polygon
              points="50,5 95,50 50,95 5,50"
              stroke="#C9973A"
              strokeWidth="0.5"
              fill="none"
              opacity="0.06"
            />
            {/* Diamond / rotated square 2 — rotated 45° to form 8-pointed star */}
            <polygon
              points="50,5 95,50 50,95 5,50"
              transform="rotate(45 50 50)"
              stroke="#C9973A"
              strokeWidth="0.5"
              fill="none"
              opacity="0.06"
            />
            {/* Small center cross accent */}
            <circle cx="50" cy="50" r="2.5" stroke="#C9973A" strokeWidth="0.4" fill="none" opacity="0.04" />
            <circle cx="50" cy="50" r="6"   stroke="#C9973A" strokeWidth="0.3" fill="none" opacity="0.03" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicStar)" />
      </svg>
    </div>

    {/* Second layer: stationary concentric corner accents */}
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 100 100"
    >
      {/* Corner decorative arcs — top-left */}
      <circle cx="0"   cy="0"   r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="0"   cy="0"   r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      {/* top-right */}
      <circle cx="100" cy="0"   r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="100" cy="0"   r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      {/* bottom-left */}
      <circle cx="0"   cy="100" r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="0"   cy="100" r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      {/* bottom-right */}
      <circle cx="100" cy="100" r="18" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.07" />
      <circle cx="100" cy="100" r="30" stroke="#C9973A" strokeWidth="0.2"  fill="none" opacity="0.05" />
      {/* Center subtle ring */}
      <circle cx="50"  cy="50"  r="40" stroke="#C9973A" strokeWidth="0.15" fill="none" opacity="0.04" />
      <circle cx="50"  cy="50"  r="48" stroke="#C9973A" strokeWidth="0.1"  fill="none" opacity="0.03" />
    </svg>

    {/* Radial vignette to keep edges dark */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(2,4,9,0.65) 100%)',
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Mandala burst SVG — shown briefly on Enter, scales up and fades out
───────────────────────────────────────────────────────────────────────────── */
const MandalaBurst = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        initial={{ opacity: 0.9, scale: 1 }}
        animate={{ opacity: 0,   scale: 6 }}
        exit={{}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg width="220" height="220" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* 8 petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <polygon
              key={i}
              points="50,15 55,47 50,50 45,47"
              transform={`rotate(${i * 45} 50 50)`}
              fill="rgba(201,151,58,0.30)"
              stroke="#C9973A"
              strokeWidth="0.3"
            />
          ))}
          {/* Outer ring */}
          <circle cx="50" cy="50" r="38" stroke="#C9973A" strokeWidth="0.5" fill="none" opacity="0.5" />
          <circle cx="50" cy="50" r="34" stroke="#C9973A" strokeWidth="0.25" fill="none" opacity="0.35" />
          {/* Center */}
          <circle cx="50" cy="50" r="6"  fill="rgba(201,151,58,0.55)" />
          <circle cx="50" cy="50" r="3"  fill="rgba(255,228,154,0.9)" />
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Stars (kept for depth, drawn sparsely so pattern is still readable)
───────────────────────────────────────────────────────────────────────────── */
const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: ((i * 137.5) % 100),
  y: ((i * 79.3)  % 100),
  r: 0.4 + (i % 3) * 0.35,
  o: 0.06 + (i % 5) * 0.05,
}));

/* ═════════════════════════════════════════════════════════════════════════════
   Main component
═════════════════════════════════════════════════════════════════════════════ */
export function EarthEntranceOverlay({ onDone }: { onDone: () => void }) {
  const [phase,        setPhase]        = useState<Phase>('idle');
  const [zoomOrigin,   setZoomOrigin]   = useState('50% 50%');
  const [zooming,      setZooming]      = useState(false);
  const [flashing,     setFlashing]     = useState(false);
  const [mandalaVisible, setMandalaVisible] = useState(false);
  const istanbulPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleIstanbulPos = useCallback((x: number, y: number) => {
    istanbulPos.current = { x, y };
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setPhase('aligning');
    setMandalaVisible(true);

    setTimeout(() => {
      const { x, y } = istanbulPos.current;
      setZoomOrigin(`${x > 0 ? x : innerWidth / 2}px ${y > 0 ? y : innerHeight / 2}px`);
      setPhase('zooming');
      setZooming(true);
      setTimeout(() => {
        setFlashing(true);
        setTimeout(onDone, 380);
      }, 1800);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.9 } }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      className="fixed inset-0 z-[999] overflow-hidden"
      style={{ background: '#020409' }}
    >
      {/* CSS keyframe for the Islamic pattern spin — injected inline */}
      <style>{`
        @keyframes islamicSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes islamicPulse {
          0%, 100% { opacity: 0.06; }
          50%       { opacity: 0.11; }
        }
      `}</style>

      {/* Islamic animated background */}
      <IslamicPatternBackground />

      {/* Sparse star field for depth */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, opacity: s.o }}
          />
        ))}
      </div>

      {/* Mandala burst on enter */}
      <MandalaBurst visible={mandalaVisible} />

      {/* ── Main layout — centered column on mobile, two-column on desktop ── */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 px-6">

        {/* ── Left / bottom on mobile: identity + enter ── */}
        <motion.div
          className="flex flex-col items-center lg:items-start flex-1 lg:pl-[7vw] order-2 lg:order-1 pointer-events-auto z-10"
          animate={{ opacity: phase === 'idle' ? 1 : 0, x: phase !== 'idle' ? -12 : 0 }}
          transition={{ duration: 0.4 }}
        >

          {/* ── Logo badge ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex items-center gap-3 mb-5"
          >
            {/* Left ornament line */}
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-kim-gold/50" />
            {/* Logo circle */}
            <div
              className="w-10 h-10 rounded-full border border-kim-gold/35 flex items-center justify-center"
              style={{ boxShadow: '0 0 24px rgba(201,151,58,0.22), 0 0 8px rgba(201,151,58,0.12)' }}
            >
              <Image
                src="/images/logo_kim_aklamasz-removebg-preview.png"
                alt="KİM Vakfı"
                width={24}
                height={24}
                className="w-5 h-5 object-contain brightness-0 invert opacity-85"
              />
            </div>
            {/* Right ornament line */}
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-kim-gold/50" />
          </motion.div>

          {/* ── Thin full-width gold divider ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
            className="w-48 lg:w-64 h-px mb-6 origin-left"
            style={{ background: 'linear-gradient(90deg, rgba(201,151,58,0.6), rgba(201,151,58,0.1))' }}
          />

          {/* ── Main heading ── */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.75 }}
            className="font-serif font-bold text-white text-3xl md:text-4xl text-center lg:text-left leading-tight mb-2"
            style={{ textShadow: '0 2px 24px rgba(201,151,58,0.18)' }}
          >
            Cross Cultural Center
          </motion.h1>

          {/* ── Sub-location line ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center lg:text-left uppercase tracking-widest text-sm mb-6"
            style={{ color: 'rgba(201,151,58,0.70)' }}
          >
            İstanbul · Turkey
          </motion.p>

          {/* ── Tagline ── */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.65 }}
            className="text-white/50 text-base text-center lg:text-left mb-8 font-light tracking-wide"
          >
            Where faith meets discovery
          </motion.p>

          {/* ── Coordinates badge ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.6 }}
            className="mb-8"
          >
            <span
              className="font-mono text-xs px-3 py-1 rounded-full border"
              style={{
                color: 'rgba(201,151,58,0.75)',
                borderColor: 'rgba(201,151,58,0.28)',
                background: 'rgba(201,151,58,0.04)',
                letterSpacing: '0.18em',
              }}
            >
              41°N · 28°E
            </span>
          </motion.div>

          {/* ── Enter button ── */}
          <motion.button
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.75, duration: 0.65, ease: 'easeOut' }}
            onClick={handleEnter}
            className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full cursor-pointer group mb-4"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Enter the website"
          >
            {/* Outermost pulsing ring */}
            <motion.div
              className="absolute -inset-5 rounded-full border border-kim-gold/10"
              animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Middle pulsing ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-kim-gold/18"
              animate={{ scale: [1, 1.30, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut', delay: 0.55 }}
            />
            {/* Inner pulsing ring */}
            <motion.div
              className="absolute -inset-1 rounded-full border border-kim-gold/28"
              animate={{ scale: [1, 1.13, 1], opacity: [0.75, 0.15, 0.75] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
            />
            {/* Static border ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-kim-gold/60 group-hover:border-kim-gold transition-colors duration-300"
              style={{ boxShadow: '0 0 32px rgba(201,151,58,0.38), inset 0 0 18px rgba(201,151,58,0.06)' }}
            />
            {/* Hover fill */}
            <div
              className="absolute inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.16) 0%, transparent 70%)' }}
            />
            {/* Arrow icon */}
            <svg
              className="w-5 h-5 text-kim-gold relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            {/* Enter label */}
            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-kim-gold/80 mt-1.5 relative z-10">
              Enter
            </span>
          </motion.button>

          {/* ── Sub-button hint ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.15, duration: 0.7 }}
            className="text-white/18 text-[9px] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            Begin the Journey
          </motion.p>
        </motion.div>

        {/* ── Right / top on mobile: globe ── */}
        <motion.div
          className="relative order-1 lg:order-2 flex items-center justify-center"
          style={{ transformOrigin: zoomOrigin }}
          animate={
            zooming
              ? { scale: 22, filter: 'blur(60px) brightness(3.5)' }
              : { scale: 1,  filter: 'blur(0)    brightness(1)' }
          }
          transition={
            zooming
              ? { duration: 2.1, ease: [0.08, 0, 0.42, 1] as const }
              : { duration: 0 }
          }
        >
          {/* Outer decorative ring 3 — slow pulse */}
          <motion.div
            className="absolute rounded-full border border-kim-gold/08 pointer-events-none"
            style={{ inset: '-48px' }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Outer decorative ring 2 */}
          <div
            className="absolute rounded-full border border-kim-gold/12 pointer-events-none"
            style={{ inset: '-28px' }}
          />
          {/* Outer decorative ring 1 */}
          <div
            className="absolute rounded-full border border-kim-gold/20 pointer-events-none"
            style={{ inset: '-12px' }}
          />
          {/* Subtle gold glow behind globe */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: 0,
              background: 'radial-gradient(circle, rgba(201,151,58,0.06) 0%, transparent 72%)',
            }}
          />

          {/* Responsive globe container */}
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px]">
            <GlobeCanvas phase={phase} onIstanbulPosition={handleIstanbulPos} />
          </div>
        </motion.div>
      </div>

      {/* ── Golden radial flash on enter (replaces white flash) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: flashing ? 1 : 0 }}
        transition={{ duration: 0.42 }}
        style={{
          background: flashing
            ? 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,151,58,0.55) 0%, rgba(201,151,58,0.12) 50%, transparent 100%)'
            : 'transparent',
        }}
      />
    </motion.div>
  );
}
