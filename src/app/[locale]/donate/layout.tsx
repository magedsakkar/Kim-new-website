import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Bağış Yap', en: 'Donate', ar: 'تبرع' };
  const descs = {
    tr: 'KİM Vakfı\'na bağış yapın ve daha fazla insanın kültürlerarası diyalog ile İslam\'ı keşfetmesine katkıda bulunun.',
    en: 'Support KIM Foundation — help more people experience cross-cultural dialogue and discover Islam. Multi-currency bank transfer.',
    ar: 'ادعم مؤسسة كيم وساعد المزيد من الناس على تجربة الحوار بين الثقافات واكتشاف الإسلام.',
  };
  return buildMetadata({ locale, slug: 'donate', title: titles[locale as keyof typeof titles] || titles.en, description: descs[locale as keyof typeof descs] || descs.en });
}

export default async function DonateLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
