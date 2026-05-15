import { buildMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/constants';
import { Tablet, MapPin, Monitor, Globe, BookOpen, Video } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Projelerimiz', en: 'Our Projects', ar: 'مشاريعنا' };
  const descs = {
    tr: 'KİM Vakfı projelerini keşfedin — Süleymaniye Camii tablet uygulaması ve daha fazlası.',
    en: 'Explore KIM Foundation projects — the Süleymaniye Mosque tablet app and more.',
    ar: 'استكشف مشاريع مؤسسة كيم — تطبيق لوحي مسجد السليمانية والمزيد.',
  };
  return buildMetadata({
    locale,
    slug: 'our-projects',
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descs[locale as keyof typeof descs] || descs.en,
  });
}

const DOT_TEXTURE = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

const LOCATIONS = [
  {
    name: 'KİM 1 – Visitor Center',
    subtitle: { tr: 'Ziyaretçi Merkezi', en: 'Visitor Center', ar: 'مركز الزوار' },
    desc: {
      tr: 'Rehberli cami turları, kültürel diyalog ve dünya genelinden ziyaretçilere İslam tanıtımı için ana karşılama merkezimiz.',
      en: 'Our main welcome hub for guided mosque tours, cultural dialogue, and introductions to Islam for visitors from around the world.',
      ar: 'مركز الاستقبال الرئيسي لجولاتنا الإرشادية والحوار الثقافي وتعريف الزوار من حول العالم بالإسلام.',
    },
    bg: 'linear-gradient(145deg,#92400e 0%,#451a03 100%)',
    glow: 'rgba(245,158,11,0.28)',
    emoji: '🕌',
    address: 'Kanuni Medresesi Sk., Süleymaniye, Fatih',
  },
  {
    name: 'KİM 2 – Madrasa',
    subtitle: { tr: 'Medrese', en: 'Madrasa', ar: 'المدرسة' },
    desc: {
      tr: 'Öğrenci değişimleri, akademik seminerler ve derinlemesine İslami eğitim programlarına ev sahipliği yapan tarihi medrese mekanımız.',
      en: 'A historic madrasa space hosting student exchanges, academic seminars, and in-depth Islamic education programs.',
      ar: 'فضاء مدرسة تاريخية تستضيف تبادلات الطلاب والندوات الأكاديمية وبرامج التعليم الإسلامي المتعمق.',
    },
    bg: 'linear-gradient(145deg,#134e4a 0%,#042f2e 100%)',
    glow: 'rgba(42,157,143,0.28)',
    emoji: '🏛️',
    address: 'Süleymaniye, Fatih, Istanbul',
  },
  {
    name: 'KİM 3 – Media Center',
    subtitle: { tr: 'Medya Merkezi', en: 'Media Center', ar: 'مركز الإعلام' },
    desc: {
      tr: 'Küresel izleyiciler için belgesel turlar, dijital içerik ve çevrimiçi erişim oluşturan çok dilli medya merkezimiz.',
      en: 'Our multilingual media hub creating documentary tours, digital content, and online outreach for global audiences.',
      ar: 'مركزنا الإعلامي متعدد اللغات الذي ينتج جولات وثائقية ومحتوى رقمي وتوعية إلكترونية للجماهير العالمية.',
    },
    bg: 'linear-gradient(145deg,#1e1b4b 0%,#0f0a2e 100%)',
    glow: 'rgba(139,92,246,0.28)',
    emoji: '🎬',
    address: 'Süleymaniye, Fatih, Istanbul',
  },
  {
    name: 'Süleymaniye Mosque',
    subtitle: { tr: 'Süleymaniye Camii', en: 'Süleymaniye Mosque', ar: 'مسجد السليمانية' },
    desc: {
      tr: 'Osmanlı mimarı Mimar Sinan tarafından inşa edilmiş — mahallemizin manevi merkezi ve tüm çalışmalarımızın arka planı.',
      en: "Built by Ottoman architect Mimar Sinan — the spiritual centrepiece of our neighbourhood and the backdrop of all our work.",
      ar: 'بناه المعماري العثماني معمار سنان — المركز الروحي لحيّنا وخلفية كل أعمالنا.',
    },
    bg: 'linear-gradient(145deg,#7f1d1d 0%,#450a0a 100%)',
    glow: 'rgba(248,113,113,0.28)',
    emoji: '⭐',
    address: 'Süleymaniye, Fatih, Istanbul',
  },
];

const TABLET_FEATURES = [
  {
    icon: Globe,
    title: { tr: 'Çok Dilli Destek', en: 'Multilingual Support', ar: 'دعم متعدد اللغات' },
    desc: {
      tr: "20'den fazla dilde içerik sunarak her ziyaretçiye kendi dilinde deneyim yaşatıyor.",
      en: 'Content in 20+ languages ensures every visitor experiences the mosque in their own language.',
      ar: 'يوفر محتوى بأكثر من 20 لغة لضمان تجربة كل زائر بلغته الأم.',
    },
  },
  {
    icon: BookOpen,
    title: { tr: 'Etkileşimli İslam Rehberi', en: 'Interactive Islam Guide', ar: 'دليل إسلامي تفاعلي' },
    desc: {
      tr: 'İnanç, ibadet, ahlak ve İslam tarihi üzerine zengin, etkileşimli içerik modülleri.',
      en: 'Rich, interactive content modules on belief, worship, ethics, and Islamic history.',
      ar: 'وحدات محتوى تفاعلية غنية حول العقيدة والعبادة والأخلاق والتاريخ الإسلامي.',
    },
  },
  {
    icon: Monitor,
    title: { tr: 'Cami Mimarisi Turu', en: 'Mosque Architecture Tour', ar: 'جولة معمارية في المسجد' },
    desc: {
      tr: "Süleymaniye Camii'nin mimari şaheserlerini görsel ve açıklamalı içerikle keşfedin.",
      en: "Explore Süleymaniye Mosque's architectural masterpieces with visual and annotated content.",
      ar: 'استكشف روائع العمارة في مسجد السليمانية من خلال محتوى مرئي ومشروح.',
    },
  },
  {
    icon: Video,
    title: { tr: 'Belgesel Videolar', en: 'Documentary Videos', ar: 'مقاطع وثائقية' },
    desc: {
      tr: 'İslam ve Osmanlı tarihini anlatan kısa belgesel videolar ile ziyaretçi deneyimini zenginleştir.',
      en: 'Short documentary videos about Islam and Ottoman history to enrich the visitor experience.',
      ar: 'مقاطع وثائقية قصيرة عن الإسلام والتاريخ العثماني لإثراء تجربة الزوار.',
    },
  },
];

export default async function OurProjectsPage({ params }: Props) {
  const { locale } = await params;
  const l = (locale as 'tr' | 'en' | 'ar') in { tr: 1, en: 1, ar: 1 } ? (locale as 'tr' | 'en' | 'ar') : 'en';

  return (
    <div className="pt-20">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-16 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            {l === 'ar' ? 'مشاريعنا' : l === 'tr' ? 'Projelerimiz' : 'Our Projects'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {l === 'ar'
              ? 'مبادراتنا وأثرنا'
              : l === 'tr'
              ? 'Girişimlerimiz ve Etkimiz'
              : 'Our Initiatives & Impact'}
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {l === 'ar'
              ? 'من التطبيق اللوحي في مسجد السليمانية إلى مراكز كيم الثلاثة — نبني تجارب تعليمية تدوم.'
              : l === 'tr'
              ? "Süleymaniye Camii'ndeki tablet uygulamasından üç KİM merkezine — kalıcı eğitim deneyimleri inşa ediyoruz."
              : 'From the Süleymaniye Mosque tablet app to our three KİM centers — we build educational experiences that last.'}
          </p>
        </div>
      </section>

      {/* ── Tablet Project ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-kim-gold/15 border border-kim-gold/25 flex items-center justify-center">
                  <Tablet className="w-5 h-5 text-kim-gold" strokeWidth={1.8} />
                </div>
                <span className="text-kim-gold text-xs font-black uppercase tracking-[0.25em]">
                  {l === 'ar' ? 'مشروع التابلت' : l === 'tr' ? 'Tablet Projesi' : 'Tablet Project'}
                </span>
              </div>

              <div className="w-12 h-1 bg-kim-gold mb-5 rounded-full" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-kim-charcoal mb-5">
                {l === 'ar'
                  ? 'التطبيق اللوحي التفاعلي لمسجد السليمانية'
                  : l === 'tr'
                  ? 'Süleymaniye Camii Etkileşimli Tablet Uygulaması'
                  : 'Süleymaniye Mosque Interactive Tablet App'}
              </h2>
              <p className="text-kim-stone leading-relaxed mb-6">
                {l === 'ar'
                  ? 'طوّرنا تطبيقاً لوحياً تفاعلياً يُنصب داخل مسجد السليمانية لتزويد الزوار بتجربة رقمية غامرة. يقدّم التطبيق معلومات عن الإسلام والمسجد وتاريخه بأكثر من 20 لغة، مما يجعل كل زيارة تعليمية وروحية في آنٍ واحد.'
                  : l === 'tr'
                  ? "Süleymaniye Camii'nin içine yerleştirilen etkileşimli tablet uygulaması, ziyaretçilere sürükleyici bir dijital deneyim sunmak amacıyla geliştirilmiştir. Uygulama, İslam, caminin kendisi ve tarihi hakkında 20'den fazla dilde bilgi sunarak her ziyareti hem eğitici hem de manevi bir deneyime dönüştürür."
                  : "We developed an interactive tablet app installed inside Süleymaniye Mosque to give visitors an immersive digital experience. The app delivers information about Islam, the mosque itself, and its history in 20+ languages — turning every visit into an educational and spiritual encounter."}
              </p>
              <p className="text-kim-stone leading-relaxed">
                {l === 'ar'
                  ? 'يعمل التطبيق على أجهزة لوحية مدمجة في أماكن استراتيجية داخل المسجد، ويتيح للزوار التفاعل بحرية مع المحتوى في أي وقت خلال زيارتهم.'
                  : l === 'tr'
                  ? "Uygulama, cami içindeki stratejik noktalara yerleştirilmiş gömülü tablet cihazlarda çalışmakta ve ziyaretçilerin ziyaretleri boyunca istedikleri zaman içerikle etkileşime girmelerine olanak tanımaktadır."
                  : "The app runs on embedded tablet devices placed at strategic points inside the mosque, allowing visitors to freely interact with content at any time during their visit."}
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TABLET_FEATURES.map((feat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 hover:ring-white/20 p-5 shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 bg-kim-gold transition-opacity duration-400" />
                  <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold to-transparent" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-kim-gold/15 border border-kim-gold/20 flex items-center justify-center mb-4 group-hover:bg-kim-gold/25 transition-all duration-300">
                      <feat.icon className="w-4.5 h-4.5 text-kim-gold" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1.5 group-hover:text-kim-gold transition-colors duration-200">
                      {feat.title[l]}
                    </h3>
                    <p className="text-white/45 text-xs leading-relaxed">{feat.desc[l]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Locations ── */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <p className="text-kim-gold text-[10px] font-black uppercase tracking-[0.3em] mb-3">
              {l === 'ar' ? 'مواقعنا' : l === 'tr' ? 'Konumlarımız' : 'Our Locations'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-kim-charcoal mb-4">
              {l === 'ar'
                ? 'قلب إسطنبول التاريخي'
                : l === 'tr'
                ? "İstanbul'un Tarihi Kalbi"
                : 'Historical Heart of Istanbul'}
            </h2>
            <p className="text-kim-stone max-w-xl mx-auto">
              {l === 'ar'
                ? 'تقع مراكزنا الثلاثة ومسجد السليمانية جميعها في منطقة سليمانية التاريخية في إسطنبول.'
                : l === 'tr'
                ? "Üç merkezimiz ve Süleymaniye Camii'nin tamamı İstanbul'un tarihi Süleymaniye semtinde yer almaktadır."
                : 'Our three centers and Süleymaniye Mosque are all located in the historic Süleymaniye district of Istanbul.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ background: loc.bg }}
              >
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 60% 25%,${loc.glow} 0%,transparent 65%)` }} />
                {/* Dot pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '88px 88px' }} />

                <div className="relative z-10 p-6">
                  <div className="text-4xl mb-4 select-none">{loc.emoji}</div>
                  <h3 className="text-white font-bold text-base mb-1">{loc.name}</h3>
                  <p className="text-white/60 text-xs font-medium mb-3">{loc.subtitle[l]}</p>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">{loc.desc[l]}</p>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-white/35 shrink-0" />
                    <span className="text-white/35 text-[10px]">{loc.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-72 ring-1 ring-gray-200">
            <iframe
              src={CONTACT.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KİM Vakfı Locations"
            />
          </div>
          <p className="mt-3 text-sm text-kim-stone text-center">
            {CONTACT.address[l]}
            {' · '}
            <a
              href={CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-kim-navy hover:underline font-medium"
            >
              {l === 'ar' ? 'فتح في خرائط جوجل' : l === 'en' ? 'Open in Google Maps' : "Google Maps'te Aç"}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
