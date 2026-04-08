import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

const pillars = [
  {
    num: 1,
    name: 'Shahada',
    arabic: 'الشهادة',
    subtitle: 'Declaration of Faith',
    icon: '☝️',
    color: 'from-kim-teal to-teal-700',
    benefits: [
      'Establishes the covenant between the believer and Allah',
      'Defines the Muslim\'s core identity and purpose',
      'Is the entry point into Islam',
    ],
    body: 'There is no god but Allah and Muhammad is His messenger. These words, spoken with sincerity and conviction, are the foundation of the Muslim\'s entire existence. The Shahada is not a ritual — it is a declaration of complete world-view transformation.',
  },
  {
    num: 2,
    name: 'Salah',
    arabic: 'الصلاة',
    subtitle: 'Five Daily Prayers',
    icon: '🕌',
    color: 'from-indigo-600 to-indigo-800',
    benefits: [
      'Structures the day around consciousness of Allah',
      'Provides physical movement and mindfulness five times daily',
      'Protects against immorality (Quran 29:45)',
      'Creates direct, unmediated connection with God — no priest needed',
    ],
    body: 'Performed five times daily (Fajr, Dhuhr, Asr, Maghrib, Isha), prayer is the Muslim\'s lifeline to Allah. Each prayer takes 5–10 minutes. Over a lifetime it is the single practice that keeps the heart alive. The Prophet ﷺ said: "The first thing a person will be held accountable for on the Day of Judgement is their prayer."',
  },
  {
    num: 3,
    name: 'Zakat',
    arabic: 'الزكاة',
    subtitle: 'Obligatory Charity (2.5%)',
    icon: '💛',
    color: 'from-amber-500 to-amber-700',
    benefits: [
      'Purifies wealth — the Arabic root means "purification"',
      'Reduces wealth inequality through a structured redistribution system',
      'Develops empathy, generosity, and detachment from materialism',
      'Fulfils social responsibility to the poor, debtors, and travellers',
    ],
    body: '2.5% of savings held for a full lunar year, given annually to eight categories of recipients defined in the Quran. Zakat is not optional charity — it is a pillar, meaning neglecting it is a serious sin. It is Islam\'s built-in economic justice system.',
  },
  {
    num: 4,
    name: 'Sawm',
    arabic: 'الصوم',
    subtitle: 'Fasting in Ramadan',
    icon: '🌙',
    color: 'from-violet-600 to-violet-800',
    benefits: [
      'Develops Taqwa (God-consciousness and self-restraint)',
      'Modern science confirms benefits: autophagy, metabolic reset, mental clarity',
      'Creates global Muslim solidarity — 1.8 billion people fasting simultaneously',
      'Trains the soul to master desires — the foundation of all virtue',
    ],
    body: 'Complete abstention from food, drink, and marital relations from dawn (Fajr) to sunset (Maghrib) throughout the month of Ramadan. The purpose is not hunger — it is the elevation of the soul. The Prophet ﷺ said: "Whoever does not give up lying and acting on lies, Allah has no need of his giving up food and drink."',
  },
  {
    num: 5,
    name: 'Hajj',
    arabic: 'الحج',
    subtitle: 'Pilgrimage to Makkah',
    icon: '🕋',
    color: 'from-emerald-600 to-emerald-800',
    benefits: [
      'Obligatory once in a lifetime for those with means and health',
      'The world\'s largest annual peaceful gathering (2+ million people)',
      'Complete equalizer: everyone wears simple white cloth regardless of wealth or status',
      'Re-enacts the story of Abraham, Hajar, and Ishmael — connecting to prophetic history',
    ],
    body: 'The pilgrimage to Makkah, Saudi Arabia, during the month of Dhul Hijjah. In the state of Ihram — two white seamless cloths — king and pauper stand as one. Hajj strips away all markers of social status. It is the ultimate reminder that we will all stand equally before Allah.',
  },
];

const branchLinks = [
  { href: '/what-is-islam/prohibitions', label: "Allah's Wisdom in Prohibitions", icon: '🛡️', color: 'bg-rose-50 border-rose-200 text-rose-700', id: 'A' },
  { href: '/what-is-islam/ethics-and-morality', label: 'Ethics & Morality', icon: '💎', color: 'bg-violet-50 border-violet-200 text-violet-700', id: 'B' },
  { href: '/what-is-islam/personal-relationship', label: 'Personal Relationship with Allah', icon: '🕊️', color: 'bg-sky-50 border-sky-200 text-sky-700', id: 'C' },
];

export default function WorshipAndRitualsPage() {
  return (
    <article className="space-y-10">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <Badge className="mb-4 bg-white/20 text-white border-0">Step 3 of 3 · Core Journey</Badge>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          Worship & Rituals
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-6">
          The Five Pillars of Islam are not a burden — they are a comprehensive system for
          building a life of meaning, discipline, and closeness to Allah.
        </p>
        <div className="flex flex-wrap gap-3">
          {['🤲 5 Pillars', '🌙 Ramadan Fasting', '💛 Zakat', '🕋 Hajj', '🕌 Daily Prayer'].map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-3 py-1.5 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">The Five Pillars of Islam</h2>
        {pillars.map((p) => (
          <div key={p.num} className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            {/* Coloured header strip */}
            <div className={`bg-gradient-to-r ${p.color} px-6 py-4 flex items-center gap-4`}>
              <span className="text-3xl">{p.icon}</span>
              <div className="text-white">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-serif text-xl font-bold">{p.name}</h3>
                  <span className="font-serif text-sm opacity-75">{p.arabic}</span>
                </div>
                <p className="text-sm opacity-80">{p.subtitle}</p>
              </div>
              <span className="ml-auto font-serif text-4xl font-bold text-white/20">{p.num}</span>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-kim-stone leading-relaxed">{p.body}</p>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-kim-stone mb-2">Key Benefits</p>
                <ul className="space-y-1.5">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-kim-charcoal">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-kim-navy" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Separator />

      {/* Branch prompt */}
      <section className="space-y-4">
        <div className="rounded-2xl bg-kim-gold-light border border-kim-gold/30 p-6">
          <h2 className="font-serif text-xl font-bold text-kim-charcoal mb-2">
            🌿 Your Journey Branches Here
          </h2>
          <p className="text-kim-stone text-sm leading-relaxed">
            You have completed the three core steps. Now choose the path that speaks most to your
            current questions. Each branch can be explored independently or in sequence.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {branchLinks.map((branch) => (
            <Link
              key={branch.id}
              href={branch.href}
              className={`group flex flex-col gap-3 rounded-2xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${branch.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{branch.icon}</span>
                <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-black/10">
                  {branch.id}
                </span>
              </div>
              <p className="font-semibold text-sm leading-snug">{branch.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Back */}
      <Link
        href="/what-is-islam/belief-system"
        className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Belief System
      </Link>
    </article>
  );
}
