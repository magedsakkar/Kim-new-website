import { MosqueEntrance } from '@/components/home/MosqueEntrance';
import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeBanner } from '@/components/home/MarqueeBanner';
import { StatsSection } from '@/components/home/StatsSection';
import { MissionStatement } from '@/components/home/MissionStatement';
import { VideosSection } from '@/components/home/VideosSection';
import { ProgramsPreview } from '@/components/home/ProgramsPreview';
import { EventsSection } from '@/components/home/EventsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTABanner } from '@/components/home/CTABanner';
import { GallerySection } from '@/components/home/GallerySection';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'KİM Vakfı – Ana Sayfa', en: 'KIM Foundation – Home', ar: 'مؤسسة كيم – الرئيسية' };
  const descs = {
    tr: "2010'dan bu yana İstanbul'un kalbinde kültürler arası anlayış köprüleri inşa ediyoruz.",
    en: 'Building bridges of understanding between cultures in the heart of Istanbul since 2010.',
    ar: 'بناء جسور التفاهم بين الثقافات في قلب إسطنبول منذ 2010.',
  };
  return buildMetadata({ locale, title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

export default function HomePage() {
  return (
    <>
      <MosqueEntrance />
      <HeroSection />
      <MarqueeBanner />
      <StatsSection />
      <MissionStatement />
      <VideosSection />
      <ProgramsPreview />
      <EventsSection />
      <GallerySection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
