'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';

export function StatsSection() {
  const t = useTranslations('stats');

  const statLabels = {
    visitors: t('visitors'),
    volunteers: t('volunteers'),
    years: t('years'),
    countries: t('countries'),
  };

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #1C2562 0%, transparent 60%), radial-gradient(circle at 80% 50%, #8B7300 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-kim-stone text-xs font-semibold uppercase tracking-[0.25em]">
            {t('title')}
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-x divide-kim-navy/8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="px-8 py-10 text-center group hover:bg-kim-navy-light/40 transition-colors duration-300"
            >
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                label={statLabels[stat.key as keyof typeof statLabels]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
