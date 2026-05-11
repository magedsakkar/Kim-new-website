import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Yaklaşan Etkinlikler', en: 'Upcoming Events', ar: 'الفعاليات القادمة' };
  const descs = {
    tr: 'KİM Vakfı\'nın yaklaşan etkinlikleri — cami turları, iftar programları, öğrenci seminerleri ve daha fazlası.',
    en: 'Upcoming events at KIM Foundation — mosque tours, iftar programs, student seminars and more.',
    ar: 'الفعاليات القادمة في مؤسسة كيم — جولات المساجد وبرامج الإفطار والندوات الطلابية والمزيد.',
  };
  const l = (locale in titles ? locale : 'en') as keyof typeof titles;
  return buildMetadata({ locale, slug: 'events', title: titles[l], description: descs[l] });
}

export default async function EventsLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
