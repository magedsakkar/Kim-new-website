'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { journeySteps } from '@/data/what-is-islam';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Canvas coordinate space ───────────────────────────────────
const CW = 660;
const CH = 820;

// Node center positions [x, y] in canvas coordinates
const NODE_POS: Record<string, readonly [number, number]> = {
  'introduction':           [330, 58 ],
  'belief-system':          [330, 183],
  'worship-and-rituals':    [330, 308],
  'prohibitions':           [100, 455],
  'ethics-and-morality':    [330, 455],
  'personal-relationship':  [558, 455],
  'rational-conviction':    [455, 592],
  'quran-guidance':         [350, 730],
  'prophet-muhammad':       [568, 730],
};

// Directed edges [from, to]
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

// Linear order for Next / Prev navigation
const STEP_ORDER = [
  'introduction', 'belief-system', 'worship-and-rituals',
  'prohibitions', 'ethics-and-morality', 'personal-relationship',
  'rational-conviction', 'quran-guidance', 'prophet-muhammad',
];

// Half-height of a node oval (used to offset line endpoints)
const NODE_RY = 22;

function bezierD(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return (
    `M${x1},${y1} ` +
    `C${x1 + dx * 0.08},${y1 + dy * 0.55} ` +
    `${x2 - dx * 0.08},${y2 - dy * 0.55} ` +
    `${x2},${y2}`
  );
}

export function JourneyMapCanvas() {
  const [activeId, setActiveId] = useState<string>('introduction');

  const activeStep = journeySteps.find((s) => s.id === activeId)!;
  const [ax, ay] = NODE_POS[activeId] ?? [CW / 2, CH / 2];
  const stepIdx = STEP_ORDER.indexOf(activeId);

  return (
    <div className="select-none">
      {/* ── Aspect-ratio canvas ─────────────────────────────── */}
      <div
        className="relative w-full"
        style={{ paddingBottom: `${(CH / CW) * 100}%` }}
      >
        {/* SVG — lines + animated indicator */}
        <svg
          viewBox={`0 0 ${CW} ${CH}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            {/* Arrowhead marker */}
            <marker
              id="jm-arrow"
              markerWidth="7" markerHeight="7"
              refX="6" refY="3.5"
              orient="auto"
            >
              <path d="M0,1 L0,6 L7,3.5 z" fill="#C9973A" opacity="0.85" />
            </marker>

            {/* Glow filter for active lines + indicator */}
            <filter id="jm-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Stronger glow for indicator dot */}
            <filter id="jm-glow2" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Edges ── */}
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
                markerEnd={lit ? 'url(#jm-arrow)' : undefined}
                filter={lit ? 'url(#jm-glow)' : undefined}
              />
            );
          })}

          {/* ── Pulsing ring — follows active node ── */}
          <motion.circle
            fill="none"
            stroke="#C9973A"
            strokeWidth={1.5}
            animate={{
              cx: ax,
              cy: ay,
              r:       [NODE_RY + 6,  NODE_RY + 20],
              opacity: [0.65, 0],
            }}
            transition={{
              cx:      { type: 'spring', stiffness: 180, damping: 22 },
              cy:      { type: 'spring', stiffness: 180, damping: 22 },
              r:       { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
              opacity: { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
            }}
          />

          {/* ── Indicator dot — springs to active node ── */}
          <motion.circle
            r={7}
            fill="#C9973A"
            filter="url(#jm-glow2)"
            animate={{ cx: ax, cy: ay }}
            transition={{ type: 'spring', stiffness: 170, damping: 21 }}
          />
        </svg>

        {/* ── HTML node buttons ── */}
        {journeySteps.map((step) => {
          const pos = NODE_POS[step.id];
          if (!pos) return null;
          const [nx, ny] = pos;
          const isActive = activeId === step.id;
          const isCore = step.phase === 'core';

          return (
            <motion.button
              key={step.id}
              onClick={() => setActiveId(step.id)}
              className="absolute focus:outline-none"
              style={{
                left: `${(nx / CW) * 100}%`,
                top:  `${(ny / CH) * 100}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 20 : 10,
              }}
              animate={{ scale: isActive ? 1.13 : 1 }}
              whileHover={{ scale: isActive ? 1.13 : 1.07 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              <span
                style={{
                  fontSize: 'clamp(7.5px, 1.55vw, 11.5px)',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive
                    ? '0 0 18px rgba(201,151,58,0.5), 0 0 40px rgba(201,151,58,0.2)'
                    : undefined,
                }}
                className={[
                  'flex items-center gap-1 px-3 py-1.5 rounded-full border font-medium leading-none transition-colors duration-300 cursor-pointer',
                  isActive
                    ? 'bg-kim-navy border-kim-gold text-kim-gold'
                    : isCore
                    ? 'bg-kim-navy/90 border-white/22 text-white/78 hover:border-white/50 hover:text-white'
                    : 'bg-kim-navy-dark/90 border-kim-olive/28 text-white/68 hover:border-kim-olive/55 hover:text-white',
                ].join(' ')}
              >
                <span style={{ fontSize: '0.85em' }}>{step.icon}</span>
                {step.shortLabel}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* ── Info panel ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mt-5 rounded-2xl bg-kim-navy/80 border border-white/10 p-5"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl mt-0.5 shrink-0">{activeStep.icon}</span>
            <div>
              <h3 className="font-bold text-white leading-snug">{activeStep.label}</h3>
              <p className="text-white/55 text-[13px] mt-1 leading-relaxed">
                {activeStep.description}
              </p>
            </div>
          </div>

          {/* Step dots */}
          <div className="flex gap-1 mb-4 flex-wrap">
            {STEP_ORDER.map((id, i) => (
              <button
                key={id}
                onClick={() => setActiveId(id)}
                className="transition-all duration-200"
              >
                <span
                  className={[
                    'block rounded-full transition-all duration-200',
                    id === activeId
                      ? 'w-5 h-2 bg-kim-gold'
                      : i < stepIdx
                      ? 'w-2 h-2 bg-white/35'
                      : 'w-2 h-2 bg-white/15',
                  ].join(' ')}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={() => stepIdx > 0 && setActiveId(STEP_ORDER[stepIdx - 1])}
                disabled={stepIdx === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80 disabled:opacity-25 text-xs transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                onClick={() =>
                  stepIdx < STEP_ORDER.length - 1 && setActiveId(STEP_ORDER[stepIdx + 1])
                }
                disabled={stepIdx === STEP_ORDER.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-kim-gold text-white disabled:opacity-25 text-xs font-semibold hover:bg-kim-gold/85 transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <Link
              href={`/what-is-islam/${activeStep.slug}`}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/18 text-white/65 hover:bg-white/8 hover:text-white text-xs font-medium transition-colors"
            >
              Explore full page <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
