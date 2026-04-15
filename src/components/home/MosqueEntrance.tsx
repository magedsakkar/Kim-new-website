'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const STORAGE_KEY = 'kim-entrance-v2';
const LAT = 41.01;
const LNG = 28.97;

// ── 200 random stars — computed once at module load (client-only) ───
const STARS = Array.from({ length: 200 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.5 + Math.random() * 1.3,
  o: 0.12 + Math.random() * 0.5,
}));

type Phase = 'idle' | 'aligning' | 'zooming';

// ── Orthographic globe canvas ───────────────────────────────────────
function GlobeCanvas({
  phase,
  onIstanbulPosition,
}: {
  phase: Phase;
  onIstanbulPosition: (x: number, y: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0); // start with prime meridian centred — Istanbul visible on right
  const phaseRef = useRef(phase);
  const posRef = useRef(onIstanbulPosition);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { posRef.current = onIstanbulPosition; }, [onIstanbulPosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = devicePixelRatio || 1;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;

    const draw = (t: number) => {
      const ph = phaseRef.current;
      const dpr = devicePixelRatio || 1;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.36;

      // ── Advance rotation ─────────────────────────────────────────
      if (ph === 'idle') {
        rotRef.current = (rotRef.current + 0.09) % 360;
      } else if (ph === 'aligning') {
        // Exponential decay toward Istanbul longitude
        const diff = ((LNG - rotRef.current + 540) % 360) - 180;
        rotRef.current = (rotRef.current + diff * 0.055) % 360;
      }

      // ── Orthographic projection ──────────────────────────────────
      const proj = (lat: number, lng: number) => {
        const phi = (lat * Math.PI) / 180;
        const lam = ((lng - rotRef.current) * Math.PI) / 180;
        return {
          x: cx + R * Math.cos(phi) * Math.sin(lam),
          y: cy - R * Math.sin(phi),
          v: Math.cos(phi) * Math.cos(lam) > 0,
        };
      };

      ctx.clearRect(0, 0, W, H);

      // ── Globe sphere ─────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#04060F';
      ctx.fill();

      // Atmosphere glow
      {
        const g = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.2);
        g.addColorStop(0, 'rgba(201,151,58,0)');
        g.addColorStop(0.55, 'rgba(201,151,58,0.05)');
        g.addColorStop(1, 'rgba(201,151,58,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Clip to sphere ───────────────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // Meridians every 15°
      for (let lng2 = 0; lng2 < 360; lng2 += 15) {
        ctx.beginPath();
        let s = false;
        for (let lat2 = -88; lat2 <= 88; lat2 += 1.5) {
          const p2 = proj(lat2, lng2);
          if (p2.v) { if (!s) { ctx.moveTo(p2.x, p2.y); s = true; } else ctx.lineTo(p2.x, p2.y); }
          else { s = false; }
        }
        ctx.strokeStyle = 'rgba(201,151,58,0.13)';
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // Parallels every 15°
      for (let lat2 = -75; lat2 <= 75; lat2 += 15) {
        ctx.beginPath();
        let s = false;
        for (let lng2 = 0; lng2 <= 361; lng2 += 1.5) {
          const p2 = proj(lat2, lng2);
          if (p2.v) { if (!s) { ctx.moveTo(p2.x, p2.y); s = true; } else ctx.lineTo(p2.x, p2.y); }
          else { s = false; }
        }
        ctx.strokeStyle = lat2 === 0 ? 'rgba(201,151,58,0.38)' : 'rgba(201,151,58,0.13)';
        ctx.lineWidth = lat2 === 0 ? 1.1 : 0.65;
        ctx.stroke();
      }

      // ── Istanbul marker ──────────────────────────────────────────
      const ist = proj(LAT, LNG);
      if (ist.v) {
        const pulse = 0.5 + 0.5 * Math.sin(t / 650);
        const pr = 5 + pulse * 9;

        // Outer pulse ring
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,151,58,${(1 - pulse) * 0.5})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.28)';
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // Core dot gradient
        {
          const grd = ctx.createRadialGradient(ist.x, ist.y, 0, ist.x, ist.y, 5);
          grd.addColorStop(0, '#FFE49A');
          grd.addColorStop(1, '#C9973A');
          ctx.beginPath();
          ctx.arc(ist.x, ist.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Targeting reticle during aligning phase
        if (ph === 'aligning') {
          const rl = 16 * dpr;
          const rg = 10 * dpr;
          ctx.beginPath();
          ctx.moveTo(ist.x, ist.y - rg); ctx.lineTo(ist.x, ist.y - rg - rl);
          ctx.moveTo(ist.x, ist.y + rg); ctx.lineTo(ist.x, ist.y + rg + rl);
          ctx.moveTo(ist.x - rg, ist.y); ctx.lineTo(ist.x - rg - rl, ist.y);
          ctx.moveTo(ist.x + rg, ist.y); ctx.lineTo(ist.x + rg + rl, ist.y);
          ctx.strokeStyle = 'rgba(201,151,58,0.65)';
          ctx.lineWidth = 1.4;
          ctx.stroke();
          // Corner brackets
          const cb = 9 * dpr;
          const cg = 22 * dpr;
          ctx.beginPath();
          ctx.moveTo(ist.x - cg, ist.y - cg + cb); ctx.lineTo(ist.x - cg, ist.y - cg); ctx.lineTo(ist.x - cg + cb, ist.y - cg);
          ctx.moveTo(ist.x + cg - cb, ist.y - cg); ctx.lineTo(ist.x + cg, ist.y - cg); ctx.lineTo(ist.x + cg, ist.y - cg + cb);
          ctx.moveTo(ist.x + cg, ist.y + cg - cb); ctx.lineTo(ist.x + cg, ist.y + cg); ctx.lineTo(ist.x + cg - cb, ist.y + cg);
          ctx.moveTo(ist.x - cg + cb, ist.y + cg); ctx.lineTo(ist.x - cg, ist.y + cg); ctx.lineTo(ist.x - cg, ist.y + cg - cb);
          ctx.strokeStyle = 'rgba(201,151,58,0.5)';
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Labels
        ctx.save();
        ctx.font = `bold ${10 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(255,228,154,0.92)';
        ctx.fillText('İSTANBUL', ist.x + 9 * dpr, ist.y - 4 * dpr);
        ctx.font = `${8 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(201,151,58,0.55)';
        ctx.fillText("41°00'N  28°58'E", ist.x + 9 * dpr, ist.y + 9 * dpr);
        ctx.restore();

        // Report CSS-pixel position for zoom origin
        posRef.current(ist.x / dpr, ist.y / dpr);
      }

      ctx.restore();

      // Globe ring border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,151,58,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />;
}

// ── Main overlay ────────────────────────────────────────────────────
function EarthEntranceOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [zooming, setZooming] = useState(false);
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

    // After globe rotates to Istanbul (1.5 s), capture position and zoom
    setTimeout(() => {
      const { x, y } = istanbulPos.current;
      const ox = x > 0 ? x : innerWidth / 2;
      const oy = y > 0 ? y : innerHeight / 2;
      setZoomOrigin(`${ox}px ${oy}px`);
      setPhase('zooming');
      setZooming(true);

      // After zoom (1.9 s), white flash, then done
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
      {/* ── Star field ─────────────────────────────────────────── */}
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
            }}
          />
        ))}
      </div>

      {/* ── Globe — scales on zoom, origin locked to Istanbul ──── */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: zoomOrigin }}
        animate={
          zooming
            ? { scale: 16, filter: 'blur(55px) brightness(3)' }
            : { scale: 1, filter: 'blur(0px) brightness(1)' }
        }
        transition={
          zooming
            ? { duration: 1.9, ease: [0.1, 0, 0.48, 1] as const }
            : { duration: 0 }
        }
      >
        <GlobeCanvas phase={phase} onIstanbulPosition={handleIstanbulPos} />
      </motion.div>

      {/* ── White flash at peak of zoom ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: flashing ? 1 : 0 }}
        transition={{ duration: 0.42 }}
      />

      {/* ── UI (logo + coords + enter button) ───────────────────── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-between py-10 px-6 pointer-events-none"
        animate={{ opacity: phase === 'idle' ? 1 : 0, y: phase !== 'idle' ? -10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top: KİM Vakfı logo */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-kim-gold/45" />
            <div
              className="w-10 h-10 rounded-full border border-kim-gold/30 flex items-center justify-center"
              style={{ boxShadow: '0 0 24px rgba(201,151,58,0.15)' }}
            >
              <Image
                src="/images/logo_kim_aklamasz-removebg-preview.png"
                alt="KİM Vakfı"
                width={24}
                height={24}
                className="w-5 h-5 object-contain brightness-0 invert opacity-85"
              />
            </div>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-kim-gold/45" />
          </div>
          <span className="text-kim-gold/70 text-[10px] font-bold uppercase tracking-[0.45em]">
            KİM Vakfı
          </span>
        </motion.div>

        {/* Bottom: destination info + enter button */}
        <div className="flex flex-col items-center gap-5 pointer-events-auto">
          {/* Destination coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="text-center"
          >
            <p className="text-kim-gold/50 text-[9px] uppercase tracking-[0.42em] font-mono mb-1">
              Destination
            </p>
            <p className="text-white/90 text-sm font-serif font-semibold tracking-wide">
              Süleymaniye Camii · İstanbul
            </p>
            <p className="text-white/22 text-[9px] font-mono mt-1 tracking-widest">
              41°00'36″N · 28°58'05″E
            </p>
          </motion.div>

          {/* Enter button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
            onClick={handleEnter}
            className="relative flex flex-col items-center justify-center w-[84px] h-[84px] rounded-full cursor-pointer group"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Enter the website"
          >
            {/* Outer pulse ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-kim-gold/20"
              animate={{ scale: [1, 1.32, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Inner pulse ring */}
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-kim-gold/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />
            {/* Button border */}
            <div
              className="absolute inset-0 rounded-full border-2 border-kim-gold/55 group-hover:border-kim-gold transition-colors duration-300"
              style={{ boxShadow: '0 0 28px rgba(201,151,58,0.15)' }}
            />
            {/* Down arrow */}
            <svg
              className="w-5 h-5 text-kim-gold relative z-10"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-kim-gold/80 mt-1 relative z-10">
              Enter
            </span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="text-white/18 text-[10px] tracking-[0.35em] uppercase"
          >
            Begin the Journey
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Public export — shows once per session ──────────────────────────
export function MosqueEntrance() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    setShow(!sessionStorage.getItem(STORAGE_KEY));
  }, []);

  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <EarthEntranceOverlay key="earth-entrance" onDone={() => setShow(false)} />
      )}
    </AnimatePresence>
  );
}
