'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { upcomingEvents } from '@/data/events';

function formatDateParts(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  const loc = locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-SA' : 'en-US';
  return {
    day: date.toLocaleDateString(loc, { day: '2-digit' }),
    month: date.toLocaleDateString(loc, { month: 'short' }),
    year: date.toLocaleDateString(loc, { year: 'numeric' }),
  };
}

export function EventsSection() {
  const t = useTranslations('events');
  const locale = useLocale();
  const events = upcomingEvents[locale] || upcomingEvents.en;

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-kim-navy-light/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-navy" />
            <span className="text-kim-navy text-xs font-semibold uppercase tracking-[0.2em]">{t('title')}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-kim-charcoal">
              {t('title')}
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-kim-navy font-semibold text-sm hover:gap-3 transition-all group shrink-0"
            >
              {t('viewAll') || 'View all events'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {events.length === 0 ? (
          <p className="text-center text-kim-stone py-16">{t('noEvents')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map((event, i) => {
              const parts = formatDateParts(event.date, locale);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 hover:ring-white/20 transition-all duration-300"
                >
                  {/* Dot grid texture */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                  />
                  {/* Glow blob */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 bg-kim-gold transition-opacity duration-400" />
                  {/* Bottom vignette */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold to-transparent" />

                  {/* Date + Location header */}
                  <div className="relative z-10 px-5 pt-5 pb-4 flex items-start justify-between gap-3">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif text-5xl font-black text-white leading-none">{parts.day}</span>
                      <div>
                        <div className="text-kim-gold text-sm font-bold uppercase tracking-wider leading-tight">{parts.month}</div>
                        <div className="text-white/30 text-[10px]">{parts.year}</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-kim-gold text-kim-navy-dark px-2.5 py-1 rounded-full mt-1">
                      {event.location}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="relative z-10 mx-5 h-px bg-white/8" />

                  {/* Body */}
                  <div className="relative z-10 px-5 pt-4 pb-5">
                    <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug group-hover:text-kim-gold transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-kim-gold text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all"
                    >
                      {t('register')}
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
