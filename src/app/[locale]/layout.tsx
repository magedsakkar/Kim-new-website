import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { geistSans, playfair } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/constants';
import type { Metadata } from 'next';
import '../globals.css';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'KİM Vakfı',
  alternateName: ['KIM Foundation', 'Cross Cultural Center', 'Kültürlerarası İletişim Merkezi'],
  url: 'https://kim.org.tr',
  logo: 'https://kim.org.tr/images/kim-logo.png',
  foundingDate: '2010',
  description: 'Cross Cultural Center building bridges of understanding between cultures in Istanbul since 2010.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Süleymaniye Mah. Kanuni Medresesi Sk. No:20',
    addressLocality: 'Fatih',
    addressRegion: 'Istanbul',
    addressCountry: 'TR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT.phone,
    email: CONTACT.email,
    contactType: 'customer service',
    availableLanguage: ['Turkish', 'English', 'Arabic'],
  },
  sameAs: [
    CONTACT.socialMedia.instagram,
    CONTACT.socialMedia.youtube,
    'https://twitter.com/kimvakfi',
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isAr = locale === 'ar';

  return buildMetadata({
    locale,
    title: isEn ? 'KIM Foundation – Cross Cultural Center' : isAr ? 'مؤسسة كيم – مركز التواصل الثقافي' : 'KİM Vakfı – Kültürlerarası İletişim Merkezi',
    description: isEn
      ? 'Building bridges of understanding between cultures in the heart of Istanbul since 2010.'
      : isAr
      ? 'بناء جسور التفاهم بين الثقافات في قلب إسطنبول منذ 2010.'
      : "2010'dan bu yana İstanbul'un kalbinde kültürler arası anlayış köprüleri inşa ediyoruz.",
  });
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'tr' | 'en' | 'ar')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <div className={`${geistSans.variable} ${playfair.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
