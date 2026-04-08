'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PARTICLES = [
  { x: '12%', y: '22%', size: 3, delay: 0 },
  { x: '82%', y: '16%', size: 2, delay: 1.2 },
  { x: '88%', y: '68%', size: 3, delay: 2.1 },
  { x: '8%',  y: '72%', size: 2, delay: 0.6 },
  { x: '52%', y: '6%',  size: 2, delay: 1.8 },
  { x: '18%', y: '52%', size: 2, delay: 3.2 },
  { x: '72%', y: '88%', size: 2, delay: 0.9 },
  { x: '35%', y: '90%', size: 3, delay: 1.5 },
];

const OUTER_DOTS = [
  { top: '-6px',              left: 'calc(50% - 6px)' },
  { top: 'calc(50% - 6px)',   right: '-6px'            },
  { bottom: '-6px',           left: 'calc(50% - 6px)' },
  { top: 'calc(50% - 6px)',   left: '-6px'             },
];

const MIDDLE_DOTS = [
  { top: '-4px',   left: 'calc(50% - 4px)' },
  { bottom: '-4px', left: '18%'             },
  { bottom: '-4px', right: '18%'            },
];

function LogoOrbit() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.18) 0%, transparent 70%)' }}
      />

      {/* Outer dashed orbit — slow clockwise */}
      <motion.div
        className="absolute w-[390px] h-[390px] rounded-full"
        style={{ border: '1.5px dashed rgba(201,151,58,0.22)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        {OUTER_DOTS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-kim-gold/60"
            style={{ ...pos, boxShadow: '0 0 10px rgba(201,151,58,0.9)' }}
          />
        ))}
      </motion.div>

      {/* Middle solid orbit — counter-clockwise */}
      <motion.div
        className="absolute w-[272px] h-[272px] rounded-full"
        style={{ border: '1px solid rgba(255,255,255,0.10)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        {MIDDLE_DOTS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            style={pos}
          />
        ))}
      </motion.div>

      {/* Static inner ring */}
      <div
        className="absolute w-[196px] h-[196px] rounded-full"
        style={{ border: '1px solid rgba(201,151,58,0.12)' }}
      />

      {/* Logo — floating up and down */}
      <motion.div
        className="relative z-10"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Soft glow behind plate */}
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 70%)' }}
        />
        {/* Logo plate */}
        <div
          className="relative w-40 h-40 rounded-full bg-white/[0.07] backdrop-blur-sm border border-white/15 flex items-center justify-center"
          style={{ boxShadow: '0 0 48px rgba(201,151,58,0.18), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <Image
            src="/images/logo_kim_aklamasz-removebg-preview.png"
            alt="KİM Vakfı"
            width={96}
            height={96}
            className="w-24 h-24 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
            priority
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-kim-gold/50 pointer-events-none"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.8, 1], y: [-5, 5, -5] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* Radial spokes — very faint */}
      <svg
        className="absolute pointer-events-none opacity-[0.04]"
        width="400" height="400" viewBox="0 0 400 400" fill="none"
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1="200" y1="200"
              x2={200 + 200 * Math.cos(r)}
              y2={200 + 200 * Math.sin(r)}
              stroke="white" strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-kim-navy">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,115,0,0.18) 0%, transparent 70%)', top: '-100px', right: '-100px' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,92,99,0.25) 0%, transparent 70%)', bottom: '-50px', left: '-80px' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 70%)', top: '40%', left: '35%' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* Left — copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-kim-gold" />
              <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.2em]">
                {t('eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6"
            >
              {t('title')}
              <br />
              <em className="not-italic text-kim-gold">{t('titleAccent')}</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/60 text-lg leading-relaxed max-w-xl mb-10"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link
                href="/new-muslim-care-area"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-kim-gold text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-200 shadow-lg hover:shadow-kim-gold/30 hover:-translate-y-0.5 text-base"
              >
                {t('cta1')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 text-base backdrop-blur-sm"
              >
                {t('cta2')}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap gap-8 border-t border-white/10 pt-8"
            >
              {[
                { value: '4,500+', label: 'Annual Visitors' },
                { value: '80+',   label: 'Countries' },
                { value: 'Est. 2010', label: 'Süleymaniye' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/50 text-xs mt-0.5 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — logo orbit */}
          <motion.div
            className="order-1 lg:order-2 relative h-[340px] sm:h-[420px] lg:h-[560px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          >
            <LogoOrbit />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-[0.2em]">{t('scrollHint')}</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
