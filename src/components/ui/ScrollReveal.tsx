'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Preset = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';

interface ScrollRevealProps {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

const PRESETS: Record<Preset, Variants> = {
  fadeUp:    { hidden: { opacity: 0, y: 36 },    visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -24 },   visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -36 },   visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 36 },    visible: { opacity: 1, x: 0 } },
  scale:     { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  blur:      { hidden: { opacity: 0, filter: 'blur(12px)', y: 16 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } },
};

export function ScrollReveal({
  children,
  preset = 'fadeUp',
  delay = 0,
  duration = 0.65,
  className,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={PRESETS[preset]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container — wrap children to cascade them */
interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  once?: boolean;
}

export function StaggerReveal({ children, stagger = 0.1, className, once = true }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

/* Individual stagger child — use inside StaggerReveal */
export function StaggerItem({
  children,
  preset = 'fadeUp',
  className,
}: { children: ReactNode; preset?: Preset; className?: string }) {
  return (
    <motion.div className={className} variants={PRESETS[preset]}>
      {children}
    </motion.div>
  );
}
