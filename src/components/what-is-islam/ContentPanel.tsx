'use client';

import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { journeySteps, hubVideoIds } from '@/data/what-is-islam';
import { Link } from '@/lib/i18n/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, FileText, Menu } from 'lucide-react';
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

export function ContentPanel({
  activeId,
  onSelect,
  onOpenMobileNav,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onOpenMobileNav: () => void;
}) {
  const locale     = useLocale();
  const step       = journeySteps.find((s) => s.id === activeId)!;
  const stepIdx    = STEP_ORDER.indexOf(activeId);
  const videoId    = hubVideoIds[locale] ?? hubVideoIds.en;
  const keyPoints  = KEY_POINTS[activeId] ?? [];
  const transcript = TRANSCRIPTS[activeId] ?? step.description;

  return (
    <div className="flex-1 overflow-y-auto min-w-0">
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
          className="p-4 lg:p-6 max-w-5xl mx-auto"
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

              <div className="rounded-2xl bg-[#0A1330]/75 backdrop-blur-sm border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-3.5 h-3.5 text-kim-gold flex-shrink-0" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Overview &amp; Transcript</h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{transcript}</p>
              </div>
            </div>

            {/* Right: About + Key Points + CTA + Topics */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#0A1330]/75 backdrop-blur-sm border border-white/8 p-5">
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
              <div className="rounded-2xl bg-[#0A1330]/75 backdrop-blur-sm border border-white/8 p-4">
                <p className="text-white/22 text-[9px] uppercase tracking-wider mb-3">All Topics</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {STEP_ORDER.map((id) => {
                    const s      = journeySteps.find((j) => j.id === id)!;
                    const isA    = id === activeId;
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
