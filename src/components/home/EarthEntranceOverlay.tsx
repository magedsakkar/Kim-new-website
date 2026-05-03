'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlobeCanvas, type Phase } from './GlobeCanvas';

export const STORAGE_KEY = 'kim-entrance-v4';

const STARS = Array.from({ length: 180 }, (_, i) => ({
  x: ((i * 137.5) % 100),
  y: ((i * 79.3)  % 100),
  r: 0.5 + (i % 3) * 0.5,
  o: 0.08 + (i % 5) * 0.08,
}));

export function EarthEntranceOverlay({ onDone }: { onDone: () => void }) {
  const [phase,      setPhase]      = useState<Phase>('idle');
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [zooming,    setZooming]    = useState(false);
  const [flashing,   setFlashing]   = useState(false);
  const istanbulPos  = useRef({ x: 0, y: 0 });

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
    setTimeout(() => {
      const { x, y } = istanbulPos.current;
      setZoomOrigin(`${x > 0 ? x : innerWidth / 2}px ${y > 0 ? y : innerHeight / 2}px`);
      setPhase('zooming');
      setZooming(true);
      setTimeout(() => {
        setFlashing(true);
        setTimeout(onDone, 480);
      }, 1900);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.9 } }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      className="fixed inset-0 z-[999] overflow-hidden"
      style={{ background: '#020409' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, opacity: s.o }} />
        ))}
      </div>

      {/* Main split layout — left: UI, right: globe */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 px-6">

        {/* ── Left / bottom on mobile: logo + text + enter ────────── */}
        <motion.div
          className="flex flex-col items-center lg:items-start flex-1 lg:pl-[8vw] order-2 lg:order-1 pointer-events-auto z-10"
          animate={{ opacity: phase === 'idle' ? 1 : 0, x: phase !== 'idle' ? -10 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-kim-gold/45" />
            <div className="w-9 h-9 rounded-full border border-kim-gold/30 flex items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(201,151,58,0.18)' }}>
              <Image src="/images/logo_kim_aklamasz-removebg-preview.png" alt="KİM Vakfı"
                width={22} height={22} className="w-[18px] h-[18px] object-contain brightness-0 invert opacity-85" />
            </div>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-kim-gold/45" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-kim-gold/55 text-[9px] font-bold uppercase tracking-[0.45em] mb-2"
          >
            KİM Vakfı
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center lg:text-left mb-6"
          >
            <p className="text-kim-gold/40 text-[8px] uppercase tracking-[0.38em] font-mono mb-1">Destination</p>
            <p className="text-white/88 text-base font-serif font-semibold tracking-wide">
              Cross Cultural Center · İstanbul
            </p>
            <p className="text-white/20 text-[9px] font-mono mt-1 tracking-widest">
              41°00&#39;36″N · 28°58&#39;05″E
            </p>
          </motion.div>

          {/* Location tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="flex flex-wrap gap-1.5 justify-center lg:justify-start mb-7 max-w-[240px] lg:max-w-[280px]"
          >
            {['İstanbul', 'Şam', 'Lefkoşa', 'Tiran', 'Tokyo'].map((city) => (
              <span key={city}
                className="text-[8px] font-mono text-kim-gold/40 border border-kim-gold/15 px-2 py-0.5 rounded-full tracking-wide">
                {city}
              </span>
            ))}
          </motion.div>

          {/* Enter button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.6, ease: 'easeOut' }}
            onClick={handleEnter}
            className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full cursor-pointer group"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Enter the website"
          >
            <motion.div className="absolute -inset-4 rounded-full border border-kim-gold/12"
              animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }} />
            <motion.div className="absolute -inset-2.5 rounded-full border border-kim-gold/22"
              animate={{ scale: [1, 1.28, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }} />
            <motion.div className="absolute -inset-1 rounded-full border border-kim-gold/32"
              animate={{ scale: [1, 1.12, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.0 }} />
            <div className="absolute inset-0 rounded-full border-2 border-kim-gold/65 group-hover:border-kim-gold transition-colors duration-300"
              style={{ boxShadow: '0 0 28px rgba(201,151,58,0.4), inset 0 0 16px rgba(201,151,58,0.07)' }} />
            <div className="absolute inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.18) 0%, transparent 70%)' }} />
            <svg className="w-[18px] h-[18px] text-kim-gold relative z-10"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-kim-gold/80 mt-1 relative z-10">Enter</span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.7 }}
            className="text-white/15 text-[9px] tracking-[0.32em] uppercase mt-4"
          >
            Begin the Journey
          </motion.p>
        </motion.div>

        {/* ── Right / top on mobile: globe ─────────────────────────── */}
        <motion.div
          className="relative order-1 lg:order-2 flex items-center justify-center"
          style={{ transformOrigin: zoomOrigin }}
          animate={zooming
            ? { scale: 18, filter: 'blur(55px) brightness(3)' }
            : { scale: 1,  filter: 'blur(0)    brightness(1)' }}
          transition={zooming
            ? { duration: 1.9, ease: [0.1, 0, 0.48, 1] as const }
            : { duration: 0 }}
        >
          {/* Responsive globe container */}
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px]">
            <GlobeCanvas phase={phase} onIstanbulPosition={handleIstanbulPos} />
          </div>
        </motion.div>

      </div>

      {/* White flash on enter */}
      <motion.div className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: flashing ? 1 : 0 }}
        transition={{ duration: 0.42 }}
      />
    </motion.div>
  );
}
