'use client';

import { usePathname } from '@/lib/i18n/navigation';
import { Link } from '@/lib/i18n/navigation';
import { journeySteps } from '@/data/what-is-islam';
import { cn } from '@/lib/utils';

const coreSteps = journeySteps.filter((s) => s.phase === 'core');
const topBranches = journeySteps.filter((s) => s.phase === 'branch' && !s.parentBranch);
const subBranches = journeySteps.filter((s) => s.phase === 'branch' && s.parentBranch);

export function JourneyNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname.split('/').pop() ?? '';

  return (
    <nav className="relative">
      {/* Core journey */}
      <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-3 px-1">
        Core Journey
      </p>
      <div className="relative">
        {/* Vertical track */}
        <div className="absolute left-[13px] top-3.5 bottom-3.5 w-0.5 bg-white/15 rounded-full" />
        <div className="space-y-0.5">
          {coreSteps.map((step) => {
            const isActive = active === step.slug;
            return (
              <Link
                key={step.id}
                href={`/what-is-islam/${step.slug}`}
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-xl py-2 px-1 transition-all duration-150 hover:bg-white/10"
              >
                <div className={cn(
                  'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm transition-all',
                  isActive
                    ? 'bg-white border-white shadow-lg shadow-white/20 scale-110'
                    : 'border-white/30 bg-kim-navy group-hover:border-white/60'
                )}>
                  <span className={isActive ? '' : 'opacity-60'}>{step.icon}</span>
                </div>
                <span className={cn(
                  'text-xs font-medium leading-snug transition-colors',
                  isActive ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/90'
                )}>
                  {step.shortLabel}
                </span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tools & Resources divider */}
      <div className="my-4 px-1 flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Tools</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Tool links */}
      <div className="space-y-0.5 mb-4">
        {[
          { href: '/what-is-islam/faq', icon: '💬', label: 'Q & A' },
          { href: '/what-is-islam/chatbot', icon: '🤖', label: 'Islam Chatbot' },
          { href: '/what-is-islam/resources', icon: '🎯', label: 'Resources' },
          { href: '/library', icon: '📚', label: 'Library' },
        ].map((tool) => {
          const isToolActive = active === tool.href.split('/').pop();
          return (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-xl py-1.5 px-1 transition-all hover:bg-white/10"
            >
              <div className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-sm transition-all',
                isToolActive ? 'bg-kim-navy/30 scale-110' : 'bg-white/5 group-hover:bg-white/15'
              )}>
                {tool.icon}
              </div>
              <span className={cn(
                'text-xs font-medium leading-snug transition-colors',
                isToolActive ? 'text-white font-semibold' : 'text-white/55 group-hover:text-white/85'
              )}>
                {tool.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Divider before branches */}
      <div className="my-4 px-1 flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Branches</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Branch steps */}
      <div className="space-y-0.5">
        {topBranches.map((branch) => {
          const isActive = active === branch.slug;
          const children = subBranches.filter((s) => s.parentBranch === branch.branchId);
          return (
            <div key={branch.id}>
              <Link
                href={`/what-is-islam/${branch.slug}`}
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-xl py-1.5 px-1 transition-all hover:bg-white/10"
              >
                <div className={cn(
                  'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all',
                  isActive
                    ? 'bg-kim-olive border-kim-olive text-white shadow-md scale-110'
                    : 'border-kim-olive/40 bg-transparent text-kim-olive/70 group-hover:border-kim-olive/70'
                )}>
                  {branch.branchId}
                </div>
                <span className={cn(
                  'text-xs font-medium leading-snug transition-colors',
                  isActive ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/90'
                )}>
                  {branch.shortLabel}
                </span>
              </Link>

              {children.length > 0 && (
                <div className="ml-3 pl-1 relative">
                  <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-kim-olive/15 rounded-full" />
                  {children.map((child) => {
                    const isChildActive = active === child.slug;
                    return (
                      <Link
                        key={child.id}
                        href={`/what-is-islam/${child.slug}`}
                        onClick={onNavigate}
                        className="group flex items-center gap-2.5 rounded-xl py-1.5 pl-4 pr-1 transition-all hover:bg-white/10"
                      >
                        <div className={cn(
                          'relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[9px] font-bold transition-all',
                          isChildActive
                            ? 'bg-kim-olive border-kim-olive text-white scale-110'
                            : 'border-kim-olive/30 bg-transparent text-kim-olive/60 group-hover:border-kim-olive/60'
                        )}>
                          {child.branchId}
                        </div>
                        <span className={cn(
                          'text-xs leading-snug transition-colors',
                          isChildActive ? 'text-white font-semibold' : 'text-white/50 group-hover:text-white/80'
                        )}>
                          {child.shortLabel}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
