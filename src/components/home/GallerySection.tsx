'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type L = 'tr' | 'en' | 'ar';
type Tri = Record<L, string>;

// ── Gallery data ─────────────────────────────────────────────────
const GALLERY: Array<{
  id: number;
  photo?: string;
  bg?: string;
  category: Tri;
  title: Tri;
  subtitle: Tri;
  accent: string;
}> = [
  {
    id: 1,
    photo: '/images/hero/hero-mosque-interior.jpg',
    category: { tr: 'Camii', en: 'Mosque', ar: 'مسجد' },
    title: { tr: 'Süleymaniye Camii', en: 'Süleymaniye Mosque', ar: 'مسجد السليمانية' },
    subtitle: { tr: 'Fatih, İstanbul', en: 'Fatih, Istanbul', ar: 'فاتح، إسطنبول' },
    accent: '#C9973A',
  },
  {
    id: 2,
    photo: '/images/hero/hero-volunteer-talk.jpg',
    category: { tr: 'Gönüllüler', en: 'Volunteers', ar: 'متطوعون' },
    title: { tr: 'KİM Gönüllüleri', en: 'KİM Volunteers', ar: 'متطوعو كيم' },
    subtitle: { tr: '80+ ülkeden gönüllüler', en: 'Volunteers from 80+ countries', ar: 'متطوعون من 80+ دولة' },
    accent: '#2A9D8F',
  },
  {
    id: 3,
    photo: '/images/hero/hero-tour-guide.webp',
    category: { tr: 'Turlar', en: 'Tours', ar: 'جولات' },
    title: { tr: 'Rehberli Turlar', en: 'Guided Tours', ar: 'جولات إرشادية' },
    subtitle: { tr: 'Tarihin içinde bir yolculuk', en: 'A journey through history', ar: 'رحلة عبر التاريخ' },
    accent: '#8B5CF6',
  },
  {
    id: 4,
    photo: '/images/hero/hero-book-handoff.jpg',
    category: { tr: 'Kütüphane', en: 'Library', ar: 'مكتبة' },
    title: { tr: 'Ücretsiz Kaynaklar', en: 'Free Resources', ar: 'موارد مجانية' },
    subtitle: { tr: '25+ dilde kitap ve video', en: 'Books & videos in 25+ languages', ar: 'كتب ومقاطع بـ25+ لغة' },
    accent: '#F97316',
  },
  {
    id: 5,
    photo: '/images/hero/hero-outdoor-event.jpg',
    category: { tr: 'Etkinlikler', en: 'Events', ar: 'فعاليات' },
    title: { tr: 'Topluluk Etkinlikleri', en: 'Community Events', ar: 'فعاليات مجتمعية' },
    subtitle: { tr: 'İftar, buluşmalar ve daha fazlası', en: 'Iftars, meetups & more', ar: 'إفطارات ولقاءات والمزيد' },
    accent: '#22C55E',
  },
  {
    id: 6,
    bg: 'linear-gradient(145deg, #0D5C63 0%, #1A2B62 55%, #0A1222 100%)',
    category: { tr: 'Diyalog', en: 'Dialogue', ar: 'حوار' },
    title: { tr: 'Kültürlerarası Diyalog', en: 'Intercultural Dialogue', ar: 'حوار الثقافات' },
    subtitle: { tr: '2010\'dan bu yana köprüler', en: 'Building bridges since 2010', ar: 'نبني الجسور منذ 2010' },
    accent: '#A78BFA',
  },
  {
    id: 7,
    bg: 'linear-gradient(145deg, #3D2800 0%, #8B4500 45%, #1A1000 100%)',
    category: { tr: 'Ramazan', en: 'Ramadan', ar: 'رمضان' },
    title: { tr: 'Ramazan Etkinlikleri', en: 'Ramadan Events', ar: 'فعاليات رمضان' },
    subtitle: { tr: 'Yıllık iftar programları', en: 'Annual iftar programmes', ar: 'برامج الإفطار السنوية' },
    accent: '#FCD34D',
  },
];

const LABELS = {
  tr: {
    eyebrow: 'Galeri',
    title: 'Kareler & Anlar',
    subtitle: "KİM Vakfı'nın yolculuğundan seçme kareler.",
    of: '/',
  },
  en: {
    eyebrow: 'Gallery',
    title: 'Moments & Memories',
    subtitle: 'Selected frames from the KİM Foundation journey.',
    of: '/',
  },
  ar: {
    eyebrow: 'معرض',
    title: 'لحظات وذكريات',
    subtitle: 'لقطات مختارة من مسيرة مؤسسة كيم.',
    of: '/',
  },
};

const AUTO_MS    = 4200;
const CARD_GAP   = 18;

// ── Single gallery card ───────────────────────────────────────────
function GalleryCard({
  item,
  index,
  isActive,
  locale,
  cardW,
  cardH,
  onClick,
}: {
  item: typeof GALLERY[number];
  index: number;
  isActive: boolean;
  locale: L;
  cardW: number;
  cardH: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const l = locale;

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale:   isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.55,
        y:       isActive ? 0 : 16,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ width: cardW, height: cardH }}
    >
      {/* ── Background: photo or gradient ── */}
      {item.photo ? (
        <div className="absolute inset-0">
          <Image
            src={item.photo}
            alt={item.title[l]}
            fill
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered || isActive ? 'scale(1.07)' : 'scale(1)' }}
            sizes="(max-width: 640px) 90vw, 420px"
          />
        </div>
      ) : (
        <div className="absolute inset-0" style={{ background: item.bg }} />
      )}

      {/* Top-to-bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/85" />

      {/* ── Top row: category badge + number ── */}
      <div className="absolute top-4 inset-x-4 flex items-start justify-between z-10">
        <span
          className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.22em] backdrop-blur-sm"
          style={{
            background: `${item.accent}28`,
            color: item.accent,
            border: `1px solid ${item.accent}45`,
          }}
        >
          {item.category[l]}
        </span>
        <span
          className="font-black leading-none font-serif select-none"
          style={{ color: 'rgba(255,255,255,0.08)', fontSize: '3.5rem', lineHeight: 1 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Active highlight border ── */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ border: `1.5px solid ${item.accent}65` }}
      />

      {/* ── Bottom content ── */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        {/* Accent progress line */}
        <div
          className="h-[2px] rounded-full mb-4 transition-all duration-500"
          style={{
            width: isActive ? '48px' : '20px',
            background: item.accent,
            opacity: isActive ? 1 : 0.45,
          }}
        />
        <h3 className="font-serif text-[1.15rem] font-bold text-white leading-snug mb-1.5 tracking-tight">
          {item.title[l]}
        </h3>
        <p className="text-white/45 text-xs leading-relaxed">{item.subtitle[l]}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// GallerySection
// ─────────────────────────────────────────────────────────────────
export function GallerySection() {
  const locale = useLocale();
  const l      = (locale in LABELS ? locale : 'en') as L;
  const lb     = LABELS[l];

  const [active,  setActive]  = useState(0);
  const [cardW,   setCardW]   = useState(380);
  const [cardH,   setCardH]   = useState(500);
  const [padLeft, setPadLeft] = useState(32);

  const x           = useMotionValue(0);
  const isDragging  = useRef(false);
  const isHovered   = useRef(false);

  const FULL_W = cardW + CARD_GAP;

  // ── Responsive sizes ─────────────────────────────────────────
  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      if (vw < 480) {
        setCardW(Math.min(vw - 48, 300));
        setCardH(400);
        setPadLeft(24);
      } else if (vw < 768) {
        setCardW(300);
        setCardH(420);
        setPadLeft(32);
      } else if (vw < 1024) {
        setCardW(340);
        setCardH(460);
        setPadLeft(40);
      } else {
        setCardW(380);
        setCardH(500);
        // Align with max-w-7xl container left edge
        setPadLeft(Math.max(32, (vw - 1280) / 2 + 32));
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(GALLERY.length - 1, idx));
      setActive(clamped);
      animate(x, -clamped * FULL_W, { type: 'spring', stiffness: 300, damping: 32 });
    },
    [x, FULL_W],
  );

  // Re-centre when card size changes
  useEffect(() => {
    animate(x, -active * FULL_W, { type: 'tween', duration: 0 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardW]);

  // ── Auto-play ─────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => {
      if (!isHovered.current && !isDragging.current) {
        const next = (active + 1) % GALLERY.length;
        animate(x, -next * FULL_W, { type: 'spring', stiffness: 300, damping: 32 });
        setActive(next);
      }
    }, AUTO_MS);
    return () => clearTimeout(id);
  }, [active, x, FULL_W]);

  const handleDragEnd = (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
    isDragging.current = false;
    const { velocity: v, offset: o } = info;
    if      (v.x > 400 || o.x >  cardW / 2.5) goTo(active - 1);
    else if (v.x < -400 || o.x < -cardW / 2.5) goTo(active + 1);
    else                                         goTo(active);
  };

  const totalWidth = GALLERY.length * FULL_W - CARD_GAP;
  const isRtl      = l === 'ar';

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: '#06080f' }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Subtle noise/grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold top rule */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(201,151,58,0.4) 30%,rgba(201,151,58,0.4) 70%,transparent)' }} />

      {/* ── Section header ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div
          className={cn(
            'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
            isRtl && 'sm:flex-row-reverse',
          )}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Left: text */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8" style={{ background: '#C9973A' }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.32em]"
                style={{ color: '#C9973A' }}
              >
                {lb.eyebrow}
              </span>
            </div>
            {/* Title */}
            <h2
              className="font-serif font-bold text-white leading-[1.08] mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              {lb.title}
            </h2>
            {/* Subtitle */}
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">{lb.subtitle}</p>
          </div>

          {/* Right: counter + arrows */}
          <div
            className={cn(
              'flex items-center gap-4 shrink-0',
              isRtl && 'flex-row-reverse',
            )}
          >
            {/* Count display */}
            <span className="text-white/25 text-sm font-mono tabular-nums tracking-wider">
              {String(active + 1).padStart(2, '0')} {lb.of} {String(GALLERY.length).padStart(2, '0')}
            </span>
            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo(isRtl ? active + 1 : active - 1)}
                disabled={isRtl ? active === GALLERY.length - 1 : active === 0}
                aria-label="Previous"
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#C9973A';
                  (e.currentTarget as HTMLElement).style.color = '#C9973A';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goTo(isRtl ? active - 1 : active + 1)}
                disabled={isRtl ? active === 0 : active === GALLERY.length - 1}
                aria-label="Next"
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#C9973A';
                  (e.currentTarget as HTMLElement).style.color = '#C9973A';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slider track ────────────────────────────────────────── */}
      <div className="relative">
        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #06080f 0%, transparent 100%)' }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #06080f 0%, transparent 100%)' }}
        />

        <div
          className="overflow-visible cursor-grab active:cursor-grabbing select-none"
          style={{ paddingLeft: padLeft }}
        >
          <motion.div
            drag="x"
            style={{ x, width: totalWidth, display: 'flex', gap: CARD_GAP, alignItems: 'flex-end' }}
            dragConstraints={{ left: -(totalWidth - cardW), right: 0 }}
            dragElastic={0.06}
            dragTransition={{ bounceStiffness: 260, bounceDamping: 30 }}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={handleDragEnd}
          >
            {GALLERY.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                isActive={i === active}
                locale={l}
                cardW={cardW}
                cardH={cardH}
                onClick={() => { if (!isDragging.current) goTo(i); }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Progress pills ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className={cn('flex items-center gap-2', isRtl && 'flex-row-reverse')} dir={isRtl ? 'rtl' : 'ltr'}>
          {GALLERY.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-[3px] rounded-full transition-all duration-400"
              style={{
                width:      i === active ? 36 : 10,
                background: i === active ? item.accent : 'rgba(255,255,255,0.10)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
