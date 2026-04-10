import {
  BookOpen,
  Star,
  Heart,
  ShieldCheck,
  Award,
  Users,
  Lightbulb,
  BookMarked,
  Sun,
} from 'lucide-react';
import type { TreeNode } from './types';

/**
 * Hierarchical journey tree.
 * Order of top-level nodes = linear progression of core steps.
 * `branches` = optional parallel paths that fork from the parent node.
 */
export const JOURNEY_TREE: TreeNode[] = [
  {
    id: 'introduction',
    slug: 'introduction',
    shortLabel: 'Introduction',
    Icon: BookOpen,
  },
  {
    id: 'belief-system',
    slug: 'belief-system',
    shortLabel: 'Belief System',
    Icon: Star,
  },
  {
    id: 'worship-and-rituals',
    slug: 'worship-and-rituals',
    shortLabel: 'Worship & Rituals',
    Icon: Heart,
    branches: [
      {
        id: 'prohibitions',
        slug: 'prohibitions',
        shortLabel: 'Prohibitions',
        Icon: ShieldCheck,
      },
      {
        id: 'ethics-and-morality',
        slug: 'ethics-and-morality',
        shortLabel: 'Ethics & Morality',
        Icon: Award,
      },
      {
        id: 'personal-relationship',
        slug: 'personal-relationship',
        shortLabel: 'Personal Rel.',
        Icon: Users,
        branches: [
          {
            id: 'rational-conviction',
            slug: 'rational-conviction',
            shortLabel: 'Rational Conv.',
            Icon: Lightbulb,
            branches: [
              {
                id: 'quran-guidance',
                slug: 'quran-guidance',
                shortLabel: 'The Quran',
                Icon: BookMarked,
              },
              {
                id: 'prophet-muhammad',
                slug: 'prophet-muhammad',
                shortLabel: 'Prophet ﷺ',
                Icon: Sun,
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * Flat depth-first order used to compute completed / upcoming states.
 * A node is "completed" if it appears before the active node in this array.
 */
export const FLAT_ORDER = [
  'introduction',
  'belief-system',
  'worship-and-rituals',
  'prohibitions',
  'ethics-and-morality',
  'personal-relationship',
  'rational-conviction',
  'quran-guidance',
  'prophet-muhammad',
] as const;
