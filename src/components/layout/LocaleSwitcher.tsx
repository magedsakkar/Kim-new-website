'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { LOCALES, LOCALE_LABELS, LOCALE_FLAGS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  scrolled?: boolean;
  variant?: 'header' | 'mobile';
}

export function LocaleSwitcher({ variant = 'header' }: LocaleSwitcherProps) {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // ── Mobile: scrollable grid of language buttons ───────────────
  if (variant === 'mobile') {
    return (
      <div className="grid grid-cols-3 gap-2">
        {LOCALES.map((loc) => (
          <button key={loc} onClick={() => handleChange(loc)}
            className={cn(
              'flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-all duration-200',
              locale === loc
                ? 'bg-kim-gold text-white shadow-sm'
                : 'bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10'
            )}>
            <span className="text-xl leading-none">{LOCALE_FLAGS[loc]}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider truncate w-full text-center">{LOCALE_LABELS[loc]}</span>
          </button>
        ))}
      </div>
    );
  }

  // ── Header: dropdown with flags ───────────────────────────────
  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/8 border border-white/12 hover:bg-white/15 hover:border-white/22 transition-all duration-200"
      >
        <span className="text-[1.1rem] leading-none">{LOCALE_FLAGS[locale as keyof typeof LOCALE_FLAGS]}</span>
        <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.12em]">{locale}</span>
        <motion.svg
          className="w-3 h-3 text-white/45"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="lang-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            role="listbox"
            className="absolute top-full right-0 mt-2 w-48 z-[200] rounded-2xl border border-white/12 shadow-2xl shadow-black/50 overflow-hidden"
            style={{ background: 'rgba(20,26,74,0.98)', backdropFilter: 'blur(20px)' }}
          >
            {/* Caret */}
            <div className="absolute -top-[6px] right-[14px] w-3 h-3 rotate-45 border-l border-t border-white/12"
              style={{ background: 'rgba(20,26,74,0.98)' }} />

            <div className="py-1.5 max-h-80 overflow-y-auto">
              {LOCALES.map((loc) => {
                const isActive = locale === loc;
                return (
                  <button key={loc} role="option" aria-selected={isActive}
                    onClick={() => handleChange(loc)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 text-left',
                      isActive
                        ? 'bg-kim-gold/15 text-kim-gold'
                        : 'text-white/65 hover:text-white hover:bg-white/8'
                    )}
                  >
                    <span className="text-lg leading-none">{LOCALE_FLAGS[loc]}</span>
                    <span className="font-semibold flex-1">{LOCALE_LABELS[loc]}</span>
                    {isActive && (
                      <svg className="w-3.5 h-3.5 text-kim-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
