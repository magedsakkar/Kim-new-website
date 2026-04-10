'use client';

import { usePathname } from '@/lib/i18n/navigation';
import { NavNode } from './NavNode';
import { JOURNEY_TREE, FLAT_ORDER } from './data';
import type { TreeNode, NodeState } from './types';

interface FlowchartNavProps {
  onNavigate?: () => void;
}

// ── SVG connector primitives ─────────────────────────────────

/**
 * Vertical downward arrow — connects two consecutive core steps.
 * Turns gold when the upper step is completed.
 */
function ArrowDown({ lit }: { lit: boolean }) {
  const c = lit ? 'rgba(201,151,58,0.7)' : 'rgba(255,255,255,0.18)';
  return (
    <div className="flex justify-center py-px">
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
        <line
          x1="7" y1="0" x2="7" y2="13"
          stroke={c} strokeWidth="1.5" strokeLinecap="round"
        />
        <path
          d="M3.5 11 L7 17 L10.5 11"
          stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Short vertical stub — separates a core node from its branch group.
 */
function ForkStub({ lit }: { lit: boolean }) {
  const c = lit ? 'rgba(201,151,58,0.55)' : 'rgba(255,255,255,0.14)';
  return (
    <div className="flex justify-center">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
        <line x1="7" y1="0" x2="7" y2="7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * L-shaped branch connector — sits to the LEFT of a branch node.
 *
 * Draws:
 *  • a vertical stem (full height for non-last siblings, half-height for last)
 *  • a horizontal arm at the midpoint leading right
 *  • an arrowhead pointing right
 */
function ArrowBranch({
  lit,
  isLast,
}: {
  lit: boolean;
  isLast: boolean;
}) {
  const c = lit ? 'rgba(201,151,58,0.6)' : 'rgba(255,255,255,0.16)';
  // The SVG is 18 × 28. Arm is at y=14 (vertical centre).
  // Vertical stem stops at y=14 for the last sibling so the line doesn't
  // hang below the last branch node.
  const stemY2 = isLast ? 14 : 28;

  return (
    <svg
      width="18"
      height="28"
      viewBox="0 0 18 28"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Vertical stem */}
      <line
        x1="4" y1="0" x2="4" y2={stemY2}
        stroke={c} strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Horizontal arm */}
      <line
        x1="4" y1="14" x2="14" y2="14"
        stroke={c} strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Arrowhead → */}
      <path
        d="M11 11 L16 14 L11 17"
        stroke={c} fill="none"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Recursive branch subtree ─────────────────────────────────

interface BranchTreeProps {
  nodes: TreeNode[];
  getState: (id: string) => NodeState;
  onNavigate?: () => void;
}

/**
 * Renders a list of branch nodes with their L-shaped connectors.
 * Recursively renders sub-branches by indenting a further 18 px.
 */
function BranchTree({ nodes, getState, onNavigate }: BranchTreeProps) {
  return (
    <div>
      {nodes.map((node, i) => {
        const isLast = i === nodes.length - 1;
        const state = getState(node.id);
        const lit = state === 'active' || state === 'completed';

        return (
          <div key={node.id}>
            {/* Connector + node on one row */}
            <div className="flex items-center gap-1">
              <ArrowBranch lit={lit} isLast={isLast} />
              <div className="flex-1 min-w-0">
                <NavNode node={node} state={state} onNavigate={onNavigate} />
              </div>
            </div>

            {/* Sub-branches */}
            {node.branches && node.branches.length > 0 && (
              <div className="ml-[18px]">
                <ForkStub lit={lit} />
                <BranchTree
                  nodes={node.branches}
                  getState={getState}
                  onNavigate={onNavigate}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main exported component ──────────────────────────────────

/**
 * FlowchartNav — the full branching journey tree.
 *
 * Reads the current pathname to compute active / completed / upcoming state
 * for every node, then renders the tree with SVG connectors between nodes.
 */
export function FlowchartNav({ onNavigate }: FlowchartNavProps) {
  const pathname = usePathname();
  const activeSlug = pathname.split('/').pop() ?? '';
  const activeIdx = (FLAT_ORDER as readonly string[]).indexOf(activeSlug);

  const getState = (id: string): NodeState => {
    const idx = (FLAT_ORDER as readonly string[]).indexOf(id);
    if (id === activeSlug) return 'active';
    if (idx !== -1 && activeIdx !== -1 && idx < activeIdx) return 'completed';
    return 'upcoming';
  };

  return (
    <nav>
      {JOURNEY_TREE.map((node, i) => {
        const isLast = i === JOURNEY_TREE.length - 1;
        const state = getState(node.id);
        const nextNode = JOURNEY_TREE[i + 1];

        // The downward arrow is gold when the current node is done
        // OR the next core node is now active
        const arrowLit =
          state === 'completed' ||
          (!!nextNode && getState(nextNode.id) === 'active');

        return (
          <div key={node.id}>
            {/* Core step node */}
            <NavNode node={node} state={state} onNavigate={onNavigate} />

            {/* Branch group for this core step (if any) */}
            {node.branches && node.branches.length > 0 && (
              <>
                <ForkStub lit={state === 'completed' || state === 'active'} />
                <BranchTree
                  nodes={node.branches}
                  getState={getState}
                  onNavigate={onNavigate}
                />
              </>
            )}

            {/* Downward arrow to the next core step */}
            {!isLast && <ArrowDown lit={arrowLit} />}
          </div>
        );
      })}
    </nav>
  );
}
