'use client';

import { motion } from 'framer-motion';

type StarDef = { l: number; t: number; s: number; d: number; g: boolean };

const BG_STARS: StarDef[] = [
  { l: 5,  t: 4,  s: 2,   d: 0,    g: true  }, { l: 12, t: 11, s: 1.5, d: 0.8,  g: false },
  { l: 23, t: 6,  s: 2.5, d: 1.5,  g: true  }, { l: 35, t: 9,  s: 1.5, d: 0.4,  g: false },
  { l: 47, t: 3,  s: 2,   d: 1.2,  g: true  }, { l: 58, t: 8,  s: 1.5, d: 2.0,  g: false },
  { l: 70, t: 5,  s: 3,   d: 0.6,  g: true  }, { l: 82, t: 10, s: 2,   d: 1.7,  g: false },
  { l: 92, t: 4,  s: 2.5, d: 0.3,  g: true  }, { l: 97, t: 13, s: 1.5, d: 1.1,  g: false },
  { l: 3,  t: 22, s: 2,   d: 2.2,  g: true  }, { l: 15, t: 30, s: 1.5, d: 0.7,  g: false },
  { l: 28, t: 25, s: 3,   d: 1.4,  g: true  }, { l: 41, t: 35, s: 2,   d: 0.2,  g: false },
  { l: 55, t: 28, s: 2.5, d: 1.8,  g: true  }, { l: 67, t: 38, s: 1.5, d: 0.9,  g: false },
  { l: 79, t: 32, s: 2,   d: 2.5,  g: true  }, { l: 88, t: 25, s: 1.5, d: 1.3,  g: false },
  { l: 94, t: 38, s: 2,   d: 0.5,  g: true  }, { l: 2,  t: 48, s: 1.5, d: 1.6,  g: false },
  { l: 10, t: 55, s: 2.5, d: 0.1,  g: true  }, { l: 22, t: 62, s: 2,   d: 1.9,  g: false },
  { l: 37, t: 52, s: 1.5, d: 0.7,  g: true  }, { l: 51, t: 60, s: 3,   d: 2.1,  g: false },
  { l: 63, t: 55, s: 2,   d: 0.4,  g: true  }, { l: 75, t: 65, s: 1.5, d: 1.0,  g: false },
  { l: 86, t: 58, s: 2.5, d: 1.5,  g: true  }, { l: 96, t: 52, s: 2,   d: 0.8,  g: false },
  { l: 7,  t: 75, s: 2,   d: 2.0,  g: true  }, { l: 19, t: 82, s: 1.5, d: 0.3,  g: false },
  { l: 33, t: 78, s: 2.5, d: 1.2,  g: true  }, { l: 46, t: 85, s: 2,   d: 0.6,  g: false },
  { l: 60, t: 80, s: 1.5, d: 1.7,  g: true  }, { l: 73, t: 88, s: 2,   d: 2.3,  g: false },
  { l: 85, t: 82, s: 3,   d: 0.9,  g: true  }, { l: 96, t: 76, s: 1.5, d: 1.4,  g: false },
  { l: 43, t: 16, s: 2,   d: 0.5,  g: true  }, { l: 62, t: 43, s: 1.5, d: 1.3,  g: false },
  { l: 18, t: 70, s: 2,   d: 0.8,  g: true  }, { l: 77, t: 72, s: 2,   d: 1.6,  g: false },
];

export function IslamicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#030A18] via-[#06102A] to-[#040C1F]" />

      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 4l2.5 9.5 8-5.5-4 8.5 9.5 2-9.5 2 4 8.5-8-5.5L24 33l-2.5-9.5-8 5.5 4-8.5-9.5-2 9.5-2-4-8.5 8 5.5Z' fill='%23C9973A'/%3E%3C/svg%3E")`,
        backgroundSize: '48px 48px',
      }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.14]"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(201,151,58,0.5) 0%, transparent 70%)' }} />
      <div className="absolute -left-40 top-1/3 w-[500px] h-[700px] rounded-full opacity-[0.10]"
        style={{ background: 'radial-gradient(ellipse, rgba(28,37,98,0.9) 0%, transparent 65%)' }} />
      <div className="absolute -right-20 top-1/4 w-[400px] h-[600px] rounded-full opacity-[0.12]"
        style={{ background: 'radial-gradient(ellipse, rgba(201,151,58,0.35) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.1]"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(28,37,98,0.7) 0%, transparent 65%)' }} />

      {BG_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.l}%`, top: `${star.t}%`,
            width: star.s, height: star.s,
            background: star.g ? '#C9973A' : '#E8EEFF',
            boxShadow: star.g
              ? `0 0 ${star.s * 2.5}px ${star.s}px rgba(201,151,58,0.95), 0 0 ${star.s * 8}px ${star.s * 2}px rgba(201,151,58,0.45)`
              : `0 0 ${star.s * 2.5}px ${star.s}px rgba(200,210,255,0.95), 0 0 ${star.s * 8}px ${star.s * 2}px rgba(180,200,255,0.35)`,
          }}
          animate={{ opacity: [0.12, 0.85, 0.12], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.4 + star.d * 0.65, repeat: Infinity, delay: star.d, ease: 'easeInOut' }}
        />
      ))}

      {([
        [20, 18, 14, 0], [75, 22, 12, 1.2], [8, 50, 16, 0.5], [90, 60, 12, 1.8],
        [45, 88, 14, 0.9], [55, 42, 10, 2.2], [30, 70, 12, 0.3], [68, 78, 14, 1.5],
      ] as [number, number, number, number][]).map(([l, t, sz, d], i) => (
        <motion.div key={`sp-${i}`} className="absolute" style={{ left: `${l}%`, top: `${t}%` }}
          animate={{ opacity: [0.0, 0.55, 0.0], scale: [0.6, 1.1, 0.6] }}
          transition={{ duration: 3.5 + d * 0.8, repeat: Infinity, delay: d, ease: 'easeInOut' }}
        >
          <svg width={sz} height={sz} viewBox="0 0 20 20">
            <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5Z"
              fill="#C9973A" style={{ filter: 'drop-shadow(0 0 3px rgba(201,151,58,0.9))' }} />
          </svg>
        </motion.div>
      ))}

      <motion.div className="absolute" style={{ left: '10%', top: '12%' }}
        animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <filter id="bgm1" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M40,26 A19,19 0 1,1 18,7 A14,14 0 1,0 40,26Z" fill="#C9973A" filter="url(#bgm1)" opacity="0.82"/>
        </svg>
      </motion.div>

      <motion.div className="absolute" style={{ right: '7%', top: '32%' }}
        animate={{ opacity: [0.25, 0.7, 0.25], y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42">
          <defs>
            <filter id="bgm2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M32,21 A15,15 0 1,1 14,6 A10.5,10.5 0 1,0 32,21Z" fill="#C9973A" filter="url(#bgm2)" opacity="0.72"/>
          <circle cx="36" cy="8" r="2.5" fill="#C9973A" opacity="0.6" filter="url(#bgm2)"/>
        </svg>
      </motion.div>

      <motion.div className="absolute" style={{ left: '6%', bottom: '20%' }}
        animate={{ opacity: [0.2, 0.65, 0.2], y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2.8, ease: 'easeInOut' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <defs>
            <filter id="bgm3" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M28,18 A13,13 0 1,1 12,5 A9,9 0 1,0 28,18Z" fill="#C9973A" filter="url(#bgm3)" opacity="0.68"/>
        </svg>
      </motion.div>

      <motion.div className="absolute" style={{ right: '6%', top: '6%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ filter: 'drop-shadow(0 0 8px rgba(201,151,58,0.75))' }}>
          <path d="M22 3l2.8 8.4 7.2-5-3.6 7.8 8.6 2-8.6 2 3.6 7.8-7.2-5L22 29l-2.8-8.4-7.2 5 3.6-7.8-8.6-2 8.6-2-3.6-7.8 7.2 5Z" fill="#C9973A" opacity="0.70"/>
        </svg>
      </motion.div>

      <motion.div className="absolute" style={{ left: '3%', top: '42%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" style={{ filter: 'drop-shadow(0 0 6px rgba(201,151,58,0.65))' }}>
          <path d="M18 2l2.2 7 6-4-3 6.5 7 2-7 2 3 6.5-6-4L18 25l-2.2-7-6 4 3-6.5-7-2 7-2-3-6.5 6 4Z" fill="#C9973A" opacity="0.55"/>
        </svg>
      </motion.div>

      <motion.div className="absolute" style={{ right: '5%', bottom: '15%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ filter: 'drop-shadow(0 0 7px rgba(201,151,58,0.70))' }}>
          <path d="M20 2l2.5 7.5 6.5-4.5-3.2 7.2 7.7 2.3-7.7 2.3 3.2 7.2-6.5-4.5L20 27l-2.5-7.5-6.5 4.5 3.2-7.2-7.7-2.3 7.7-2.3-3.2-7.2 6.5 4.5Z" fill="#C9973A" opacity="0.62"/>
        </svg>
      </motion.div>

      <motion.div className="absolute" style={{ left: '48%', bottom: '8%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ filter: 'drop-shadow(0 0 5px rgba(201,151,58,0.60))' }}>
          <path d="M14 1l1.8 5.2 4.8-3.2-2.2 5 5.4 1.8-5.4 1.8 2.2 5-4.8-3.2L14 18l-1.8-5.2-4.8 3.2 2.2-5-5.4-1.8 5.4-1.8-2.2-5 4.8 3.2Z" fill="#C9973A" opacity="0.50"/>
        </svg>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.038]">
        <motion.svg width="700" height="700" viewBox="0 0 700 700"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="350" cy="350" r="330" fill="none" stroke="#C9973A" strokeWidth="0.6"/>
          <circle cx="350" cy="350" r="270" fill="none" stroke="#C9973A" strokeWidth="0.5"/>
          <circle cx="350" cy="350" r="200" fill="none" stroke="#C9973A" strokeWidth="0.5"/>
          <circle cx="350" cy="350" r="130" fill="none" stroke="#C9973A" strokeWidth="0.4"/>
          <circle cx="350" cy="350" r="60"  fill="none" stroke="#C9973A" strokeWidth="0.4"/>
          <line x1="350" y1="20"  x2="350" y2="680" stroke="#C9973A" strokeWidth="0.4"/>
          <line x1="20"  y1="350" x2="680" y2="350" stroke="#C9973A" strokeWidth="0.4"/>
          <line x1="117" y1="117" x2="583" y2="583" stroke="#C9973A" strokeWidth="0.35"/>
          <line x1="583" y1="117" x2="117" y2="583" stroke="#C9973A" strokeWidth="0.35"/>
          <line x1="20"  y1="214" x2="680" y2="486" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
          <line x1="20"  y1="486" x2="680" y2="214" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
          <line x1="214" y1="20"  x2="486" y2="680" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
          <line x1="486" y1="20"  x2="214" y2="680" stroke="#C9973A" strokeWidth="0.25" opacity="0.6"/>
        </motion.svg>
      </div>

      <div className="absolute bottom-0 left-0 w-52 opacity-[0.07]">
        <svg viewBox="0 0 210 170" className="w-full">
          <path d="M45,90 Q105,25 165,90 L165,150 L45,150Z" fill="#C9973A"/>
          <path d="M45,90 Q105,35 165,90" fill="none" stroke="#C9973A" strokeWidth="1.2"/>
          <rect x="12" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M12,55 Q19,38 26,55Z" fill="#C9973A"/>
          <circle cx="19" cy="32" r="3.5" fill="#C9973A"/>
          <rect x="184" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M184,55 Q191,38 198,55Z" fill="#C9973A"/>
          <circle cx="191" cy="32" r="3.5" fill="#C9973A"/>
          <path d="M114,36 A11,11 0 1,1 99,25 A7.8,7.8 0 1,0 114,36Z" fill="#C9973A"/>
          <circle cx="118" cy="20" r="3.5" fill="#C9973A"/>
          <rect x="0" y="150" width="210" height="20" fill="#C9973A" opacity="0.3"/>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-44 opacity-[0.06]">
        <svg viewBox="0 0 210 170" className="w-full" style={{ transform: 'scaleX(-1)' }}>
          <path d="M45,90 Q105,25 165,90 L165,150 L45,150Z" fill="#C9973A"/>
          <rect x="12" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M12,55 Q19,38 26,55Z" fill="#C9973A"/>
          <circle cx="19" cy="32" r="3.5" fill="#C9973A"/>
          <rect x="184" y="55" width="14" height="95" fill="#C9973A" rx="2"/>
          <path d="M184,55 Q191,38 198,55Z" fill="#C9973A"/>
          <circle cx="191" cy="32" r="3.5" fill="#C9973A"/>
          <path d="M114,36 A11,11 0 1,1 99,25 A7.8,7.8 0 1,0 114,36Z" fill="#C9973A"/>
          <rect x="0" y="150" width="210" height="20" fill="#C9973A" opacity="0.3"/>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.15]"
        style={{ background: 'linear-gradient(to top, rgba(201,151,58,0.12) 0%, transparent 100%)' }} />
    </div>
  );
}
