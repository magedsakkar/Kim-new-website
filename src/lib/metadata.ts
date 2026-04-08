import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from './constants';

interface MetadataInput {
  locale: string;
  slug?: string;
  title: string;
  description: string;
  image?: string;
}

export function buildMetadata({ locale, slug, title, description, image }: MetadataInput): Metadata {
  const path = slug ? `/${locale}/${slug}` : `/${locale}`;
  const canonical = `${SITE_URL}${path}`;
  const ogLocale = locale === 'ar' ? 'ar_TR' : locale === 'en' ? 'en_US' : 'tr_TR';

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/tr${slug ? `/${slug}` : ''}`,
        en: `${SITE_URL}/en${slug ? `/${slug}` : ''}`,
        ar: `${SITE_URL}/ar${slug ? `/${slug}` : ''}`,
      },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: image || '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image || '/og-default.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
