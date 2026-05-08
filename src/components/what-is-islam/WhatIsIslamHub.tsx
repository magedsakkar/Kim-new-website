'use client';

import { useState, useRef } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { IslamicBackground } from './IslamicBackground';
import { JourneyTreeViewer } from './JourneyTreeViewer';
import { ContentPanel } from './ContentPanel';
import { floatingActions, journeySteps } from '@/data/what-is-islam';
import { Link } from '@/lib/i18n/navigation';

const LABELS: Record<string, { eyebrow: string; title: string; hint: string; pace: string }> = {
  en: {
    eyebrow: 'Educational Journey',
    title:   'What is Islam?',
    hint:    'Select any topic on the map to begin',
    pace:    'Follow at your own pace — return any time to continue.',
  },
  tr: {
    eyebrow: 'Eğitim Yolculuğu',
    title:   'İslam Nedir?',
    hint:    'Başlamak için haritadan bir konu seçin',
    pace:    'Kendi hızınızda ilerleyin — istediğiniz zaman geri dönün.',
  },
  ar: {
    eyebrow: 'رحلة تعليمية',
    title:   'ما هو الإسلام؟',
    hint:    'اختر أي موضوع على الخريطة للبدء',
    pace:    'تابع بالسرعة التي تناسبك — عد في أي وقت لمتابعة رحلتك.',
  },
};

export function WhatIsIslamHub() {
  const locale    = useLocale();
  const lb        = LABELS[(locale in LABELS ? locale : 'en') as keyof typeof LABELS];
  const isRtl     = locale === 'ar' || locale === 'fa';
  const [activeId, setActiveId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleSelect(id: string) {
    setActiveId(id);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }

  const activeStep = journeySteps.find((s) => s.id === (activeId ?? ''));

  return (
    <div className="min-h-screen relative" style={{ paddingTop: '80px' }} dir={isRtl ? 'rtl' : 'ltr'}>
      <IslamicBackground />

      {/* ── Tree section — centered, full view ───────────────── */}
      <section className="relative z-10 pt-12 pb-6 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-6"
          >
            <p className="text-kim-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2">{lb.eyebrow}</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">{lb.title}</h1>
            <p className="text-white/40 text-sm">{lb.hint}</p>
          </motion.div>

          {/* Tree — full aspect-ratio, unconstrained height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full"
          >
            <JourneyTreeViewer activeId={activeId ?? 'introduction'} onSelect={handleSelect} />
          </motion.div>

          {/* Quick-access links */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-center mt-5"
          >
            {floatingActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-kim-gold/30 transition-all text-xs text-white/55 hover:text-white"
              >
                <span>{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </motion.div>

          <p className="text-center text-[10px] text-white/20 mt-4 leading-relaxed">{lb.pace}</p>
        </div>
      </section>

      {/* ── Content panel — shown below tree on node select ───── */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            ref={contentRef}
            key={activeId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 border-t border-white/10"
          >
            <ContentPanel
              activeId={activeId}
              onSelect={handleSelect}
              onOpenMobileNav={() => {}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
