export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  registrationUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  quote: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'brochure' | 'video';
  url: string;             // PDF/video/resource download URL
  language: string;        // Primary language label shown on card
  languages?: string[];    // All language options (for multi-language sets)
  thumbnail?: string;      // Cover image URL
  category?: string;       // 'belief' | 'quran' | 'new-muslim' | etc.
  pages?: number;
  author?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type Locale = 'tr' | 'en' | 'ar';
