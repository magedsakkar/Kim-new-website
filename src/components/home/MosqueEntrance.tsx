'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const STORAGE_KEY = 'kim-mosque-intro-v1';

// ── Inner overlay (rendered/removed via AnimatePresence) ──────

function MosqueEntranceOverlay({ onDone }: { onDone: () => void }) {
  const [zooming, setZooming] = useState(false);

  // Lock body scroll while overlay is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleEnter = () => {
    setZooming(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    // Wait for zoom + whiteout to finish, then call onDone
    setTimeout(onDone, 2300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[999] overflow-hidden bg-[#060912]"
    >
      {/* ── Mosque photo — breathes, then zooms into entrance ─ */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: '50% 56%' }}
        animate={zooming
          ? { scale: 20, filter: 'blur(50px) brightness(6)' }
          : { scale: [1, 1.05, 1], filter: 'blur(0px) brightness(1)' }
        }
        transition={zooming
          ? { duration: 1.9, ease: [0.12, 0, 0.55, 1] }
          : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <Image
          src="/images/suleymaniye-mosque.jpg"
          alt="Süleymaniye Mosque"
          fill
          className="object-cover object-[center_38%]"
          priority
          unoptimized
        />
      </motion.div>

      {/* ── Layered overlays ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/52" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Islamic star tile — 2 % opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='white' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '88px 88px',
        }}
      />

      {/* White flash — fades in near end of zoom */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: zooming ? 1 : 0 }}
        transition={{ delay: zooming ? 1.55 : 0, duration: 0.55 }}
      />

      {/* ── UI content — fades out when zoom starts ───────────── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={{ opacity: zooming ? 0 : 1, y: zooming ? -16 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-10 flex flex-col items-center"
        >
          <div
            className="w-16 h-16 rounded-full border border-kim-gold/30 flex items-center justify-center mb-5"
            style={{ boxShadow: '0 0 40px rgba(201,151,58,0.2)' }}
          >
            <Image
              src="/images/logo_kim_aklamasz-removebg-preview.png"
              alt="KİM Vakfı"
              width={40}
              height={40}
              className="w-9 h-9 object-contain brightness-0 invert"
            />
          </div>

          {/* Gold divider line */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-kim-gold/50" />
            <span className="text-kim-gold text-[10px] font-bold uppercase tracking-[0.35em]">
              KİM Vakfı
            </span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-kim-gold/50" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center leading-snug tracking-tight">
            Süleymaniye
          </h1>
          <p className="text-white/45 text-sm mt-3 tracking-widest text-center uppercase">
            Cross Cultural Center · Istanbul
          </p>
        </motion.div>

        {/* Enter button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-5"
        >
          <motion.button
            onClick={handleEnter}
            className="relative flex flex-col items-center justify-center w-[88px] h-[88px] rounded-full cursor-pointer group"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Enter the website"
          >
            {/* Outer pulse ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-kim-gold/20"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Middle pulse ring */}
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-kim-gold/30"
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            />
            {/* Button border */}
            <div
              className="absolute inset-0 rounded-full border-2 border-kim-gold/55 group-hover:border-kim-gold transition-colors duration-300"
              style={{ boxShadow: '0 0 24px rgba(201,151,58,0.15)' }}
            />
            {/* Arrow icon */}
            <svg
              className="w-6 h-6 text-kim-gold relative z-10"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-kim-gold/80 mt-1 relative z-10">
              Enter
            </span>
          </motion.button>

          <p className="text-white/25 text-[11px] tracking-[0.2em] uppercase">
            Step Inside
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom location text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: zooming ? 0 : 0.35 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-0 right-0 flex justify-center"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">
          Fatih · İstanbul · Türkiye
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Public export — checks sessionStorage, shows once per session ──

export function MosqueEntrance() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    setShow(!seen);
  }, []);

  // null = still checking (don't flash)
  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <MosqueEntranceOverlay key="mosque-entrance" onDone={() => setShow(false)} />
      )}
    </AnimatePresence>
  );
}
