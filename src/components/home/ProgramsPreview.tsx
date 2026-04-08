'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROGRAMS = [
  {
    key: 'tourist',
    href: '/programs/tourist',
    num: '01',
    bg: 'from-kim-navy to-kim-navy-dark',
    glow: 'bg-indigo-400',
    accent: 'from-kim-gold via-kim-gold/50 to-transparent',
    tag: 'Cultural Tours',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'volunteer',
    href: '/programs/volunteer-activities',
    num: '02',
    bg: 'from-kim-olive to-[#6B5800]',
    glow: 'bg-amber-400',
    accent: 'from-amber-300 via-amber-200/50 to-transparent',
    tag: 'Community',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    key: 'student',
    href: '/programs/student-meetings',
    num: '03',
    bg: 'from-kim-teal to-kim-teal-dark',
    glow: 'bg-teal-300',
    accent: 'from-teal-300 via-teal-200/50 to-transparent',
    tag: 'Education',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export function ProgramsPreview() {
  const t = useTranslations('programs');

  return (
    <section className="py-20 md:py-28 bg-kim-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-olive" />
              <span className="text-kim-olive text-xs font-semibold uppercase tracking-[0.2em]">{t('title')}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-kim-charcoal leading-tight">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-kim-navy font-semibold text-sm hover:gap-3 transition-all group shrink-0"
          >
            {t('viewAll')}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                href={program.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl min-h-[340px] bg-gradient-to-br ${program.bg} ring-1 ring-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:ring-white/20 transition-all duration-400`}
              >
                {/* Dot grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                />
                {/* Corner glow */}
                <div className={`absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 ${program.glow}`} />
                {/* Bottom vignette */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-gradient-to-r ${program.accent}`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-7">
                  {/* Tag + Number row */}
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                      <span className="w-3 h-px bg-white/35" />
                      {program.tag}
                    </span>
                    <span className="font-serif text-[5rem] font-black text-white/[0.06] leading-none select-none -mt-2 -mr-1">
                      {program.num}
                    </span>
                  </div>

                  {/* Icon with glow halo */}
                  <div className="relative mt-8 mb-6 w-fit">
                    <div className={`absolute inset-0 -m-3 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400 ${program.glow}`} />
                    <div className="relative w-12 h-12 rounded-xl bg-white/12 border border-white/15 flex items-center justify-center text-white group-hover:border-white/30 group-hover:bg-white/18 group-hover:scale-105 transition-all duration-300">
                      {program.icon}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-2.5 leading-snug">
                    {t(`${program.key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    {t(`${program.key}.description` as Parameters<typeof t>[0])}
                  </p>

                  {/* CTA row */}
                  <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/55 group-hover:text-white transition-colors duration-200">
                      {t('learnMore')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
