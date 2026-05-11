'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { journeySteps } from '@/data/what-is-islam';

export const CW = 660, CH = 820, NODE_RY = 22;

export const NODE_POS: Record<string, readonly [number, number]> = {
  'introduction':          [330, 58 ],
  'belief-system':         [330, 183],
  'worship-and-rituals':   [330, 308],
  'prohibitions':          [100, 455],
  'ethics-and-morality':   [330, 455],
  'personal-relationship': [558, 455],
  'rational-conviction':   [455, 592],
  'quran-guidance':        [350, 730],
  'prophet-muhammad':      [568, 730],
};

const EDGES: Array<[string, string]> = [
  ['introduction',          'belief-system'],
  ['belief-system',         'worship-and-rituals'],
  ['worship-and-rituals',   'prohibitions'],
  ['worship-and-rituals',   'ethics-and-morality'],
  ['worship-and-rituals',   'personal-relationship'],
  ['personal-relationship', 'rational-conviction'],
  ['rational-conviction',   'quran-guidance'],
  ['rational-conviction',   'prophet-muhammad'],
];

function bezierD(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1, dy = y2 - y1;
  return `M${x1},${y1} C${x1+dx*0.08},${y1+dy*0.55} ${x2-dx*0.08},${y2-dy*0.55} ${x2},${y2}`;
}

export function JourneyTreeViewer({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [clickFlash, setClickFlash] = useState<string | null>(null);
  const [ax, ay] = NODE_POS[activeId] ?? [CW / 2, CH / 2];

  return (
    <div className="select-none w-full h-full">
      <div
        className="relative mx-auto"
        style={{ width: '100%', aspectRatio: `${CW} / ${CH}`, maxHeight: '100%' }}
      >
        <svg viewBox={`0 0 ${CW} ${CH}`} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <marker id="jt-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L0,6 L7,3.5z" fill="#C9973A" opacity="0.85"/>
            </marker>
            <filter id="jt-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="jt-glow2" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {EDGES.map(([from, to]) => {
            const [x1, y1] = NODE_POS[from];
            const [x2, y2] = NODE_POS[to];
            const lit = activeId === from || activeId === to;
            return (
              <motion.path
                key={`${from}→${to}`}
                d={bezierD(x1, y1 + NODE_RY + 4, x2, y2 - NODE_RY - 4)}
                fill="none"
                animate={{
                  stroke: lit ? '#C9973A' : 'rgba(255,255,255,0.11)',
                  strokeWidth: lit ? 2.2 : 1.4,
                  opacity: lit ? 1 : 0.7,
                }}
                transition={{ duration: 0.45 }}
                strokeDasharray={lit ? undefined : '5 5'}
                markerEnd={lit ? 'url(#jt-arrow)' : undefined}
                filter={lit ? 'url(#jt-glow)' : undefined}
              />
            );
          })}

          <motion.circle fill="none" stroke="#C9973A" strokeWidth={1.5}
            animate={{ cx: ax, cy: ay, r: [NODE_RY + 6, NODE_RY + 20], opacity: [0.65, 0] }}
            transition={{
              cx: { type: 'spring', stiffness: 180, damping: 22 },
              cy: { type: 'spring', stiffness: 180, damping: 22 },
              r:  { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
              opacity: { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
            }}
          />
          <motion.circle r={7} fill="#C9973A" filter="url(#jt-glow2)"
            animate={{ cx: ax, cy: ay }}
            transition={{ type: 'spring', stiffness: 170, damping: 21 }}
          />

          {clickFlash && NODE_POS[clickFlash] && (() => {
            const [fx, fy] = NODE_POS[clickFlash];
            const RAD_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
            return (
              <g key={clickFlash + '-flash'} pointerEvents="none">
                {/* Inner expanding ring */}
                <motion.circle
                  cx={fx} cy={fy}
                  fill="#C9973A"
                  initial={{ r: NODE_RY, opacity: 0.8 }}
                  animate={{ r: NODE_RY * 4, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                {/* Outer expanding ring */}
                <motion.circle
                  cx={fx} cy={fy}
                  fill="#C9973A"
                  initial={{ r: NODE_RY, opacity: 0.55 }}
                  animate={{ r: NODE_RY * 6, opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
                />
                {/* 8 radiating lines */}
                {RAD_ANGLES.map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = fx + Math.cos(rad) * 28;
                  const y2 = fy + Math.sin(rad) * 28;
                  return (
                    <motion.line
                      key={angle}
                      x1={fx} y1={fy} x2={x2} y2={y2}
                      stroke="#C9973A"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 0.6, ease: 'easeOut', times: [0, 0.2, 1] }}
                    />
                  );
                })}
              </g>
            );
          })()}
        </svg>

        {journeySteps.map((step) => {
          const pos = NODE_POS[step.id];
          if (!pos) return null;
          const [nx, ny] = pos;
          const isActive = activeId === step.id;
          const isCore   = step.phase === 'core';
          return (
            <motion.button
              key={step.id}
              onClick={() => {
                setClickFlash(step.id);
                onSelect(step.id);
                setTimeout(() => setClickFlash(null), 700);
              }}
              className="absolute focus:outline-none"
              style={{
                left: `${(nx / CW) * 100}%`,
                top:  `${(ny / CH) * 100}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 20 : 10,
              }}
              animate={{ scale: isActive ? 1.12 : 1 }}
              whileHover={{ scale: isActive ? 1.12 : 1.06 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              <span
                style={{
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 14px rgba(201,151,58,0.55), 0 0 32px rgba(201,151,58,0.2)' : undefined,
                }}
                className={cn(
                  'flex items-center gap-0.5 px-3 py-1.5 rounded-full border font-medium leading-none transition-colors duration-300 cursor-pointer',
                  isActive
                    ? 'bg-kim-navy border-kim-gold text-kim-gold'
                    : isCore
                    ? 'bg-kim-navy/90 border-white/22 text-white/78 hover:border-white/50 hover:text-white'
                    : 'bg-kim-navy-dark/90 border-white/16 text-white/65 hover:border-kim-gold/40 hover:text-white',
                )}
              >
                <span style={{ fontSize: '1.1em' }}>{step.icon}</span>
                {step.shortLabel}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
