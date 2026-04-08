import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

const facts = [
  { icon: '📜', stat: '114', label: 'Surahs (chapters)', detail: 'Arranged not chronologically but by divine instruction' },
  { icon: '✍️', stat: '6,236', label: 'Verses (Ayat)', detail: 'Every word counted, confirmed across 1,400 years' },
  { icon: '🌍', stat: '1.8B', label: 'Memorisers globally', detail: 'The only book memorised in full by millions' },
  { icon: '📅', stat: '23 yrs', label: 'Revelation period', detail: '610–632 CE, verified through multiple chains' },
];

const tips = [
  { step: '01', title: 'Start with Al-Fatiha', body: 'The opening chapter (7 verses) is recited 17 times daily in prayer. Its meaning is the entire Quran in miniature. Memorise it and understand each word before anything else.' },
  { step: '02', title: 'Use a Good Translation', body: 'For English: Sahih International or Dr. Mustafa Khattab\'s "The Clear Quran." For German: Bubenheim & Elyas. For French: Muhammad Hamidullah. Avoid older archaic translations.' },
  { step: '03', title: 'Listen to Recitation', body: 'The Quran was revealed to be heard. Sheikh Mishary Al-Afasy, Sheikh Abdul Rahman Al-Sudais, and Sheikh Mahmoud Khalil Al-Husary offer accessible, beautiful recitations on YouTube and apps.' },
  { step: '04', title: 'One Page Daily', body: 'The Quran has 604 pages. One page per day = completion in 1.6 years. Two pages = under a year. Consistency beats intensity. Even five minutes daily of reflection is transformative.' },
  { step: '05', title: 'Study Tafsir', body: 'Tafsir is Quranic exegesis — explanation of context, meaning, and scholarly interpretation. "Tafsir Ibn Kathir" (summarised) is freely available online and is the most widely used classical commentary.' },
  { step: '06', title: 'Apply, Don\'t Just Recite', body: 'Umar ibn al-Khattab (2nd Caliph) would pause at every verse and not move on until he had applied it to his life. The Sahaba (companions) learned 10 verses at a time, mastered them in practice, then moved forward.' },
];

export default function QuranGuidancePage() {
  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-white/20 text-white border-0">Branch E</Badge>
          <Badge className="bg-kim-olive/40 text-white border-0">Flows from: Rational Conviction (D)</Badge>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          Quran Guidance
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
          "This is the Book about which there is no doubt, a guidance for those conscious of Allah." (Quran 2:2).
          Begin your relationship with the living word of Allah.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl bg-white border border-gray-100 p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{f.icon}</div>
            <div className="font-serif text-2xl font-bold text-kim-navy">{f.stat}</div>
            <div className="text-xs font-semibold text-kim-charcoal mt-0.5">{f.label}</div>
            <div className="text-[10px] text-kim-stone mt-1 leading-tight">{f.detail}</div>
          </div>
        ))}
      </div>

      <blockquote className="border-l-4 border-kim-navy bg-kim-navy-light rounded-r-2xl px-6 py-5">
        <p className="font-serif text-xl text-kim-charcoal">"The best of you is he who learns the Quran and teaches it."</p>
        <footer className="mt-2 text-sm font-semibold text-kim-stone">— Prophet Muhammad ﷺ</footer>
      </blockquote>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Practical Guide: How to Begin</h2>
        <div className="space-y-3">
          {tips.map((tip) => (
            <div key={tip.step} className="flex gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kim-navy text-white text-sm font-bold">
                {tip.step}
              </div>
              <div>
                <h3 className="font-semibold text-kim-charcoal">{tip.title}</h3>
                <p className="mt-1 text-sm text-kim-stone leading-relaxed">{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link href="/what-is-islam/rational-conviction" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Rational Conviction
      </Link>
    </article>
  );
}
