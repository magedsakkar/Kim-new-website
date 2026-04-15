'use client';

import { motion } from 'framer-motion';
import { Building2, BookOpen, Heart, MessageSquare, Library } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const LEVELS = [
  {
    level: 1,
    title: 'Who We Are',
    subtitle: 'Discover KİM Vakfı',
    description: 'Learn about our mission and the team behind KİM Foundation',
    href: '/new-muslim-care-area/who-we-are',
    icon: Building2,
    unlocked: true,
  },
  {
    level: 2,
    title: 'What is Islam?',
    subtitle: 'Begin the Journey',
    description: 'A guided path through Islamic knowledge from introduction to conviction',
    href: '/what-is-islam',
    icon: BookOpen,
    unlocked: true,
  },
  {
    level: 3,
    title: 'How I Live Islam',
    subtitle: 'Daily Life',
    description: 'Prayer, fasting, community — practical guidance for your new life',
    href: '/new-muslim-care-area/how-i-live-islam',
    icon: Heart,
    unlocked: true,
  },
  {
    level: 4,
    title: 'Q & A',
    subtitle: 'Ask Questions',
    description: 'Answers to the most common questions about Islam and Muslim life',
    href: '/what-is-islam/faq',
    icon: MessageSquare,
    unlocked: true,
  },
  {
    level: 5,
    title: 'Digital Library',
    subtitle: 'Deep Dive',
    description: 'Books, brochures, and videos in 25+ languages',
    href: '/library',
    icon: Library,
    unlocked: true,
  },
];

// Islamic geometric SVG pattern (star/arabesque tile)
const GEOMETRIC_PATTERN = `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <g fill="none" stroke="rgba(201,151,58,0.6)" stroke-width="0.8">
      <!-- 8-pointed star -->
      <polygon points="60,10 68,42 100,42 76,62 84,94 60,76 36,94 44,62 20,42 52,42" />
      <polygon points="60,20 66,44 90,44 72,58 78,82 60,68 42,82 48,58 30,44 54,44" opacity="0.5" />
      <!-- Corner elements -->
      <line x1="0" y1="0" x2="20" y2="20" />
      <line x1="120" y1="0" x2="100" y2="20" />
      <line x1="0" y1="120" x2="20" y2="100" />
      <line x1="120" y1="120" x2="100" y2="100" />
      <!-- Cross lines -->
      <line x1="60" y1="0" x2="60" y2="120" opacity="0.3" />
      <line x1="0" y1="60" x2="120" y2="60" opacity="0.3" />
    </g>
  </svg>
`;

const PATTERN_DATA_URL = `data:image/svg+xml,${encodeURIComponent(GEOMETRIC_PATTERN)}`;

export default function NewToIslamPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #0A0D1F 0%, #0F1430 40%, #141A4A 70%, #0A0D1F 100%)',
      }}
    >
      {/* Islamic geometric background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${PATTERN_DATA_URL}")`,
          backgroundSize: '120px 120px',
          opacity: 0.04,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(201,151,58,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-28">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-kim-gold text-xs font-bold uppercase tracking-[0.4em]">
            Select Your Path
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4"
        >
          Your Journey Begins Here
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/40 text-center text-base mb-16"
        >
          Five paths. One destination. Choose where to start.
        </motion.p>

        {/* Level cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEVELS.map((lvl, idx) => {
            const Icon = lvl.icon;
            return (
              <motion.div
                key={lvl.level}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                // Make level 5 span both cols on md when it's the last odd card
                className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  href={lvl.href}
                  className="group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-kim-gold/50 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(201,151,58,0.2)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(28,37,98,0.6) 0%, rgba(20,26,74,0.8) 100%)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Gold glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(201,151,58,0.08) 0%, transparent 70%)' }}
                  />

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-kim-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative p-7">
                    {/* Level number — huge watermark */}
                    <div
                      className="absolute top-4 right-5 font-serif font-black text-[6rem] leading-none select-none transition-opacity duration-300"
                      style={{ color: 'rgba(201,151,58,0.10)' }}
                    >
                      {lvl.level}
                    </div>

                    {/* UNLOCKED badge */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-kim-gold/40 bg-kim-gold/10 text-kim-gold text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-kim-gold animate-pulse" />
                        Unlocked
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-5 w-fit">
                      <div className="absolute inset-0 -m-2 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-400 bg-kim-gold" />
                      <div className="relative w-12 h-12 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center text-kim-gold group-hover:bg-kim-gold/15 group-hover:border-kim-gold/30 transition-all duration-300">
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className="text-kim-gold/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      Level {lvl.level} · {lvl.subtitle}
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl font-bold text-white mb-2.5 leading-tight group-hover:text-kim-gold/90 transition-colors duration-300">
                      {lvl.title}
                    </h2>

                    {/* Description */}
                    <p className="text-white/45 text-sm leading-relaxed">
                      {lvl.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-white/30 group-hover:text-kim-gold transition-colors duration-300 text-sm font-semibold">
                      <span>Enter</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-20 text-white/20 text-sm tracking-widest"
        >
          KİM Vakfı · Süleymaniye · İstanbul
        </motion.div>
      </div>
    </div>
  );
}
