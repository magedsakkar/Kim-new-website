'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Play, MapPin } from 'lucide-react';

const STATS = [
  { value: '4,500+', label: 'Annual Visitors' },
  { value: '80+',    label: 'Countries' },
  { value: '2010',   label: 'Est. Süleymaniye' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-kim-navy-dark">

      {/* ── Full-bleed mosque photo background ─────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/images/suleymaniye-mosque.jpg"
          alt=""
          fill
          className="object-cover object-[center_32%]"
          priority
          unoptimized
        />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-kim-navy-dark/96 via-kim-navy-dark/75 to-kim-navy-dark/30" />
        {/* Top + bottom vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-kim-navy-dark/60 via-transparent to-kim-navy-dark/70" />
        {/* Diagonal navy overlay — original design element */}
        <div className="absolute inset-0 bg-gradient-to-br from-kim-navy/30 via-transparent to-transparent" />
        {/* Overall depth */}
        <div className="absolute inset-0 bg-kim-navy-dark/20" />
      </div>

      {/* ── Ambient glow orbs ───────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 70%)', top: -80, left: -80 }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,92,99,0.18) 0%, transparent 70%)', bottom: -60, right: -60 }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Islamic dot grid ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.04, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* ── Main grid ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div {...FADE_UP(0)} className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-kim-gold" />
              <span className="text-kim-gold text-xs font-bold uppercase tracking-[0.22em]">
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...FADE_UP(0.12)}
              className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] xl:text-7xl font-bold text-white leading-[1.05] mb-6">
              {t('title')}
              <br />
              <em className="not-italic text-gradient-gold">{t('titleAccent')}</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p {...FADE_UP(0.24)}
              className="text-white/58 text-lg leading-relaxed max-w-[520px] mb-10">
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...FADE_UP(0.36)} className="flex flex-wrap items-center gap-4 mb-14">
              <Link href="/new-muslim-care-area"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-kim-gold text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-200 shadow-lg shadow-kim-gold/25 hover:shadow-kim-gold/40 hover:-translate-y-0.5 text-base">
                {t('cta1')}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="/programs" className="group flex items-center gap-3">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/8 backdrop-blur-sm transition-all duration-200 group-hover:bg-white/16 group-hover:border-white/40">
                  <Play className="h-4 w-4 fill-white text-white ml-0.5" />
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-white/18"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-white/55 text-sm font-medium group-hover:text-white/80 transition-colors">
                  Watch Promo
                </span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div {...FADE_UP(0.5)}
              className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/45 text-xs mt-0.5 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Animated KİM logo card */}
          <motion.div
            className="order-1 lg:order-2 relative h-[340px] sm:h-[430px] lg:h-[580px]"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            {/* Animated gold glow border */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(135deg, rgba(201,151,58,0.7) 0%, rgba(201,151,58,0.08) 45%, rgba(201,151,58,0.55) 100%)' }}
            />

            {/* Card body */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{ background: 'linear-gradient(155deg, #1A2B62 0%, #0F1838 45%, #08101E 100%)' }}>

              {/* Islamic geometric pattern bg */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Cpath d='M44 6 L49 32 L74 18 L57 40 L83 44 L57 48 L74 70 L49 56 L44 82 L39 56 L14 70 L31 48 L5 44 L31 40 L14 18 L39 32Z' fill='none' stroke='%23C9973A' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '88px 88px',
                }}
              />

              {/* Diagonal overlay — original design element */}
              <div className="absolute inset-0 bg-gradient-to-br from-kim-navy/30 via-transparent to-transparent" />

              {/* ── Concentric animated rings ── */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outermost slow-rotate ring with tick marks */}
                <motion.div
                  className="absolute rounded-full border border-kim-gold/10"
                  style={{ width: '82%', height: '82%',
                    backgroundImage: 'repeating-conic-gradient(rgba(201,151,58,0.15) 0deg 1deg, transparent 1deg 30deg)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                />
                {/* Ring 2 — counter-rotate */}
                <motion.div
                  className="absolute rounded-full border border-kim-gold/18"
                  style={{ width: '66%', height: '66%' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Orbiting gold dot */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-kim-gold shadow-[0_0_8px_rgba(201,151,58,0.8)]" />
                </motion.div>
                {/* Ring 3 */}
                <motion.div
                  className="absolute rounded-full border border-kim-gold/25"
                  style={{ width: '50%', height: '50%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />
                {/* Ring 4 — pulse */}
                <motion.div
                  className="absolute rounded-full border border-kim-gold/30"
                  style={{ width: '34%', height: '34%' }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Central logo */}
                <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full border border-kim-gold/35"
                  style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.18) 0%, rgba(20,26,74,0.8) 70%)', boxShadow: '0 0 50px rgba(201,151,58,0.28), inset 0 0 30px rgba(201,151,58,0.06)' }}>
                  <Image
                    src="/images/logo_kim_aklamasz-removebg-preview.png"
                    alt="KİM Vakfı"
                    width={52}
                    height={52}
                    className="w-12 h-12 object-contain brightness-0 invert"
                  />
                </div>
              </div>

              {/* Top-left: founded badge */}
              <div className="absolute top-4 left-4">
                <div className="rounded-xl bg-kim-gold px-3 py-2"
                  style={{ boxShadow: '0 4px 24px rgba(201,151,58,0.55)' }}>
                  <p className="text-white font-black text-xl leading-none">2010</p>
                  <p className="text-white/80 text-[9px] font-semibold uppercase tracking-wider mt-0.5">Founded</p>
                </div>
              </div>

              {/* Top-right: stats badge */}
              <div className="absolute top-4 right-4">
                <div className="rounded-xl border border-white/12 bg-black/35 backdrop-blur-sm px-3 py-2 text-right">
                  <p className="text-white font-bold text-base leading-none">80+</p>
                  <p className="text-white/45 text-[9px] uppercase tracking-wider mt-0.5">Countries</p>
                </div>
              </div>

              {/* Bottom info card */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="h-3 w-3 text-kim-gold shrink-0" />
                    <span className="text-kim-gold text-[10px] font-bold uppercase tracking-[0.2em]">
                      Süleymaniye, Fatih
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm leading-snug">Cross Cultural Center</p>
                  <p className="text-white/50 text-xs mt-0.5">İstanbul, Türkiye</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/28 text-[10px] uppercase tracking-[0.22em]">{t('scrollHint')}</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
