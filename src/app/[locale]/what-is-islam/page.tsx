import { setRequestLocale } from 'next-intl/server';
import { WhatIsIslamHub } from '@/components/what-is-islam/WhatIsIslamHub';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'İslam Nedir?', en: 'What is Islam?', ar: 'ما هو الإسلام؟' };
  const descs = {
    tr: "İslam'ın temellerini keşfedin — inanç, ibadet, ahlak, Kur'an ve Hz. Muhammed ﷺ. Etkileşimli yolculuk haritamızla başlayın.",
    en: 'Explore the foundations of Islam — belief, worship, ethics, the Quran, and the Prophet Muhammad ﷺ. Start your interactive journey.',
    ar: 'استكشف أسس الإسلام — الإيمان والعبادة والأخلاق والقرآن والنبي محمد ﷺ. ابدأ رحلتك التفاعلية.',
  };
  return buildMetadata({ locale, slug: 'what-is-islam', title: titles[locale as keyof typeof titles] || titles.en, description: descs[locale as keyof typeof descs] || descs.en });
}

export default async function WhatIsIslamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WhatIsIslamHub />;
}
