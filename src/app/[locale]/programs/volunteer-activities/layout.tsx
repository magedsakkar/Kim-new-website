import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Gönüllü Faaliyetleri', en: 'Volunteer Activities', ar: 'أنشطة التطوع' };
  const descs = {
    tr: 'KİM Vakfı\'nın gönüllü faaliyetlerine katılın ve kültürlerarası diyaloğa katkıda bulunun.',
    en: 'Join KIM Foundation volunteer activities and contribute to cross-cultural dialogue in Istanbul.',
    ar: 'انضم إلى أنشطة تطوع مؤسسة كيم وساهم في الحوار بين الثقافات في إسطنبول.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'programs/volunteer-activities', title: titles[l], description: descs[l] });
}

export default async function VolunteerActivitiesLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
