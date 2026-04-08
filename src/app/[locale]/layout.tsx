import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { geistSans, playfair } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import '../globals.css';

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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
