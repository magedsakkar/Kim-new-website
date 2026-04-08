import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Sparkles, Globe, Heart } from 'lucide-react';

const coreTopics = [
  {
    icon: Globe,
    color: 'text-sky-600 bg-sky-50',
    title: 'What Does "Islam" Mean?',
    body: 'The word Islam comes from the Arabic root "S-L-M" (سلم), which carries the meanings of peace, purity, submission, and obedience. In the religious sense, Islam means complete submission and surrender to the will of Allah (God).',
    highlight: 'Submission + Peace — the two inseparable pillars of the Islamic identity.',
  },
  {
    icon: Sparkles,
    color: 'text-amber-600 bg-amber-50',
    title: 'The Core Message',
    body: 'Islam\'s central message is Tawhid — the absolute Oneness of God. There is no deity worthy of worship except Allah, and Muhammad ﷺ is His final messenger. Every verse of the Quran, every prophetic tradition, flows from this singular truth.',
    highlight: '"There is no god but Allah" — the statement that transforms a life.',
  },
  {
    icon: Heart,
    color: 'text-rose-600 bg-rose-50',
    title: 'Why Are We Here?',
    body: 'The Quran answers this directly: "And I did not create the jinn and mankind except to worship Me." (51:56). This worship (\'Ibadah) is not limited to rituals — it is a complete way of life where every conscious act becomes an act of devotion.',
    highlight: 'Purpose is not found; it is revealed.',
  },
  {
    icon: BookOpen,
    color: 'text-violet-600 bg-violet-50',
    title: 'Where Do We Come From?',
    body: 'Islam teaches that humans were created from clay, breathed into by the divine spirit, and placed on Earth as stewards (Khalifah). We are not a cosmic accident — we are a deliberate, honoured creation given free will and accountability.',
    highlight: 'You are not a mistake. You are a vicegerent of the Most Merciful.',
  },
];

const keyTerms = [
  { term: 'Islam', definition: 'Submission to the will of God; peace through that submission' },
  { term: 'Tawhid', definition: 'The absolute oneness and uniqueness of Allah' },
  { term: 'Muslim', definition: 'One who submits to Allah; a follower of Islam' },
  { term: 'Allah', definition: 'The Arabic name for God — used by Muslims and Arabic-speaking Christians alike' },
  { term: '\'Ibadah', definition: 'Worship; any act done with the intention to please Allah' },
  { term: 'Khalifah', definition: 'Steward / vicegerent — humanity\'s role on Earth' },
];

export default function IntroductionPage() {
  return (
    <article className="space-y-10">

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        {/* decorative arc */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative">
          <Badge className="mb-4 bg-white/20 text-white border-0">Step 1 of 3 · Core Journey</Badge>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
            Introduction to Islam
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-8">
            Begin your journey of understanding. In this first step we explore what Islam means,
            its timeless core message, humanity's purpose, and our origins — as revealed in the Quran.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm">
              📖 Quranic foundations
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm">
              🕌 Meaning of Tawhid
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm">
              🌱 Purpose of life
            </span>
          </div>
        </div>
      </div>

      {/* ── Opening quote ─────────────────────────────────── */}
      <blockquote className="border-l-4 border-kim-gold bg-kim-gold-light rounded-r-2xl px-6 py-5">
        <p className="font-serif text-xl text-kim-charcoal leading-relaxed">
          "Indeed, the religion in the sight of Allah is Islam."
        </p>
        <footer className="mt-2 text-sm font-semibold text-kim-stone">
          — Quran 3:19
        </footer>
      </blockquote>

      {/* ── Core Topics ───────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">
          Four Foundational Questions
        </h2>
        <p className="text-kim-stone leading-relaxed">
          Before exploring the details of Islamic practice and belief, every seeker should
          sit with these four fundamental questions that Islam answers with remarkable clarity.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {coreTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Card key={topic.title} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-xl p-2.5 ${topic.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base mt-0.5">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-kim-stone leading-relaxed">{topic.body}</p>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
                    <p className="text-xs font-semibold text-kim-charcoal italic">
                      💡 {topic.highlight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* ── Key Terms ─────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Key Terms Glossary</h2>
        <p className="text-kim-stone text-sm">
          These Arabic terms will appear throughout your journey. Understanding them deeply is the
          first step.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {keyTerms.map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-gray-100 bg-white p-4 hover:border-kim-navy/30 transition-colors"
            >
              <p className="font-serif text-lg font-bold text-kim-navy">{item.term}</p>
              <p className="mt-1 text-xs text-kim-stone leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Reflection ────────────────────────────────────── */}
      <section className="rounded-2xl bg-kim-cream border border-kim-navy/20 p-6 space-y-3">
        <h3 className="font-serif text-xl font-bold text-kim-charcoal">
          🤔 Reflection Moment
        </h3>
        <p className="text-kim-stone leading-relaxed">
          Before you move to the next step, take a moment to sit quietly and ask yourself:
          <em> "If there is a God who created me with purpose, what would that mean for how I live?"</em>
        </p>
        <p className="text-sm text-kim-stone">
          This single question has guided millions toward Islam. Your honest reflection is the
          beginning of the journey.
        </p>
      </section>

      {/* ── Next Step CTA ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold text-kim-stone uppercase tracking-wider mb-1">
            Up next · Step 2
          </p>
          <p className="font-serif text-lg font-bold text-kim-charcoal">The Belief System</p>
          <p className="text-sm text-kim-stone mt-0.5">
            The 6 pillars of faith and addressing common misconceptions.
          </p>
        </div>
        <Link
          href="/what-is-islam/belief-system"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-kim-navy px-6 py-3 text-sm font-semibold text-white hover:bg-kim-navy-dark transition-colors shadow-md"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

    </article>
  );
}
