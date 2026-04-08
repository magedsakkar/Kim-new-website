'use client';

import { useState } from 'react';
import { JourneyNav } from './JourneyNav';
import { BookOpen, X } from 'lucide-react';
import Image from 'next/image';

export function MobileSidebarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger — visible on mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full bg-kim-navy px-4 py-2.5 text-sm font-semibold text-white shadow-lg lg:hidden border border-white/10"
      >
        <BookOpen className="h-4 w-4" />
        Journey
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 bg-kim-navy shadow-2xl transition-transform duration-300 lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo_kim_aklamasz-removebg-preview.png"
              alt="KİM Vakfı"
              width={32}
              height={32}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
            <span className="font-serif text-base font-bold text-white">What is Islam?</span>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <JourneyNav onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
