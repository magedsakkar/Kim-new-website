import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const LOCALES = [
  'tr', 'en', 'ar', 'fr', 'es', 'it', 'pt', 'de', 'ru', 'uk',
  'pl', 'sr', 'hr', 'el', 'hu', 'ro', 'sq', 'zh', 'ko', 'ja', 'fa',
];

const ROUTES: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { path: '',                                         priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/about',                                   priority: 0.8,  changeFreq: 'monthly' },
  { path: '/programs',                                priority: 0.8,  changeFreq: 'monthly' },
  { path: '/programs/tourist',                        priority: 0.7,  changeFreq: 'monthly' },
  { path: '/programs/volunteer-activities',           priority: 0.7,  changeFreq: 'monthly' },
  { path: '/programs/student-meetings',               priority: 0.7,  changeFreq: 'monthly' },
  { path: '/events',                                  priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/volunteer',                               priority: 0.7,  changeFreq: 'monthly' },
  { path: '/new-to-islam',                            priority: 0.8,  changeFreq: 'monthly' },
  { path: '/what-is-islam',                           priority: 0.9,  changeFreq: 'monthly' },
  { path: '/what-is-islam/introduction',              priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/belief-system',             priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/ethics-and-morality',       priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/faq',                       priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/personal-relationship',     priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/prohibitions',              priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/prophet-muhammad',          priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/quran-guidance',            priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/rational-conviction',       priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/resources',                 priority: 0.7,  changeFreq: 'monthly' },
  { path: '/what-is-islam/worship-and-rituals',       priority: 0.7,  changeFreq: 'monthly' },
  { path: '/new-muslim-care-area',                    priority: 0.8,  changeFreq: 'monthly' },
  { path: '/new-muslim-care-area/who-we-are',         priority: 0.6,  changeFreq: 'monthly' },
  { path: '/new-muslim-care-area/took-shahada',       priority: 0.6,  changeFreq: 'monthly' },
  { path: '/new-muslim-care-area/how-i-live-islam',   priority: 0.6,  changeFreq: 'monthly' },
  { path: '/library',                                 priority: 0.7,  changeFreq: 'weekly'  },
  { path: '/library-map',                             priority: 0.6,  changeFreq: 'monthly' },
  { path: '/our-projects',                            priority: 0.6,  changeFreq: 'monthly' },
  { path: '/contact',                                 priority: 0.8,  changeFreq: 'monthly' },
  { path: '/donate',                                  priority: 0.7,  changeFreq: 'monthly' },
  { path: '/privacy',                                 priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/terms',                                   priority: 0.3,  changeFreq: 'yearly'  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const { path, priority, changeFreq } of ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
