'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { journeySteps, floatingActions } from '@/data/what-is-islam';
import { Link } from '@/lib/i18n/navigation';

export function MobileDrawerPanel({
  activeId,
  onSelect,
  onClose,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="mobile-panel"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="fixed inset-y-0 left-0 z-[60] w-72 bg-[#07102A] shadow-2xl overflow-y-auto"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-kim-gold/80 mb-1">Educational Journey</p>
            <h2 className="font-serif text-lg font-bold text-white">What is Islam?</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          {journeySteps.map((step) => {
            const isActive = step.id === activeId;
            return (
              <button
                key={step.id}
                onClick={() => { onSelect(step.id); onClose(); }}
                className={cn(
                  'flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-all border',
                  isActive ? 'bg-kim-gold/14 border-kim-gold/32' : 'hover:bg-white/5 border-transparent',
                  step.phase === 'branch' && 'ml-5',
                )}
              >
                <span className={cn(
                  'flex-shrink-0 flex items-center justify-center rounded-full text-sm',
                  isActive ? 'w-8 h-8 bg-kim-gold' : 'w-7 h-7 border border-white/18 bg-white/4',
                )}>
                  {step.icon}
                </span>
                <span className={cn('text-xs font-semibold', isActive ? 'text-kim-gold' : 'text-white/58')}>
                  {step.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-white/8 space-y-1.5">
          {floatingActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/4 hover:bg-white/10 border border-white/6 transition-all text-sm"
            >
              <span>{action.icon}</span>
              <span className="text-white/60 text-xs font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
