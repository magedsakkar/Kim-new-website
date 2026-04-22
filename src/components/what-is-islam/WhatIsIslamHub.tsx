'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IslamicBackground } from './IslamicBackground';
import { JourneyTreePanel } from './JourneyTreePanel';
import { ContentPanel } from './ContentPanel';
import { MobileDrawerPanel } from './MobileDrawerPanel';

export function WhatIsIslamHub() {
  const [activeId, setActiveId]           = useState('introduction');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden" style={{ paddingTop: '80px' }}>
      <IslamicBackground />

      <div className="flex h-full overflow-hidden relative z-[1]">
        <JourneyTreePanel activeId={activeId} onSelect={setActiveId} />
        <ContentPanel
          activeId={activeId}
          onSelect={setActiveId}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <MobileDrawerPanel
              activeId={activeId}
              onSelect={setActiveId}
              onClose={() => setMobileNavOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
