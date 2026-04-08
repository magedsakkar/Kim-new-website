import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const LOCALES = ['tr', 'en', 'ar'];
const ROUTES = [
  '',
  '/about',
  '/programs',
  '/programs/tourist',
  '/programs/volunteer-activities',
  '/programs/student-meetings',
  '/volunteer',
  '/new-to-islam',
  '/library',
  '/contact',
  '/donate',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/programs' || route === '/contact' ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
