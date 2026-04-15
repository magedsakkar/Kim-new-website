'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const STORAGE_KEY = 'kim-entrance-v3';

// ── All KİM Vakfı mosque / cultural-centre locations ──────────────
const KIM_LOCATIONS = [
  // Primary — Süleymaniye HQ (drawn last so it's on top)
  { lat: 41.016, lng: 28.964, primary: true, label: 'İSTANBUL' },
  // Istanbul cluster
  { lat: 41.0155, lng: 28.9645 },
  { lat: 41.015,  lng: 28.9655 },
  { lat: 41.0125, lng: 28.9532 },
  { lat: 41.0384, lng: 28.988  },
  { lat: 41.021,  lng: 29.0145 },
  { lat: 41.0348, lng: 28.9378 },
  { lat: 41.0165, lng: 28.9545 },
  { lat: 41.0312, lng: 28.9412 },
  { lat: 41.0195, lng: 28.951  },
  { lat: 41.0298, lng: 28.9355 },
  { lat: 41.0072, lng: 28.9478 },
  { lat: 41.0152, lng: 28.958  },
  { lat: 41.0228, lng: 28.9748 },
  { lat: 41.0055, lng: 28.939  },
  // Turkey — key cities
  { lat: 41.6783, lng: 26.5597 }, // Edirne
  { lat: 40.1826, lng: 29.0601 }, // Bursa
  { lat: 39.9391, lng: 32.8514 }, // Ankara
  { lat: 38.6431, lng: 34.8278 }, // Nevşehir
  { lat: 37.9495, lng: 27.3655 }, // İzmir
  { lat: 37.874,  lng: 32.4931 }, // Konya
  { lat: 36.888,  lng: 30.7005 }, // Antalya
  { lat: 36.5437, lng: 31.999  }, // Alanya
  { lat: 37.9144, lng: 40.2306 }, // Diyarbakır
  { lat: 37.1591, lng: 38.7969 }, // Şanlıurfa
] as const;

// ── 200 random stars ───────────────────────────────────────────────
const STARS = Array.from({ length: 200 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.5 + Math.random() * 1.3,
  o: 0.10 + Math.random() * 0.50,
}));

type Phase = 'idle' | 'aligning' | 'zooming';

// ── Globe canvas — real world map via d3-geo + topojson ────────────
function GlobeCanvas({
  phase,
  onIstanbulPosition,
}: {
  phase: Phase;
  onIstanbulPosition: (x: number, y: number) => void;
}) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rotRef     = useRef(0);   // longitude currently facing viewer
  const phaseRef   = useRef(phase);
  const posRef     = useRef(onIstanbulPosition);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoRef     = useRef<any>(null);

  useEffect(() => { phaseRef.current = phase; },              [phase]);
  useEffect(() => { posRef.current   = onIstanbulPosition; }, [onIstanbulPosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr   = devicePixelRatio || 1;
      canvas.width  = innerWidth  * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width  = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Load world-atlas + d3-geo asynchronously ─────────────────
    (async () => {
      try {
        const [geo, topo, world] = await Promise.all([
          import('d3-geo'),
          import('topojson-client'),
          fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then(r => r.json()),
        ]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const land    = (topo as any).feature(world, world.objects.land);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const borders = (topo as any).mesh(world, world.objects.countries,
          (a: unknown, b: unknown) => a !== b);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const projection = (geo as any).geoOrthographic().precision(0.4);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const path = (geo as any).geoPath(projection, ctx);
        geoRef.current = { projection, path, land, borders };
      } catch {
        // fallback — grid lines drawn in the main loop
      }
    })();

    let raf: number;

    const draw = (t: number) => {
      const ph  = phaseRef.current;
      const dpr = devicePixelRatio || 1;
      const W   = canvas.width;
      const H   = canvas.height;
      const cx  = W / 2;
      const cy  = H / 2;
      const R   = Math.min(W, H) * 0.36;

      // ── Rotation ──────────────────────────────────────────────
      if (ph === 'idle') {
        rotRef.current = (rotRef.current + 0.09) % 360;
      } else if (ph === 'aligning') {
        const diff = ((28.964 - rotRef.current + 540) % 360) - 180;
        rotRef.current = (rotRef.current + diff * 0.055) % 360;
      }

      ctx.clearRect(0, 0, W, H);
      const geo = geoRef.current;

      if (geo) {
        // ── Real map ─────────────────────────────────────────────
        geo.projection.scale(R).translate([cx, cy]).rotate([-rotRef.current, 0]);

        // Ocean fill
        ctx.beginPath();
        geo.path({ type: 'Sphere' });
        ctx.fillStyle = '#060D1C';
        ctx.fill();

        // Land fill
        ctx.beginPath();
        geo.path(geo.land);
        ctx.fillStyle = '#0E1E34';
        ctx.fill();

        // Country borders
        ctx.beginPath();
        geo.path(geo.borders);
        ctx.strokeStyle = 'rgba(201,151,58,0.14)';
        ctx.lineWidth = 0.55 * dpr;
        ctx.stroke();

        // Globe ring
        ctx.beginPath();
        geo.path({ type: 'Sphere' });
        ctx.strokeStyle = 'rgba(201,151,58,0.32)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
      } else {
        // ── Fallback grid ─────────────────────────────────────────
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = '#04060F';
        ctx.fill();

        const proj0 = (lat: number, lng: number) => {
          const phi = (lat * Math.PI) / 180;
          const lam = ((lng - rotRef.current) * Math.PI) / 180;
          return { x: cx + R * Math.cos(phi) * Math.sin(lam),
                   y: cy - R * Math.sin(phi),
                   v: Math.cos(phi) * Math.cos(lam) > 0 };
        };
        for (let lng2 = 0; lng2 < 360; lng2 += 30) {
          ctx.beginPath(); let s = false;
          for (let lt = -88; lt <= 88; lt += 2) {
            const p2 = proj0(lt, lng2);
            if (p2.v) { if (!s) { ctx.moveTo(p2.x, p2.y); s = true; } else ctx.lineTo(p2.x, p2.y); } else { s = false; }
          }
          ctx.strokeStyle = 'rgba(201,151,58,0.12)'; ctx.lineWidth = 0.6; ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // ── Atmosphere glow ───────────────────────────────────────
      {
        const g = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.2);
        g.addColorStop(0,    'rgba(201,151,58,0)');
        g.addColorStop(0.55, 'rgba(201,151,58,0.05)');
        g.addColorStop(1,    'rgba(201,151,58,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Mosque location dots ──────────────────────────────────
      const ortho = (lat: number, lng: number) => {
        const phi = (lat * Math.PI) / 180;
        const lam = ((lng - rotRef.current) * Math.PI) / 180;
        return {
          x: cx + R * Math.cos(phi) * Math.sin(lam),
          y: cy - R * Math.sin(phi),
          v: Math.cos(phi) * Math.cos(lam) > 0,
        };
      };

      // Secondary dots first (so primary renders on top)
      KIM_LOCATIONS.forEach(loc => {
        if ('primary' in loc && loc.primary) return;
        const p = ortho(loc.lat, loc.lng);
        if (!p.v) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,151,58,0.6)';
        ctx.fill();
      });

      // Primary dot
      const primary = KIM_LOCATIONS.find(l => 'primary' in l && l.primary)!;
      const ist = ortho(primary.lat, primary.lng);
      if (ist.v) {
        const pulse = 0.5 + 0.5 * Math.sin(t / 650);
        const pr    = (5 + pulse * 9) * dpr;

        // Outer pulse ring
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,151,58,${(1 - pulse) * 0.5})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        // Inner steady ring
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 8 * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.3)';
        ctx.lineWidth = 0.9 * dpr;
        ctx.stroke();

        // Core gradient dot
        const grd = ctx.createRadialGradient(ist.x, ist.y, 0, ist.x, ist.y, 5 * dpr);
        grd.addColorStop(0, '#FFE49A');
        grd.addColorStop(1, '#C9973A');
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Targeting reticle during aligning
        if (ph === 'aligning') {
          const rl = 16 * dpr, rg = 11 * dpr, cb = 9 * dpr, cg2 = 22 * dpr;
          ctx.beginPath();
          ctx.moveTo(ist.x, ist.y - rg); ctx.lineTo(ist.x, ist.y - rg - rl);
          ctx.moveTo(ist.x, ist.y + rg); ctx.lineTo(ist.x, ist.y + rg + rl);
          ctx.moveTo(ist.x - rg, ist.y); ctx.lineTo(ist.x - rg - rl, ist.y);
          ctx.moveTo(ist.x + rg, ist.y); ctx.lineTo(ist.x + rg + rl, ist.y);
          ctx.strokeStyle = 'rgba(201,151,58,0.7)'; ctx.lineWidth = 1.5 * dpr; ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ist.x - cg2, ist.y - cg2 + cb); ctx.lineTo(ist.x - cg2, ist.y - cg2); ctx.lineTo(ist.x - cg2 + cb, ist.y - cg2);
          ctx.moveTo(ist.x + cg2 - cb, ist.y - cg2); ctx.lineTo(ist.x + cg2, ist.y - cg2); ctx.lineTo(ist.x + cg2, ist.y - cg2 + cb);
          ctx.moveTo(ist.x + cg2, ist.y + cg2 - cb); ctx.lineTo(ist.x + cg2, ist.y + cg2); ctx.lineTo(ist.x + cg2 - cb, ist.y + cg2);
          ctx.moveTo(ist.x - cg2 + cb, ist.y + cg2); ctx.lineTo(ist.x - cg2, ist.y + cg2); ctx.lineTo(ist.x - cg2, ist.y + cg2 - cb);
          ctx.strokeStyle = 'rgba(201,151,58,0.5)'; ctx.lineWidth = 1.5 * dpr; ctx.stroke();
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
  const [phase,      setPhase]      = useState<Phase>('idle');
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [zooming,    setZooming]    = useState(false);
  const [flashing,   setFlashing]   = useState(false);
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

      {/* UI */}
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
            <p className="text-kim-gold/50 text-[9px] uppercase tracking-[0.42em] font-mono mb-1">
              Destination
            </p>
            <p className="text-white/90 text-sm font-serif font-semibold tracking-wide">
              Cross Cultural Center · İstanbul
            </p>
            <p className="text-white/22 text-[9px] font-mono mt-1 tracking-widest">
              41°00'36″N · 28°58'05″E
            </p>
          </motion.div>

          {/* Enter button — enhanced glow */}
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
            {/* Far pulse ring */}
            <motion.div className="absolute -inset-4 rounded-full border border-kim-gold/15"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Mid pulse ring */}
            <motion.div className="absolute -inset-2.5 rounded-full border border-kim-gold/25"
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
            {/* Inner steady ring */}
            <motion.div className="absolute -inset-1 rounded-full border border-kim-gold/35"
              animate={{ scale: [1, 1.12, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.0 }}
            />
            {/* Button face */}
            <div className="absolute inset-0 rounded-full border-2 border-kim-gold/70 group-hover:border-kim-gold transition-colors duration-300"
              style={{ boxShadow: '0 0 32px rgba(201,151,58,0.45), inset 0 0 20px rgba(201,151,58,0.08)' }}
            />
            {/* Inner gold gradient fill */}
            <div className="absolute inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.2) 0%, transparent 70%)' }}
            />
            <svg className="w-5 h-5 text-kim-gold relative z-10"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-kim-gold/85 mt-1 relative z-10">
              Enter
            </span>
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

// ── Public export ───────────────────────────────────────────────────
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
