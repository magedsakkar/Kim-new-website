'use client';

import { floatingActions } from '@/data/what-is-islam';
import { Link } from '@/lib/i18n/navigation';
import { JourneyTreeViewer } from './JourneyTreeViewer';

export function JourneyTreePanel({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="hidden lg:flex flex-col w-[300px] bg-[#07102A]/96 backdrop-blur-md border-r border-white/8 flex-shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-white/8 bg-kim-navy-dark/30">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-kim-gold/75 mb-1">Educational Journey</p>
        <h2 className="font-serif text-sm font-bold text-white leading-tight">What is Islam?</h2>
      </div>

      {/* SVG tree */}
      <div className="flex-1 min-h-0 px-2 py-2 overflow-hidden">
        <JourneyTreeViewer activeId={activeId} onSelect={onSelect} />
      </div>

      {/* Tool links */}
      <div className="flex-shrink-0 px-3 pt-2 pb-2 space-y-1 border-t border-white/8">
        {floatingActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/4 hover:bg-white/10 border border-white/6 hover:border-kim-gold/28 transition-all group"
          >
            <span className="text-sm flex-shrink-0">{action.icon}</span>
            <span className="text-white/60 group-hover:text-white text-[11px] font-medium">{action.label}</span>
          </Link>
        ))}
      </div>

      <p className="flex-shrink-0 px-4 pb-3 text-[9px] text-white/18 leading-relaxed">
        Follow at your own pace — return any time to continue your journey.
      </p>
    </div>
  );
}
