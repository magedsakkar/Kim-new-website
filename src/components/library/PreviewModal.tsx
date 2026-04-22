'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Resource } from '@/types';
import { FileText, X, Eye, Download } from 'lucide-react';
import type { LocaleStrings } from './constants';

export function PreviewModal({
  resource,
  lb,
  onClose,
}: {
  resource: Resource;
  lb: LocaleStrings;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const isPlaceholder = resource.url === '#' || !resource.url;
  const viewerUrl = isPlaceholder
    ? null
    : resource.url.startsWith('http')
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(resource.url)}&embedded=true`
    : resource.url;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === overlayRef.current && onClose()}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative z-10 bg-kim-navy rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10 flex-shrink-0">
            <div className="min-w-0 flex-1">
              <p className="text-kim-gold text-[9px] font-bold uppercase tracking-[0.25em] mb-1">{lb.previewTitle}</p>
              <h3 className="font-serif font-bold text-white text-base leading-snug line-clamp-2">{resource.title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/70">
                  {resource.language}
                </span>
                {resource.pages && (
                  <span className="text-[10px] text-white/40">{resource.pages} {lb.pages}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isPlaceholder && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/18 text-white text-xs font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lb.openExternal}</span>
                </a>
              )}
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 min-h-0 bg-[#030810]">
            {isPlaceholder ? (
              <div className="flex flex-col items-center justify-center h-full py-20 px-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white/25" />
                </div>
                <p className="text-white/50 font-semibold mb-2">PDF not yet linked</p>
                <p className="text-white/28 text-sm max-w-sm leading-relaxed">
                  This book is in our archive. Add the PDF URL from the book archive panel to enable preview.
                </p>
              </div>
            ) : (
              <iframe
                src={viewerUrl ?? resource.url}
                className="w-full h-full"
                style={{ minHeight: '500px' }}
                title={resource.title}
                allowFullScreen
              />
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
            <p className="text-white/35 text-xs line-clamp-1 hidden sm:block">{resource.description}</p>
            {isPlaceholder ? (
              <span className="text-white/30 text-xs italic">PDF link pending</span>
            ) : (
              <a href={resource.url} download
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-kim-gold text-white text-sm font-semibold hover:bg-amber-500 transition-colors shadow-md shadow-kim-gold/25 flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                {lb.download}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
