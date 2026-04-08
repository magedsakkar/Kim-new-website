'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { LOCALES, LOCALE_LABELS, LOCALE_FLAGS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  scrolled?: boolean;
  variant?: 'header' | 'mobile';
}

export function LocaleSwitcher({ variant = 'header' }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2">
        {LOCALES.map((loc) => (
          <button
            key={loc}
            onClick={() => handleChange(loc)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 flex-1',
              locale === loc
                ? 'bg-kim-gold text-white shadow-sm'
                : 'bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10'
            )}
          >
            <span className="text-xl leading-none">{LOCALE_FLAGS[loc]}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{LOCALE_LABELS[loc]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center bg-white/8 border border-white/12 rounded-full p-0.5"
      role="group"
      aria-label="Language selector"
    >
      {LOCALES.map((loc) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            onClick={() => handleChange(loc)}
            title={LOCALE_LABELS[loc]}
            aria-pressed={isActive}
            className="relative flex items-center"
          >
            {isActive && (
              <motion.div
                layoutId="lang-active-pill"
                className="absolute inset-0 rounded-full bg-kim-gold shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              />
            )}
            <span
              className={cn(
                'relative z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors duration-200',
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              )}
            >
              <span className="text-base leading-none">{LOCALE_FLAGS[loc]}</span>
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">
                {loc}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
