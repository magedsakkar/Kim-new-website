import type { LucideIcon } from 'lucide-react';

/** Visual state of each node in the journey flowchart */
export type NodeState = 'active' | 'completed' | 'upcoming';

/** A single node in the journey tree.
 *  Children live in `branches` — depth is implicit from nesting. */
export interface TreeNode {
  id: string;
  slug: string;
  shortLabel: string;
  Icon: LucideIcon;
  branches?: TreeNode[];
}
