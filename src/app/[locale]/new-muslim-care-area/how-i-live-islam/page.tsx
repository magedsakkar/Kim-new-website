import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { ArrowLeft, Clock, BookOpen, Wrench } from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const titles = { tr: 'İslam\'ı Nasıl Yaşıyorum', en: 'How I Live Islam', ar: 'كيف أعيش الإسلام' };
  const descs = {
    tr: 'Modern dünyada Müslümanca yaşamak için pratik rehberlik.',
    en: 'Practical guidance for living a Muslim life in the modern world.',
    ar: 'إرشادات عملية للعيش حياة مسلمة في العالم الحديث.',
  };
  return buildMetadata({ locale, slug: 'how-i-live-islam', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const TOPIC_KEYS = ['prayer', 'halal', 'finance', 'family', 'community', 'dawah'] as const;

const TOPIC_ICONS: Record<string, string> = {
  prayer: '🕌',
  halal: '🥗',
  finance: '📊',
  family: '👨‍👩‍👧',
  community: '🤝',
  dawah: '💬',
};

export default async function HowILiveIslamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'howILiveIslam' });

  return (
    <div className="min-h-screen bg-kim-cream">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-kim-navy to-kim-navy-dark px-6 py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-kim-olive/10 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-kim-gold" strokeWidth={2} />
            {t('badge')}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            {t('title')}
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Coming soon banner */}
      <div className="bg-kim-navy-light border-y border-kim-navy/20 px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Wrench className="w-4 h-4 text-kim-navy shrink-0" strokeWidth={2} />
          <p className="text-sm font-medium text-kim-navy">{t('comingSoonBanner')}</p>
        </div>
      </div>

      {/* Topics grid */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-kim-olive" />
          <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">{t('sectionTitle')}</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_KEYS.map((key) => (
            <div
              key={key}
              className="group relative rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-kim-navy/20 hover:-translate-y-0.5"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-kim-navy-light flex items-center justify-center mb-4 group-hover:bg-kim-navy/10 transition-colors">
                <span className="text-2xl">{TOPIC_ICONS[key]}</span>
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-kim-charcoal group-hover:text-kim-navy transition-colors">
                  {t(`${key}.title`)}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-kim-stone shrink-0">
                  <Clock className="w-2.5 h-2.5" strokeWidth={2.5} />
                  {t('soon')}
                </span>
              </div>
              <p className="text-sm text-kim-stone leading-relaxed">{t(`${key}.desc`)}</p>

              {/* Coming soon bar */}
              <div className="mt-4 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-kim-navy/20" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <blockquote className="relative rounded-3xl bg-kim-navy px-8 py-8 md:px-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-kim-gold rounded-l-3xl" />
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
          <p className="font-serif text-lg md:text-xl text-white leading-relaxed relative z-10">
            &ldquo;{t('quote')}&rdquo;
          </p>
          <footer className="mt-4 text-sm font-semibold text-kim-gold relative z-10">
            {t('quoteAuthor')}
          </footer>
        </blockquote>
      </section>

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 pb-14">
        <Link
          href="/new-muslim-care-area"
          className="inline-flex items-center gap-2 text-sm font-medium text-kim-stone hover:text-kim-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>
      </div>

    </div>
  );
}
