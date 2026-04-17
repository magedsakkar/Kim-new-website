'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const GALLERY = [
  { id: 1, title: 'Süleymaniye – KİM Merkezi', subtitle: 'Cross Cultural Center · Fatih, İstanbul',
    bg: 'linear-gradient(145deg, #1A2B7A 0%, #0D5C63 60%, #0A1828 100%)', pattern: 'mosque', accent: '#C9973A' },
  { id: 2, title: 'Kültürlerarası Diyalog', subtitle: 'Intercultural dialogue since 2010',
    bg: 'linear-gradient(145deg, #2D1A6A 0%, #1C2562 50%, #0A0F2E 100%)', pattern: 'star', accent: '#A78BFA' },
  { id: 3, title: 'İslam\'ı Keşfediyoruz', subtitle: 'Educational journey for new visitors',
    bg: 'linear-gradient(145deg, #0D5C63 0%, #1A2B62 55%, #0A1222 100%)', pattern: 'arabesque', accent: '#C9973A' },
  { id: 4, title: 'Gönüllü Programları', subtitle: 'Volunteer & community programmes',
    bg: 'linear-gradient(145deg, #4A2800 0%, #8B4500 45%, #1A0E00 100%)', pattern: 'grid', accent: '#F59E0B' },
  { id: 5, title: 'Uluslararası Ziyaretçiler', subtitle: '80+ countries · 4,500+ visitors per year',
    bg: 'linear-gradient(145deg, #0A2040 0%, #1C4A7A 50%, #060F20 100%)', pattern: 'dots', accent: '#38BDF8' },
  { id: 6, title: 'Dijital Kütüphane', subtitle: 'Books & videos in 25+ languages',
    bg: 'linear-gradient(145deg, #0E2E3A 0%, #0D5C63 55%, #060E18 100%)', pattern: 'mosque', accent: '#34D399' },
  { id: 7, title: 'Ramazan Etkinlikleri', subtitle: 'Annual Ramadan programmes & iftars',
    bg: 'linear-gradient(145deg, #3D2800 0%, #C9973A 45%, #1A1000 100%)', pattern: 'star', accent: '#FCD34D' },
] as const;

const PATTERN_SVG: Record<string, string> = {
  mosque: `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><path d='M40 10 Q50 5 60 10 L60 30 Q50 20 40 25 Q30 20 20 30 L20 10 Q30 5 40 10Z' fill='none' stroke='white' stroke-width='0.6' opacity='0.15'/><circle cx='40' cy='50' r='12' fill='none' stroke='white' stroke-width='0.6' opacity='0.12'/></svg>`,
  star:   `<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88'><path d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='white' stroke-width='0.8' opacity='0.1'/></svg>`,
  arabesque: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><circle cx='30' cy='30' r='20' fill='none' stroke='white' stroke-width='0.6' opacity='0.12'/><circle cx='30' cy='30' r='12' fill='none' stroke='white' stroke-width='0.6' opacity='0.10'/></svg>`,
  grid:   `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect x='0' y='0' width='40' height='40' fill='none' stroke='white' stroke-width='0.4' opacity='0.1'/></svg>`,
  dots:   `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='1.5' fill='white' opacity='0.12'/></svg>`,
};

const CARD_W = 340;
const CARD_H = 460;
const GAP    = 20;
const FULL_W = CARD_W + GAP;
const AUTO_INTERVAL = 4000;

export function GallerySection() {
  const [active,  setActive]  = useState(0);
  const [offsetX, setOffsetX] = useState(24);
  const x                      = useMotionValue(0);
  const isDragging             = useRef(false);
  const isHovered              = useRef(false);

  useEffect(() => {
    const update = () => setOffsetX(Math.max(innerWidth / 2 - CARD_W / 2, 24));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(GALLERY.length - 1, index));
    setActive(clamped);
    animate(x, -clamped * FULL_W, { type: 'spring', stiffness: 320, damping: 35 });
  }, [x]);

  // ── Auto-play ─────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHovered.current && !isDragging.current) {
        const next = (active + 1) % GALLERY.length;
        animate(x, -next * FULL_W, { type: 'spring', stiffness: 320, damping: 35 });
        setActive(next);
      }
    }, AUTO_INTERVAL);
    return () => clearTimeout(timer);
  }, [active, x]);

  const handleDragEnd = (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
    isDragging.current = false;
    const v = info.velocity.x;
    const o = info.offset.x;
    if (v > 400 || o > CARD_W / 2)       goTo(active - 1);
    else if (v < -400 || o < -CARD_W / 2) goTo(active + 1);
    else                                   goTo(active);
  };

  const totalWidth = GALLERY.length * FULL_W - GAP;

  return (
    <section
      className="py-20 md:py-28 bg-gradient-to-b from-[#0A1235] via-[#0D1640] to-[#0A1235] relative overflow-hidden"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Gold top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-kim-gold/30 to-transparent" />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(13,92,99,0.08) 0%, transparent 70%)' }} />

      {/* ── Heading ──────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-kim-gold" />
              <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.28em]">Galeri</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gradient-gold">
              KİM Vakfı&apos;ndan Kareler
            </h2>
          </div>
          {/* Dot pagination */}
          <div className="hidden sm:flex items-center gap-2">
            {GALLERY.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width:      i === active ? 24 : 8,
                  height:     8,
                  background: i === active ? '#C9973A' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Slider wrapper with floating side arrows ─────────────── */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{background: 'linear-gradient(to right, #0B1438 0%, transparent 100%)'}} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{background: 'linear-gradient(to left, #0B1438 0%, transparent 100%)'}} />
        {/* ← LEFT arrow */}
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-black/40 backdrop-blur-md text-white/60 hover:border-kim-gold/60 hover:text-kim-gold hover:bg-kim-gold/10 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Draggable track */}
        <div
          className="overflow-visible cursor-grab active:cursor-grabbing select-none"
          style={{ paddingLeft: offsetX }}
        >
          <motion.div
            drag="x"
            style={{ x, width: totalWidth, display: 'flex', gap: GAP, alignItems: 'center' }}
            dragConstraints={{ left: -(totalWidth - CARD_W), right: 0 }}
            dragElastic={0.07}
            dragTransition={{ bounceStiffness: 280, bounceDamping: 32 }}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={handleDragEnd}
          >
            {GALLERY.map((item, i) => {
              const isActive   = i === active;
              const patternUrl = `data:image/svg+xml,${encodeURIComponent(PATTERN_SVG[item.pattern])}`;
              return (
                <motion.div
                  key={item.id}
                  onClick={() => { if (!isDragging.current) goTo(i); }}
                  animate={{ scale: isActive ? 1.02 : 0.91, opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 18 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="relative shrink-0 rounded-2xl overflow-hidden"
                  style={{ width: CARD_W, height: CARD_H, background: item.bg }}
                >
                  {/* Pattern */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: `url("${patternUrl}")`,
                      backgroundSize: item.pattern === 'star' ? '88px 88px' : item.pattern === 'arabesque' ? '60px 60px' : item.pattern === 'dots' ? '30px 30px' : '80px 80px',
                      opacity: 0.18 }} />
                  {/* Accent glow */}
                  <div className="absolute top-0 inset-x-0 h-40 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${item.accent}22 0%, transparent 70%)` }} />
                  {/* Central geometric art */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="opacity-[0.07]">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.8"/>
                        <circle cx="100" cy="100" r="55" fill="none" stroke="white" strokeWidth="0.6"/>
                        <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="0.5"/>
                        <path d="M100 20L114 62 158 62 124 86 138 128 100 104 62 128 76 86 42 62 86 62Z" fill="none" stroke="white" strokeWidth="0.7"/>
                      </svg>
                    </div>
                  </div>
                  {/* Watermark number */}
                  <div className="absolute top-4 left-5">
                    <span className="text-white/14 font-black text-[5rem] leading-none font-serif select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Active border */}
                  {isActive && (
                    <motion.div layoutId="gallery-active-border"
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ border: `1.5px solid ${item.accent}90` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Bottom text */}
                  <div className="absolute bottom-0 inset-x-0 p-6"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.accent }} />
                      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: item.accent }}>
                        KİM Vakfı
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white leading-snug mb-1">{item.title}</h3>
                    <p className="text-white/45 text-xs leading-relaxed">{item.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* → RIGHT arrow */}
        <button
          onClick={() => goTo(active + 1)}
          disabled={active === GALLERY.length - 1}
          aria-label="Next"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-black/40 backdrop-blur-md text-white/60 hover:border-kim-gold/60 hover:text-kim-gold hover:bg-kim-gold/10 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex justify-end">
        <span className="text-white/25 text-sm font-mono tabular-nums">
          {String(active + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
