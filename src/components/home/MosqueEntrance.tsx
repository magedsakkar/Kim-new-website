'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EarthEntranceOverlay, STORAGE_KEY } from './EarthEntranceOverlay';

export function MosqueEntrance() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    setShow(!sessionStorage.getItem(STORAGE_KEY));
  }, []);

  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <EarthEntranceOverlay key="earth-entrance" onDone={() => setShow(false)} />
      )}
    </AnimatePresence>
  );
}
