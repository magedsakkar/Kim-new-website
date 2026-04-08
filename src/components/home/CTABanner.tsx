'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion } from 'framer-motion';

export function CTABanner() {
  const t = useTranslations('cta');

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-kim-navy-dark via-kim-navy to-[#0d1a3a]" />

      {/* Decorative arcs */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute -top-24 -right-24 w-96 h-96 opacity-10" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="rgba(201,151,58,1)" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" stroke="rgba(201,151,58,1)" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" stroke="rgba(201,151,58,1)" strokeWidth="1" />
        </svg>
        <svg className="absolute -bottom-24 -left-24 w-80 h-80 opacity-8" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="rgba(139,115,0,1)" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" stroke="rgba(139,115,0,1)" strokeWidth="1" />
        </svg>
      </div>

      {/* Gold top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-kim-gold rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-kim-gold" />
              <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.2em]">
                {t('actionBadge')}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {t('title')}
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Right actions */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <Link
              href="/donate"
              className="group flex items-center justify-between px-7 py-5 bg-kim-gold text-white font-semibold rounded-2xl hover:bg-amber-600 transition-all duration-200 shadow-lg hover:shadow-kim-gold/25 hover:-translate-y-0.5"
            >
              <div>
                <div className="text-lg">{t('donate')}</div>
                <div className="text-white/70 text-xs mt-0.5 font-normal">{t('donateSub')}</div>
              </div>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/volunteer"
              className="group flex items-center justify-between px-7 py-5 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/8 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
            >
              <div>
                <div className="text-lg">{t('volunteer')}</div>
                <div className="text-white/50 text-xs mt-0.5 font-normal">{t('volunteerSub')}</div>
              </div>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
