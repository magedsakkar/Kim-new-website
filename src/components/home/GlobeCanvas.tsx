'use client';

import { useRef, useEffect, useState } from 'react';

const KIM_LOCATIONS = [
  { lat: 41.016,  lng: 28.964,  primary: true, label: 'İSTANBUL' },
  { lat: 41.0155, lng: 28.9645 },
  { lat: 41.015,  lng: 28.9655 },
  { lat: 41.0125, lng: 28.9532 },
  { lat: 41.0384, lng: 28.988  },
  { lat: 41.021,  lng: 29.0145 },
  { lat: 41.0348, lng: 28.9378 },
  { lat: 41.0165, lng: 28.9545 },
  { lat: 41.0312, lng: 28.9412 },
  { lat: 41.0195, lng: 28.951  },
  { lat: 41.0298, lng: 28.9355 },
  { lat: 41.0072, lng: 28.9478 },
  { lat: 41.0152, lng: 28.958  },
  { lat: 41.0228, lng: 28.9748 },
  { lat: 41.0055, lng: 28.939  },
  { lat: 41.6783, lng: 26.5597 },
  { lat: 40.1826, lng: 29.0601 },
  { lat: 39.9391, lng: 32.8514 },
  { lat: 38.6431, lng: 34.8278 },
  { lat: 37.9495, lng: 27.3655 },
  { lat: 37.874,  lng: 32.4931 },
  { lat: 36.888,  lng: 30.7005 },
  { lat: 36.5437, lng: 31.999  },
  { lat: 37.9144, lng: 40.2306 },
  { lat: 37.1591, lng: 38.7969 },
] as const;

export type Phase = 'idle' | 'aligning' | 'zooming';

export function GlobeCanvas({
  phase,
  onIstanbulPosition,
}: {
  phase: Phase;
  onIstanbulPosition: (x: number, y: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef    = useRef(0);
  const phaseRef  = useRef(phase);
  const posRef    = useRef(onIstanbulPosition);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoRef    = useRef<any>(null);
  const [geoStatus, setGeoStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => { phaseRef.current = phase; },              [phase]);
  useEffect(() => { posRef.current   = onIstanbulPosition; }, [onIstanbulPosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = devicePixelRatio || 1;
      canvas.width  = innerWidth  * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width  = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    (async () => {
      try {
        const [geo, topo, world] = await Promise.all([
          import('d3-geo'),
          import('topojson-client'),
          fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r => r.json()),
        ]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const land    = (topo as any).feature(world, world.objects.land);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const borders = (topo as any).mesh(world, world.objects.countries, (a: unknown, b: unknown) => a !== b);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const projection = (geo as any).geoOrthographic().precision(0.4);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const path = (geo as any).geoPath(projection, ctx);
        geoRef.current = { projection, path, land, borders };
        setGeoStatus('ready');
      } catch {
        setGeoStatus('error');
      }
    })();

    let raf: number;

    const draw = (t: number) => {
      const ph  = phaseRef.current;
      const dpr = devicePixelRatio || 1;
      const W   = canvas.width;
      const H   = canvas.height;
      const cx  = W / 2;
      const cy  = H / 2;
      const R   = Math.min(W, H) * 0.36;

      if (ph === 'idle') {
        rotRef.current = (rotRef.current + 0.09) % 360;
      } else if (ph === 'aligning') {
        const diff = ((28.964 - rotRef.current + 540) % 360) - 180;
        rotRef.current = (rotRef.current + diff * 0.055) % 360;
      }

      ctx.clearRect(0, 0, W, H);
      const geo = geoRef.current;

      if (geo) {
        geo.projection.scale(R).translate([cx, cy]).rotate([-rotRef.current, 0]);

        ctx.beginPath();
        geo.path({ type: 'Sphere' });
        ctx.fillStyle = '#060D1C';
        ctx.fill();

        ctx.beginPath();
        geo.path(geo.land);
        ctx.fillStyle = '#0E1E34';
        ctx.fill();

        ctx.beginPath();
        geo.path(geo.borders);
        ctx.strokeStyle = 'rgba(201,151,58,0.14)';
        ctx.lineWidth = 0.55 * dpr;
        ctx.stroke();

        ctx.beginPath();
        geo.path({ type: 'Sphere' });
        ctx.strokeStyle = 'rgba(201,151,58,0.32)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = '#04060F';
        ctx.fill();

        const proj0 = (lat: number, lng: number) => {
          const phi = (lat * Math.PI) / 180;
          const lam = ((lng - rotRef.current) * Math.PI) / 180;
          return { x: cx + R * Math.cos(phi) * Math.sin(lam),
                   y: cy - R * Math.sin(phi),
                   v: Math.cos(phi) * Math.cos(lam) > 0 };
        };
        for (let lng2 = 0; lng2 < 360; lng2 += 30) {
          ctx.beginPath(); let s = false;
          for (let lt = -88; lt <= 88; lt += 2) {
            const p2 = proj0(lt, lng2);
            if (p2.v) { if (!s) { ctx.moveTo(p2.x, p2.y); s = true; } else ctx.lineTo(p2.x, p2.y); } else { s = false; }
          }
          ctx.strokeStyle = 'rgba(201,151,58,0.12)'; ctx.lineWidth = 0.6; ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      {
        const g = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.2);
        g.addColorStop(0,    'rgba(201,151,58,0)');
        g.addColorStop(0.55, 'rgba(201,151,58,0.05)');
        g.addColorStop(1,    'rgba(201,151,58,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      const ortho = (lat: number, lng: number) => {
        const phi = (lat * Math.PI) / 180;
        const lam = ((lng - rotRef.current) * Math.PI) / 180;
        return { x: cx + R * Math.cos(phi) * Math.sin(lam),
                 y: cy - R * Math.sin(phi),
                 v: Math.cos(phi) * Math.cos(lam) > 0 };
      };

      KIM_LOCATIONS.forEach(loc => {
        if ('primary' in loc && loc.primary) return;
        const p = ortho(loc.lat, loc.lng);
        if (!p.v) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,151,58,0.6)';
        ctx.fill();
      });

      const primary = KIM_LOCATIONS.find(l => 'primary' in l && l.primary)!;
      const ist = ortho(primary.lat, primary.lng);
      if (ist.v) {
        const pulse = 0.5 + 0.5 * Math.sin(t / 650);
        const pr    = (5 + pulse * 9) * dpr;

        ctx.beginPath();
        ctx.arc(ist.x, ist.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,151,58,${(1 - pulse) * 0.5})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 8 * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.3)';
        ctx.lineWidth = 0.9 * dpr;
        ctx.stroke();

        const grd = ctx.createRadialGradient(ist.x, ist.y, 0, ist.x, ist.y, 5 * dpr);
        grd.addColorStop(0, '#FFE49A');
        grd.addColorStop(1, '#C9973A');
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        if (ph === 'aligning') {
          const rl = 16 * dpr, rg = 11 * dpr, cb = 9 * dpr, cg2 = 22 * dpr;
          ctx.beginPath();
          ctx.moveTo(ist.x, ist.y - rg); ctx.lineTo(ist.x, ist.y - rg - rl);
          ctx.moveTo(ist.x, ist.y + rg); ctx.lineTo(ist.x, ist.y + rg + rl);
          ctx.moveTo(ist.x - rg, ist.y); ctx.lineTo(ist.x - rg - rl, ist.y);
          ctx.moveTo(ist.x + rg, ist.y); ctx.lineTo(ist.x + rg + rl, ist.y);
          ctx.strokeStyle = 'rgba(201,151,58,0.7)'; ctx.lineWidth = 1.5 * dpr; ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ist.x - cg2, ist.y - cg2 + cb); ctx.lineTo(ist.x - cg2, ist.y - cg2); ctx.lineTo(ist.x - cg2 + cb, ist.y - cg2);
          ctx.moveTo(ist.x + cg2 - cb, ist.y - cg2); ctx.lineTo(ist.x + cg2, ist.y - cg2); ctx.lineTo(ist.x + cg2, ist.y - cg2 + cb);
          ctx.moveTo(ist.x + cg2, ist.y + cg2 - cb); ctx.lineTo(ist.x + cg2, ist.y + cg2); ctx.lineTo(ist.x + cg2 - cb, ist.y + cg2);
          ctx.moveTo(ist.x - cg2 + cb, ist.y + cg2); ctx.lineTo(ist.x - cg2, ist.y + cg2); ctx.lineTo(ist.x - cg2, ist.y + cg2 - cb);
          ctx.strokeStyle = 'rgba(201,151,58,0.5)'; ctx.lineWidth = 1.5 * dpr; ctx.stroke();
        }

        ctx.save();
        ctx.font = `bold ${10 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(255,228,154,0.92)';
        ctx.fillText('İSTANBUL', ist.x + 9 * dpr, ist.y - 4 * dpr);
        ctx.font = `${8 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(201,151,58,0.55)';
        ctx.fillText("41°00'N  28°58'E", ist.x + 9 * dpr, ist.y + 9 * dpr);
        ctx.restore();

        posRef.current(ist.x / dpr, ist.y / dpr);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {geoStatus === 'loading' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-kim-gold/50 text-[10px] font-mono uppercase tracking-widest pointer-events-none">
          <div className="w-3 h-3 rounded-full border border-kim-gold/30 border-t-kim-gold/80 animate-spin" />
          Loading map…
        </div>
      )}
      {geoStatus === 'error' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-kim-gold/35 text-[10px] font-mono uppercase tracking-widest pointer-events-none">
          Grid mode
        </div>
      )}
    </>
  );
}
