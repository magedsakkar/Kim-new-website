import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import {
  ArrowRight, ArrowUpRight, Building2, Moon, Heart, Search, BookOpen, Feather, Leaf,
  Library, MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const titles = { tr: 'Yeni Müslüman Bakım Alanı', en: 'New Muslim Care Area', ar: 'منطقة رعاية المسلم الجديد' };
  const descs = { tr: 'Dönüşüm yolculuğunuz burada başlıyor.', en: 'Your transformation journey begins here.', ar: 'رحلة تحولك تبدأ هنا.' };
  return buildMetadata({ locale, slug: 'new-muslim-care-area', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const PATH_ICONS: Record<string, LucideIcon> = {
  'who-we-are': Building2,
  'what-is-islam': Moon,
  'how-i-live-islam': Heart,
};

const STAGE_ICONS: Record<string, LucideIcon> = {
  Discover: Search,
  Understand: BookOpen,
  Connect: Feather,
  Live: Leaf,
};

const LEARN_MORE_CARDS = [
  {
    id: 'what-is-islam',
    href: '/what-is-islam',
    Icon: BookOpen,
    bg: 'from-[#1C2562] to-[#141A4A]',
    accent: '#C9973A',
    titles: { en: 'What is Islam?', tr: 'İslam Nedir?', ar: 'ما هو الإسلام؟' },
    descs: {
      en: 'A 9-step guided journey through Islamic belief, worship, ethics, and the Quran.',
      tr: 'İslam inancı, ibadet, ahlak ve Kuran üzerine 9 adımlık rehberli bir yolculuk.',
      ar: 'رحلة إرشادية من 9 خطوات عبر العقيدة والعبادة والأخلاق والقرآن.',
    },
    cta: { en: 'Begin Journey', tr: 'Yolculuğu Başlat', ar: 'ابدأ الرحلة' },
  },
  {
    id: 'library',
    href: '/library',
    Icon: Library,
    bg: 'from-[#0D3D36] to-[#072825]',
    accent: '#2A9D8F',
    titles: { en: 'Digital Library', tr: 'Dijital Kütüphane', ar: 'المكتبة الرقمية' },
    descs: {
      en: 'Free books, brochures, and resources on Islam in 10+ languages — download instantly.',
      tr: '10+ dilde İslam üzerine ücretsiz kitap, broşür ve kaynaklar — anında indir.',
      ar: 'كتب ومطويات وموارد مجانية حول الإسلام بأكثر من 10 لغة — تحميل فوري.',
    },
    cta: { en: 'Browse Resources', tr: 'Kaynakları Gör', ar: 'تصفح الموارد' },
  },
  {
    id: 'contact',
    href: '/contact',
    Icon: MessageCircle,
    bg: 'from-[#3D1B0D] to-[#280F06]',
    accent: '#F97316',
    titles: { en: 'Talk to Someone', tr: 'Biriyle Konuş', ar: 'تحدث مع شخص' },
    descs: {
      en: 'Have questions? Our team in Süleymaniye is ready to meet you, answer your questions, and walk with you.',
      tr: 'Sorularınız mı var? Süleymaniye\'deki ekibimiz sizi karşılamaya, sorularınızı yanıtlamaya hazır.',
      ar: 'هل لديك أسئلة؟ فريقنا في سليمانية مستعد لمقابلتك والإجابة عن أسئلتك.',
    },
    cta: { en: 'Get in Touch', tr: 'İletişime Geç', ar: 'تواصل معنا' },
  },
] as const;

const PATHS = [
  {
    id: 'who-we-are',
    href: '/new-muslim-care-area/who-we-are',
    step: '01',
    bg: 'from-kim-navy to-kim-navy-dark',
    glow: 'bg-indigo-400',
    accent: 'from-kim-gold via-kim-gold/50 to-transparent',
  },
  {
    id: 'what-is-islam',
    href: '/what-is-islam',
    step: '02',
    bg: 'from-kim-olive to-[#6B5800]',
    glow: 'bg-amber-400',
    accent: 'from-amber-300 via-amber-200/50 to-transparent',
  },
  {
    id: 'how-i-live-islam',
    href: '/new-muslim-care-area/how-i-live-islam',
    step: '03',
    bg: 'from-kim-teal to-kim-teal-dark',
    glow: 'bg-teal-300',
    accent: 'from-teal-300 via-teal-200/50 to-transparent',
  },
];

const TRANSFORMATION_STAGES = [
  {
    stage: 'Discover',
    iconBg: 'bg-kim-gold/15 border-kim-gold/25',
    iconColor: 'text-kim-gold',
    glow: 'bg-kim-gold',
    accent: 'from-kim-gold to-transparent',
  },
  {
    stage: 'Understand',
    iconBg: 'bg-amber-400/15 border-amber-400/20',
    iconColor: 'text-amber-400',
    glow: 'bg-amber-400',
    accent: 'from-amber-400 to-transparent',
  },
  {
    stage: 'Connect',
    iconBg: 'bg-blue-400/15 border-blue-400/20',
    iconColor: 'text-blue-400',
    glow: 'bg-blue-400',
    accent: 'from-blue-400 to-transparent',
  },
  {
    stage: 'Live',
    iconBg: 'bg-green-400/15 border-green-400/20',
    iconColor: 'text-green-400',
    glow: 'bg-green-400',
    accent: 'from-green-400 to-transparent',
  },
];

const VISITOR_REGIONS = [
  { flag: '🌍', label: { en: 'Africa', tr: 'Afrika', ar: 'أفريقيا' } },
  { flag: '🌎', label: { en: 'Americas', tr: 'Amerikalar', ar: 'الأمريكتان' } },
  { flag: '🌏', label: { en: 'Asia-Pacific', tr: 'Asya-Pasifik', ar: 'آسيا-المحيط الهادئ' } },
  { flag: '🇪🇺', label: { en: 'Europe', tr: 'Avrupa', ar: 'أوروبا' } },
  { flag: '🕌', label: { en: 'Middle East', tr: 'Ortadoğu', ar: 'الشرق الأوسط' } },
  { flag: '🇷🇺', label: { en: 'Central Asia', tr: 'Orta Asya', ar: 'آسيا الوسطى' } },
] as const;

const DOT_TEXTURE = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

export default async function NewMuslimCareAreaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'newMuslimCareArea' });

  return (
    <div className="min-h-screen bg-kim-cream">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-kim-navy px-6 py-20 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-kim-olive/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-kim-navy/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 mb-6">
            <Leaf className="w-3.5 h-3.5 text-kim-gold" strokeWidth={2} />
            {t('badge')}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            {t('heroTitle')}<br />
            <span className="text-kim-gold">{t('heroTitleHighlight')}</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {t('heroSubtitle')}
          </p>

          <div className="flex justify-center mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <Image
                src="/images/logo_kim_aklamasz-removebg-preview.png"
                alt="KİM Vakfı"
                width={120}
                height={120}
                className="h-16 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Transformation Journey System ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-olive" />
            <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">{t('systemEyebrow')}</span>
            <span className="h-px w-8 bg-kim-olive" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-kim-charcoal mb-3">
            {t('systemTitle')}
          </h2>
          <p className="text-kim-stone max-w-xl mx-auto text-sm leading-relaxed">
            {t('systemSubtitle')}
          </p>
        </div>

        {/* Flow stages — dark glass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TRANSFORMATION_STAGES.map((stage, i) => (
            <div key={stage.stage} className="group relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 hover:ring-white/20 p-5 h-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              {/* Dot texture */}
              <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
              {/* Glow blob */}
              <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-400 ${stage.glow}`} />
              {/* Large number watermark */}
              <span className="absolute top-3 right-4 font-serif text-6xl font-black text-white/[0.05] leading-none select-none">
                {i + 1}
              </span>
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${stage.accent}`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-4">
                  {(() => {
                    const Icon = STAGE_ICONS[stage.stage];
                    return Icon ? (
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stage.iconBg}`}>
                        <Icon className={`w-4.5 h-4.5 ${stage.iconColor}`} strokeWidth={1.8} />
                      </div>
                    ) : null;
                  })()}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                    {t('step')} {i + 1}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-white mb-2">
                  {t(`${stage.stage.toLowerCase()}Title`)}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed">
                  {t(`${stage.stage.toLowerCase()}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Journey path illustration */}
        <div className="relative overflow-hidden rounded-3xl bg-kim-navy ring-1 ring-white/10 p-6">
          <div className="absolute inset-0 opacity-[0.03]" style={DOT_TEXTURE} />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-10 bg-kim-gold" />
          <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-white/30 text-center mb-6">{t('journeyPath')}</p>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            {[
              { label: t('whoWeAreLabel'), sub: t('whoWeAreSub'), accent: 'border-kim-gold/30 bg-kim-gold/10' },
              { label: '→', sub: '', accent: '' },
              { label: t('whatIsIslamLabel'), sub: t('whatIsIslamSub'), accent: 'border-amber-400/30 bg-amber-400/10' },
              { label: '→', sub: '', accent: '' },
              { label: t('howILiveLabel'), sub: t('howILiveSub'), accent: 'border-teal-400/30 bg-teal-400/10' },
            ].map((item, i) => (
              item.label === '→' ? (
                <span key={i} className="text-white/20 text-xl font-light hidden sm:block">→</span>
              ) : (
                <div key={i} className={`border rounded-2xl px-5 py-3 min-w-[130px] ${item.accent}`}>
                  <div className="font-semibold text-sm text-white">{item.label}</div>
                  <div className="text-white/40 text-[10px] mt-0.5">{item.sub}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Paths ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-kim-charcoal mb-2">
            {t('choosePath')}
          </h2>
          <p className="text-kim-stone text-sm">{t('choosePathSub')}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {PATHS.map((path) => {
            const tKey = path.id === 'who-we-are' ? 'whoWeAre' : path.id === 'what-is-islam' ? 'whatIsIslam' : 'howILive';
            return (
              <Link
                key={path.id}
                href={path.href}
                className={`group relative flex flex-col overflow-hidden rounded-3xl min-h-[320px] bg-gradient-to-br ${path.bg} ring-1 ring-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 hover:ring-white/20 transition-all duration-400`}
              >
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
                {/* Glow blob */}
                <div className={`absolute -top-14 -right-14 w-52 h-52 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500 ${path.glow}`} />
                {/* Bottom vignette */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-gradient-to-r ${path.accent}`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-7">
                  {/* Tag + step number */}
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      <span className="w-3 h-px bg-white/30" />
                      Path {path.step}
                    </span>
                    <span className="font-serif text-[5rem] font-black text-white/[0.06] leading-none select-none -mt-2 -mr-1">
                      {path.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative mt-8 mb-5 w-fit">
                    <div className={`absolute inset-0 -m-3 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-400 ${path.glow}`} />
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 border border-white/15 group-hover:border-white/30 group-hover:scale-105 transition-all duration-300">
                      {(() => {
                        const Icon = PATH_ICONS[path.id];
                        return Icon ? <Icon className="w-7 h-7 text-white" strokeWidth={1.5} /> : null;
                      })()}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2.5">
                    {t(`${tKey}Title`)}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-1">
                    {t(`${tKey}Desc`)}
                  </p>

                  {/* CTA row */}
                  <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/55 group-hover:text-white transition-colors duration-200">
                      {t(`${tKey}Cta`)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── I Just Took Shahada CTA ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <Link
          href="/new-muslim-care-area/took-shahada"
          className="group relative flex flex-col sm:flex-row items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-kim-navy to-kim-navy-dark ring-1 ring-white/15 hover:ring-kim-gold/40 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 p-7"
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-15 group-hover:opacity-30 bg-kim-gold transition-opacity duration-400" />
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-kim-gold/20 border border-kim-gold/30 flex items-center justify-center shrink-0 text-3xl group-hover:scale-105 transition-transform">
            ☪️
          </div>
          <div className="relative z-10 flex-1 text-center sm:text-left">
            <div className="text-kim-gold text-xs font-bold uppercase tracking-widest mb-1">
              {locale === 'ar' ? 'للمسلمين الجدد' : locale === 'tr' ? 'Yeni Müslümanlar İçin' : 'For New Muslims'}
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-1">
              {locale === 'ar' ? 'لقد نطقت بالشهادة للتو' : locale === 'tr' ? 'Az Önce Şehadet Getirdim' : 'I Just Took My Shahada'}
            </h3>
            <p className="text-white/50 text-sm">
              {locale === 'ar' ? 'دليلك التفاعلي خطوة بخطوة للأيام والأسابيع الأولى.' : locale === 'tr' ? 'İlk günler ve haftalar için adım adım etkileşimli rehberiniz.' : 'Your step-by-step interactive guide for the first days and weeks.'}
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-kim-gold font-semibold text-sm group-hover:gap-3 transition-all shrink-0">
            {locale === 'ar' ? 'ابدأ الآن' : locale === 'tr' ? 'Başla' : 'Start Now'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

      {/* ── Learn More About Islam ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-kim-olive" />
            <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">
              {locale === 'ar' ? 'تعلم المزيد' : locale === 'tr' ? 'Daha Fazla Öğren' : 'Learn More About Islam'}
            </span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {LEARN_MORE_CARDS.map((card) => {
            const l = (locale === 'tr' || locale === 'ar') ? locale : 'en';
            return (
              <Link
                key={card.id}
                href={card.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${card.bg} ring-1 ring-white/10 hover:ring-white/20 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
              >
                <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity" style={{ background: card.accent }} />
                <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-4 border" style={{ background: `${card.accent}18`, borderColor: `${card.accent}35` }}>
                  <card.Icon className="w-5 h-5" style={{ color: card.accent }} strokeWidth={1.6} />
                </div>
                <h3 className="relative z-10 font-serif font-bold text-white mb-2 text-base">{card.titles[l]}</h3>
                <p className="relative z-10 text-white/50 text-xs leading-relaxed flex-1">{card.descs[l]}</p>
                <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: card.accent }}>{card.cta[l]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Visitors From Around the World ───────────────────── */}
      <section className="bg-kim-navy py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-gold" />
              <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">
                {locale === 'ar' ? 'مجتمعنا العالمي' : locale === 'tr' ? 'Küresel Topluluğumuz' : 'Our Global Community'}
              </span>
              <span className="h-px w-8 bg-kim-gold" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white mb-3">
              {locale === 'ar' ? 'زوار من كل أنحاء العالم' : locale === 'tr' ? 'Dünyanın Her Yerinden Ziyaretçiler' : "We've Welcomed Visitors From Every Corner"}
            </h2>
            <p className="text-white/55 text-sm max-w-xl mx-auto leading-relaxed">
              {locale === 'ar'
                ? 'منذ عام 2010، فتحنا أبوابنا لزوار من أكثر من 80 دولة، يتحدثون أكثر من 20 لغة، من كل القارات الست.'
                : locale === 'tr'
                ? '2010\'dan bu yana 80\'den fazla ülkeden, 20\'den fazla dil konuşan, 6 kıtadan gelen ziyaretçilere kapılarımızı açtık.'
                : 'Since 2010, we have opened our doors to visitors from 80+ countries, speaking 20+ languages, from all six continents.'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { n: '80+', label: { en: 'Countries', tr: 'Ülke', ar: 'دولة' } },
              { n: '15K+', label: { en: 'Annual Visitors', tr: 'Yıllık Ziyaretçi', ar: 'زائر سنوياً' } },
              { n: '20+', label: { en: 'Languages', tr: 'Dil', ar: 'لغة' } },
              { n: '6', label: { en: 'Continents', tr: 'Kıta', ar: 'قارة' } },
            ].map((s) => {
              const l = (locale === 'tr' || locale === 'ar') ? locale : 'en';
              return (
                <div key={s.n} className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-center">
                  <div className="absolute inset-0 opacity-[0.03]" style={DOT_TEXTURE} />
                  <div className="relative z-10 font-serif text-3xl font-bold text-kim-gold mb-1">{s.n}</div>
                  <div className="relative z-10 text-white/45 text-xs uppercase tracking-wider">{s.label[l]}</div>
                </div>
              );
            })}
          </div>

          {/* Region flags row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {VISITOR_REGIONS.map((r) => {
              const l = (locale === 'tr' || locale === 'ar') ? locale : 'en';
              return (
                <div key={r.label.en} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 border border-white/10 text-sm">
                  <span className="text-lg">{r.flag}</span>
                  <span className="text-white/60 font-medium text-xs">{r.label[l]}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-kim-gold/40 text-kim-gold font-semibold rounded-xl hover:bg-kim-gold/10 transition-colors text-sm"
            >
              {locale === 'ar' ? 'تواصل معنا' : locale === 'tr' ? 'Bize Ulaşın' : 'Plan Your Visit'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
