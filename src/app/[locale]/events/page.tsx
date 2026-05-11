'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { upcomingEvents } from '@/data/events';
import { Link } from '@/lib/i18n/navigation';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';

const T = {
  en: {
    eyebrow: 'Programme',
    title: 'Upcoming Events',
    sub: 'Join us for guided tours, cultural breakfasts, seminars, and community gatherings in Istanbul.',
    register: 'Register',
    allEvents: 'All events',
    noEvents: 'No upcoming events at the moment. Check back soon.',
    location: 'Location',
  },
  tr: {
    eyebrow: 'Program',
    title: 'Yaklaşan Etkinlikler',
    sub: "Rehberli turlar, kültürel kahvaltılar, seminerler ve İstanbul'daki topluluk buluşmalarımıza katılın.",
    register: 'Kayıt Ol',
    allEvents: 'Tüm etkinlikler',
    noEvents: 'Şu an yaklaşan etkinlik yok. Yakında tekrar kontrol edin.',
    location: 'Konum',
  },
  ar: {
    eyebrow: 'البرنامج',
    title: 'الفعاليات القادمة',
    sub: 'انضم إلينا في جولات إرشادية وإفطارات ثقافية وندوات وتجمعات مجتمعية في إسطنبول.',
    register: 'التسجيل',
    allEvents: 'جميع الفعاليات',
    noEvents: 'لا توجد فعاليات قادمة في الوقت الحالي. تحقق مرة أخرى قريباً.',
    location: 'الموقع',
  },
} as const;

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  const loc = locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-SA' : 'en-US';
  return {
    day:     date.toLocaleDateString(loc, { day: '2-digit' }),
    month:   date.toLocaleDateString(loc, { month: 'long' }),
    year:    date.toLocaleDateString(loc, { year: 'numeric' }),
    weekday: date.toLocaleDateString(loc, { weekday: 'long' }),
  };
}

const DOT_BG = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

export default function EventsPage() {
  const locale = useLocale();
  const l = (locale in T ? locale : 'en') as keyof typeof T;
  const t = T[l];
  const isRTL = l === 'ar';
  const events = upcomingEvents[locale] || upcomingEvents.en;

  return (
    <div className="pt-20 min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-kim-navy to-kim-navy-dark py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.035]" style={DOT_BG} />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 bg-kim-gold" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{t.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">{t.title}</h1>
          <p className="text-white/55 text-lg max-w-xl">{t.sub}</p>
        </div>
      </section>

      {/* ── Events grid ──────────────────────────────────────── */}
      <section className="py-14 bg-kim-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <p className="text-center text-kim-stone py-20">{t.noEvents}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map((event, i) => {
                const parts = formatDate(event.date, locale);
                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Coloured date band */}
                    <div className="bg-kim-navy px-5 py-4 flex items-center gap-4">
                      <div className="text-center shrink-0">
                        <div className="font-serif text-4xl font-black text-white leading-none">{parts.day}</div>
                        <div className="text-kim-gold text-xs font-bold uppercase tracking-widest mt-0.5">{parts.month}</div>
                        <div className="text-white/30 text-[10px] mt-0.5">{parts.year}</div>
                      </div>
                      <div className="w-px self-stretch bg-white/15 mx-1" />
                      <div className="min-w-0">
                        <div className="text-white/40 text-[10px] font-medium uppercase tracking-wider">{parts.weekday}</div>
                        <div className="flex items-center gap-1.5 mt-1 text-white/55 text-xs">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-5 pt-4 pb-5 flex flex-col gap-3">
                      <h2 className="font-serif text-base font-bold text-kim-charcoal leading-snug group-hover:text-kim-navy transition-colors">
                        {event.title}
                      </h2>
                      <p className="text-kim-stone text-sm leading-relaxed flex-1 line-clamp-3">
                        {event.description}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-kim-navy text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all mt-auto"
                      >
                        {t.register}
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </Link>
                    </div>

                    {/* Hover accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-kim-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Back to home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-sm shadow-sm"
            >
              ← {l === 'ar' ? 'العودة للرئيسية' : l === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-kim-charcoal mb-3">
            {l === 'ar' ? 'أضف فعاليتك' : l === 'tr' ? 'Etkinliğinizi Ekleyin' : 'Suggest an Event'}
          </h3>
          <p className="text-kim-stone text-sm mb-6 max-w-md mx-auto">
            {l === 'ar'
              ? 'هل تريد المشاركة أو اقتراح فعالية؟ تواصل معنا.'
              : l === 'tr'
              ? 'Katılmak veya etkinlik önermek ister misiniz? Bize ulaşın.'
              : 'Want to participate or suggest an event? Get in touch with us.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-kim-gold text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm shadow-md shadow-kim-gold/20"
          >
            <CalendarDays className="w-4 h-4" />
            {l === 'ar' ? 'تواصل معنا' : l === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </div>
  );
}
