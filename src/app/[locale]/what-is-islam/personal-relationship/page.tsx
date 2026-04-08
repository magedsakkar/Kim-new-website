'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ArrowRight, MessageCircle, Heart, Zap } from 'lucide-react';

// ── Divine Dialogues — the interactive conversation simulator ────────────────
const divineDialogues = [
  {
    id: 'gratitude',
    title: 'The Grateful Heart',
    context: 'You wake up feeling well after a long illness.',
    human: 'Alhamdulillah — All praise is for You, Allah. I didn\'t expect to feel this well today. Thank You.',
    divine: '"And if you should count the favours of Allah, you could not enumerate them. Indeed, Allah is Forgiving and Merciful." (Quran 14:34)\n\nEvery breath is a gift. Your gratitude multiplies it.',
    lesson: 'Du\'a (supplication) does not have to be formal. A spontaneous "Alhamdulillah" is a complete act of worship.',
  },
  {
    id: 'hardship',
    title: 'When Life Feels Impossible',
    context: 'You\'ve lost your job and your savings are running out.',
    human: 'Ya Allah — I don\'t understand why this is happening. I\'m scared. I need Your help. I feel like I\'m drowning.',
    divine: '"Verily, with hardship comes ease." (Quran 94:5–6)\n\n"And He found you lost and guided you." (Quran 93:7)\n\nYour Lord has not abandoned you. He is the Turner of Hearts. Call on Him — He is closer than you imagine.',
    lesson: 'Despair is the door Allah uses to bring us back. The very fact that you are calling means the connection is alive.',
  },
  {
    id: 'doubt',
    title: 'Wrestling with Doubt',
    context: 'You\'re lying awake at 2am, unsure if God even exists.',
    human: 'Allah — if You\'re real, I need a sign. I want to believe but my mind won\'t stop questioning. Is this doubt a sin?',
    divine: '"Those who remember Allah while standing, sitting, and on their sides, and reflect on the creation of the heavens and the earth: Our Lord, You did not create this in vain..." (Quran 3:191)\n\nDoubt is not a sin. It is the mind\'s way of seeking. Reflect on the universe. Your restlessness for truth is itself a sign.',
    lesson: 'The Prophet ﷺ said: "When waswas (whispering doubts) come, say: \'I believe in Allah and His messengers.\'" Doubt acknowledged and then anchored to conviction is the beginning of deeper faith.',
  },
  {
    id: 'sin',
    title: 'After a Mistake',
    context: 'You sinned, and shame is overwhelming you.',
    human: 'Ya Rahman, Ya Raheem — I did it again. I feel so ashamed. Maybe I\'m beyond forgiveness. Why do I keep failing?',
    divine: '"Say: O My servants who have transgressed against themselves — do not despair of the mercy of Allah. Indeed, Allah forgives all sins. He is the Forgiving, the Merciful." (Quran 39:53)\n\nThe one who despairs of My mercy has attributed to Me a quality I do not have.',
    lesson: 'Tawbah (repentance) is not about being perfect — it\'s about turning back. Every time you return to Allah after a fall, your relationship with Him deepens.',
  },
];

const prayerBenefits = [
  {
    category: 'Spiritual',
    icon: '✨',
    items: [
      'Direct, unmediated access to Allah — no priest, no intermediary',
      'Five daily anchors of divine consciousness throughout the day',
      'The closest a servant is to Allah is in prostration (Sujud)',
    ],
  },
  {
    category: 'Psychological',
    icon: '🧘',
    items: [
      'Structured mindfulness: 5 breaks from the material world daily',
      'Repetition of powerful affirmations ("You alone we worship, You alone we ask for help")',
      'Physical movement (standing, bowing, prostration) releasing tension',
    ],
  },
  {
    category: 'Social',
    icon: '🤝',
    items: [
      'Congregational prayer builds brotherhood/sisterhood across class and race',
      'Friday Jumu\'ah — weekly community gathering for reflection',
      'Synchronized global prayer (5 times daily, 1.8 billion Muslims)',
    ],
  },
];

const doubtResponses = [
  {
    doubt: '"I don\'t feel anything when I pray. Is there something wrong with me?"',
    response: 'Khushoo\' (presence of heart) is a skill, not a gift. It is built through practice, understanding what you say, slowing down, and removing distractions. Start by learning the meaning of each phrase in your prayer. The feeling follows the understanding.',
  },
  {
    doubt: '"Du\'a doesn\'t seem to work — I prayed for something and didn\'t get it."',
    response: 'The Prophet ﷺ said: "There is no Muslim who makes du\'a without sin or cutting family ties, except that Allah gives him one of three things: what he asked for, or something better is stored for him, or an equivalent harm is removed." Your du\'a is never wasted.',
  },
  {
    doubt: '"I feel like I\'m too sinful to connect with Allah."',
    response: 'This feeling is actually a sign of spiritual life — dead hearts feel no shame. Allah\'s name "Al-Tawwab" (The Ever-Accepting of Repentance) appears 11 times in the Quran. It is His attribute, not a one-time offer. Return to Him.',
  },
];

export default function PersonalRelationshipPage() {
  const [activeDialogue, setActiveDialogue] = useState<string | null>(null);

  return (
    <article className="space-y-10">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-8 py-12 text-white shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-white/20 text-white border-0">Branch C</Badge>
          <Badge className="bg-kim-olive/40 text-white border-0">From: Worship & Rituals</Badge>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
          Personal Relationship with Allah
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-8">
          Islam is not a religion of rituals performed to earn points. It is a living relationship —
          a conversation — between the creation and its Creator. Learn to speak, listen, and be heard.
        </p>
        <div className="flex flex-wrap gap-3">
          {['🕊️ Du\'a & Supplication', '🧠 Overcoming doubts', '💬 Divine Dialogues', '🙏 Benefits of prayer'].map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-3 py-1.5 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Opening insight */}
      <blockquote className="border-l-4 border-sky-400 bg-sky-50 rounded-r-2xl px-6 py-5">
        <p className="font-serif text-xl text-kim-charcoal leading-relaxed">
          "And when My servants ask you about Me — I am near. I respond to the call of the caller
          when he calls upon Me."
        </p>
        <footer className="mt-2 text-sm font-semibold text-kim-stone">— Quran 2:186</footer>
      </blockquote>

      {/* Prayer benefits */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">
          Why Prayer is a Gift, Not a Chore
        </h2>
        <p className="text-sm text-kim-stone leading-relaxed">
          The five daily prayers (Salah) are often seen as an obligation. In reality they are
          the closest thing to direct conversation with the Divine that any religion offers.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {prayerBenefits.map((b) => (
            <Card key={b.category} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{b.icon}</span>
                  <CardTitle className="text-base">{b.category} Benefits</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-kim-stone leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Du'a Guide */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal flex items-center gap-2">
          <span>🤲</span> The Art of Du'a (Supplication)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: 'What is Du\'a?', icon: MessageCircle, body: 'Du\'a literally means "calling." It is the act of speaking directly to Allah — in any language, at any time, in any state. It is the most intimate form of worship. The Prophet ﷺ called it "the essence of worship."' },
            { title: 'When to Make Du\'a', icon: Zap, body: 'After every prayer · At the last third of the night · Between the adhan and iqamah · On Fridays · While prostrating · When it is raining · When fasting at iftar time · On the Day of Arafah.' },
            { title: 'How to Make Du\'a', icon: Heart, body: 'Begin with praise of Allah. Send blessings on the Prophet ﷺ. Ask with certainty He will answer. Use His beautiful names (Ya Rahman, Ya Ghaffar, Ya Razzaq). End with praise. There is no script — speak from your heart in your own words.' },
            { title: 'Du\'a is Never Wasted', icon: Heart, body: 'Even if the specific thing you asked for is not given, Allah responds in one of three ways: He grants it · He delays it and gives it later or in the hereafter · He removes a harm equivalent in weight. Every sincere du\'a has a guaranteed response.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-sky-600" />
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-kim-stone leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* ── Divine Dialogues ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-kim-charcoal mb-1">
            💬 Divine Dialogues
          </h2>
          <p className="text-sm text-kim-stone">
            Real-life situations, turned into prayer. Select a scenario below to see how
            an ordinary moment becomes a conversation with the Lord of the Worlds.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {divineDialogues.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDialogue(activeDialogue === d.id ? null : d.id)}
              className={`group rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                activeDialogue === d.id
                  ? 'border-sky-500 bg-sky-50 shadow-md'
                  : 'border-gray-100 bg-white hover:border-sky-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-kim-charcoal text-sm">{d.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                  activeDialogue === d.id ? 'bg-sky-500 text-white' : 'bg-gray-100 text-kim-stone'
                }`}>
                  {activeDialogue === d.id ? 'Close' : 'Read'}
                </span>
              </div>
              <p className="text-xs text-kim-stone italic">{d.context}</p>

              {activeDialogue === d.id && (
                <div className="mt-4 space-y-3 border-t border-sky-200 pt-4">
                  {/* Human speech */}
                  <div className="flex gap-2">
                    <span className="shrink-0 mt-0.5 text-xs font-bold text-kim-stone">YOU</span>
                    <p className="text-sm text-kim-charcoal italic leading-relaxed">"{d.human}"</p>
                  </div>
                  {/* Divine response — Quranic */}
                  <div className="rounded-xl bg-white border border-sky-200 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-1.5">
                      Allah speaks through His Book
                    </p>
                    <p className="text-sm text-kim-charcoal leading-relaxed whitespace-pre-line">
                      {d.divine}
                    </p>
                  </div>
                  {/* Lesson */}
                  <div className="rounded-xl bg-sky-600 px-3 py-2.5">
                    <p className="text-xs font-semibold text-white">💡 {d.lesson}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <Separator />

      {/* Doubt responses */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal">
          Overcoming Common Doubts in Prayer
        </h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
          <Accordion type="single" collapsible>
            {doubtResponses.map((item, i) => (
              <AccordionItem key={i} value={`doubt-${i}`}>
                <AccordionTrigger className="text-left text-sm italic">
                  {item.doubt}
                </AccordionTrigger>
                <AccordionContent>{item.response}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Branch D navigation */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-6 space-y-3">
        <Badge className="bg-amber-500 text-white border-0">Branch D flows from here</Badge>
        <h3 className="font-serif text-xl font-bold text-kim-charcoal">
          Ready to go deeper?
        </h3>
        <p className="text-sm text-kim-stone leading-relaxed">
          If your personal connection with Allah raises rational questions — <em>why is Islam logically
          true? how do I address my intellectual doubts?</em> — Branch D, Rational Conviction,
          continues from here.
        </p>
        <Link
          href="/what-is-islam/rational-conviction"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors shadow-sm"
        >
          Rational Conviction (D) <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Back */}
      <Link
        href="/what-is-islam/worship-and-rituals"
        className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Worship & Rituals
      </Link>
    </article>
  );
}
