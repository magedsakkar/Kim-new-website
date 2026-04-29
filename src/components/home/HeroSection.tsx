'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 5500;

const FADE_UP = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// ── Slides: gradient background + accent colour per slide ─────────
const SLIDES = [
  {
    bg:      'linear-gradient(160deg,#0c1236 0%,#141A4A 55%,#080e2a 100%)',
    overlay: 'linear-gradient(to right,rgba(8,14,42,0.97),rgba(8,14,42,0.72),rgba(8,14,42,0.08))',
    orb:     'rgba(201,151,58,0.20)',
    accent:  '#C9973A',
    shadow:  'rgba(201,151,58,0.35)',
  },
  {
    bg:      'linear-gradient(160deg,#051c18 0%,#0a2e28 55%,#031210 100%)',
    overlay: 'linear-gradient(to right,rgba(5,28,24,0.97),rgba(5,28,24,0.72),rgba(5,28,24,0.08))',
    orb:     'rgba(42,157,143,0.20)',
    accent:  '#2A9D8F',
    shadow:  'rgba(42,157,143,0.35)',
  },
  {
    bg:      'linear-gradient(160deg,#120830 0%,#1e0f4a 55%,#0a0520 100%)',
    overlay: 'linear-gradient(to right,rgba(18,8,48,0.97),rgba(18,8,48,0.72),rgba(18,8,48,0.08))',
    orb:     'rgba(139,92,246,0.20)',
    accent:  '#8B5CF6',
    shadow:  'rgba(139,92,246,0.35)',
  },
];

// ── Service cards ─────────────────────────────────────────────────
const SERVICES = [
  {
    id:    'islam',
    emoji: '☪️',
    title: 'All About Islam',
    desc:  'Faith, Quran, pillars & Islamic wisdom',
    href:  '/new-muslim-care-area',
    bg:        'rgba(201,151,58,0.10)',
    bgHover:   'rgba(201,151,58,0.19)',
    border:    'rgba(201,151,58,0.22)',
    bdrHover:  'rgba(201,151,58,0.52)',
    dot:       '#F59E0B',
  },
  {
    id:    'journey',
    emoji: '🌙',
    title: 'Journey of Muslim',
    desc:  'Guided transformation — discovery to practice',
    href:  '/new-muslim-care-area',
    bg:        'rgba(42,157,143,0.10)',
    bgHover:   'rgba(42,157,143,0.19)',
    border:    'rgba(42,157,143,0.22)',
    bdrHover:  'rgba(42,157,143,0.52)',
    dot:       '#2DD4BF',
  },
  {
    id:    'library',
    emoji: '📚',
    title: 'Digital Library',
    desc:  'Books, videos & resources on Islam',
    href:  '/library',
    bg:        'rgba(139,92,246,0.10)',
    bgHover:   'rgba(139,92,246,0.19)',
    border:    'rgba(139,92,246,0.22)',
    bdrHover:  'rgba(139,92,246,0.52)',
    dot:       '#A78BFA',
  },
];

// ── Location data ─────────────────────────────────────────────────
const LOCATIONS = [
  {
    id:       'kim1',
    name:     'KİM 1',
    fullName: 'KİM 1 – Visitor Center',
    subtitle: 'Kanuni Medresesi Sk., Süleymaniye',
    desc:     'Our main welcome hub for guided mosque tours, cultural dialogue, and introductions to Islam for visitors from around the world.',
    bg:       'linear-gradient(145deg,#92400e 0%,#451a03 100%)',
    glow:     'rgba(245,158,11,0.28)',
    tag:      'Visitors',
    emoji:    '🕌',
  },
  {
    id:       'kim2',
    name:     'KİM 2',
    fullName: 'KİM 2 – Madrasa',
    subtitle: 'Süleymaniye, Fatih, Istanbul',
    desc:     'A historic madrasa space hosting student exchanges, academic seminars, and in-depth Islamic education programs.',
    bg:       'linear-gradient(145deg,#134e4a 0%,#042f2e 100%)',
    glow:     'rgba(42,157,143,0.28)',
    tag:      'Education',
    emoji:    '🏛️',
  },
  {
    id:       'kim3',
    name:     'KİM 3',
    fullName: 'KİM 3 – Media Center',
    subtitle: 'Süleymaniye, Fatih, Istanbul',
    desc:     'Our multilingual media hub creating documentary tours, digital content, and online outreach for global audiences.',
    bg:       'linear-gradient(145deg,#1e1b4b 0%,#0f0a2e 100%)',
    glow:     'rgba(139,92,246,0.28)',
    tag:      'Media',
    emoji:    '🎬',
  },
  {
    id:       'mosque',
    name:     'Mosque',
    fullName: 'Süleymaniye Mosque',
    subtitle: 'Süleymaniye, Fatih, Istanbul',
    desc:     "Built by Ottoman architect Mimar Sinan — the spiritual centerpiece of our neighbourhood and the backdrop of all our work.",
    bg:       'linear-gradient(145deg,#7f1d1d 0%,#450a0a 100%)',
    glow:     'rgba(248,113,113,0.28)',
    tag:      'Mosque',
    emoji:    '⭐',
  },
];

// ─────────────────────────────────────────────────────────────────
// LocationsCard — 3-D tilt on hover + click-to-expand
// ─────────────────────────────────────────────────────────────────
function LocationsCard() {
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const activeLoc = LOCATIONS.find(l => l.id === expanded);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left)  / r.width  - 0.5;
    const ny = (e.clientY - r.top)   / r.height - 0.5;
    setTilt({ x: -ny * 13, y: nx * 13 });
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovering(false); }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovering ? 1.025 : 1})`,
        transition: 'transform 0.14s cubic-bezier(0.22,1,0.36,1)',
        transformStyle: 'preserve-3d',
      }}
      className="relative h-[340px] sm:h-[430px] lg:h-[580px]"
    >
      {/* Animated gold border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(135deg,rgba(201,151,58,0.72) 0%,rgba(201,151,58,0.06) 45%,rgba(201,151,58,0.58) 100%)' }}
      />

      {/* Card body */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(155deg,#1A2B62 0%,#0F1838 50%,#07101E 100%)' }}
      >
        {/* Islamic star-pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='%23C9973A' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '88px 88px',
          }}
        />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" style={{ color: '#C9973A' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#C9973A' }}>
              Our Locations
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/40 text-[9px] uppercase tracking-wider">Istanbul</span>
          </div>
        </div>

        {/* 2×2 thumbnail grid */}
        <div className="absolute inset-0 pt-10 pb-4 px-4">
          <div className="grid grid-cols-2 gap-2.5 h-full">
            {LOCATIONS.map((loc) => (
              <motion.button
                key={loc.id}
                onClick={() => setExpanded(loc.id)}
                whileHover={{ scale: 1.045 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group focus:outline-none"
                style={{ background: loc.bg }}
                aria-label={`View ${loc.fullName}`}
              >
                {/* Inner glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 40%,${loc.glow} 0%,transparent 70%)` }}
                />
                {/* Text fade at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                {/* Center emoji */}
                <div className="absolute inset-0 flex items-center justify-center pb-3">
                  <span className="text-3xl select-none opacity-55 group-hover:opacity-90 transition-opacity duration-200">
                    {loc.emoji}
                  </span>
                </div>
                {/* Labels */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-white text-[11px] font-bold leading-tight">{loc.name}</p>
                  <p className="text-white/45 text-[8px] leading-tight mt-0.5">{loc.tag}</p>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-all duration-200" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Expanded location overlay ─────────────────────────── */}
        <AnimatePresence>
          {expanded && activeLoc && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute inset-0 z-20 rounded-3xl overflow-hidden flex flex-col"
              style={{ background: activeLoc.bg }}
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 60% 25%,${activeLoc.glow} 0%,transparent 65%)` }}
              />
              {/* Star pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.07]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '88px 88px',
                }}
              />

              {/* Close button */}
              <motion.button
                onClick={() => setExpanded(null)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </motion.button>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-5 justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-4"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.72)' }}>
                    {activeLoc.tag}
                  </span>
                  <div className="text-4xl mb-4 select-none">{activeLoc.emoji}</div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1.5">{activeLoc.fullName}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3 h-3 text-white/40 shrink-0" />
                    <span className="text-white/45 text-xs">{activeLoc.subtitle}</span>
                  </div>
                  <p className="text-white/68 text-sm leading-relaxed">{activeLoc.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>Active Center · Istanbul</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────────────────────
export function HeroSection() {
  const t         = useTranslations('hero');
  const [slide, setSlide]       = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const cur = SLIDES[slide];

  // Auto-advance; timerKey resets the interval on manual navigation
  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [timerKey]);

  const goTo = (idx: number) => {
    setSlide(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
    setTimerKey(k => k + 1);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#080e2a' }}>

      {/* ── Sliding background ───────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${slide}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ background: cur.bg }}
        />
      </AnimatePresence>

      {/* Left-side text overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`overlay-${slide}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          style={{ background: cur.overlay }}
        />
      </AnimatePresence>

      {/* Top + bottom vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Ambient orb */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`orb-${slide}`}
          className="absolute pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
          style={{
            width: 600, height: 600, borderRadius: '50%',
            background: `radial-gradient(circle,${cur.orb} 0%,transparent 70%)`,
            top: -120, left: -120,
          }}
        />
      </AnimatePresence>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.9) 1px,transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* ── Main content grid ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: copy + service cards ───────────────────────── */}
          <div className="order-2 lg:order-1">

            {/* Eyebrow */}
            <motion.div {...FADE_UP(0)} className="flex items-center gap-3 mb-6">
              <motion.span
                className="h-px w-10"
                style={{ background: cur.accent }}
                animate={{ background: cur.accent }}
                transition={{ duration: 1.2 }}
              />
              <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: cur.accent }}>
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...FADE_UP(0.1)}
              className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] xl:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              {t('title')}
              <br />
              <em className="not-italic text-gradient-gold">{t('titleAccent')}</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p {...FADE_UP(0.2)} className="text-white/58 text-lg leading-relaxed max-w-[520px] mb-8">
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...FADE_UP(0.28)} className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/new-muslim-care-area"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 text-base hover:-translate-y-0.5 active:scale-95"
                style={{ background: cur.accent, boxShadow: `0 8px 28px ${cur.shadow}` }}
              >
                {t('cta1')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded-xl text-white/80 hover:text-white transition-all duration-200 text-base hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(255,255,255,0.22)' }}
              >
                {t('cta2')}
              </Link>
            </motion.div>

            {/* ── Service cards ──────────────────────────────────── */}
            <motion.div {...FADE_UP(0.38)}>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">What We Offer</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SERVICES.map((svc) => (
                  <Link key={svc.id} href={svc.href as `/${string}`} className="block group focus:outline-none">
                    <motion.div
                      className="flex flex-col gap-2 p-4 rounded-2xl backdrop-blur-sm cursor-pointer h-full"
                      style={{ background: svc.bg, border: `1px solid ${svc.border}` }}
                      whileHover={{
                        y: -4,
                        scale: 1.03,
                        background: svc.bgHover,
                        borderColor: svc.bdrHover,
                      } as Parameters<typeof motion.div>[0]['whileHover']}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl select-none">{svc.emoji}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: svc.dot }} />
                      </div>
                      <p className="text-white font-semibold text-sm leading-snug">{svc.title}</p>
                      <p className="text-white/42 text-xs leading-relaxed">{svc.desc}</p>
                      <ArrowRight className="w-3.5 h-3.5 mt-auto self-end text-white/25 group-hover:text-white/55 transition-colors" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Locations card ─────────────────────────────── */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            <LocationsCard />
          </motion.div>
        </div>
      </div>

      {/* ── Slider controls ──────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <motion.button
          onClick={() => goTo(slide - 1)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-white/55" />
        </motion.button>

        {SLIDES.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative overflow-hidden rounded-full"
            animate={{ width: i === slide ? 30 : 10 }}
            transition={{ duration: 0.3 }}
            style={{ height: 6, background: i === slide ? s.accent : 'rgba(255,255,255,0.22)' }}
          >
            {i === slide && (
              <motion.span
                key={`fill-${timerKey}-${i}`}
                className="absolute inset-y-0 left-0 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                style={{ background: 'rgba(255,255,255,0.38)' }}
              />
            )}
          </motion.button>
        ))}

        <motion.button
          onClick={() => goTo(slide + 1)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-3.5 h-3.5 text-white/55" />
        </motion.button>
      </div>

    </section>
  );
}
