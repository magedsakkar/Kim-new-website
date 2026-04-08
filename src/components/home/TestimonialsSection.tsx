'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const data = testimonials[locale] || testimonials.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setActive((prev) => (prev + 1) % data.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.length]);

  function go(idx: number) {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  }
  function prev() {
    setDir(-1);
    setActive((a) => (a - 1 + data.length) % data.length);
  }
  function next() {
    setDir(1);
    setActive((a) => (a + 1) % data.length);
  }

  return (
    <section className="py-20 md:py-28 bg-kim-navy relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-kim-gold to-transparent opacity-60" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.2em]">{t('title')}</span>
            <span className="h-px w-8 bg-kim-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            {t('subtitle')}
          </h2>
        </motion.div>

        {/* Quote area */}
        <div className="relative min-h-[260px]">
          {/* Big decorative quote mark */}
          <div className="absolute -top-4 left-0 text-kim-gold/20 select-none pointer-events-none">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center px-8"
            >
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-10 italic">
                &ldquo;{data[active].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-kim-gold/20 border border-kim-gold/40 flex items-center justify-center text-kim-gold font-bold text-lg">
                  {data[active].name[0]}
                </div>
                <div className="text-white font-semibold">{data[active].name}</div>
                <div className="text-white/50 text-sm">
                  {data[active].countryFlag} {data[active].country}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:border-kim-gold hover:text-kim-gold transition-colors flex items-center justify-center"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {data.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === active ? 'w-6 h-2 bg-kim-gold' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:border-kim-gold hover:text-kim-gold transition-colors flex items-center justify-center"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
