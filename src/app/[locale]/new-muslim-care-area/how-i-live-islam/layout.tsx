import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'İslam\'ı Nasıl Yaşarım', en: 'How I Live Islam', ar: 'كيف أعيش الإسلام' };
  const descs = {
    tr: 'Günlük hayatta İslam\'ı yaşamanın pratik rehberi — namaz, ahlak, aile ve toplulukla dolu bir hayat.',
    en: 'A practical guide to living Islam in daily life — prayer, ethics, family, and a community-filled life.',
    ar: 'دليل عملي لعيش الإسلام في الحياة اليومية — الصلاة والأخلاق والأسرة والحياة المجتمعية.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'new-muslim-care-area/how-i-live-islam', title: titles[l], description: descs[l] });
}

export default async function HowILiveIslamLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
