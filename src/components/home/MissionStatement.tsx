'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function MissionStatement() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 md:py-32 bg-kim-navy overflow-hidden">
      {/* Arabic calligraphy watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-[22rem] font-bold text-white opacity-[0.03] leading-none"
          style={{ fontFamily: 'serif' }}
        >
          ك
        </span>
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-kim-gold" />
          <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.25em]">
            {isAr ? 'مهمتنا' : locale === 'tr' ? 'Misyonumuz' : 'Our Mission'}
          </span>
          <span className="h-px w-12 bg-kim-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.3] mb-12"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {isAr
            ? '"بناء جسور التفاهم بين الثقافات في قلب إسطنبول — حيث يلتقي الإسلام بالعالم"'
            : locale === 'tr'
            ? '"İstanbul\'un kalbinde kültürler arası anlayış köprüleri kuruyoruz — İslam\'ın dünyayla buluştuğu yerde"'
            : '"Building bridges of understanding between cultures in the heart of Istanbul — where Islam meets the world"'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-kim-gold/20 border border-kim-gold/40 text-kim-gold font-semibold rounded-xl hover:bg-kim-gold/30 transition-colors text-sm"
          >
            {isAr ? 'تعرف علينا' : locale === 'tr' ? 'Hakkımızda' : 'Learn About Us'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/new-muslim-care-area"
            className="inline-flex items-center gap-2 px-6 py-3 text-white/60 hover:text-white font-medium text-sm transition-colors"
          >
            {isAr ? 'للمسلمين الجدد' : locale === 'tr' ? 'Yeni Müslümanlar' : 'New Muslim Care Area'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
