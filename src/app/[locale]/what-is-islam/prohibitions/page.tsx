import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft } from 'lucide-react';

const wisdoms = [
  {
    prohibition: 'Alcohol & Intoxicants',
    icon: '🚫',
    verse: '"They ask you about wine and gambling. Say: In them is great sin and some benefit — but the sin is greater than the benefit." (Quran 2:219)',
    wisdoms: [
      'WHO: Alcohol causes 2.6 million deaths annually — the third leading preventable cause of death globally',
      'Intoxicants destroy the Aql (intellect) — the very gift that makes humans responsible beings',
      'Alcohol is statistically linked to domestic violence, road deaths, and addiction cycles',
      'Islam prohibits what harms you, not what you merely dislike',
    ],
    note: 'Islam did not prohibit alcohol because Muslims are weak. It prohibited it because protecting the mind (Hifz al-Aql) is one of the five essential objectives of Islamic Law.',
  },
  {
    prohibition: 'Interest-Based Finance (Riba)',
    icon: '💰',
    verse: '"Allah has permitted trade and forbidden Riba (usury/interest)." (Quran 2:275)',
    wisdoms: [
      'Interest transfers wealth from the poor to the wealthy without productive contribution',
      'The 2008 global financial crisis was largely driven by interest-based debt instruments',
      'Islam replaces Riba with risk-sharing — the financier and entrepreneur share both profit and loss',
      'Islamic finance has grown to a $3 trillion industry — proving viability at global scale',
    ],
    note: 'Riba was also condemned by Aristotle, and was illegal throughout medieval Christian Europe. Islam is not alone in recognising its harm.',
  },
  {
    prohibition: 'Pork',
    icon: '🐷',
    verse: '"He has only forbidden you dead animals, blood, pork, and what has been dedicated to other than Allah." (Quran 2:173)',
    wisdoms: [
      'Pigs carry pathogens including Trichinella spiralis, Taenia solium (tapeworm), and Hepatitis E',
      'In the 7th century Arabian peninsula — without refrigeration — pork presented serious health risks',
      'Beyond health: the prohibition is a test of obedience — following divine guidance even without full understanding',
      'Halal dietary laws create community cohesion and mindful eating habits',
    ],
    note: 'Not every prohibition needs a fully known rationale. Trusting divine wisdom even when the reason is not clear is itself an act of faith.',
  },
  {
    prohibition: 'Premarital & Extramarital Relations',
    icon: '💍',
    verse: '"And do not approach Zina (unlawful sexual intercourse). It is a great immorality and evil way." (Quran 17:32)',
    wisdoms: [
      'Protects family structure — the fundamental unit of human civilisation',
      'Eliminates ambiguity about lineage, inheritance, and parental responsibility',
      'STI rates are significantly higher outside committed monogamous relationships',
      'Islam channels a natural human drive into a sacred, stable, loving institution (marriage)',
    ],
    note: 'Islam never says the desire is wrong. It says the outlet matters. Every prohibition in Islam comes paired with a permitted alternative.',
  },
];

export default function ProhibitionsPage() {
  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <Badge className="mb-4 bg-white/20 text-white border-0">Branch A</Badge>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          Allah's Wisdom in Prohibitions
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
          Every divine prohibition protects one of the five essentials of human flourishing:
          life, intellect, lineage, wealth, and honour. This is not restriction — it is protection.
        </p>
      </div>

      <blockquote className="border-l-4 border-rose-400 bg-rose-50 rounded-r-2xl px-6 py-5">
        <p className="font-serif text-lg text-kim-charcoal leading-relaxed">
          "He commands them what is right and forbids them what is wrong, and makes lawful
          for them good things and prohibits for them evil things."
        </p>
        <footer className="mt-2 text-sm font-semibold text-kim-stone">— Quran 7:157</footer>
      </blockquote>

      <section className="space-y-6">
        {wisdoms.map((w) => (
          <Card key={w.prohibition} className="overflow-hidden border-l-4 border-l-rose-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{w.icon}</span>
                <CardTitle>{w.prohibition}</CardTitle>
              </div>
              <p className="text-xs italic text-kim-stone border-l-2 border-kim-gold pl-3 mt-2">{w.verse}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {w.wisdoms.map((wis) => (
                  <li key={wis} className="flex items-start gap-2 text-sm text-kim-stone">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    {wis}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-rose-50 border border-rose-100 px-3 py-2">
                <p className="text-xs font-semibold text-rose-800">💡 {w.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Link href="/what-is-islam/worship-and-rituals" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Worship & Rituals
      </Link>
    </article>
  );
}
