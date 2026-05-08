import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Biz Kimiz', en: 'Who We Are', ar: 'من نحن' };
  const descs = {
    tr: 'KİM Vakfı hakkında — misyonumuz, merkezlerimiz ve İstanbul\'daki kültürlerarası çalışmalarımız.',
    en: 'About KIM Foundation — our mission, centers, and cross-cultural work in Istanbul.',
    ar: 'حول مؤسسة كيم — مهمتنا ومراكزنا وعملنا بين الثقافات في إسطنبول.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'new-muslim-care-area/who-we-are', title: titles[l], description: descs[l] });
}

export default async function WhoWeAreLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
