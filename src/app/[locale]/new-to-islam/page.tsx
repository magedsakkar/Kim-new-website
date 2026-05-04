'use client';

import { motion } from 'framer-motion';
import { Building2, BookOpen, Heart, MessageSquare, Library } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useLocale } from 'next-intl';

const T = {
  en: {
    eyebrow: 'Select Your Path',
    title: 'Your Journey Begins Here',
    subtitle: 'Five paths. One destination. Choose where to start.',
    unlocked: 'Unlocked',
    enter: 'Enter',
    level: 'Level',
    attribution: 'KİM Vakfı · Süleymaniye · İstanbul',
  },
  tr: {
    eyebrow: 'Yolunuzu Seçin',
    title: 'Yolculuğunuz Burada Başlıyor',
    subtitle: 'Beş yol. Tek varış noktası. Başlamak istediğiniz yeri seçin.',
    unlocked: 'Açık',
    enter: 'Gir',
    level: 'Bölüm',
    attribution: 'KİM Vakfı · Süleymaniye · İstanbul',
  },
  ar: {
    eyebrow: 'اختر مسارك',
    title: 'رحلتك تبدأ هنا',
    subtitle: 'خمسة مسارات. وجهة واحدة. اختر من أين تبدأ.',
    unlocked: 'متاح',
    enter: 'ادخل',
    level: 'المستوى',
    attribution: 'مؤسسة كيم · سليمانية · إسطنبول',
  },
} as const;

const LEVELS = [
  {
    level: 1,
    title: { en: 'Who We Are', tr: 'Biz Kimiz', ar: 'من نحن' },
    subtitle: { en: 'Discover KİM Vakfı', tr: 'KİM Vakfı\'nı Keşfedin', ar: 'اكتشف مؤسسة كيم' },
    description: {
      en: 'Learn about our mission and the team behind KİM Foundation',
      tr: 'KİM Vakfı\'nın misyonunu ve ekibini öğrenin',
      ar: 'تعرف على مهمة مؤسسة كيم والفريق القائم عليها',
    },
    href: '/new-muslim-care-area/who-we-are',
    icon: Building2,
  },
  {
    level: 2,
    title: { en: 'What is Islam?', tr: 'İslam Nedir?', ar: 'ما هو الإسلام؟' },
    subtitle: { en: 'Begin the Journey', tr: 'Yolculuğa Başla', ar: 'ابدأ الرحلة' },
    description: {
      en: 'A guided path through Islamic knowledge from introduction to conviction',
      tr: 'Girişten inanca uzanan rehberli bir İslam bilgisi yolculuğu',
      ar: 'مسار مرشد عبر المعرفة الإسلامية من المقدمة إلى اليقين',
    },
    href: '/what-is-islam',
    icon: BookOpen,
  },
  {
    level: 3,
    title: { en: 'How I Live Islam', tr: 'İslam\'ı Nasıl Yaşarım', ar: 'كيف أعيش الإسلام' },
    subtitle: { en: 'Daily Life', tr: 'Günlük Yaşam', ar: 'الحياة اليومية' },
    description: {
      en: 'Prayer, fasting, community — practical guidance for your new life',
      tr: 'Namaz, oruç, topluluk — yeni hayatınız için pratik rehber',
      ar: 'الصلاة والصيام والمجتمع — إرشاد عملي لحياتك الجديدة',
    },
    href: '/new-muslim-care-area/how-i-live-islam',
    icon: Heart,
  },
  {
    level: 4,
    title: { en: 'Q & A', tr: 'Soru & Cevap', ar: 'أسئلة وأجوبة' },
    subtitle: { en: 'Ask Questions', tr: 'Sorular Sor', ar: 'اطرح أسئلتك' },
    description: {
      en: 'Answers to the most common questions about Islam and Muslim life',
      tr: 'İslam ve Müslüman yaşamı hakkında en sık sorulan soruların cevapları',
      ar: 'إجابات على الأسئلة الأكثر شيوعاً حول الإسلام وحياة المسلمين',
    },
    href: '/what-is-islam/faq',
    icon: MessageSquare,
  },
  {
    level: 5,
    title: { en: 'Digital Library', tr: 'Dijital Kütüphane', ar: 'المكتبة الرقمية' },
    subtitle: { en: 'Deep Dive', tr: 'Derin Araştırma', ar: 'التعمق والاستكشاف' },
    description: {
      en: 'Books, brochures, and resources in 8 languages',
      tr: '8 dilde kitaplar, broşürler ve kaynaklar',
      ar: 'كتب وكتيبات ومصادر بـ8 لغات',
    },
    href: '/library',
    icon: Library,
  },
] as const;

const GEOMETRIC_PATTERN = `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <g fill="none" stroke="rgba(201,151,58,0.6)" stroke-width="0.8">
      <polygon points="60,10 68,42 100,42 76,62 84,94 60,76 36,94 44,62 20,42 52,42" />
      <polygon points="60,20 66,44 90,44 72,58 78,82 60,68 42,82 48,58 30,44 54,44" opacity="0.5" />
      <line x1="0" y1="0" x2="20" y2="20" />
      <line x1="120" y1="0" x2="100" y2="20" />
      <line x1="0" y1="120" x2="20" y2="100" />
      <line x1="120" y1="120" x2="100" y2="100" />
      <line x1="60" y1="0" x2="60" y2="120" opacity="0.3" />
      <line x1="0" y1="60" x2="120" y2="60" opacity="0.3" />
    </g>
  </svg>
`;

const PATTERN_DATA_URL = `data:image/svg+xml,${encodeURIComponent(GEOMETRIC_PATTERN)}`;

export default function NewToIslamPage() {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.en;
  const isRtl = locale === 'ar';

  return (
    <div
      className="min-h-screen relative overflow-hidden pt-16"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ background: 'linear-gradient(135deg, #0A0D1F 0%, #0F1430 40%, #141A4A 70%, #0A0D1F 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url("${PATTERN_DATA_URL}")`, backgroundSize: '120px 120px', opacity: 0.04 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(201,151,58,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-kim-gold text-xs font-bold uppercase tracking-[0.4em]">
            {t.eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4"
        >
          {t.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/40 text-center text-base mb-16"
        >
          {t.subtitle}
        </motion.p>

        {/* Level cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEVELS.map((lvl, idx) => {
            const Icon = lvl.icon;
            return (
              <motion.div
                key={lvl.level}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  href={lvl.href}
                  className="group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-kim-gold/50 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(201,151,58,0.2)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(28,37,98,0.6) 0%, rgba(20,26,74,0.8) 100%)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(201,151,58,0.08) 0%, transparent 70%)' }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-kim-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative p-7">
                    <div
                      className="absolute top-4 right-5 font-serif font-black text-[6rem] leading-none select-none"
                      style={{ color: 'rgba(201,151,58,0.10)' }}
                    >
                      {lvl.level}
                    </div>

                    {/* Unlocked badge */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-kim-gold/40 bg-kim-gold/10 text-kim-gold text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-kim-gold animate-pulse" />
                        {t.unlocked}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-5 w-fit">
                      <div className="absolute inset-0 -m-2 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-400 bg-kim-gold" />
                      <div className="relative w-12 h-12 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center text-kim-gold group-hover:bg-kim-gold/15 group-hover:border-kim-gold/30 transition-all duration-300">
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Level subtitle */}
                    <div className="text-kim-gold/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      {t.level} {lvl.level} · {lvl.subtitle[locale] ?? lvl.subtitle.en}
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl font-bold text-white mb-2.5 leading-tight group-hover:text-kim-gold/90 transition-colors duration-300">
                      {lvl.title[locale] ?? lvl.title.en}
                    </h2>

                    {/* Description */}
                    <p className="text-white/45 text-sm leading-relaxed">
                      {lvl.description[locale] ?? lvl.description.en}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 flex items-center gap-2 text-white/30 group-hover:text-kim-gold transition-colors duration-300 text-sm font-semibold">
                      <span>{t.enter}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-20 text-white/20 text-sm tracking-widest"
        >
          {t.attribution}
        </motion.div>
      </div>
    </div>
  );
}
