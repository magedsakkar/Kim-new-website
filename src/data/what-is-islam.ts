export interface JourneyStep {
  id: string;
  slug: string;
  label: string;
  shortLabel: string;
  phase: 'core' | 'branch';
  branchId?: string;           // A–F
  parentBranch?: string;       // branch that leads here
  icon: string;
  color: string;               // Tailwind bg class
  description: string;
}

export const journeySteps: JourneyStep[] = [
  // ── Core linear steps ─────────────────────────────────────
  {
    id: 'introduction',
    slug: 'introduction',
    label: 'Introduction to Islam',
    shortLabel: 'Introduction',
    phase: 'core',
    icon: '🌙',
    color: 'bg-kim-navy',
    description: 'What Islam means, its core message, purpose of life and human origins.',
  },
  {
    id: 'belief-system',
    slug: 'belief-system',
    label: 'The Belief System',
    shortLabel: 'Belief System',
    phase: 'core',
    icon: '⭐',
    color: 'bg-kim-navy',
    description: 'The 6 pillars of faith and addressing common misconceptions.',
  },
  {
    id: 'worship-and-rituals',
    slug: 'worship-and-rituals',
    label: 'Worship & Rituals',
    shortLabel: 'Worship',
    phase: 'core',
    icon: '🤲',
    color: 'bg-kim-navy',
    description: 'The 5 pillars of Islam — prayer, fasting, Zakat, and Hajj.',
  },

  // ── Branches (from step 3) ────────────────────────────────
  {
    id: 'prohibitions',
    slug: 'prohibitions',
    label: "Allah's Wisdom in Prohibitions",
    shortLabel: 'Prohibitions',
    phase: 'branch',
    branchId: 'A',
    icon: '🛡️',
    color: 'bg-kim-olive',
    description: "Understanding the divine wisdom behind what Islam forbids.",
  },
  {
    id: 'ethics-and-morality',
    slug: 'ethics-and-morality',
    label: 'Ethics & Morality',
    shortLabel: 'Ethics',
    phase: 'branch',
    branchId: 'B',
    icon: '💎',
    color: 'bg-kim-olive',
    description: 'Good character, honesty, kindness, rights and responsibilities.',
  },
  {
    id: 'personal-relationship',
    slug: 'personal-relationship',
    label: 'Personal Relationship with Allah',
    shortLabel: 'Personal Connection',
    phase: 'branch',
    branchId: 'C',
    icon: '🕊️',
    color: 'bg-kim-olive',
    description: "Du'a, overcoming doubts, and Divine Dialogues — turning prayer into conversation.",
  },
  {
    id: 'rational-conviction',
    slug: 'rational-conviction',
    label: 'Rational Conviction',
    shortLabel: 'Rational Conviction',
    phase: 'branch',
    branchId: 'D',
    parentBranch: 'C',
    icon: '🧠',
    color: 'bg-kim-olive',
    description: 'Why Islam is logically true — dealing with doubts, proving faith by reason.',
  },
  {
    id: 'quran-guidance',
    slug: 'quran-guidance',
    label: 'Quran Guidance',
    shortLabel: 'The Quran',
    phase: 'branch',
    branchId: 'E',
    parentBranch: 'D',
    icon: '📖',
    color: 'bg-kim-olive',
    description: 'Intro to the Quran, how to recite and understand it, practical tips.',
  },
  {
    id: 'prophet-muhammad',
    slug: 'prophet-muhammad',
    label: 'The Prophet Muhammad ﷺ',
    shortLabel: 'Prophet Muhammad',
    phase: 'branch',
    branchId: 'F',
    parentBranch: 'D',
    icon: '☀️',
    color: 'bg-kim-olive',
    description: 'His life, character, and answering common accusations with historical facts.',
  },
];

export const globalLinks = [
  {
    id: 'partners-map',
    label: 'Our Partners Worldwide',
    icon: '🗺️',
    description: 'Locations map of our global partners',
    href: '#partners-map',
  },
  {
    id: 'tablet-app',
    label: 'Süleymaniye Mosque App',
    icon: '📱',
    description: 'Interactive tablet app for mosque visitors',
    href: '#tablet-app',
  },
  {
    id: 'madrasa-tours',
    label: 'KIM 1, 2, 3 – Madrasa Media Tours',
    icon: '🎬',
    description: 'Guided media tours of our educational centres',
    href: '#madrasa-tours',
  },
  {
    id: 'volunteering',
    label: 'Volunteering Places',
    icon: '🤝',
    description: 'Find volunteering opportunities near you',
    href: '#volunteering',
  },
];

export const floatingActions = [
  {
    id: 'qa',
    label: 'Q & A',
    icon: '💬',
    description: 'Ask any question about Islam',
    color: 'bg-kim-teal',
    href: '/what-is-islam/faq',
  },
  {
    id: 'chatbot',
    label: 'Islam Chatbot',
    icon: '🤖',
    description: 'Chat via WhatsApp or social media',
    color: 'bg-emerald-600',
    href: '/what-is-islam/chatbot',
  },
  {
    id: 'library',
    label: 'Library',
    icon: '📚',
    description: 'Browse our resource library',
    color: 'bg-violet-600',
    href: '/library',
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '🎯',
    description: 'Tools, media & resources',
    color: 'bg-amber-600',
    href: '/what-is-islam/resources',
  },
];
