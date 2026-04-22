'use client';

import { motion } from 'framer-motion';
import type { Resource } from '@/types';
import { Eye, Download } from 'lucide-react';
import { TYPE_ICONS, TYPE_GRADIENT, langFlag, type LocaleStrings } from './constants';

export function ResourceRow({
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
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.25) }}
      className="group flex items-center gap-3 sm:gap-4 rounded-xl bg-white ring-1 ring-gray-100 hover:ring-kim-navy/20 hover:shadow-md px-3 sm:px-4 py-3 transition-all duration-200"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${gradient}`}>
        <TypeIcon className="w-5 h-5 text-white" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <h3 className="font-semibold text-kim-charcoal text-sm group-hover:text-kim-navy transition-colors truncate">
            {resource.title}
          </h3>
          <span className="shrink-0 text-[9px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-kim-stone">
            {langFlag(resource.language)} {resource.language}
          </span>
        </div>
        <p className="text-xs text-kim-stone line-clamp-1">{resource.description}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onPreview(resource)}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-navy-light text-kim-navy text-xs font-bold hover:bg-kim-navy hover:text-white transition-all"
        >
          <Eye className="w-3 h-3" />
          {lb.preview}
        </button>
        {isPlaceholder ? (
          <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-300 text-xs font-bold cursor-not-allowed">
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">{lb.download}</span>
          </span>
        ) : (
          <a href={resource.url} download
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-gold text-white text-xs font-bold hover:bg-amber-500 transition-all shadow-sm"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">{lb.download}</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
