'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Play } from 'lucide-react';

const VIDEOS = {
  tr: {
    id: '55AGHR4JDPE',
    title: 'KİM Vakfı Tanıtım Videosu',
    subtitle: 'Süleymaniye, İstanbul — 2010\'dan bu yana',
    badge: '🇹🇷 Türkçe',
    eyebrow: 'Videolar',
    heading: 'Tanıtım Videosu',
  },
  en: {
    id: 'K6QHtXq9dew',
    title: 'KIM Foundation Introduction',
    subtitle: 'Süleymaniye, Istanbul — Bridging cultures since 2010',
    badge: '🇬🇧 English',
    eyebrow: 'Videos',
    heading: 'Introduction Video',
  },
} as const;

function VideoCard({
  id,
  title,
  subtitle,
  badge,
}: {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-kim-gold/50 transition-all duration-300 bg-white/5 backdrop-blur-sm hover:shadow-[0_0_50px_rgba(201,151,58,0.18)] group">
      {/* Language badge */}
      <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-black/65 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/15">
        {badge}
      </div>

      {playing ? (
        /* YouTube iframe */
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        /* Thumbnail with play overlay */
        <button
          onClick={() => setPlaying(true)}
          className="relative block w-full aspect-video overflow-hidden cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/22 transition-colors duration-300" />
          {/* Gold play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-kim-gold/90 flex items-center justify-center shadow-[0_0_40px_rgba(201,151,58,0.65)] group-hover:scale-110 group-hover:bg-kim-gold transition-all duration-300">
              <Play className="w-8 h-8 text-white fill-white ml-1" strokeWidth={0} />
            </div>
          </div>
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        </button>
      )}

      {/* Info bar */}
      <div className="px-6 py-5 bg-kim-navy-dark/90 border-t border-white/5">
        <h3 className="font-serif text-lg font-semibold text-white leading-snug mb-1">
          {title}
        </h3>
        <p className="text-white/40 text-xs tracking-wide">{subtitle}</p>
      </div>
    </div>
  );
}

export function VideosSection() {
  const locale = useLocale();
  // Turkish locale → Turkish video; English or Arabic → English video
  const video = locale === 'tr' ? VIDEOS.tr : VIDEOS.en;

  return (
    <section className="py-20 md:py-28 bg-kim-navy-dark relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,151,58,0.9) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.28em]">
              {video.eyebrow}
            </span>
            <span className="h-px w-10 bg-kim-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            {video.heading}
          </h2>
          <div className="w-14 h-0.5 bg-kim-gold mx-auto mt-4" />
        </div>

        {/* Single locale-appropriate video */}
        <VideoCard
          id={video.id}
          title={video.title}
          subtitle={video.subtitle}
          badge={video.badge}
        />
      </div>
    </section>
  );
}
