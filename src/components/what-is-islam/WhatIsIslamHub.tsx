'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { journeySteps } from '@/data/what-is-islam';
import { Link } from '@/lib/i18n/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, FileText, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEP_ORDER = [
  'introduction', 'belief-system', 'worship-and-rituals',
  'prohibitions', 'ethics-and-morality', 'personal-relationship',
  'rational-conviction', 'quran-guidance', 'prophet-muhammad',
];

const KEY_POINTS: Record<string, string[]> = {
  'introduction': [
    'Islam means "submission to the will of God" — rooted in the Arabic word for peace (salama)',
    'Over 1.8 billion Muslims worldwide — the 2nd largest religion on earth',
    'A complete way of life covering spirituality, law, ethics, and community',
    'Continuation of the Abrahamic tradition of Abraham, Moses, and Jesus ﷺ',
  ],
  'belief-system': [
    'Tawhid — absolute belief in the One God with no partners or equals',
    'Belief in all prophets sent to humanity, from Adam to Muhammad ﷺ',
    'Divine scriptures: the Torah, Psalms, Gospel, and the Quran',
    'Day of Judgement — every soul accountable for its deeds with perfect divine justice',
  ],
  'worship-and-rituals': [
    'Five daily prayers (Salah) facing the Kaaba in Mecca — 5 times each day',
    'Fasting (Sawm) during the month of Ramadan from dawn to sunset',
    'Annual wealth purification (Zakat) — 2.5% of saved wealth given to those in need',
    'Once-in-a-lifetime pilgrimage to Mecca (Hajj) for those physically and financially able',
  ],
  'prohibitions': [
    'Every prohibition protects one of five universals: life, mind, family, property, and faith',
    'Alcohol and intoxicants harm judgment, health, and family life',
    'Interest (riba) creates economic injustice and cycles of poverty',
    'Understanding divine wisdom transforms law from obligation to conviction',
  ],
  'ethics-and-morality': [
    'Truthfulness (sidq) is the foundation of all personal and social dealings',
    'Kindness to parents ranked second only to the worship of God in the Quran',
    'Rights of neighbours — Muslim and non-Muslim alike — are sacred',
    'The Prophet ﷺ said: "The best among you are those best in character"',
  ],
  'personal-relationship': [
    "Du'a — direct personal prayer to God with no intermediaries required",
    "God says: 'I am closer to you than your jugular vein' (Quran 50:16)",
    "Dhikr (remembrance of God) brings tranquility to the heart (Quran 13:28)",
    "Repentance (Tawbah) is always accepted with sincere intention — the door is always open",
  ],
  'rational-conviction': [
    'The Quran challenges readers: "Will they not reflect and reason?" (Quran 4:82)',
    'Not a single factual contradiction has been found in the Quran in 1,400 years',
    'Cosmological and embryological descriptions align with modern scientific discovery',
    'Faith through reason — Islam has always encouraged critical thinking and inquiry',
  ],
  'quran-guidance': [
    'Preserved word-for-word since its revelation — unchanged for over 1,400 years',
    'Memorised in full by millions of Muslims worldwide (Huffaz)',
    'Available in over 100 languages; original Arabic is the authoritative text',
    'Recitation is an act of worship — every letter carries its own reward from God',
  ],
  'prophet-muhammad': [
    'Born in Mecca 570 CE; known before prophethood as "Al-Amin" (the Trustworthy)',
    'Received first revelation in the Cave of Hira at age 40 through the Angel Jibreel',
    'His life and example (Sunnah) is the living, practical embodiment of the Quran',
    'Described as "a mercy to all of humanity" and all worlds (Quran 21:107)',
  ],
};

const TRANSCRIPTS: Record<string, string> = {
  'introduction': `Islam is the complete way of life revealed by God (Allah) to humanity through His final Prophet, Muhammad ﷺ. The word "Islam" comes from the Arabic root "salama," meaning peace, purity, and wholehearted submission to the One God. This journey begins with life's most fundamental questions: Who are we? Where did we come from? What is our purpose? Islam provides clear, rational, and deeply human answers rooted in divine revelation — and invites you to explore them with an open mind and a sincere heart.`,
  'belief-system': `At the heart of Islamic faith are six articles of belief: belief in Allah (God), in His Angels, in His revealed Books, in all His Prophets, in the Day of Judgement, and in Divine Decree. These six pillars form the complete theological foundation of a Muslim's worldview. This lesson explores each pillar with depth and clarity, addresses common misconceptions, and shows why these beliefs lead to a coherent, rational, and morally consistent understanding of existence.`,
  'worship-and-rituals': `Islam is not only a belief system — it is a lived, embodied practice. The Five Pillars of Islam structure a Muslim's daily and yearly life: the declaration of faith (Shahada), the five daily prayers (Salah), the annual purifying charity (Zakat), the month of fasting (Sawm in Ramadan), and the once-in-a-lifetime pilgrimage (Hajj). Each pillar is simultaneously a personal act of devotion to God and a communal institution that binds the global Muslim family together.`,
  'prohibitions': `Islam's prohibitions are not arbitrary restrictions — they are divine wisdom carefully protecting the five universal human necessities: life, intellect, family, wealth, and faith. This lesson explores why Islam forbids certain things, how those boundaries protect individuals and society, and how understanding divine wisdom transforms the Muslim's relationship with Islamic law from mere compliance to deep personal conviction and trust in God.`,
  'ethics-and-morality': `Islam places the cultivation of noble character (Akhlaq) at the very centre of religious life. The Prophet Muhammad ﷺ declared: "I was sent to perfect noble character." This lesson covers Islam's complete ethical framework: our obligations to God, to ourselves, to our families, to neighbours, and to all of humanity — regardless of faith, background, or origin.`,
  'personal-relationship': `One of Islam's most profound and beautiful teachings is the direct, personal, intimate relationship between a human being and their Creator — with no clergy, no confession booth, and no intermediary required. This lesson explores du'a (personal supplication), the art of Islamic contemplation and mindfulness, how to navigate spiritual doubts with honesty, and how to keep the heart alive through the continuous remembrance of God (dhikr).`,
  'rational-conviction': `Islam actively invites its followers to think, reflect, question, and reason. The Quran poses rhetorical questions, challenges assumptions, presents logical arguments, and repeatedly calls humanity to use their God-given intellect. This lesson addresses the most common intellectual questions about Islam, explores logical arguments for God's existence, and demonstrates how faith and reason — far from being opposites — are perfectly compatible in the Islamic worldview.`,
  'quran-guidance': `The Quran is the verbatim, literal word of God revealed to the Prophet Muhammad ﷺ over 23 years and preserved completely unchanged for over 1,400 years. This lesson introduces you to the Quran: its structure, its themes, its miraculous preservation, and practical guidance on how to read, understand, and begin memorising it — even if you are an absolute beginner with no prior knowledge of Arabic.`,
  'prophet-muhammad': `Who was Muhammad ﷺ? This lesson provides a historically grounded, balanced biography of Islam's final prophet — from his early life in Mecca, his profound character before prophethood, to the nature of the revelation and his lasting legacy for humanity. We also respond to common misconceptions and historical accusations with scholarship, fairness, and evidence — offering you a complete and honest picture.`,
};

// ── Islamic Decoration Components ─────────────────────────────────────────

function TwinklingStar({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-kim-gold"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{ opacity: [0.06, 0.65, 0.06], scale: [1, 1.5, 1] }}
      transition={{ duration: 2.8 + delay * 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

const L_STARS = [
  { x: 10, y: 70,  size: 2.5, delay: 0 },
  { x: 34, y: 160, size: 2,   delay: 0.9 },
  { x: 6,  y: 260, size: 3.5, delay: 1.7 },
  { x: 40, y: 370, size: 2,   delay: 0.4 },
  { x: 18, y: 460, size: 3,   delay: 2.2 },
  { x: 42, y: 560, size: 2,   delay: 1.1 },
  { x: 8,  y: 650, size: 2.5, delay: 0.6 },
  { x: 30, y: 740, size: 2,   delay: 1.8 },
];
const R_STARS = [
  { x: 6,  y: 100, size: 2.5, delay: 0.3 },
  { x: 34, y: 200, size: 2,   delay: 1.2 },
  { x: 10, y: 310, size: 3,   delay: 0 },
  { x: 38, y: 420, size: 2,   delay: 1.8 },
  { x: 4,  y: 510, size: 3.5, delay: 0.7 },
  { x: 36, y: 610, size: 2,   delay: 2.0 },
  { x: 14, y: 720, size: 2.5, delay: 1.4 },
];

function IslamicDecoLeft() {
  return (
    <div className="hidden xl:flex flex-col w-14 bg-[#030810] border-r border-white/5 flex-shrink-0 relative overflow-hidden">
      {L_STARS.map((s, i) => <TwinklingStar key={i} {...s} />)}

      {/* Crescent moon */}
      <motion.div
        className="absolute top-16 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M23,15 A13,13 0 1,1 10,2 A9,9 0 1,0 23,15Z" fill="#C9973A" opacity="0.75" />
        </svg>
      </motion.div>

      {/* Rotating 8-pointed star */}
      <motion.div
        className="absolute top-44 left-1/2 -translate-x-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2l1.8 5.4 5.4-1.8-3 4.8 5.4 1.8-5.4 1.8 3 4.8-5.4-1.8L12 22l-1.8-5.4-5.4 1.8 3-4.8-5.4-1.8 5.4-1.8-3-4.8 5.4 1.8Z" fill="#C9973A" opacity="0.45" />
        </svg>
      </motion.div>

      {/* Vertical gold line */}
      <div className="absolute left-1/2 -translate-x-px top-64 bottom-28 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,151,58,0.25), transparent)' }} />

      {/* Hilal at bottom */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        <svg width="26" height="32" viewBox="0 0 26 32">
          <path d="M20,16 A10,10 0 1,1 8,6 A7,7 0 1,0 20,16Z" fill="#C9973A" opacity="0.55" />
          <circle cx="22" cy="8" r="2" fill="#C9973A" opacity="0.65" />
        </svg>
      </motion.div>
    </div>
  );
}

function IslamicDecoRight() {
  return (
    <div className="hidden xl:flex flex-col w-14 bg-[#030810] border-l border-white/5 flex-shrink-0 relative overflow-hidden">
      {R_STARS.map((s, i) => <TwinklingStar key={i} {...s} />)}

      {/* Hilal + star (Islamic emblem) */}
      <motion.div
        className="absolute top-14 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.4, 0.88, 0.4] }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 0.5 }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M24,16 A12,12 0 1,1 11,4 A8.5,8.5 0 1,0 24,16Z" fill="#C9973A" opacity="0.65" />
          <path d="M26,9l1.2 3.6 3.6-1.2-2.2 2.8 3.6 1.2-3.6 1.2 2.2 2.8-3.6-1.2L26,22l-1.2-3.6-3.6 1.2 2.2-2.8-3.6-1.2 3.6-1.2-2.2-2.8 3.6 1.2Z" fill="#C9973A" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Counter-rotating geometric star */}
      <motion.div
        className="absolute top-48 left-1/2 -translate-x-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26">
          <path d="M13 2l1.5 4.5 4-2.5-2 4 4.5 1.5-4.5 1.5 2 4-4-2.5L13 17l-1.5-4.5-4 2.5 2-4L5 9.5l4.5-1.5-2-4 4 2.5Z" fill="#C9973A" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Vertical line */}
      <div className="absolute left-1/2 -translate-x-px top-72 bottom-36 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,151,58,0.22), transparent)' }} />

      {/* Mosque silhouette */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 56 96" className="w-full">
          <path d="M12,44 Q28,20 44,44 L44,80 L12,80Z" fill="rgba(201,151,58,0.10)" />
          <path d="M12,44 Q28,26 44,44" fill="none" stroke="rgba(201,151,58,0.22)" strokeWidth="0.7" />
          <rect x="5" y="30" width="5" height="50" fill="rgba(201,151,58,0.09)" rx="1" />
          <path d="M5,30 Q7.5,22 10,30Z" fill="rgba(201,151,58,0.18)" />
          <circle cx="7.5" cy="19" r="1.5" fill="rgba(201,151,58,0.28)" />
          <rect x="46" y="30" width="5" height="50" fill="rgba(201,151,58,0.09)" rx="1" />
          <path d="M46,30 Q48.5,22 51,30Z" fill="rgba(201,151,58,0.18)" />
          <circle cx="48.5" cy="19" r="1.5" fill="rgba(201,151,58,0.28)" />
          <path d="M30,16 A6,6 0 1,1 23,12 A4.2,4.2 0 1,0 30,16Z" fill="rgba(201,151,58,0.42)" />
          <rect x="0" y="80" width="56" height="16" fill="rgba(201,151,58,0.04)" />
        </svg>
      </div>
    </div>
  );
}

// ── Node Map Panel ─────────────────────────────────────────────────────────

function NodeMapPanel({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const stepIdx = STEP_ORDER.indexOf(activeId);

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 bg-[#07102A] border-r border-white/8 flex-shrink-0 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-5 border-b border-white/8 bg-kim-navy-dark/50">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-kim-gold/80 mb-1.5">
          Educational Journey
        </p>
        <h2 className="font-serif text-xl font-bold text-white leading-tight">What is Islam?</h2>
        <p className="text-white/30 text-[11px] mt-1.5 leading-relaxed">
          Select any topic to explore
        </p>
      </div>

      {/* Step list */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="relative">
          {/* Vertical track line */}
          <div
            className="absolute left-[24px] top-5 bottom-8 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,151,58,0.5) 0%, rgba(201,151,58,0.12) 55%, rgba(201,151,58,0.35) 100%)',
            }}
          />

          {journeySteps.map((step) => {
            const isActive = step.id === activeId;
            const isCore = step.phase === 'core';
            const isPast = STEP_ORDER.indexOf(step.id) < stepIdx;

            return (
              <motion.button
                key={step.id}
                onClick={() => onSelect(step.id)}
                className={cn(
                  'relative flex items-center gap-3 w-full rounded-xl px-3 py-2.5 mb-1 text-left transition-all duration-150 group border',
                  isActive
                    ? 'bg-kim-gold/12 border-kim-gold/30'
                    : 'hover:bg-white/5 border-transparent',
                  !isCore && 'ml-5'
                )}
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              >
                {/* Node circle */}
                <div
                  className={cn(
                    'relative z-10 flex-shrink-0 flex items-center justify-center rounded-full text-sm transition-all duration-200',
                    isActive
                      ? 'w-9 h-9 bg-kim-gold border border-kim-gold shadow-[0_0_20px_rgba(201,151,58,0.55)]'
                      : isPast
                      ? 'w-8 h-8 bg-kim-gold/18 border border-kim-gold/40'
                      : isCore
                      ? 'w-8 h-8 border border-white/20 bg-white/4 group-hover:border-white/40'
                      : 'w-7 h-7 border border-white/12 bg-kim-navy-dark group-hover:border-kim-olive/50'
                  )}
                >
                  {step.icon}
                </div>

                {/* Label */}
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-xs font-semibold leading-tight truncate',
                      isActive
                        ? 'text-kim-gold'
                        : isPast
                        ? 'text-white/55'
                        : 'text-white/48 group-hover:text-white/85'
                    )}
                  >
                    {step.shortLabel}
                  </p>
                  {!isCore && step.branchId && (
                    <p className="text-[9px] text-white/22 mt-0.5 uppercase tracking-wider">
                      Branch {step.branchId}
                    </p>
                  )}
                </div>

                {isActive && (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-kim-gold flex-shrink-0"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress footer */}
      <div className="px-5 py-4 border-t border-white/8 bg-black/20">
        <div className="flex gap-1 mb-2 flex-wrap">
          {STEP_ORDER.map((id) => (
            <button key={id} onClick={() => onSelect(id)} aria-label={`Go to ${id}`}>
              <div
                className={cn(
                  'rounded-full transition-all duration-200',
                  id === activeId
                    ? 'w-5 h-2 bg-kim-gold'
                    : STEP_ORDER.indexOf(id) < stepIdx
                    ? 'w-2 h-2 bg-kim-gold/35'
                    : 'w-2 h-2 bg-white/15'
                )}
              />
            </button>
          ))}
        </div>
        <p className="text-white/25 text-[10px]">
          Step {stepIdx + 1} of {STEP_ORDER.length}
        </p>
      </div>
    </div>
  );
}

// ── Content Panel ──────────────────────────────────────────────────────────

function ContentPanel({
  activeId,
  onSelect,
  onOpenMobileNav,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onOpenMobileNav: () => void;
}) {
  const locale = useLocale();
  const step = journeySteps.find((s) => s.id === activeId)!;
  const stepIdx = STEP_ORDER.indexOf(activeId);
  const videoId = locale === 'tr' ? '55AGHR4JDPE' : 'K6QHtXq9dew';
  const keyPoints = KEY_POINTS[activeId] ?? [];
  const transcript = TRANSCRIPTS[activeId] ?? step.description;

  return (
    <div className="flex-1 overflow-y-auto min-w-0 bg-[#060B1C]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#05081A]/96 backdrop-blur-md border-b border-white/8 px-4 py-3 flex items-center gap-3">
        {/* Mobile map toggle */}
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/8 border border-white/12 text-white/60 text-xs hover:bg-white/14 transition-colors flex-shrink-0"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Map</span>
        </button>

        <span className="text-lg flex-shrink-0">{step.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-kim-gold text-[9px] font-black uppercase tracking-[0.28em] leading-none mb-0.5">
            Educational Journey · What is Islam?
          </p>
          <p className="text-white font-bold text-sm leading-tight truncate">{step.label}</p>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => stepIdx > 0 && onSelect(STEP_ORDER[stepIdx - 1])}
            disabled={stepIdx === 0}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/15 text-white/50 hover:border-white/35 hover:text-white/85 disabled:opacity-20 text-xs transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() =>
              stepIdx < STEP_ORDER.length - 1 && onSelect(STEP_ORDER[stepIdx + 1])
            }
            disabled={stepIdx === STEP_ORDER.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-kim-gold text-white disabled:opacity-20 text-xs font-semibold hover:bg-amber-500 transition-colors shadow-md shadow-kim-gold/20"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="p-5 lg:p-7 max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6">

            {/* ── Left: Video + Transcript ── */}
            <div className="space-y-5">
              {/* Video player */}
              <div
                className="rounded-2xl overflow-hidden bg-[#020408] shadow-2xl shadow-black/70 relative"
                style={{ aspectRatio: '16/9' }}
              >
                {/* Decorative border glow */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-kim-gold/30 via-transparent to-kim-gold/15 pointer-events-none z-10" />
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full"
                  title={step.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Transcript */}
              <div className="rounded-2xl bg-[#0A1330] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-3.5 h-3.5 text-kim-gold flex-shrink-0" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Overview & Transcript
                  </h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{transcript}</p>
              </div>
            </div>

            {/* ── Right: Explanation + Key Points + Navigation ── */}
            <div className="space-y-4">
              {/* About this topic */}
              <div className="rounded-2xl bg-[#0A1330] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-kim-gold flex-shrink-0" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    About This Topic
                  </h3>
                </div>
                <p className="text-white/58 text-sm leading-relaxed mb-4">{step.description}</p>

                {keyPoints.length > 0 && (
                  <ul className="space-y-2.5">
                    {keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-kim-gold/65 mt-[5px] flex-shrink-0" />
                        <span className="text-white/52 text-xs leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Full lesson CTA */}
              <Link
                href={`/what-is-islam/${step.slug}`}
                className="flex items-center justify-between gap-3 rounded-2xl bg-kim-gold/10 border border-kim-gold/25 p-5 hover:bg-kim-gold/16 transition-all duration-150 group"
              >
                <div>
                  <p className="text-kim-gold text-[9px] font-black uppercase tracking-[0.28em] mb-1">
                    Deep Dive
                  </p>
                  <p className="text-white font-semibold text-sm">Explore full lesson</p>
                  <p className="text-white/35 text-xs mt-0.5">{step.shortLabel}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-kim-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>

              {/* All topics mini-grid */}
              <div className="rounded-2xl bg-[#0A1330] border border-white/8 p-4">
                <p className="text-white/22 text-[9px] uppercase tracking-wider mb-3">All Topics</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {STEP_ORDER.map((id) => {
                    const s = journeySteps.find((j) => j.id === id)!;
                    const isA = id === activeId;
                    const wasDone = STEP_ORDER.indexOf(id) < stepIdx;
                    return (
                      <button
                        key={id}
                        onClick={() => onSelect(id)}
                        className={cn(
                          'flex flex-col items-center gap-0.5 p-2 rounded-xl text-center transition-all duration-150',
                          isA
                            ? 'bg-kim-gold/18 border border-kim-gold/35'
                            : wasDone
                            ? 'hover:bg-white/5 opacity-55'
                            : 'hover:bg-white/5 opacity-35 hover:opacity-60'
                        )}
                      >
                        <span className="text-base leading-none">{s.icon}</span>
                        <span
                          className={cn(
                            'text-[8px] leading-tight mt-0.5',
                            isA ? 'text-kim-gold font-bold' : 'text-white/55'
                          )}
                        >
                          {s.shortLabel.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Mobile Node Panel ──────────────────────────────────────────────────────

function MobileNodePanel({
  activeId,
  onSelect,
  onClose,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="mobile-panel"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="fixed inset-y-0 left-0 z-[60] w-72 bg-[#07102A] shadow-2xl overflow-y-auto"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-kim-gold/80 mb-1">
              Educational Journey
            </p>
            <h2 className="font-serif text-lg font-bold text-white">What is Islam?</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          {journeySteps.map((step) => {
            const isActive = step.id === activeId;
            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelect(step.id);
                  onClose();
                }}
                className={cn(
                  'flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-all border',
                  isActive
                    ? 'bg-kim-gold/14 border-kim-gold/32'
                    : 'hover:bg-white/5 border-transparent',
                  step.phase === 'branch' && 'ml-5'
                )}
              >
                <span
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center rounded-full text-sm',
                    isActive ? 'w-8 h-8 bg-kim-gold' : 'w-7 h-7 border border-white/18 bg-white/4'
                  )}
                >
                  {step.icon}
                </span>
                <span
                  className={cn(
                    'text-xs font-semibold',
                    isActive ? 'text-kim-gold' : 'text-white/58'
                  )}
                >
                  {step.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────

export function WhatIsIslamHub() {
  const [activeId, setActiveId] = useState('introduction');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-10 bg-[#06091A] overflow-hidden" style={{ paddingTop: '80px' }}>
      <div className="flex h-full overflow-hidden">
        {/* Left Islamic decoration */}
        <IslamicDecoLeft />

        {/* Node map — desktop sidebar */}
        <NodeMapPanel activeId={activeId} onSelect={setActiveId} />

        {/* Content */}
        <ContentPanel
          activeId={activeId}
          onSelect={setActiveId}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />

        {/* Right Islamic decoration */}
        <IslamicDecoRight />
      </div>

      {/* Mobile node panel overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <MobileNodePanel
              activeId={activeId}
              onSelect={setActiveId}
              onClose={() => setMobileNavOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
