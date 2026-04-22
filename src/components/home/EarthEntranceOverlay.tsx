'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlobeCanvas, type Phase } from './GlobeCanvas';

export const STORAGE_KEY = 'kim-entrance-v3';

const STARS = Array.from({ length: 200 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.5 + Math.random() * 1.3,
  o: 0.10 + Math.random() * 0.50,
}));

export function EarthEntranceOverlay({ onDone }: { onDone: () => void }) {
  const [phase,    setPhase]    = useState<Phase>('idle');
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [zooming,  setZooming]  = useState(false);
  const [flashing, setFlashing] = useState(false);
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

      {/* Globe — scales into Istanbul on Enter */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: zoomOrigin }}
        animate={zooming
          ? { scale: 16, filter: 'blur(55px) brightness(3)' }
          : { scale: 1,  filter: 'blur(0px)  brightness(1)' }}
        transition={zooming
          ? { duration: 1.9, ease: [0.1, 0, 0.48, 1] as const }
          : { duration: 0 }}
      >
        <GlobeCanvas phase={phase} onIstanbulPosition={handleIstanbulPos} />
      </motion.div>

      {/* White flash */}
      <motion.div className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: flashing ? 1 : 0 }}
        transition={{ duration: 0.42 }}
      />

      {/* UI overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-between py-10 px-6 pointer-events-none"
        animate={{ opacity: phase === 'idle' ? 1 : 0, y: phase !== 'idle' ? -10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top: logo */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-kim-gold/45" />
            <div className="w-10 h-10 rounded-full border border-kim-gold/30 flex items-center justify-center"
              style={{ boxShadow: '0 0 24px rgba(201,151,58,0.2)' }}>
              <Image src="/images/logo_kim_aklamasz-removebg-preview.png" alt="KİM Vakfı"
                width={24} height={24} className="w-5 h-5 object-contain brightness-0 invert opacity-85" />
            </div>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-kim-gold/45" />
          </div>
          <span className="text-kim-gold/70 text-[10px] font-bold uppercase tracking-[0.45em]">
            KİM Vakfı
          </span>
        </motion.div>

        {/* Bottom: destination + enter */}
        <div className="flex flex-col items-center gap-5 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="text-center"
          >
            <p className="text-kim-gold/50 text-[9px] uppercase tracking-[0.42em] font-mono mb-1">Destination</p>
            <p className="text-white/90 text-sm font-serif font-semibold tracking-wide">Cross Cultural Center · İstanbul</p>
            <p className="text-white/22 text-[9px] font-mono mt-1 tracking-widest">41°00&#39;36″N · 28°58&#39;05″E</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
            onClick={handleEnter}
            className="relative flex flex-col items-center justify-center w-[88px] h-[88px] rounded-full cursor-pointer group"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Enter the website"
          >
            <motion.div className="absolute -inset-4 rounded-full border border-kim-gold/15"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }} />
            <motion.div className="absolute -inset-2.5 rounded-full border border-kim-gold/25"
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }} />
            <motion.div className="absolute -inset-1 rounded-full border border-kim-gold/35"
              animate={{ scale: [1, 1.12, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.0 }} />
            <div className="absolute inset-0 rounded-full border-2 border-kim-gold/70 group-hover:border-kim-gold transition-colors duration-300"
              style={{ boxShadow: '0 0 32px rgba(201,151,58,0.45), inset 0 0 20px rgba(201,151,58,0.08)' }} />
            <div className="absolute inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.2) 0%, transparent 70%)' }} />
            <svg className="w-5 h-5 text-kim-gold relative z-10"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-kim-gold/85 mt-1 relative z-10">Enter</span>
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.7 }}
            className="text-white/18 text-[10px] tracking-[0.35em] uppercase">
            Begin the Journey
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
