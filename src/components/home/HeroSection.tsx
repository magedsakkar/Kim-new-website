'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 6500;

// ── Per-slide multilingual content + photo ────────────────────────
const SLIDES = [
  {
    photo:   '/images/hero/hero-mosque-interior.jpg',
    overlay: 'linear-gradient(105deg,rgba(4,10,28,0.95) 0%,rgba(4,10,28,0.70) 52%,rgba(4,10,28,0.10) 100%)',
    accent:  '#C9973A',
    shadow:  'rgba(201,151,58,0.35)',
    orb:     'rgba(201,151,58,0.20)',
    text: {
      en: { tag: 'Süleymaniye Mosque', headline: 'Where Faith\nMeets Discovery', sub: "Step inside one of Istanbul's most breathtaking mosques. Ask any question about Islam — our team is here, every day." },
      tr: { tag: 'Süleymaniye Camii', headline: 'İmanın Keşifle\nBuluştuğu Yer', sub: "İstanbul'un en etkileyici camilerinden birinin içine adım atın. İslam hakkında her soruyu sorabilirsiniz — ekibimiz her gün burada." },
      ar: { tag: 'مسجد السليمانية', headline: 'حيث يلتقي الإيمان\nبالاكتشاف', sub: 'ادخل أحد أكثر مساجد إسطنبول إثارةً. اطرح أي سؤال حول الإسلام — فريقنا هنا كل يوم.' },
    },
  },
  {
    photo:   '/images/hero/hero-volunteer-talk.jpg',
    overlay: 'linear-gradient(105deg,rgba(3,18,14,0.95) 0%,rgba(3,18,14,0.70) 52%,rgba(3,18,14,0.10) 100%)',
    accent:  '#2A9D8F',
    shadow:  'rgba(42,157,143,0.35)',
    orb:     'rgba(42,157,143,0.20)',
    text: {
      en: { tag: 'KİM Volunteers', headline: 'Real Answers,\nReal People', sub: 'Our trained volunteers from around the world speak your language and answer your questions about Islam — openly and honestly.' },
      tr: { tag: 'KİM Gönüllüleri', headline: 'Gerçek Cevaplar,\nGerçek İnsanlar', sub: 'Dünyanın dört bir yanından gelen eğitimli gönüllülerimiz sizin dilinizi konuşur ve sorularınızı açıkça yanıtlar.' },
      ar: { tag: 'متطوعو كيم', headline: 'إجابات حقيقية\nمن أشخاص حقيقيين', sub: 'متطوعونا المدرَّبون من شتى أنحاء العالم يتحدثون لغتك ويجيبون على أسئلتك بصراحة وأمانة.' },
    },
  },
  {
    photo:   '/images/hero/hero-tour-guide.webp',
    overlay: 'linear-gradient(105deg,rgba(8,5,28,0.95) 0%,rgba(8,5,28,0.70) 52%,rgba(8,5,28,0.10) 100%)',
    accent:  '#8B5CF6',
    shadow:  'rgba(139,92,246,0.35)',
    orb:     'rgba(139,92,246,0.20)',
    text: {
      en: { tag: 'Guided Mosque Tours', headline: 'Guided Through\nCenturies of History', sub: "From Mimar Sinan's masterpiece to the Islamic wisdom it carries — every tour is a journey through culture, faith, and architecture." },
      tr: { tag: 'Rehberli Cami Turları', headline: 'Yüzyılların Tarihinde\nRehberli Yolculuk', sub: "Mimar Sinan'ın şaheserinden taşıdığı İslami bilgeliğe — her tur kültür, inanç ve mimarlık yolculuğudur." },
      ar: { tag: 'جولات إرشادية', headline: 'رحلة إرشادية عبر\nقرون من التاريخ', sub: 'من تحفة المعماري سنان إلى الحكمة الإسلامية التي تحملها — كل جولة رحلة ثقافية معمارية روحية.' },
    },
  },
  {
    photo:   '/images/hero/hero-book-handoff.jpg',
    overlay: 'linear-gradient(105deg,rgba(14,6,2,0.95) 0%,rgba(14,6,2,0.70) 52%,rgba(14,6,2,0.10) 100%)',
    accent:  '#F97316',
    shadow:  'rgba(249,115,22,0.35)',
    orb:     'rgba(249,115,22,0.15)',
    text: {
      en: { tag: 'Free Resources', headline: 'Knowledge\nShould Be Free', sub: 'Books, guides, and digital resources about Islam in 10+ languages — all free, for anyone who asks.' },
      tr: { tag: 'Ücretsiz Kaynaklar', headline: 'Bilgi\nÖzgür Olmalıdır', sub: '10\'dan fazla dilde İslam hakkında kitaplar, rehberler ve dijital kaynaklar — hepsi ücretsiz, herkese açık.' },
      ar: { tag: 'موارد مجانية', headline: 'المعرفة\nيجب أن تكون حرة', sub: 'كتب وأدلة وموارد رقمية حول الإسلام بأكثر من 10 لغات — كلها مجانية لكل من يسأل.' },
    },
  },
  {
    photo:   '/images/hero/hero-outdoor-event.jpg',
    overlay: 'linear-gradient(105deg,rgba(4,16,4,0.95) 0%,rgba(4,16,4,0.70) 52%,rgba(4,16,4,0.10) 100%)',
    accent:  '#22C55E',
    shadow:  'rgba(34,197,94,0.30)',
    orb:     'rgba(34,197,94,0.15)',
    text: {
      en: { tag: 'Community Events', headline: 'Built on Community,\nBound by Brotherhood', sub: 'From Friday iftars to outdoor gatherings by the Süleymaniye — our events unite people across cultures, languages, and beliefs.' },
      tr: { tag: 'Topluluk Etkinlikleri', headline: 'Toplulukla İnşa Edilen,\nKardeşlikle Bağlanan', sub: 'Cuma iftarlarından Süleymaniye\'nin yanındaki açık hava buluşmalarına — etkinliklerimiz insanları bir araya getirir.' },
      ar: { tag: 'فعاليات مجتمعية', headline: 'مبني على المجتمع\nمرتبط بالأخوة', sub: 'من موائد إفطار الجمعة إلى التجمعات الخارجية — فعالياتنا تجمع الناس عبر الثقافات واللغات.' },
    },
  },
];

// ── Service cards ─────────────────────────────────────────────────
const SERVICES = [
  { id: 'islam', emoji: '☪️', titleKey: 'svc1Title', descKey: 'svc1Desc', href: '/new-muslim-care-area', bg: 'rgba(201,151,58,0.10)', bgHover: 'rgba(201,151,58,0.19)', border: 'rgba(201,151,58,0.22)', bdrHover: 'rgba(201,151,58,0.52)', dot: '#F59E0B' },
  { id: 'journey', emoji: '🌙', titleKey: 'svc2Title', descKey: 'svc2Desc', href: '/new-muslim-care-area', bg: 'rgba(42,157,143,0.10)', bgHover: 'rgba(42,157,143,0.19)', border: 'rgba(42,157,143,0.22)', bdrHover: 'rgba(42,157,143,0.52)', dot: '#2DD4BF' },
  { id: 'library', emoji: '📚', titleKey: 'svc3Title', descKey: 'svc3Desc', href: '/library', bg: 'rgba(139,92,246,0.10)', bgHover: 'rgba(139,92,246,0.19)', border: 'rgba(139,92,246,0.22)', bdrHover: 'rgba(139,92,246,0.52)', dot: '#A78BFA' },
];

// ── Location data ─────────────────────────────────────────────────
const LOCATIONS = [
  { id: 'kim1', name: 'KİM 1', fullName: 'KİM 1 – Visitor Center', subtitle: 'Kanuni Medresesi Sk., Süleymaniye', desc: 'Our main welcome hub for guided mosque tours, cultural dialogue, and introductions to Islam for visitors from around the world.', bg: 'linear-gradient(145deg,#92400e 0%,#451a03 100%)', glow: 'rgba(245,158,11,0.28)', tag: 'Visitors', emoji: '🕌' },
  { id: 'kim2', name: 'KİM 2', fullName: 'KİM 2 – Madrasa', subtitle: 'Süleymaniye, Fatih, Istanbul', desc: 'A historic madrasa space hosting student exchanges, academic seminars, and in-depth Islamic education programs.', bg: 'linear-gradient(145deg,#134e4a 0%,#042f2e 100%)', glow: 'rgba(42,157,143,0.28)', tag: 'Education', emoji: '🏛️' },
  { id: 'kim3', name: 'KİM 3', fullName: 'KİM 3 – Media Center', subtitle: 'Süleymaniye, Fatih, Istanbul', desc: 'Our multilingual media hub creating documentary tours, digital content, and online outreach for global audiences.', bg: 'linear-gradient(145deg,#1e1b4b 0%,#0f0a2e 100%)', glow: 'rgba(139,92,246,0.28)', tag: 'Media', emoji: '🎬' },
  { id: 'mosque', name: 'Mosque', fullName: 'Süleymaniye Mosque', subtitle: 'Süleymaniye, Fatih, Istanbul', desc: "Built by Ottoman architect Mimar Sinan — the spiritual centrepiece of our neighbourhood and the backdrop of all our work.", bg: 'linear-gradient(145deg,#7f1d1d 0%,#450a0a 100%)', glow: 'rgba(248,113,113,0.28)', tag: 'Mosque', emoji: '⭐' },
];

// ─────────────────────────────────────────────────────────────────
// Compact LocationsCard
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
    setTilt({ x: -ny * 10, y: nx * 10 });
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovering(false); }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovering ? 1.02 : 1})`,
        transition: 'transform 0.14s cubic-bezier(0.22,1,0.36,1)',
        transformStyle: 'preserve-3d',
      }}
      className="relative h-[280px] sm:h-[320px] lg:h-[380px]"
    >
      {/* Animated gold border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(135deg,rgba(201,151,58,0.65) 0%,rgba(201,151,58,0.05) 45%,rgba(201,151,58,0.55) 100%)' }}
      />

      <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(155deg,#1A2B62 0%,#0F1838 50%,#07101E 100%)' }}>
        {/* Star pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='%23C9973A' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '88px 88px' }} />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" style={{ color: '#C9973A' }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: '#C9973A' }}>Our Locations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-white/40 text-[8px] uppercase tracking-wider">Istanbul</span>
          </div>
        </div>

        {/* Location list */}
        <div className="absolute inset-0 pt-12 pb-4 px-4 flex flex-col justify-center gap-2">
          {LOCATIONS.map((loc, i) => (
            <motion.button
              key={loc.id}
              onClick={() => setExpanded(loc.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 hover:bg-white/8 border border-transparent hover:border-white/12 focus:outline-none"
              aria-label={`View ${loc.fullName}`}
            >
              {/* Colour swatch */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xl select-none"
                style={{ background: loc.bg }}
              >
                {loc.emoji}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold leading-tight">{loc.fullName}</p>
                <p className="text-white/40 text-[10px] leading-tight mt-0.5 truncate">{loc.subtitle}</p>
              </div>
              {/* Tag pill */}
              <span
                className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: loc.glow.replace('0.28', '0.35'), color: 'rgba(255,255,255,0.72)' }}
              >
                {loc.tag}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Expanded overlay */}
        <AnimatePresence>
          {expanded && activeLoc && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-0 z-20 rounded-2xl overflow-hidden flex flex-col"
              style={{ background: activeLoc.bg }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 60% 25%,${activeLoc.glow} 0%,transparent 65%)` }} />
              <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '88px 88px' }} />
              <motion.button onClick={() => setExpanded(null)} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }} aria-label="Close">
                <X className="w-3 h-3 text-white" />
              </motion.button>
              <div className="relative z-10 flex flex-col h-full p-4 justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest mb-3" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.72)' }}>{activeLoc.tag}</span>
                  <div className="text-3xl mb-3 select-none">{activeLoc.emoji}</div>
                  <h3 className="text-white font-bold text-sm leading-tight mb-1">{activeLoc.fullName}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-2.5 h-2.5 text-white/40 shrink-0" />
                    <span className="text-white/45 text-[10px]">{activeLoc.subtitle}</span>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">{activeLoc.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Active · Istanbul</span>
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
// Unique Scroll Indicator
// ─────────────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
    >
      <motion.span
        className="text-[8px] font-bold uppercase tracking-[0.55em] text-white/35"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        Scroll
      </motion.span>
      {/* Track with travelling light */}
      <div className="w-px h-12 relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }}>
        <motion.div
          className="absolute left-0 right-0 rounded-full"
          style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.7), transparent)' }}
          animate={{ y: ['-100%', '300%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
        />
      </div>
      {/* Staggered chevrons */}
      <div className="flex flex-col items-center -mt-1 gap-0.5">
        {[0, 1].map((i) => (
          <motion.svg
            key={i}
            width="10" height="6" viewBox="0 0 10 6"
            className="text-white/40"
            animate={{ opacity: [0.2, 0.6, 0.2], y: [0, 2, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </motion.svg>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────────────────────
export function HeroSection() {
  const t      = useTranslations('hero');
  const locale = useLocale();
  const lang   = (locale === 'tr' || locale === 'ar') ? locale : 'en';
  const isRtl  = locale === 'ar' || locale === 'fa';
  const [slide, setSlide]       = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const cur = SLIDES[slide];
  const slideText = cur.text[lang];

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

      {/* ── Dark base (always behind photo) ── */}
      <div className="absolute inset-0" style={{ background: '#080e2a' }} />

      {/* ── Sliding photo ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`photo-${slide}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image src={cur.photo} alt="" fill className="object-cover object-center" priority={slide === 0} sizes="100vw" />
        </motion.div>
      </AnimatePresence>

      {/* ── Directional overlay ── */}
      <AnimatePresence mode="wait">
        <motion.div key={`overlay-${slide}`} className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }} style={{ background: cur.overlay }} />
      </AnimatePresence>

      {/* Top + bottom vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/55" />

      {/* Ambient orb */}
      <AnimatePresence mode="wait">
        <motion.div key={`orb-${slide}`} className="absolute pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6 }} style={{ width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${cur.orb} 0%,transparent 70%)`, top: -100, left: -100 }} />
      </AnimatePresence>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.9) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* ── Main content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">

          {/* ── LEFT: slide-specific copy ── */}
          <div className="order-2 lg:order-1">

            {/* Animated tag badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${slide}`}
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <motion.span className="h-px w-10" style={{ background: cur.accent }} />
                <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: cur.accent }}>
                  {slideText.tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Animated headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${slide}`}
                className="font-serif text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.4rem] font-bold text-white leading-[1.06] mb-6 whitespace-pre-line"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {slideText.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Animated subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${slide}`}
                className="text-white/58 text-lg leading-relaxed max-w-[500px] mb-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.07, ease: EASE }}
              >
                {slideText.sub}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            >
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

            {/* Service cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
            >
              <p className="text-white/28 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">{t('offer')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SERVICES.map((svc) => (
                  <Link key={svc.id} href={svc.href as `/${string}`} className="block group focus:outline-none">
                    <motion.div
                      className="flex flex-col gap-2 p-4 rounded-2xl backdrop-blur-sm cursor-pointer h-full"
                      style={{ background: svc.bg, border: `1px solid ${svc.border}` }}
                      whileHover={{ y: -4, scale: 1.03, background: svc.bgHover, borderColor: svc.bdrHover } as Parameters<typeof motion.div>[0]['whileHover']}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl select-none">{svc.emoji}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: svc.dot }} />
                      </div>
                      <p className="text-white font-semibold text-sm leading-snug">{t(svc.titleKey)}</p>
                      <p className="text-white/42 text-xs leading-relaxed">{t(svc.descKey)}</p>
                      <ArrowRight className="w-3.5 h-3.5 mt-auto self-end text-white/25 group-hover:text-white/55 transition-colors" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: compact LocationsCard ── */}
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

      {/* ── Unique scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Slide controls — bottom right ── */}
      <div className="absolute bottom-6 right-6 sm:right-8 z-20 flex items-center gap-2">
        <motion.button
          onClick={() => goTo(isRtl ? slide + 1 : slide - 1)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          aria-label="Previous slide"
        >
          {isRtl ? <ChevronRight className="w-3.5 h-3.5 text-white/55" /> : <ChevronLeft className="w-3.5 h-3.5 text-white/55" />}
        </motion.button>

        {SLIDES.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === slide ? 'true' : undefined}
            className="relative overflow-hidden rounded-full"
            animate={{ width: i === slide ? 28 : 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 5, background: i === slide ? s.accent : 'rgba(255,255,255,0.22)' }}
          >
            {i === slide && (
              <motion.span
                key={`fill-${timerKey}-${i}`}
                className="absolute inset-y-0 left-0 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                style={{ background: 'rgba(255,255,255,0.45)' }}
              />
            )}
          </motion.button>
        ))}

        <motion.button
          onClick={() => goTo(isRtl ? slide - 1 : slide + 1)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          aria-label="Next slide"
        >
          {isRtl ? <ChevronLeft className="w-3.5 h-3.5 text-white/55" /> : <ChevronRight className="w-3.5 h-3.5 text-white/55" />}
        </motion.button>
      </div>

    </section>
  );
}
