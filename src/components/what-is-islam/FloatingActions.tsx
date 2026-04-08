'use client';

import { Link } from '@/lib/i18n/navigation';
import { floatingActions } from '@/data/what-is-islam';

export function FloatingActions() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-1 rounded-l-2xl bg-kim-navy/95 backdrop-blur-sm p-2 shadow-2xl border-l border-t border-b border-white/10">
        {floatingActions.map((action) => (
          <div key={action.id} className="group relative">
            <Link
              href={action.href}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-all duration-150 hover:bg-kim-olive/30 hover:scale-110 active:scale-95"
              title={action.label}
              aria-label={action.label}
            >
              {action.icon}
            </Link>
            {/* Tooltip */}
            <div className="pointer-events-none absolute right-[52px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-kim-navy border border-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {action.label}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-kim-navy border-r border-t border-white/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
