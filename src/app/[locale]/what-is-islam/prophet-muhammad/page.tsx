import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft } from 'lucide-react';

const timeline = [
  { year: '570 CE', event: 'Born in Makkah, Arabian Peninsula. Father died before his birth; mother died when he was 6.' },
  { year: '576 CE', event: 'Raised by his grandfather Abdul Muttalib, then uncle Abu Talib.' },
  { year: '595 CE', event: 'Married Khadijah (RA), a successful businesswoman 15 years his senior who proposed to him. He was 25, she was 40.' },
  { year: '610 CE', event: 'First revelation in Cave Hira. The word "Iqra" (Read) — to an illiterate man. A 23-year mission begins.' },
  { year: '619 CE', event: '"Year of Sorrow" — Khadijah and Abu Talib both die. The two pillars of his support are gone.' },
  { year: '622 CE', event: 'The Hijra — migration to Madinah. This event is so significant it marks the start of the Islamic calendar.' },
  { year: '630 CE', event: 'Conquest of Makkah — with an army of 10,000. He forgives his enemies and announces a general amnesty. No looting, no executions.' },
  { year: '632 CE', event: 'Final Hajj sermon to 124,000 people: "All people are equal... an Arab has no superiority over a non-Arab." Dies 3 months later.' },
];

const character = [
  { trait: 'Humility', example: 'He mended his own clothes, milked his own goats, swept his own house, and refused special treatment. When companions stood up for him, he asked them not to.' },
  { trait: 'Justice', example: 'He said: "If my daughter Fatima stole, I would cut her hand." He applied the law equally to his own family. He rejected intercession when it came to punishing the powerful.' },
  { trait: 'Mercy', example: 'When a Bedouin urinated in the mosque, companions rushed to stop him. The Prophet said: "Leave him. Pour water over it. You were sent to make things easy, not difficult."' },
  { trait: 'Generosity', example: 'He never refused a request. Companions said he would give everything until nothing was left. He died with his armour mortgaged for food for his family.' },
  { trait: 'Playfulness', example: 'He raced with his wife Aisha ﷺ. He played with children. He laughed loudly. He gave companions nicknames. He was not a stern, distant figure.' },
];

const accusations = [
  { accusation: 'He was violent and spread Islam by the sword', response: 'For 13 years in Makkah, Muslims were tortured, killed, and exiled — and received divine instruction not to retaliate. The first permission to fight came only in self-defence (Quran 22:39-40). Historical analysis shows the vast majority of lands that became Muslim did so through trade, migration, and dawah — not conquest. The early Muslim state offered non-Muslims (Dhimmis) protection of life, property, and religion — unprecedented in antiquity.' },
  { accusation: 'His marriage to Aisha was inappropriate', response: 'Age of marriage was defined by puberty in 7th century Arabia, across all civilisations. Critically, Aisha herself became the 4th greatest narrator of Hadith, a leading jurist, and a military commander. She described her marriage as loving and was never coerced. Historical context matters: judging 7th-century customs by 21st-century Western norms is anachronistic. The same standard would condemn every pre-modern figure in history.' },
  { accusation: 'He plagiarised the Quran from the Bible', response: 'The Quran corrects Biblical narratives (e.g., Haman is correctly identified as an Egyptian courtier, not a Babylonian one — a distinction not available in any Biblical source). The Prophet ﷺ was illiterate. No consistent literary source for the Quran has been identified. The Dead Sea Scrolls, discovered in 1947, confirm Quranic depictions of pre-Islamic Abrahamic tradition that were not available in the Christian canon.' },
];

export default function ProphetMuhammadPage() {
  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-white/20 text-white border-0">Branch F</Badge>
          <Badge className="bg-kim-olive/40 text-white border-0">Flows from: Rational Conviction (D)</Badge>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          The Prophet Muhammad ﷺ
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
          Michael Hart ranked him #1 in "The 100 Most Influential Persons in History."
          Gandhi said: "I wanted to know the best of the life of one who holds today an
          undisputed sway over millions." Who was this man?
        </p>
      </div>

      {/* Timeline */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Life in Brief</h2>
        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-orange-100" />
          <div className="space-y-4">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-4">
                <div className="w-14 shrink-0 text-right">
                  <span className="text-xs font-bold text-orange-600">{t.year}</span>
                </div>
                <div className="relative flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500 ring-2 ring-orange-100" />
                  <p className="text-sm text-kim-stone leading-relaxed">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">His Character</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {character.map((c) => (
            <Card key={c.trait} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-orange-700">{c.trait}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-kim-stone leading-relaxed italic">"{c.example}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">
          Answering Common Accusations
        </h2>
        <p className="text-sm text-kim-stone">Historical facts, not apologetics.</p>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
          <Accordion type="single" collapsible>
            {accusations.map((item, i) => (
              <AccordionItem key={i} value={`acc-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold text-rose-700">
                  ❝ {item.accusation}
                </AccordionTrigger>
                <AccordionContent>{item.response}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <blockquote className="border-l-4 border-orange-400 bg-orange-50 rounded-r-2xl px-6 py-5">
        <p className="font-serif text-lg text-kim-charcoal">
          "Certainly you have in the Messenger of Allah an excellent example for anyone whose hope is in Allah and the Last Day."
        </p>
        <footer className="mt-2 text-sm font-semibold text-kim-stone">— Quran 33:21</footer>
      </blockquote>

      <Link href="/what-is-islam/rational-conviction" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Rational Conviction
      </Link>
    </article>
  );
}
