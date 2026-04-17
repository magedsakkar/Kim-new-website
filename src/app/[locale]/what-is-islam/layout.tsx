'use client';

import { usePathname } from '@/lib/i18n/navigation';
import { globalLinks } from '@/data/what-is-islam';
import { JourneyNav } from '@/components/what-is-islam/JourneyNav';
import { FloatingActions } from '@/components/what-is-islam/FloatingActions';
import { MobileSidebarToggle } from '@/components/what-is-islam/MobileSidebarToggle';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';

export default function WhatIsIslamLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hub page — full-screen immersive design, no sidebar
  if (pathname === '/what-is-islam') {
    return <>{children}</>;
  }

  // Sub-pages — standard sidebar layout
  return (
    <div className="min-h-screen bg-kim-cream">

      {/* ── Section Header ───────────────────────────────────── */}
      <header className="bg-kim-navy/95 backdrop-blur-sm text-white sticky top-0 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white/10 rounded-xl p-1">
                <Image
                  src="/images/logo_kim_aklamasz-removebg-preview.png"
                  alt="KİM Vakfı"
                  width={40}
                  height={40}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <span className="text-white/30 select-none">/</span>
            <Link href="/new-muslim-care-area" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              New Muslim Care Area
            </Link>
            <span className="text-white/30 select-none">/</span>
            <span className="text-sm font-semibold text-kim-olive">What is Islam</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center">
              {globalLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  title={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <Link
              href="/what-is-islam/introduction"
              className="inline-flex items-center gap-1.5 rounded-full bg-kim-olive px-4 py-1.5 text-xs font-semibold text-white hover:bg-kim-olive/80 transition-colors"
            >
              <span>🌙</span>
              <span className="hidden sm:inline">Begin Journey</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Two-Column Layout ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pr-16">
        <div className="flex gap-8 items-start">

          {/* ── Sidebar (desktop) ─────────────────────────── */}
          <aside className="hidden lg:flex w-60 shrink-0 flex-col sticky top-24">
            <div className="rounded-2xl bg-kim-navy shadow-xl overflow-hidden">
              <div className="px-4 pt-5 pb-4 border-b border-white/10">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">
                  Educational Journey
                </p>
                <h2 className="font-serif text-base font-bold text-white leading-tight">
                  What is Islam?
                </h2>
              </div>
              <div className="px-3 py-4">
                <JourneyNav />
              </div>
              <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Follow at your own pace. Each step deepens your understanding.
                </p>
              </div>
            </div>
          </aside>

          {/* ── Content ───────────────────────────────────── */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      {/* ── Mobile sidebar toggle ────────────────────────────── */}
      <MobileSidebarToggle />

      {/* ── Floating actions ─────────────────────────────────── */}
      <FloatingActions />
    </div>
  );
}
