'use client';

import { Check } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import type { NodeState, TreeNode } from './types';

interface NavNodeProps {
  node: TreeNode;
  state: NodeState;
  onNavigate?: () => void;
}

/**
 * A single pill-shaped journey node.
 *
 * States:
 *   active    — gold border + gold text + pulsing dot
 *   completed — muted white with check icon
 *   upcoming  — dim / low-opacity, still clickable
 */
export function NavNode({ node, state, onNavigate }: NavNodeProps) {
  const { Icon, shortLabel, slug } = node;

  return (
    <Link
      href={`/what-is-islam/${slug}`}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-2 w-full rounded-full px-2.5 py-1.5 text-[11px] font-medium leading-none transition-all duration-200',
        // Active
        state === 'active' && [
          'bg-kim-gold/12 border border-kim-gold/60 text-kim-gold',
          'shadow-[0_0_12px_rgba(201,151,58,0.22)]',
        ],
        // Completed
        state === 'completed' && [
          'bg-white/5 border border-white/10 text-white/65',
          'hover:bg-white/10 hover:text-white hover:border-white/20',
        ],
        // Upcoming
        state === 'upcoming' && [
          'border border-white/7 text-white/35',
          'hover:border-white/20 hover:text-white/60',
        ],
      )}
    >
      {/* State indicator circle */}
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
          state === 'active'    && 'bg-kim-gold text-kim-navy',
          state === 'completed' && 'bg-white/18 text-white/70',
          state === 'upcoming'  && 'bg-white/6 text-white/28',
        )}
      >
        {state === 'completed' ? (
          <Check className="h-2.5 w-2.5" />
        ) : (
          <Icon className="h-2.5 w-2.5" />
        )}
      </span>

      {/* Label */}
      <span className="truncate flex-1">{shortLabel}</span>

      {/* Active pulse dot */}
      {state === 'active' && (
        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-kim-gold animate-pulse" />
      )}
    </Link>
  );
}
