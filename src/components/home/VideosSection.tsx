'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoCard {
  id: string;
  title: string;
  languageBadge: string;
}

const VIDEOS: VideoCard[] = [
  {
    id: '55AGHR4JDPE',
    title: 'KİM Vakfı Tanıtım Videosu',
    languageBadge: '🇹🇷 Türkçe',
  },
  {
    id: 'K6QHtXq9dew',
    title: 'KIM Foundation Introduction',
    languageBadge: '🇬🇧 English',
  },
];

function VideoCardItem({ video }: { video: VideoCard }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-kim-gold/50 transition-all duration-300 bg-white/5 backdrop-blur-sm hover:shadow-[0_0_40px_rgba(201,151,58,0.15)] hover:-translate-y-1">
      {/* Language badge */}
      <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/20">
        {video.languageBadge}
      </div>

      {playing ? (
        /* YouTube iframe */
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        /* Thumbnail with play button */
        <button
          onClick={() => setPlaying(true)}
          className="relative block w-full aspect-video overflow-hidden cursor-pointer"
          aria-label={`Play ${video.title}`}
        >
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

          {/* Gold play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-kim-gold/90 flex items-center justify-center shadow-[0_0_30px_rgba(201,151,58,0.6)] group-hover:scale-110 group-hover:bg-kim-gold transition-all duration-300">
              <Play className="w-7 h-7 text-white fill-white ml-1" strokeWidth={0} />
            </div>
          </div>
        </button>
      )}

      {/* Title bar */}
      <div className="px-5 py-4 bg-kim-navy-dark/80 border-t border-white/5">
        <h3 className="font-serif text-base font-semibold text-white leading-snug">
          {video.title}
        </h3>
      </div>
    </div>
  );
}

export function VideosSection() {
  return (
    <section className="py-20 md:py-28 bg-kim-navy-dark relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,151,58,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.25em]">
              Videolar
            </span>
            <span className="h-px w-10 bg-kim-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Tanıtım Videoları
          </h2>
          <div className="w-16 h-0.5 bg-kim-gold mx-auto mt-4" />
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((video) => (
            <VideoCardItem key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
