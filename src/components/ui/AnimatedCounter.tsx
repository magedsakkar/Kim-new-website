'use client';

import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ target, suffix = '', label }: AnimatedCounterProps) {
  const { count, ref } = useCounterAnimation(target);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-serif text-kim-navy mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-kim-stone text-sm font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}
