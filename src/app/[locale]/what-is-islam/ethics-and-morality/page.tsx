import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

const virtues = [
  { icon: '🗣️', title: 'Honesty (Sidq)', hadith: '"Truthfulness leads to righteousness and righteousness leads to Paradise." — Prophet Muhammad ﷺ', body: 'Islam makes honesty a core identity marker. The Prophet ﷺ was known as "Al-Amin" (The Trustworthy) even before prophethood. Truthfulness in speech, business, and self-reflection is foundational.' },
  { icon: '💛', title: 'Kindness (Ihsan)', hadith: '"Allah has prescribed excellence (Ihsan) in everything." — Prophet Muhammad ﷺ', body: 'Ihsan — to do things beautifully and well — is the highest level of worship. It means acting as though you see Allah, and if not, knowing He sees you. It elevates all ordinary actions into acts of worship.' },
  { icon: '⚖️', title: "Justice ('Adl)", hadith: '"Stand firmly for justice, as witnesses to Allah, even if it be against yourselves, your parents, or your relatives." — Quran 4:135', body: "Justice is not only a social obligation but an attribute of Allah Himself ('Adl is one of His names). Muslims are commanded to be just even when it harms their own interests." },
  { icon: '🫂', title: 'Mercy (Rahmah)', hadith: '"The Merciful is shown mercy by the Most Merciful. Show mercy to those on earth, and the One above the heavens will show mercy to you." — Prophet Muhammad ﷺ', body: "Mercy begins at home — with family, neighbours, animals — and extends outward. The name 'Rahman' (Most Merciful) appears at the start of 113 of 114 surahs." },
  { icon: '🙌', title: 'Generosity (Karam)', hadith: '"The best of people is he who benefits people most." — Prophet Muhammad ﷺ', body: "Beyond Zakat's obligation, Islam celebrates voluntary generosity (Sadaqah) at every level — a smile is Sadaqah, removing harm from a path is Sadaqah, kind words are Sadaqah." },
  { icon: '🤐', title: 'Guarding the Tongue', hadith: '"Whoever guarantees me what is between his jaws (tongue) and his legs (private parts), I guarantee him Paradise." — Prophet Muhammad ﷺ', body: 'Gossip (Gheebah), slander (Buhtan), and mockery are explicitly condemned. Islamic ethics gives the tongue more attention than perhaps any other organ — because words can build or destroy entire communities.' },
];

const rights = [
  { category: "Rights of Allah", items: ["Worship Him alone", "Obey His commands", "Glorify and thank Him"] },
  { category: "Rights of Parents", items: ["Absolute kindness — even if they are non-Muslim", "Providing for them in old age", "Speaking to them with gentleness ('Uff' — even a sigh — is forbidden)"] },
  { category: "Rights of Neighbours", items: ["Do not harm them", "Help them in hardship", "The Prophet ﷺ said Jibril emphasised neighbours' rights so often he thought they would inherit"] },
  { category: "Rights of Animals", items: ["Feed and water them", "Do not overburden them", "Slaughter only with a sharp blade, quickly, out of view of other animals"] },
  { category: "Rights of Employees", items: ["Pay wages before the sweat dries", "Do not overburden", "Treat with dignity — status does not determine human worth"] },
];

export default function EthicsAndMoralityPage() {
  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <Badge className="mb-4 bg-white/20 text-white border-0">Branch B</Badge>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          Ethics & Morality in Islam
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
          "I was sent only to perfect good character." — Prophet Muhammad ﷺ.
          Islam's ethics are not additions to worship — they are worship itself.
        </p>
      </div>

      <blockquote className="border-l-4 border-violet-400 bg-violet-50 rounded-r-2xl px-6 py-5">
        <p className="font-serif text-lg text-kim-charcoal">"The heaviest thing on the scale of deeds on the Day of Judgment is good character."</p>
        <footer className="mt-2 text-sm font-semibold text-kim-stone">— Prophet Muhammad ﷺ</footer>
      </blockquote>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Core Virtues</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {virtues.map((v) => (
            <Card key={v.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{v.icon}</span>
                  <CardTitle className="text-base">{v.title}</CardTitle>
                </div>
                <p className="text-xs italic text-kim-stone border-l-2 border-violet-300 pl-2 mt-1">{v.hadith}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-kim-stone leading-relaxed">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">Rights & Responsibilities</h2>
        <p className="text-sm text-kim-stone">Islam defines rights not just for humans, but for all of creation.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rights.map((r) => (
            <div key={r.category} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-kim-charcoal mb-3">{r.category}</h3>
              <ul className="space-y-1.5">
                {r.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-kim-stone">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Link href="/what-is-islam/worship-and-rituals" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Worship & Rituals
      </Link>
    </article>
  );
}
