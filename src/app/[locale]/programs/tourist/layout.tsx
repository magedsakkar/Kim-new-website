import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Turist Programı', en: 'Tourist Program', ar: 'برنامج السياح' };
  const descs = {
    tr: 'İstanbul\'u ziyaret eden turistler için rehberli cami turları ve kültürlerarası deneyimler.',
    en: 'Guided mosque tours and cross-cultural experiences for tourists visiting Istanbul.',
    ar: 'جولات مسجد إرشادية وتجارب بين الثقافات للسياح الزائرين لإسطنبول.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'programs/tourist', title: titles[l], description: descs[l] });
}

export default async function TouristProgramLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
