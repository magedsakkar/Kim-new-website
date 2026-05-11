import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Öğrenci Buluşmaları', en: 'Student Meetings', ar: 'لقاءات الطلاب' };
  const descs = {
    tr: 'Dünya genelinden üniversite öğrencileriyle İslam ve kültürlerarası diyalog üzerine akademik buluşmalar.',
    en: 'Academic meetings on Islam and cross-cultural dialogue with university students from around the world.',
    ar: 'لقاءات أكاديمية حول الإسلام والحوار بين الثقافات مع طلاب الجامعات من حول العالم.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'programs/student-meetings', title: titles[l], description: descs[l] });
}

export default async function StudentMeetingsLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
