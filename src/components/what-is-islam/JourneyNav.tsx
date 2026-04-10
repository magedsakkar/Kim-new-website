'use client';

import { usePathname } from '@/lib/i18n/navigation';
import { Link } from '@/lib/i18n/navigation';
import { MessageSquare, Sparkles, Compass, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowchartNav } from './FlowchartNav/FlowchartNav';

const TOOLS = [
  { href: '/what-is-islam/faq',       Icon: MessageSquare, label: 'Q & A'         },
  { href: '/what-is-islam/chatbot',   Icon: Sparkles,      label: 'Islam Chatbot'  },
  { href: '/what-is-islam/resources', Icon: Compass,       label: 'Resources'      },
  { href: '/library',                 Icon: BookOpen,      label: 'Library'        },
] as const;

/**
 * JourneyNav — sidebar navigation for the What is Islam section.
 *
 * Top section  : FlowchartNav (branching SVG tree with state indicators)
 * Bottom section: quick-access tool links
 *
 * The `onNavigate` callback is called when any link is clicked,
 * allowing the mobile drawer to close itself.
 */
export function JourneyNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname.split('/').pop() ?? '';

  return (
    <div className="flex flex-col gap-5">
      {/* ── Journey flowchart tree ───────────────────────── */}
      <FlowchartNav onNavigate={onNavigate} />

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/28">
          Tools
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* ── Tool links ───────────────────────────────────── */}
      <div className="space-y-0.5">
        {TOOLS.map(({ href, Icon, label }) => {
          const slug = href.split('/').pop()!;
          const isActive = active === slug;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-xs transition-all duration-150',
                isActive
                  ? 'bg-white/8 text-white'
                  : 'text-white/48 hover:bg-white/8 hover:text-white/85',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors',
                  isActive
                    ? 'bg-kim-gold/18 text-kim-gold'
                    : 'bg-white/6 text-white/40 group-hover:bg-white/12',
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
