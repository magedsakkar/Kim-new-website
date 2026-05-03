import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Dijital Kütüphane', en: 'Digital Library', ar: 'المكتبة الرقمية' };
  const descs = {
    tr: "İslam hakkında 8 dilde 30'dan fazla kitap ve broşür. Ücretsiz okuyun, önizleyin ve indirin.",
    en: 'Browse 30+ books and brochures about Islam in 8 languages. Read, preview, and download free resources.',
    ar: 'تصفح أكثر من 30 كتاباً وكتيباً عن الإسلام بـ8 لغات. اقرأ وتصفح وحمّل الموارد المجانية.',
  };
  return buildMetadata({ locale, slug: 'library', title: titles[locale as keyof typeof titles] || titles.en, description: descs[locale as keyof typeof descs] || descs.en });
}

export default async function LibraryLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
