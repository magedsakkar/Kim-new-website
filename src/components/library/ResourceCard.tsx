'use client';

import { motion } from 'framer-motion';
import type { Resource } from '@/types';
import { Eye, Download, Languages } from 'lucide-react';
import { TYPE_ICONS, TYPE_GRADIENT, DOT_BG, langFlag, type LocaleStrings } from './constants';

export function ResourceCard({
  resource,
  lb,
  onPreview,
  i,
}: {
  resource: Resource;
  lb: LocaleStrings;
  onPreview: (r: Resource) => void;
  i: number;
}) {
  const TypeIcon    = TYPE_ICONS[resource.type] ?? TYPE_ICONS.book;
  const gradient    = TYPE_GRADIENT[resource.type] ?? 'from-kim-navy to-kim-navy-dark';
  const isPlaceholder = resource.url === '#' || !resource.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-kim-navy/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Gradient top band */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} px-5 pt-5 pb-7`}>
        <div className="absolute inset-0 opacity-[0.05]" style={DOT_BG} />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 bg-white" />
        <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold to-transparent" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/22 transition-all duration-300">
            <TypeIcon className="w-5 h-5 text-white" strokeWidth={1.8} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/15 border border-white/20 rounded-full px-2.5 py-1 text-white/80">
              {resource.type}
            </span>
            {resource.pages && (
              <span className="text-[9px] text-white/50">{resource.pages} {lb.pages}</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-kim-charcoal text-base leading-snug mb-2 group-hover:text-kim-navy transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-sm text-kim-stone leading-relaxed flex-1 mb-4 line-clamp-3">
          {resource.description}
        </p>

        {resource.languages && resource.languages.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <Languages className="w-3 h-3 text-kim-stone/50 flex-shrink-0" />
            {resource.languages.map((l) => (
              <span key={l} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-kim-stone/70">
                {l}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
          <span className="text-[10px] font-medium bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-kim-stone flex items-center gap-1">
            {langFlag(resource.language)} {resource.language}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPreview(resource)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-navy-light text-kim-navy text-[10px] font-semibold hover:bg-kim-navy hover:text-white transition-all duration-200"
            >
              <Eye className="w-3 h-3" strokeWidth={2} />
              {lb.preview}
            </button>

            {isPlaceholder ? (
              <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-gray-300 text-[10px] font-semibold cursor-not-allowed">
                <Download className="w-3 h-3" />
                {lb.download}
              </span>
            ) : (
              <a href={resource.url} download
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-gold text-white text-[10px] font-semibold hover:bg-amber-500 transition-all duration-200 shadow-sm shadow-kim-gold/20"
              >
                <Download className="w-3 h-3" strokeWidth={2} />
                {lb.download}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
