import { Link } from '@/lib/i18n/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    icon: '🌿',
    title: 'Our Mission',
    body: 'KİM Vakfı (Cross Cultural Center) builds bridges of understanding between cultures, faiths, and peoples — providing education, support, and community for new Muslims and curious minds worldwide.',
  },
  {
    icon: '🌍',
    title: 'Our Vision',
    body: 'A world where every seeker of truth has access to authentic, compassionate, and intellectually honest Islamic education — regardless of language, location, or background.',
  },
  {
    icon: '🤝',
    title: 'Our Team',
    body: 'Scholars, educators, designers, and volunteers united by one purpose. We operate across Turkey, Europe, and the Middle East, with partnerships in over 80 countries.',
  },
  {
    icon: '📖',
    title: 'Our History',
    body: 'Founded in Istanbul in 2010, KİM Vakfı has served new Muslims and interfaith dialogue for over 15 years. Our Süleymaniye Mosque centre has welcomed hundreds of thousands of visitors from every corner of the world.',
  },
];

const TABLET_FEATURES = [
  { icon: '🗺️', title: 'Interactive Map', desc: 'A full interactive map of Süleymaniye Mosque and its historical surroundings, with points of interest and audio guides.' },
  { icon: '🎧', title: 'Audio Tour', desc: 'Self-guided audio tour of the mosque complex available in English, Turkish, Arabic, French, German, and Spanish.' },
  { icon: '📚', title: 'Islamic Library', desc: 'A digital library of Islamic texts, brochures, and introductory materials available for instant download or reading.' },
  { icon: '🤖', title: 'Ask a Question', desc: 'A built-in chatbot that answers visitor questions about Islam, the mosque, and KİM\'s programs — available 24/7.' },
  { icon: '🌐', title: 'Multi-Language', desc: 'The app is fully translated into 12 languages, ensuring every visitor can engage with the mosque\'s history and Islam.' },
  { icon: '📋', title: 'Program Guide', desc: 'Browse KİM\'s current programs, upcoming events, and sign up for tours or educational sessions directly from the tablet.' },
];

const KIM_CENTERS = [
  {
    id: '1',
    name: 'KİM 1 — Süleymaniye',
    type: 'Visitor Centre & Mosque',
    desc: 'Our flagship centre adjacent to the Süleymaniye Mosque. This is where thousands of tourists, students, and researchers connect with Islam each year. Guided tours, prayer demos, question sessions, and a full digital library.',
    highlight: 'Main visitor hub · Est. 2010',
    visits: '80,000+ annual visitors',
    color: 'bg-kim-navy',
  },
  {
    id: '2',
    name: 'KİM 2 — Madrasa',
    type: 'Educational Madrasa',
    desc: 'A restored Ottoman madrasa converted into an Islamic education centre. Home to our structured What is Islam curriculum, new Muslim support groups, language classes, and academic seminars.',
    highlight: 'Islamic education & seminars',
    visits: 'Weekly classes & programs',
    color: 'bg-kim-olive',
  },
  {
    id: '3',
    name: 'KİM 3 — Media',
    type: 'Media Production Centre',
    desc: 'Our media centre produces documentaries, educational videos, brochures, and digital content for global distribution. Home to our podcast studio, library, and multilingual publication team.',
    highlight: 'Media, content & publication',
    visits: 'Global digital reach',
    color: 'bg-kim-navy',
  },
];

const VOLUNTEER_PLACES = [
  { icon: '🕌', title: 'Süleymaniye Visitor Guide', desc: 'Welcome tourists at the mosque, answer questions about Islam and the site\'s history. No prior experience required — full training provided.', location: 'Istanbul, Turkey', type: 'On-site' },
  { icon: '📖', title: 'Islamic Education Facilitator', desc: 'Support our What is Islam educational journey — help new Muslims and curious visitors navigate the curriculum and find resources.', location: 'Istanbul, Turkey', type: 'On-site / Online' },
  { icon: '🎬', title: 'Media & Content Creator', desc: 'Help produce videos, write articles, design graphics, or translate content for our multilingual media library.', location: 'Remote', type: 'Remote' },
  { icon: '🌐', title: 'Online Support Counselor', desc: 'Provide online guidance and emotional support for new Muslims through our chatbot platform and social media channels.', location: 'Remote', type: 'Remote' },
  { icon: '🗣️', title: 'Language Translator', desc: 'Help translate our educational materials, brochures, and digital content. We especially need translators in Urdu, Malay, French, German, and Russian.', location: 'Remote', type: 'Remote' },
  { icon: '🤝', title: 'Partner Liaison', desc: 'Connect us with mosques, Islamic centers, and universities in your country to expand our global partner network.', location: 'Your Country', type: 'Remote' },
];

const PARTNERS = [
  { name: 'Turkish Diyanet Foundation', country: 'Turkey', icon: '🇹🇷' },
  { name: 'Islamic Relief', country: 'UK', icon: '🇬🇧' },
  { name: 'ISNA', country: 'USA', icon: '🇺🇸' },
  { name: 'Al-Azhar University', country: 'Egypt', icon: '🇪🇬' },
  { name: 'Muslim Aid', country: 'Australia', icon: '🇦🇺' },
  { name: 'European Muslim Network', country: 'Belgium', icon: '🇧🇪' },
  { name: 'WAMY', country: 'Saudi Arabia', icon: '🇸🇦' },
  { name: 'IIUM', country: 'Malaysia', icon: '🇲🇾' },
];

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-kim-cream">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-kim-navy to-kim-navy-dark px-6 py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-kim-olive/10 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-kim-navy/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Link href="/new-muslim-care-area" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs mb-6 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> New Muslim Care Area
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">New Muslim Care Area</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Who We Are
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            KİM Vakfı — Kültürlerarası İletişim Merkezi. A cross-cultural centre dedicated to authentic Islamic education, meaningful human connection, and global dialogue since 2010.
          </p>
          <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
            {[{ n: '15+', l: 'Years of Service' }, { n: '80+', l: 'Partner Countries' }, { n: '4,500+', l: 'Annual Visitors' }, { n: '12', l: 'Languages' }].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-white">{s.n}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Team / History ─────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-olive" />
            <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">Foundation</span>
            <span className="h-px w-8 bg-kim-olive" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal">Our Foundation</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-serif text-lg font-bold text-kim-charcoal mb-2">{p.title}</h3>
              <p className="text-sm text-kim-stone leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Süleymaniye Mosque Tablet App ─────────────────────── */}
      <section id="tablet-app" className="bg-kim-navy text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">Digital Experience</span>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Süleymaniye Mosque<br />
                <span className="text-kim-gold">Tablet App</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Our interactive tablet application, deployed throughout the Süleymaniye Mosque complex, provides an immersive digital experience for visitors from around the world. Available in 12 languages, it transforms a visit into a journey of discovery.
              </p>
              <a
                href="mailto:info@kim.org.tr"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-kim-gold text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors"
              >
                Request Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TABLET_FEATURES.map((f) => (
                <div key={f.title} className="rounded-xl bg-white/8 border border-white/10 p-4">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="font-semibold text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KIM 1, 2, 3 — Madrasa Media Tours ─────────────────── */}
      <section id="madrasa-tours" className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-navy" />
              <span className="text-kim-navy text-xs font-semibold uppercase tracking-widest">Our Centers</span>
              <span className="h-px w-8 bg-kim-navy" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-kim-charcoal">KİM 1, 2, 3 — Our Three Centers</h2>
            <p className="text-kim-stone mt-2 max-w-xl mx-auto text-sm">
              Three interconnected centers in the heart of Istanbul, each serving a distinct purpose in our mission.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {KIM_CENTERS.map((center) => (
              <div key={center.id} className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`${center.color} px-6 py-8 relative overflow-hidden`}>
                  <span className="absolute -right-4 -top-4 text-[5rem] font-bold text-white/10 leading-none select-none">{center.id}</span>
                  <div className="relative">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 border border-white/20 rounded-full px-2.5 py-1">
                      {center.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-kim-charcoal mb-1">{center.name}</h3>
                  <p className="text-xs text-kim-stone font-medium mb-3">{center.highlight}</p>
                  <p className="text-sm text-kim-stone leading-relaxed mb-3">{center.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-kim-navy font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {center.visits}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-sm"
            >
              Book a Tour
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Volunteering Places ───────────────────────────────── */}
      <section id="volunteering" className="bg-kim-cream py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-olive" />
              <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">Join Us</span>
              <span className="h-px w-8 bg-kim-olive" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-kim-charcoal">Our Volunteering Places</h2>
            <p className="text-kim-stone mt-2 max-w-xl mx-auto text-sm">
              Whether you are in Istanbul or anywhere in the world, there is a role for you in our mission.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {VOLUNTEER_PLACES.map((place) => (
              <div key={place.title} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="text-3xl mb-3">{place.icon}</div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    place.type === 'Remote' ? 'bg-green-50 text-green-700' :
                    place.type === 'On-site' ? 'bg-kim-navy-light text-kim-navy' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {place.type}
                  </span>
                  <span className="text-xs text-kim-stone">{place.location}</span>
                </div>
                <h3 className="font-serif font-bold text-kim-charcoal text-sm mb-2">{place.title}</h3>
                <p className="text-xs text-kim-stone leading-relaxed">{place.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-kim-olive-light border border-kim-olive/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-kim-charcoal mb-1">Ready to volunteer?</p>
              <p className="text-sm text-kim-stone">Contact us to discuss which role fits you best. We welcome all backgrounds and skill sets.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-kim-olive text-white font-semibold rounded-xl hover:bg-kim-olive/80 transition-colors text-sm"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Partners Strip ────────────────────────────────────── */}
      <section className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-kim-stone text-center mb-8">Our Partners Worldwide</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PARTNERS.map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-kim-charcoal">
                <span className="text-xl">{p.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-kim-charcoal leading-tight">{p.name}</div>
                  <div className="text-[10px] text-kim-stone">{p.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <blockquote className="border-l-4 border-kim-navy bg-kim-navy-light rounded-r-2xl px-6 py-5">
          <p className="font-serif text-lg text-kim-charcoal italic">
            "The best of people is he who is most beneficial to people."
          </p>
          <footer className="mt-2 text-sm font-semibold text-kim-stone">— Prophet Muhammad ﷺ</footer>
        </blockquote>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-12">
        <Link href="/new-muslim-care-area" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to New Muslim Care Area
        </Link>
      </div>

    </div>
  );
}
