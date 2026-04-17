'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { journeySteps, floatingActions } from '@/data/what-is-islam';
import { Link } from '@/lib/i18n/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, FileText, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Step order & content ───────────────────────────────────────────────────

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

// ── SVG Tree constants (shared with JourneyMapCanvas) ─────────────────────

const CW = 660, CH = 820, NODE_RY = 22;

const NODE_POS: Record<string, readonly [number, number]> = {
  'introduction':          [330, 58 ],
  'belief-system':         [330, 183],
  'worship-and-rituals':   [330, 308],
  'prohibitions':          [100, 455],
  'ethics-and-morality':   [330, 455],
  'personal-relationship': [558, 455],
  'rational-conviction':   [455, 592],
  'quran-guidance':        [350, 730],
  'prophet-muhammad':      [568, 730],
};

const EDGES: Array<[string, string]> = [
  ['introduction',          'belief-system'],
  ['belief-system',         'worship-and-rituals'],
  ['worship-and-rituals',   'prohibitions'],
  ['worship-and-rituals',   'ethics-and-morality'],
  ['worship-and-rituals',   'personal-relationship'],
  ['personal-relationship', 'rational-conviction'],
  ['rational-conviction',   'quran-guidance'],
  ['rational-conviction',   'prophet-muhammad'],
];

function bezierD(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1, dy = y2 - y1;
  return `M${x1},${y1} C${x1+dx*0.08},${y1+dy*0.55} ${x2-dx*0.08},${y2-dy*0.55} ${x2},${y2}`;
}

// ── Hard-coded background star positions (no Math.random → no hydration error)
type StarDef = { l: number; t: number; s: number; d: number; g: boolean };
const BG_STARS: StarDef[] = [
  { l: 5,  t: 4,  s: 2,   d: 0,    g: true  }, { l: 12, t: 11, s: 1.5, d: 0.8,  g: false },
  { l: 23, t: 6,  s: 2.5, d: 1.5,  g: true  }, { l: 35, t: 9,  s: 1.5, d: 0.4,  g: false },
  { l: 47, t: 3,  s: 2,   d: 1.2,  g: true  }, { l: 58, t: 8,  s: 1.5, d: 2.0,  g: false },
  { l: 70, t: 5,  s: 3,   d: 0.6,  g: true  }, { l: 82, t: 10, s: 2,   d: 1.7,  g: false },
  { l: 92, t: 4,  s: 2.5, d: 0.3,  g: true  }, { l: 97, t: 13, s: 1.5, d: 1.1,  g: false },
  { l: 3,  t: 22, s: 2,   d: 2.2,  g: true  }, { l: 15, t: 30, s: 1.5, d: 0.7,  g: false },
  { l: 28, t: 25, s: 3,   d: 1.4,  g: true  }, { l: 41, t: 35, s: 2,   d: 0.2,  g: false },
  { l: 55, t: 28, s: 2.5, d: 1.8,  g: true  }, { l: 67, t: 38, s: 1.5, d: 0.9,  g: false },
  { l: 79, t: 32, s: 2,   d: 2.5,  g: true  }, { l: 88, t: 25, s: 1.5, d: 1.3,  g: false },
  { l: 94, t: 38, s: 2,   d: 0.5,  g: true  }, { l: 2,  t: 48, s: 1.5, d: 1.6,  g: false },
  { l: 10, t: 55, s: 2.5, d: 0.1,  g: true  }, { l: 22, t: 62, s: 2,   d: 1.9,  g: false },
  { l: 37, t: 52, s: 1.5, d: 0.7,  g: true  }, { l: 51, t: 60, s: 3,   d: 2.1,  g: false },
  { l: 63, t: 55, s: 2,   d: 0.4,  g: true  }, { l: 75, t: 65, s: 1.5, d: 1.0,  g: false },
  { l: 86, t: 58, s: 2.5, d: 1.5,  g: true  }, { l: 96, t: 52, s: 2,   d: 0.8,  g: false },
  { l: 7,  t: 75, s: 2,   d: 2.0,  g: true  }, { l: 19, t: 82, s: 1.5, d: 0.3,  g: false },
  { l: 33, t: 78, s: 2.5, d: 1.2,  g: true  }, { l: 46, t: 85, s: 2,   d: 0.6,  g: false },
  { l: 60, t: 80, s: 1.5, d: 1.7,  g: true  }, { l: 73, t: 88, s: 2,   d: 2.3,  g: false },
  { l: 85, t: 82, s: 3,   d: 0.9,  g: true  }, { l: 96, t: 76, s: 1.5, d: 1.4,  g: false },
  // Extra density in key areas
  { l: 43, t: 16, s: 2,   d: 0.5,  g: true  }, { l: 62, t: 43, s: 1.5, d: 1.3,  g: false },
  { l: 18, t: 70, s: 2,   d: 0.8,  g: true  }, { l: 77, t: 72, s: 2,   d: 1.6,  g: false },
];

// ── Full-page Islamic Background ──────────────────────────────────────────────

function IslamicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030A18] via-[#06102A] to-[#040C1F]" />

      {/* Islamic tile repeat pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 4l2.5 9.5 8-5.5-4 8.5 9.5 2-9.5 2 4 8.5-8-5.5L24 33l-2.5-9.5-8 5.5 4-8.5-9.5-2 9.5-2-4-8.5 8 5.5Z' fill='%23C9973A'/%3E%3C/svg%3E")`,
        backgroundSize: '48px 48px',
      }} />

      {/* Radial nebula glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.14]"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(201,151,58,0.5) 0%, transparent 70%)' }} />
      <div className="absolute -left-40 top-1/3 w-[500px] h-[700px] rounded-full opacity-[0.10]"
        style={{ background: 'radial-gradient(ellipse, rgba(28,37,98,0.9) 0%, transparent 65%)' }} />
      <div className="absolute -right-20 top-1/4 w-[400px] h-[600px] rounded-full opacity-[0.12]"
        style={{ background: 'radial-gradient(ellipse, rgba(201,151,58,0.35) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.1]"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(28,37,98,0.7) 0%, transparent 65%)' }} />

      {/* Twinkling star dots */}
      {BG_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.l}%`,
            top: `${star.t}%`,
            width: star.s,
            height: star.s,
            background: star.g ? '#C9973A' : '#E8EEFF',
            boxShadow: star.g
              ? `0 0 ${star.s * 2.5}px ${star.s}px rgba(201,151,58,0.95), 0 0 ${star.s * 8}px ${star.s * 2}px rgba(201,151,58,0.45)`
              : `0 0 ${star.s * 2.5}px ${star.s}px rgba(200,210,255,0.95), 0 0 ${star.s * 8}px ${star.s * 2}px rgba(180,200,255,0.35)`,
          }}
          animate={{ opacity: [0.12, 0.85, 0.12], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.4 + star.d * 0.65, repeat: Infinity, delay: star.d, ease: 'easeInOut' }}
        />
      ))}

      {/* 4-pointed sparkle stars (decorative SVG) */}
      {([
        [20, 18, 14, 0], [75, 22, 12, 1.2], [8, 50, 16, 0.5], [90, 60, 12, 1.8],
        [45, 88, 14, 0.9], [55, 42, 10, 2.2], [30, 70, 12, 0.3], [68, 78, 14, 1.5],
      ] as [number, number, number, number][]).map(([l, t, sz, d], i) => (
        <motion.div key={`sp-${i}`} className="absolute" style={{ left: `${l}%`, top: `${t}%` }}
          animate={{ opacity: [0.0, 0.55, 0.0], scale: [0.6, 1.1, 0.6] }}
          transition={{ duration: 3.5 + d * 0.8, repeat: Infinity, delay: d, ease: 'easeInOut' }}
        >
          <svg width={sz} height={sz} viewBox="0 0 20 20">
            <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5Z"
              fill="#C9973A" style={{ filter: 'drop-shadow(0 0 3px rgba(201,151,58,0.9))' }} />
          </svg>
        </motion.div>
      ))}

      {/* Crescent moon 1 — top-left */}
      <motion.div className="absolute" style={{ left: '10%', top: '12%' }}
        animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <filter id="bgm1" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M40,26 A19,19 0 1,1 18,7 A14,14 0 1,0 40,26Z" fill="#C9973A" filter="url(#bgm1)" opacity="0.82"/>
        </svg>
      </motion.div>

      {/* Crescent moon 2 — right side */}
      <motion.div className="absolute" style={{ right: '7%', top: '32%' }}
        animate={{ opacity: [0.25, 0.7, 0.25], y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42">
          <defs>
            <filter id="bgm2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M32,21 A15,15 0 1,1 14,6 A10.5,10.5 0 1,0 32,21Z" fill="#C9973A" filter="url(#bgm2)" opacity="0.72"/>
          <circle cx="36" cy="8" r="2.5" fill="#C9973A" opacity="0.6" filter="url(#bgm2)"/>
        </svg>
      </motion.div>

      {/* Crescent moon 3 — bottom left */}
      <motion.div className="absolute" style={{ left: '6%', bottom: '20%' }}
        animate={{ opacity: [0.2, 0.65, 0.2], y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2.8, ease: 'easeInOut' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <defs>
            <filter id="bgm3" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M28,18 A13,13 0 1,1 12,5 A9,9 0 1,0 28,18Z" fill="#C9973A" filter="url(#bgm3)" opacity="0.68"/>
        </svg>
      </motion.div>

      {/* Rotating 8-pointed Islamic star 1 — top right */}
      <motion.div className="absolute" style={{ right: '6%', top: '6%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44"
          style={{ filter: 'drop-shadow(0 0 8px rgba(201,151,58,0.75))' }}>
          <path d="M22 3l2.8 8.4 7.2-5-3.6 7.8 8.6 2-8.6 2 3.6 7.8-7.2-5L22 29l-2.8-8.4-7.2 5 3.6-7.8-8.6-2 8.6-2-3.6-7.8 7.2 5Z"
            fill="#C9973A" opacity="0.70"/>
        </svg>
      </motion.div>

      {/* Rotating 8-pointed Islamic star 2 — mid left, counter-rotating */}
      <motion.div className="absolute" style={{ left: '3%', top: '42%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{ filter: 'drop-shadow(0 0 6px rgba(201,151,58,0.65))' }}>
          <path d="M18 2l2.2 7 6-4-3 6.5 7 2-7 2 3 6.5-6-4L18 25l-2.2-7-6 4 3-6.5-7-2 7-2-3-6.5 6 4Z"
            fill="#C9973A" opacity="0.55"/>
        </svg>
      </motion.div>

      {/* Rotating 8-pointed Islamic star 3 — bottom right */}
      <motion.div className="absolute" style={{ right: '5%', bottom: '15%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40"
          style={{ filter: 'drop-shadow(0 0 7px rgba(201,151,58,0.70))' }}>
          <path d="M20 2l2.5 7.5 6.5-4.5-3.2 7.2 7.7 2.3-7.7 2.3 3.2 7.2-6.5-4.5L20 27l-2.5-7.5-6.5 4.5 3.2-7.2-7.7-2.3 7.7-2.3-3.2-7.2 6.5 4.5Z"
            fill="#C9973A" opacity="0.62"/>
        </svg>
      </motion.div>

      {/* Rotating 8-pointed Islamic star 4 — bottom center */}
      <motion.div className="absolute" style={{ left: '48%', bottom: '8%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28"
          style={{ filter: 'drop-shadow(0 0 5px rgba(201,151,58,0.60))' }}>
          <path d="M14 1l1.8 5.2 4.8-3.2-2.2 5 5.4 1.8-5.4 1.8 2.2 5-4.8-3.2L14 18l-1.8-5.2-4.8 3.2 2.2-5-5.4-1.8 5.4-1.8-2.2-5 4.8 3.2Z"
            fill="#C9973A" opacity="0.50"/>
        </svg>
      </motion.div>

      {/* Large arabesque mandala — centered, very faint, slow rotation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.038]">
        <motion.svg width="700" height="700" viewBox="0 0 700 700"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="350" cy="350" r="330" fill="none" stroke="#C9973A" strokeWidth="0.6"/>
          <circle cx="350" cy="350" r="270" fill="none" stroke="#C9973A" strokeWidth="0.5"/>
          <circle cx="350" cy="350" r="200" fill="none" stroke="#C9973A" strokeWidth="0.5"/>
          <circle cx="350" cy="350" r="130" fill="none" stroke="#C9973A" strokeWidth="0.4"/>
          <circle cx="350" cy="350" r="60"  fill="none" stroke="#C9973A" strokeWidth="0.4"/>
          <line x1="350" y1="20"  x2="350" y2="680" stroke="#C9973A" strokeWidth="0.4"/>
          <line x1="20"  y1="350" x2="680" y2="350" stroke="#C9973A" strokeWidth="0.4"/>
          <line x1="117" y1="117" x2="583" y2="583" stroke="#C9973A" strokeWidth="0.35"/>
          <line x1="583" y1="117" x2="117" y2="583" stroke="#C9973A" strokeWidth="0.35"/>
          <line x1="20"  y1="214" x2="680" y2="486" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
          <line x1="20"  y1="486" x2="680" y2="214" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
          <line x1="214" y1="20"  x2="486" y2="680" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
          <line x1="486" y1="20"  x2="214" y2="680" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
        </motion.svg>
      </div>

      {/* Mosque silhouette — bottom left */}
      <div className="absolute bottom-0 left-0 w-52 opacity-[0.07]">
        <svg viewBox="0 0 210 170" className="w-full">
          <path d="M45,90 Q105,25 165,90 L165,150 L45,150Z" fill="#C9973A"/>
          <path d="M45,90 Q105,35 165,90" fill="none" stroke="#C9973A" strokeWidth="1.2"/>
          <rect x="12" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M12,55 Q19,38 26,55Z" fill="#C9973A"/>
          <circle cx="19" cy="32" r="3.5" fill="#C9973A"/>
          <rect x="184" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M184,55 Q191,38 198,55Z" fill="#C9973A"/>
          <circle cx="191" cy="32" r="3.5" fill="#C9973A"/>
          <path d="M114,36 A11,11 0 1,1 99,25 A7.8,7.8 0 1,0 114,36Z" fill="#C9973A"/>
          <circle cx="118" cy="20" r="3.5" fill="#C9973A"/>
          <rect x="0" y="150" width="210" height="20" fill="#C9973A" opacity="0.3"/>
        </svg>
      </div>

      {/* Mosque silhouette — bottom right (mirrored) */}
      <div className="absolute bottom-0 right-0 w-44 opacity-[0.06]">
        <svg viewBox="0 0 210 170" className="w-full" style={{ transform: 'scaleX(-1)' }}>
          <path d="M45,90 Q105,25 165,90 L165,150 L45,150Z" fill="#C9973A"/>
          <rect x="12" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M12,55 Q19,38 26,55Z" fill="#C9973A"/>
          <circle cx="19" cy="32" r="3.5" fill="#C9973A"/>
          <rect x="184" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M184,55 Q191,38 198,55Z" fill="#C9973A"/>
          <circle cx="191" cy="32" r="3.5" fill="#C9973A"/>
          <path d="M114,36 A11,11 0 1,1 99,25 A7.8,7.8 0 1,0 114,36Z" fill="#C9973A"/>
          <rect x="0" y="150" width="210" height="20" fill="#C9973A" opacity="0.3"/>
        </svg>
      </div>

      {/* Horizon mist line */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.15]"
        style={{ background: 'linear-gradient(to top, rgba(201,151,58,0.12) 0%, transparent 100%)' }} />
    </div>
  );
}

// ── Topic List Sidebar (left, narrow) ─────────────────────────────────────────

function TopicListSidebar({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const stepIdx = STEP_ORDER.indexOf(activeId);
  return (
    <div className="hidden lg:flex flex-col w-44 xl:w-48 bg-[#06102E]/96 backdrop-blur-md border-r border-white/8 flex-shrink-0">
      {/* Header */}
      <div className="px-4 py-4 border-b border-white/8">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-kim-gold/75 mb-1">
          Educational Journey
        </p>
        <h2 className="font-serif text-sm font-bold text-white leading-tight">What is Islam?</h2>
        <p className="text-white/28 text-[9px] mt-1.5">Select any topic to explore</p>
      </div>

      {/* Topic list */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        <div className="relative">
          {/* Vertical track */}
          <div className="absolute left-[18px] top-4 bottom-8 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(201,151,58,0.55) 0%, rgba(201,151,58,0.1) 60%, rgba(201,151,58,0.3) 100%)' }} />

          {journeySteps.map((step) => {
            const isActive = step.id === activeId;
            const isCore   = step.phase === 'core';
            const isPast   = STEP_ORDER.indexOf(step.id) < stepIdx;
            return (
              <motion.button
                key={step.id}
                onClick={() => onSelect(step.id)}
                className={cn(
                  'relative flex items-center gap-2.5 w-full rounded-lg px-2 py-2 mb-0.5 text-left transition-all duration-150 border',
                  isActive ? 'bg-kim-gold/12 border-kim-gold/28' : 'hover:bg-white/5 border-transparent',
                  !isCore && 'ml-4',
                )}
                whileHover={{ x: 1 }}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              >
                {/* Node dot */}
                <div className={cn(
                  'relative z-10 flex-shrink-0 flex items-center justify-center rounded-full text-xs transition-all',
                  isActive
                    ? 'w-7 h-7 bg-kim-gold border border-kim-gold shadow-[0_0_14px_rgba(201,151,58,0.6)]'
                    : isPast
                    ? 'w-6 h-6 bg-kim-gold/16 border border-kim-gold/35'
                    : isCore
                    ? 'w-6 h-6 border border-white/18 bg-white/4 group-hover:border-white/40'
                    : 'w-5 h-5 border border-white/10 bg-kim-navy-dark'
                )}>
                  {step.icon}
                </div>

                {/* Label */}
                <span className={cn(
                  'text-[10px] font-semibold leading-tight',
                  isActive ? 'text-kim-gold' : isPast ? 'text-white/45' : 'text-white/40',
                )}>
                  {step.shortLabel}
                </span>

                {isActive && (
                  <motion.div
                    className="w-1 h-1 rounded-full bg-kim-gold flex-shrink-0 ml-auto"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress dots */}
      <div className="px-3 py-3 border-t border-white/8">
        <div className="flex gap-1 flex-wrap mb-1">
          {STEP_ORDER.map((id, i) => (
            <button key={id} onClick={() => onSelect(id)}>
              <div className={cn(
                'rounded-full transition-all duration-200',
                id === activeId ? 'w-4 h-1.5 bg-kim-gold' : i < stepIdx ? 'w-1.5 h-1.5 bg-kim-gold/35' : 'w-1.5 h-1.5 bg-white/14',
              )} />
            </button>
          ))}
        </div>
        <p className="text-white/20 text-[9px]">{stepIdx + 1} / {STEP_ORDER.length}</p>
      </div>
    </div>
  );
}

// ── Journey Tree Viewer (embedded JourneyMapCanvas logic, props-driven) ────────

function JourneyTreeViewer({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const [ax, ay] = NODE_POS[activeId] ?? [CW / 2, CH / 2];

  return (
    <div className="select-none">
      <div className="relative w-full" style={{ paddingBottom: `${(CH / CW) * 100}%` }}>
        {/* SVG lines + indicator */}
        <svg viewBox={`0 0 ${CW} ${CH}`} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <marker id="jt-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L0,6 L7,3.5z" fill="#C9973A" opacity="0.85"/>
            </marker>
            <filter id="jt-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="jt-glow2" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {EDGES.map(([from, to]) => {
            const [x1, y1] = NODE_POS[from];
            const [x2, y2] = NODE_POS[to];
            const lit = activeId === from || activeId === to;
            return (
              <motion.path
                key={`${from}→${to}`}
                d={bezierD(x1, y1 + NODE_RY + 4, x2, y2 - NODE_RY - 4)}
                fill="none"
                animate={{
                  stroke: lit ? '#C9973A' : 'rgba(255,255,255,0.11)',
                  strokeWidth: lit ? 2.2 : 1.4,
                  opacity: lit ? 1 : 0.7,
                }}
                transition={{ duration: 0.45 }}
                strokeDasharray={lit ? undefined : '5 5'}
                markerEnd={lit ? 'url(#jt-arrow)' : undefined}
                filter={lit ? 'url(#jt-glow)' : undefined}
              />
            );
          })}

          {/* Pulsing ring */}
          <motion.circle fill="none" stroke="#C9973A" strokeWidth={1.5}
            animate={{ cx: ax, cy: ay, r: [NODE_RY + 6, NODE_RY + 20], opacity: [0.65, 0] }}
            transition={{
              cx: { type: 'spring', stiffness: 180, damping: 22 },
              cy: { type: 'spring', stiffness: 180, damping: 22 },
              r:  { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
              opacity: { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
            }}
          />
          {/* Indicator dot */}
          <motion.circle r={7} fill="#C9973A" filter="url(#jt-glow2)"
            animate={{ cx: ax, cy: ay }}
            transition={{ type: 'spring', stiffness: 170, damping: 21 }}
          />
        </svg>

        {/* HTML node buttons */}
        {journeySteps.map((step) => {
          const pos = NODE_POS[step.id];
          if (!pos) return null;
          const [nx, ny] = pos;
          const isActive = activeId === step.id;
          const isCore   = step.phase === 'core';
          return (
            <motion.button
              key={step.id}
              onClick={() => onSelect(step.id)}
              className="absolute focus:outline-none"
              style={{
                left: `${(nx / CW) * 100}%`,
                top:  `${(ny / CH) * 100}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 20 : 10,
              }}
              animate={{ scale: isActive ? 1.12 : 1 }}
              whileHover={{ scale: isActive ? 1.12 : 1.06 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              <span
                style={{
                  fontSize: '8px',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 14px rgba(201,151,58,0.55), 0 0 32px rgba(201,151,58,0.2)' : undefined,
                }}
                className={cn(
                  'flex items-center gap-0.5 px-2 py-1 rounded-full border font-medium leading-none transition-colors duration-300 cursor-pointer',
                  isActive
                    ? 'bg-kim-navy border-kim-gold text-kim-gold'
                    : isCore
                    ? 'bg-kim-navy/90 border-white/22 text-white/78 hover:border-white/50 hover:text-white'
                    : 'bg-kim-navy-dark/90 border-white/16 text-white/65 hover:border-kim-gold/40 hover:text-white',
                )}
              >
                <span style={{ fontSize: '0.9em' }}>{step.icon}</span>
                {step.shortLabel}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── Journey Tree Panel (middle panel) ────────────────────────────────────────

function JourneyTreePanel({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="hidden xl:flex flex-col w-[300px] bg-[#07102A]/96 backdrop-blur-md border-r border-white/8 flex-shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-4 border-b border-white/8 bg-kim-navy-dark/30 flex-shrink-0">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-kim-gold/75 mb-1">Educational Journey</p>
        <h2 className="font-serif text-sm font-bold text-white leading-tight">What is Islam?</h2>
      </div>

      {/* SVG tree */}
      <div className="px-3 py-3 flex-shrink-0">
        <JourneyTreeViewer activeId={activeId} onSelect={onSelect} />
      </div>

      {/* Tool links */}
      <div className="px-3 pt-2 pb-3 space-y-1.5 border-t border-white/8 flex-shrink-0">
        {floatingActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/4 hover:bg-white/10 border border-white/6 hover:border-kim-gold/28 transition-all group"
          >
            <span className="text-sm flex-shrink-0">{action.icon}</span>
            <span className="text-white/60 group-hover:text-white text-[11px] font-medium">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p className="px-4 pb-4 text-[9px] text-white/18 leading-relaxed flex-shrink-0">
        Follow at your own pace — return any time to continue your journey.
      </p>
    </div>
  );
}

// ── Content Panel ────────────────────────────────────────────────────────────

function ContentPanel({
  activeId, onSelect, onOpenMobileNav,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onOpenMobileNav: () => void;
}) {
  const locale    = useLocale();
  const step      = journeySteps.find((s) => s.id === activeId)!;
  const stepIdx   = STEP_ORDER.indexOf(activeId);
  const videoId   = locale === 'tr' ? '55AGHR4JDPE' : 'K6QHtXq9dew';
  const keyPoints = KEY_POINTS[activeId] ?? [];
  const transcript = TRANSCRIPTS[activeId] ?? step.description;

  return (
    <div className="flex-1 overflow-y-auto min-w-0 bg-[#060B1C]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#05081A]/96 backdrop-blur-md border-b border-white/8 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/8 border border-white/12 text-white/60 text-xs hover:bg-white/14 transition-colors flex-shrink-0"
        >
          <Menu className="w-3.5 h-3.5" /><span>Map</span>
        </button>

        <span className="text-lg flex-shrink-0">{step.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-kim-gold text-[9px] font-black uppercase tracking-[0.28em] leading-none mb-0.5">
            Educational Journey · What is Islam?
          </p>
          <p className="text-white font-bold text-sm leading-tight truncate">{step.label}</p>
        </div>

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
            onClick={() => stepIdx < STEP_ORDER.length - 1 && onSelect(STEP_ORDER[stepIdx + 1])}
            disabled={stepIdx === STEP_ORDER.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-kim-gold text-white disabled:opacity-20 text-xs font-semibold hover:bg-amber-500 transition-colors shadow-md shadow-kim-gold/20"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
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

            {/* Left: Video + Transcript */}
            <div className="space-y-5">
              <div className="rounded-2xl overflow-hidden bg-[#020408] shadow-2xl shadow-black/70 relative"
                style={{ aspectRatio: '16/9' }}>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-kim-gold/25 via-transparent to-kim-gold/12 pointer-events-none z-10" />
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
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Overview &amp; Transcript</h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{transcript}</p>
              </div>
            </div>

            {/* Right: About + Key Points + CTA + Topics */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#0A1330] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-kim-gold flex-shrink-0" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">About This Topic</h3>
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

              <Link
                href={`/what-is-islam/${step.slug}`}
                className="flex items-center justify-between gap-3 rounded-2xl bg-kim-gold/10 border border-kim-gold/25 p-5 hover:bg-kim-gold/16 transition-all duration-150 group"
              >
                <div>
                  <p className="text-kim-gold text-[9px] font-black uppercase tracking-[0.28em] mb-1">Deep Dive</p>
                  <p className="text-white font-semibold text-sm">Explore full lesson</p>
                  <p className="text-white/35 text-xs mt-0.5">{step.shortLabel}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-kim-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>

              {/* All Topics mini-grid */}
              <div className="rounded-2xl bg-[#0A1330] border border-white/8 p-4">
                <p className="text-white/22 text-[9px] uppercase tracking-wider mb-3">All Topics</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {STEP_ORDER.map((id) => {
                    const s     = journeySteps.find((j) => j.id === id)!;
                    const isA   = id === activeId;
                    const wasDone = STEP_ORDER.indexOf(id) < stepIdx;
                    return (
                      <button
                        key={id}
                        onClick={() => onSelect(id)}
                        className={cn(
                          'flex flex-col items-center gap-0.5 p-2 rounded-xl text-center transition-all duration-150',
                          isA ? 'bg-kim-gold/18 border border-kim-gold/35' : wasDone ? 'hover:bg-white/5 opacity-55' : 'hover:bg-white/5 opacity-35 hover:opacity-60',
                        )}
                      >
                        <span className="text-base leading-none">{s.icon}</span>
                        <span className={cn('text-[8px] leading-tight mt-0.5', isA ? 'text-kim-gold font-bold' : 'text-white/55')}>
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

// ── Mobile Drawer ─────────────────────────────────────────────────────────────

function MobileDrawerPanel({
  activeId, onSelect, onClose,
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
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-kim-gold/80 mb-1">Educational Journey</p>
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
                onClick={() => { onSelect(step.id); onClose(); }}
                className={cn(
                  'flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-all border',
                  isActive ? 'bg-kim-gold/14 border-kim-gold/32' : 'hover:bg-white/5 border-transparent',
                  step.phase === 'branch' && 'ml-5',
                )}
              >
                <span className={cn(
                  'flex-shrink-0 flex items-center justify-center rounded-full text-sm',
                  isActive ? 'w-8 h-8 bg-kim-gold' : 'w-7 h-7 border border-white/18 bg-white/4',
                )}>
                  {step.icon}
                </span>
                <span className={cn('text-xs font-semibold', isActive ? 'text-kim-gold' : 'text-white/58')}>
                  {step.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tool links */}
        <div className="mt-5 pt-4 border-t border-white/8 space-y-1.5">
          {floatingActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/4 hover:bg-white/10 border border-white/6 transition-all text-sm"
            >
              <span>{action.icon}</span>
              <span className="text-white/60 text-xs font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function WhatIsIslamHub() {
  const [activeId, setActiveId]         = useState('introduction');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Full-page Islamic animated background */}
      <IslamicBackground />

      {/* 3-column layout */}
      <div className="flex h-full overflow-hidden relative z-[1]">
        {/* Col 1: Topic list sidebar */}
        <TopicListSidebar activeId={activeId} onSelect={setActiveId} />

        {/* Col 2: SVG journey tree + tools */}
        <JourneyTreePanel activeId={activeId} onSelect={setActiveId} />

        {/* Col 3: Main content */}
        <ContentPanel
          activeId={activeId}
          onSelect={setActiveId}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
      </div>

      {/* Mobile drawer overlay */}
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
            <MobileDrawerPanel
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
