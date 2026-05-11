import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Şehadet Getirdim', en: 'I Took My Shahada', ar: 'نطقت بالشهادة' };
  const descs = {
    tr: 'Şehadet getirdikten sonra ne yapmalı? Adım adım rehber — gusül, namaz, topluluk ve yeni Müslüman olarak ilk adımlarınız.',
    en: 'What to do after taking your Shahada? A step-by-step guide — ghusl, prayer, community and your first steps as a new Muslim.',
    ar: 'ماذا تفعل بعد النطق بالشهادة؟ دليل خطوة بخطوة — الغسل والصلاة والمجتمع وأولى خطواتك كمسلم جديد.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'new-muslim-care-area/took-shahada', title: titles[l], description: descs[l] });
}

export default async function TookShahadaLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
