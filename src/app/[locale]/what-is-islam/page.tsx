import { setRequestLocale } from 'next-intl/server';
import { JourneyMapCanvas } from '@/components/what-is-islam/JourneyMapCanvas';

export default async function WhatIsIslamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <p className="text-kim-olive text-[10px] font-bold uppercase tracking-widest mb-1.5">
          Educational Journey
        </p>
        <h1 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">
          What is Islam?
        </h1>
        <p className="text-white/48 text-sm leading-relaxed">
          Click any node to explore it — or press <span className="text-kim-gold font-semibold">Next</span> to follow the guided path step by step.
        </p>
      </div>

      {/* Journey map canvas */}
      <div className="rounded-2xl overflow-hidden bg-[#0e1235] shadow-2xl shadow-kim-navy/60 p-4 sm:p-6 border border-white/6">
        <JourneyMapCanvas />
      </div>
    </div>
  );
}
