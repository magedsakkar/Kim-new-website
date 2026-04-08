import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import {
  ArrowRight, ArrowUpRight, Building2, Moon, Heart, Search, BookOpen, Feather, Leaf,
  MapPin, Smartphone, Video, Users,
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

const FEATURE_ICONS: Record<string, LucideIcon> = {
  partnerLocations: MapPin,
  suleymaniyeApp:   Smartphone,
  madrasaTours:     Video,
  volunteer:        Users,
};

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

const GLOBAL_FEATURES = [
  { id: 'partnerLocations', href: '/new-muslim-care-area/who-we-are#volunteering' },
  { id: 'suleymaniyeApp',   href: '/new-muslim-care-area/who-we-are#tablet-app' },
  { id: 'madrasaTours',     href: '/new-muslim-care-area/who-we-are#madrasa-tours' },
  { id: 'volunteer',        href: '/new-muslim-care-area/who-we-are#volunteering' },
];

const WORLD_PARTNERS = [
  { name: 'Turkish Diyanet Foundation', country: 'Turkey', flag: '🇹🇷' },
  { name: 'Islamic Relief', country: 'UK', flag: '🇬🇧' },
  { name: 'ISNA', country: 'USA', flag: '🇺🇸' },
  { name: 'Al-Azhar University', country: 'Egypt', flag: '🇪🇬' },
  { name: 'Muslim Aid', country: 'Australia', flag: '🇦🇺' },
  { name: 'European Muslim Network', country: 'Belgium', flag: '🇧🇪' },
  { name: 'WAMY', country: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'IIUM', country: 'Malaysia', flag: '🇲🇾' },
  { name: 'Deen Institute', country: 'Canada', flag: '🇨🇦' },
  { name: 'Huda TV', country: 'Egypt', flag: '🇪🇬' },
  { name: 'Barakah Institute', country: 'South Africa', flag: '🇿🇦' },
  { name: 'Muslim Hands', country: 'Pakistan', flag: '🇵🇰' },
];

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

      {/* ── Global Features ───────────────────────────────────── */}
      <section className="bg-kim-navy-dark border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-gold/50" />
              <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{t('globalResourcesEyebrow')}</span>
              <span className="h-px w-8 bg-kim-gold/50" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">{t('globalResourcesTitle')}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GLOBAL_FEATURES.map((f) => (
              <Link
                key={f.id}
                href={f.href}
                className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-kim-gold/30 p-5 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={DOT_TEXTURE} />
                {/* Glow on hover */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-40 bg-kim-gold transition-opacity duration-300" />
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold/60 to-transparent" />

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 bg-kim-gold transition-opacity duration-300 rounded-xl" />
                  <div className="relative w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center group-hover:border-kim-gold/30 group-hover:bg-kim-gold/10 transition-all duration-300">
                    {(() => {
                      const Icon = FEATURE_ICONS[f.id];
                      return Icon ? <Icon className="w-5 h-5 text-white/60 group-hover:text-kim-gold transition-colors" strokeWidth={1.8} /> : null;
                    })()}
                  </div>
                </div>

                <h3 className="relative z-10 font-semibold text-white text-sm mb-1.5 group-hover:text-kim-gold transition-colors">
                  {t(f.id + 'Title')}
                </h3>
                <p className="relative z-10 text-xs text-white/40 leading-relaxed mb-3">{t(f.id + 'Desc')}</p>
                <span className="relative z-10 inline-flex items-center gap-1 text-kim-gold text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                  {t(f.id + 'Cta')}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Partners in the World ─────────────────────────── */}
      <section id="partners" className="bg-kim-navy py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-gold" />
              <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{t('partnersEyebrow')}</span>
              <span className="h-px w-8 bg-kim-gold" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white mb-3">{t('partnersTitle')}</h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{t('partnersSubtitle')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {WORLD_PARTNERS.map((p) => (
              <div key={p.name} className="group flex items-center gap-3 rounded-xl bg-white/6 border border-white/8 px-4 py-3 hover:bg-white/10 hover:border-white/15 transition-all duration-200">
                <span className="text-2xl shrink-0">{p.flag}</span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white leading-tight truncate">{p.name}</div>
                  <div className="text-[10px] text-white/35 mt-0.5">{p.country}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-8 text-center">
            {[
              { n: '80+', l: t('partnerCountries') },
              { n: '40+', l: t('partnerOrganizations') },
              { n: '6',   l: t('continents') },
            ].map(s => (
              <div key={s.l}>
                <div className="font-serif text-3xl font-bold text-kim-gold">{s.n}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-kim-gold/40 text-kim-gold font-semibold rounded-xl hover:bg-kim-gold/10 transition-colors text-sm"
            >
              {t('becomePartner')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
