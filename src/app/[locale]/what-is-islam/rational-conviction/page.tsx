import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const arguments_ = [
  { icon: '🌌', title: 'The Cosmological Argument', summary: 'Everything that exists has a cause. The universe began to exist (confirmed by Big Bang cosmology). Therefore the universe has a cause — which must be outside space, time, and matter: eternal, powerful, and intentional.', ref: 'The Kalam Cosmological Argument — championed by philosophers William Lane Craig and Al-Ghazali (12th century Muslim scholar).' },
  { icon: '🔬', title: 'The Fine-Tuning Argument', summary: 'The fundamental constants of physics (gravitational force, speed of light, electron charge) are calibrated to an incomprehensible precision. A 1-in-10^120 probability deviation in cosmological constant would prevent any life. This is not chance — it is design.', ref: 'Stephen Hawking: "The remarkable fact is that the values of these numbers seem to have been very finely adjusted to make possible the development of life."' },
  { icon: '📖', title: 'The Quran as Miracle', summary: 'The Quran contains scientifically accurate descriptions of embryonic development, the expanding universe, and the barrier between seas — statements made in 7th-century Arabia that could not have been derived from any contemporary knowledge. It also contains a linguistic miracle: no human has successfully produced a chapter matching its style (the Quran challenges this in 2:23).', ref: 'Dr. Keith Moore (Embryology, University of Toronto) stated the Quranic description of embryonic stages was not known to science until the 20th century.' },
  { icon: '📜', title: 'Historical Preservation', summary: "The Quran is the only major religious text whose original language is still spoken, whose original manuscript tradition is unbroken, and whose preservation is verified by multiple independent manuscript chains dating to within years of the Prophet's life.", ref: 'The Sana\'a manuscripts (Yemen, ~671 CE) and Birmingham Quran manuscript (~568–645 CE) confirm textual preservation with remarkable accuracy.' },
];

const doubts = [
  { doubt: 'If God exists, why does He allow suffering?', answer: 'The Problem of Evil is the strongest philosophical objection to theism. Islam\'s answer: suffering is not proof of God\'s absence — it is the mechanism of the test. This life is not meant to be paradise (Jannah is). Suffering builds character, reveals priorities, and separates the sincere seeker from the fair-weather believer. Crucially: Allah does not promise absence of pain — He promises companionship through it ("I am with those who are patient" — Quran 2:153).' },
  { doubt: 'Science explains everything — why do we need God?', answer: 'Science describes how — it cannot answer why. Why is there something rather than nothing? Why do the laws of physics exist? Why is there consciousness? Science presupposes a rational, ordered universe. Islam provides the foundation science cannot: the universe is rational because it was made by a Rational Creator. Einstein: "Science without religion is lame, religion without science is blind."' },
  { doubt: 'Islam was just invented by Muhammad ﷺ', answer: 'Islam claims to be not a new religion but the restoration of original monotheism taught by all prophets from Adam to Jesus. The historical record shows the Prophet ﷺ — an illiterate man in 7th-century Arabia — produced the Quran, transformed a tribal society into a civilisation, and his predictions (the spread of Islam, the conquest of Persia and Rome) were fulfilled historically. No psychological or sociological model explains this without a divine element.' },
  { doubt: 'How do we know the Hadith (Prophetic sayings) are authentic?', answer: "Islamic scholars developed the most rigorous biographical analysis system in pre-modern history: Ilm al-Rijal (science of narrators). Every hadith's chain of transmission (Isnad) was examined — each narrator's memory, character, and continuity verified. This system predates modern source criticism by centuries and is unmatched in any other tradition." },
];

export default function RationalConvictionPage() {
  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-white/20 text-white border-0">Branch D</Badge>
          <Badge className="bg-kim-olive/40 text-white border-0">Flows from: Personal Relationship (C)</Badge>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          Rational Conviction
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
          "Do they not reflect upon the Quran? Had it been from other than Allah, they would have found within it much contradiction." (Quran 4:82).
          Islam does not ask you to park your mind at the door.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Rational Arguments for Islamic Belief</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {arguments_.map((arg) => (
            <Card key={arg.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{arg.icon}</span>
                  <CardTitle className="text-base">{arg.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-kim-stone leading-relaxed">{arg.summary}</p>
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2">
                  <p className="text-xs text-amber-800 italic">{arg.ref}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Dealing with Intellectual Doubts</h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
          <Accordion type="single" collapsible>
            {doubts.map((item, i) => (
              <AccordionItem key={i} value={`doubt-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold">{item.doubt}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/what-is-islam/quran-guidance" className="flex items-center justify-between gap-2 rounded-2xl bg-kim-navy text-white p-5 hover:bg-kim-navy-dark transition-colors shadow-md">
          <div>
            <p className="text-xs font-semibold opacity-70 mb-0.5">Branch E</p>
            <p className="font-serif font-bold">Quran Guidance</p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0" />
        </Link>
        <Link href="/what-is-islam/prophet-muhammad" className="flex items-center justify-between gap-2 rounded-2xl bg-orange-600 text-white p-5 hover:bg-orange-700 transition-colors shadow-md">
          <div>
            <p className="text-xs font-semibold opacity-70 mb-0.5">Branch F</p>
            <p className="font-serif font-bold">Prophet Muhammad ﷺ</p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0" />
        </Link>
      </div>

      <Link href="/what-is-islam/personal-relationship" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Personal Relationship
      </Link>
    </article>
  );
}
