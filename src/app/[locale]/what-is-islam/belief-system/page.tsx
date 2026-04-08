'use client';

import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const pillars = [
  {
    num: '١',  // Arabic numeral for aesthetic
    number: 1,
    title: 'Belief in Allah',
    arabic: 'الإيمان بالله',
    color: 'border-l-kim-teal bg-gradient-to-br from-kim-teal-light to-white',
    icon: '☝️',
    summary: 'Believing in the existence, oneness, and perfection of Allah — with no partners, sons, or rivals.',
    detail: 'Tawhid is the foundation. It encompasses believing in Allah\'s names and attributes (Asma wa Sifat), His lordship (Rububiyyah), and His exclusive right to be worshipped (Uluhiyyah). Allah has no beginning, no end, no equal, and no need of creation.',
  },
  {
    num: '٢',
    number: 2,
    title: 'Belief in Angels',
    arabic: 'الإيمان بالملائكة',
    color: 'border-l-indigo-400 bg-gradient-to-br from-indigo-50 to-white',
    icon: '✨',
    summary: 'Believing in the existence of angels — spiritual beings created from light who serve Allah perfectly.',
    detail: 'Angels are not worshipped, depicted as humans with wings in a Disney sense, or confused with God. They record our deeds (Kiraman Katibin), deliver revelation (Jibril), and carry out the commands of Allah. They have no free will to disobey.',
  },
  {
    num: '٣',
    number: 3,
    title: 'Belief in Divine Books',
    arabic: 'الإيمان بالكتب',
    color: 'border-l-amber-400 bg-gradient-to-br from-amber-50 to-white',
    icon: '📖',
    summary: 'Believing that Allah revealed scriptures to His messengers — the Quran being the final, preserved revelation.',
    detail: 'This includes the Tawrah (Torah of Moses), Zabur (Psalms of David), Injeel (Gospel of Jesus) and the Quran. Muslims believe the earlier books were altered over time; the Quran alone has been perfectly preserved, verified by manuscript evidence going back to the Prophet\'s lifetime.',
  },
  {
    num: '٤',
    number: 4,
    title: 'Belief in Prophets',
    arabic: 'الإيمان بالرسل',
    color: 'border-l-emerald-400 bg-gradient-to-br from-emerald-50 to-white',
    icon: '🕊️',
    summary: 'Believing in all prophets sent by Allah — from Adam to Noah, Abraham, Moses, Jesus, and Muhammad ﷺ.',
    detail: 'Islam reveres Jesus (Isa) as one of the greatest prophets, born of a virgin, who performed miracles by God\'s permission. However, he was not divine — he was human. Muhammad ﷺ is the seal of prophethood; no new prophets will come after him.',
  },
  {
    num: '٥',
    number: 5,
    title: 'Belief in the Day of Judgement',
    arabic: 'الإيمان باليوم الآخر',
    color: 'border-l-rose-400 bg-gradient-to-br from-rose-50 to-white',
    icon: '⚖️',
    summary: 'Believing in the Day of Resurrection when all souls will be held accountable for their deeds.',
    detail: 'This life is a test. After death comes the grave (Barzakh), then resurrection, then the great reckoning. Heaven (Jannah) and Hell (Jahannam) are real destinations. Belief in Judgement Day is Islam\'s answer to the question: "Why do good people suffer and bad people prosper?"',
  },
  {
    num: '٦',
    number: 6,
    title: 'Belief in Divine Decree',
    arabic: 'الإيمان بالقدر',
    color: 'border-l-violet-400 bg-gradient-to-br from-violet-50 to-white',
    icon: '🌌',
    summary: 'Believing that Allah has knowledge of all things and that everything occurs by His will and wisdom.',
    detail: 'Qadar (divine decree) does not negate human free will. Allah knows what we will choose before we choose it — but He does not compel us. This belief brings profound peace: nothing happens by accident; every difficulty has wisdom behind it; and your destiny is written by the Most Merciful.',
  },
];

const misconceptions = [
  {
    myth: 'Muslims worship Muhammad ﷺ',
    truth: 'Muslims do not worship Muhammad ﷺ. He is revered as the final prophet and a perfect human example, but only Allah is worshipped. When the Prophet died, Abu Bakr famously said: "Whoever worshipped Muhammad, know that Muhammad has died. Whoever worships Allah, know that Allah never dies."',
  },
  {
    myth: 'Islam and Christianity worship different Gods',
    truth: 'Islam, Christianity, and Judaism all trace back to Abraham and worship the same God of Abraham. "Allah" is simply the Arabic word for God — the same word used in Arabic Bibles. Arab Christians call God "Allah."',
  },
  {
    myth: 'Muslims do not believe in Jesus',
    truth: 'Muslims deeply believe in Jesus (Isa). He is mentioned more in the Quran than Muhammad ﷺ. Muslims believe in his miraculous birth, his miracles, his ascension, and his second coming. The disagreement is only on his divine nature — Muslims see him as a great prophet, not the son of God.',
  },
  {
    myth: 'Belief in Qadar means Muslims are fatalistic',
    truth: 'Belief in divine decree is not fatalism. The Prophet ﷺ said: "Tie your camel, then put your trust in Allah." Muslims are commanded to take all worldly means, work hard, plan wisely — while trusting Allah with outcomes they cannot control.',
  },
];

export default function BeliefSystemPage() {
  return (
    <article className="space-y-10">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <Badge className="mb-4 bg-white/20 text-white border-0">Step 2 of 3 · Core Journey</Badge>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          The Belief System
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-8">
          Islam rests on six articles of faith — <em>Arkan al-Iman</em>. These are not blind beliefs
          but rational convictions that form the world-view every Muslim lives by.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm">⭐ 6 Pillars of Faith</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm">❓ Common misconceptions</span>
        </div>
      </div>

      {/* 6 Pillars */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">The 6 Pillars of Faith</h2>
        <p className="text-kim-stone leading-relaxed text-sm">
          These six beliefs were taught by the Prophet Muhammad ﷺ as the essence of Islamic theology.
          Together they form an integrated and logical world-view.
        </p>
        <div className="space-y-4">
          {pillars.map((pillar) => (
            <Card
              key={pillar.number}
              className={`border-l-4 overflow-hidden ${pillar.color}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{pillar.icon}</span>
                    <span className="text-xs font-bold text-kim-stone">{pillar.num}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <CardTitle>{pillar.title}</CardTitle>
                      <span className="font-serif text-sm text-kim-stone">{pillar.arabic}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-kim-charcoal">{pillar.summary}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-kim-stone leading-relaxed">{pillar.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Misconceptions — Accordion */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">
          Addressing Common Misconceptions
        </h2>
        <p className="text-sm text-kim-stone leading-relaxed">
          Many misconceptions about Islamic theology stem from misunderstanding or misrepresentation.
          Here are honest, evidence-based answers.
        </p>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
          <Accordion type="single" collapsible>
            {misconceptions.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-2">
                    <span className="text-rose-500 text-xs font-bold">MYTH</span>
                    {item.myth}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-emerald-600">TRUTH</span>
                    <p>{item.truth}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/what-is-islam/introduction"
          className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3 text-sm font-semibold text-kim-stone hover:border-kim-navy hover:text-kim-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Introduction
        </Link>
        <Link
          href="/what-is-islam/worship-and-rituals"
          className="flex items-center gap-2 rounded-xl bg-kim-navy px-6 py-3 text-sm font-semibold text-white hover:bg-kim-navy-dark transition-colors shadow-md ml-auto"
        >
          Next: Worship & Rituals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

    </article>
  );
}
