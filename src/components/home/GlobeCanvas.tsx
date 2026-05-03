'use client';

import { useRef, useEffect, useState } from 'react';

// ── KİM locations — Turkey + international ──────────────────────────
const KIM_LOCATIONS = [
  { lat: 41.016,  lng: 28.964,  primary: true, label: 'İSTANBUL' },
  // Istanbul cluster
  { lat: 41.0155, lng: 28.9645 },
  { lat: 41.015,  lng: 28.9655 },
  { lat: 41.0125, lng: 28.9532 },
  { lat: 41.0384, lng: 28.988  },
  { lat: 41.021,  lng: 29.0145 },
  { lat: 41.0348, lng: 28.9378 },
  { lat: 41.0165, lng: 28.9545 },
  { lat: 41.0312, lng: 28.9412 },
  // Turkey cities
  { lat: 41.6783, lng: 26.5597 }, // Edirne
  { lat: 40.1826, lng: 29.0601 }, // Bursa
  { lat: 39.9391, lng: 32.8514 }, // Ankara
  { lat: 38.6431, lng: 34.8278 }, // Nevşehir
  { lat: 37.9495, lng: 27.3655 }, // İzmir
  { lat: 37.874,  lng: 32.4931 }, // Konya
  { lat: 36.888,  lng: 30.7005 }, // Antalya
  { lat: 36.5437, lng: 31.999  }, // Alanya
  // International KİM locations
  { lat: 33.51,  lng: 36.31,  intl: true, label: 'ŞAM'     },
  { lat: 35.18,  lng: 33.36,  intl: true, label: 'LEFKOŞA' },
  { lat: 41.33,  lng: 19.82,  intl: true, label: 'TİRAN'   },
  { lat: 35.68,  lng: 139.69, intl: true, label: 'TOKYO'   },
] as const;

const INTL_CONNECTIONS = KIM_LOCATIONS.filter(
  (l): l is (typeof l) & { intl: true; label: string } =>
    'intl' in l && (l as { intl?: boolean }).intl === true
);

export type Phase = 'idle' | 'aligning' | 'zooming';

export function GlobeCanvas({
  phase,
  onIstanbulPosition,
}: {
  phase: Phase;
  onIstanbulPosition: (x: number, y: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef    = useRef(28.964); // start centered on Istanbul
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
      const dpr  = devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

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
        const projection = (geo as any).geoOrthographic().precision(0.3);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const path = (geo as any).geoPath(projection, ctx);
        geoRef.current = { geo, projection, path, land, borders };
        setGeoStatus('ready');
      } catch {
        setGeoStatus('error');
      }
    })();

    let raf: number;
    let t0 = 0;

    const draw = (t: number) => {
      if (!t0) t0 = t;
      const elapsed = t - t0;
      const ph  = phaseRef.current;
      const dpr = devicePixelRatio || 1;
      const W   = canvas.width;
      const H   = canvas.height;
      const cx  = W / 2;
      const cy  = H / 2;
      const R   = Math.min(W, H) * 0.44;

      // Gentle ±18° drift around Istanbul, no full rotation
      if (ph === 'idle') {
        rotRef.current = 28.964 + Math.sin(elapsed / 12000) * 18;
      } else if (ph === 'aligning') {
        const diff = ((28.964 - rotRef.current + 540) % 360) - 180;
        rotRef.current = (rotRef.current + diff * 0.06) % 360;
      }

      ctx.clearRect(0, 0, W, H);
      const geo = geoRef.current;

      if (geo) {
        // Slight northward tilt so Turkey faces viewer
        geo.projection.scale(R).translate([cx, cy]).rotate([-rotRef.current, -10]);

        ctx.beginPath();
        geo.path({ type: 'Sphere' });
        ctx.fillStyle = '#040A18';
        ctx.fill();

        ctx.beginPath();
        geo.path(geo.land);
        ctx.fillStyle = '#0C1A2E';
        ctx.fill();

        ctx.beginPath();
        geo.path(geo.borders);
        ctx.strokeStyle = 'rgba(201,151,58,0.18)';
        ctx.lineWidth = 0.6 * dpr;
        ctx.stroke();

        ctx.beginPath();
        geo.path({ type: 'Sphere' });
        ctx.strokeStyle = 'rgba(201,151,58,0.35)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();

        // Dashed arcs Istanbul → international locations
        ctx.setLineDash([3 * dpr, 5 * dpr]);
        INTL_CONNECTIONS.forEach(loc => {
          ctx.beginPath();
          geo.path({ type: 'LineString', coordinates: [[28.964, 41.016], [loc.lng, loc.lat]] });
          ctx.strokeStyle = 'rgba(201,151,58,0.22)';
          ctx.lineWidth = 0.8 * dpr;
          ctx.stroke();
        });
        ctx.setLineDash([]);

      } else {
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = '#040A18';
        ctx.fill();
        for (let lng2 = 0; lng2 < 360; lng2 += 30) {
          ctx.beginPath(); let s = false;
          for (let lt = -88; lt <= 88; lt += 2) {
            const phi = (lt * Math.PI) / 180;
            const lam = ((lng2 - rotRef.current) * Math.PI) / 180;
            const v   = Math.cos(phi) * Math.cos(lam) > 0;
            const px  = cx + R * Math.cos(phi) * Math.sin(lam);
            const py  = cy - R * Math.sin(phi);
            if (v) { if (!s) { ctx.moveTo(px, py); s = true; } else ctx.lineTo(px, py); } else s = false;
          }
          ctx.strokeStyle = 'rgba(201,151,58,0.10)'; ctx.lineWidth = 0.5; ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Atmosphere glow
      const atm = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.18);
      atm.addColorStop(0,   'rgba(201,151,58,0)');
      atm.addColorStop(0.5, 'rgba(201,151,58,0.07)');
      atm.addColorStop(1,   'rgba(201,151,58,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // Orthographic projection with tilt
      const ortho = (lat: number, lng: number) => {
        const phi  = (lat * Math.PI) / 180;
        const lam  = ((lng - rotRef.current) * Math.PI) / 180;
        const tilt = (-10 * Math.PI) / 180;
        const x0 = Math.cos(phi) * Math.sin(lam);
        const y0 = -Math.sin(phi);
        const z0 = Math.cos(phi) * Math.cos(lam);
        const yt = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
        const zt = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
        return { x: cx + R * x0, y: cy + R * yt, v: zt > 0 };
      };

      // Turkey cluster dots
      KIM_LOCATIONS.forEach(loc => {
        if ('primary' in loc && loc.primary) return;
        if ('intl' in loc) return;
        const p = ortho(loc.lat, loc.lng);
        if (!p.v) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,151,58,0.55)';
        ctx.fill();
      });

      // International dots + labels
      INTL_CONNECTIONS.forEach(loc => {
        const p = ortho(loc.lat, loc.lng);
        if (!p.v) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,151,58,0.70)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.30)';
        ctx.lineWidth = 0.8 * dpr;
        ctx.stroke();
        ctx.save();
        ctx.font = `bold ${7 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(255,228,154,0.70)';
        ctx.fillText(loc.label, p.x + 7 * dpr, p.y - 3 * dpr);
        ctx.restore();
      });

      // Primary Istanbul dot
      const primary = KIM_LOCATIONS.find(l => 'primary' in l && l.primary)!;
      const ist = ortho(primary.lat, primary.lng);
      if (ist.v) {
        const pulse = 0.5 + 0.5 * Math.sin(elapsed / 700);
        const pr    = (4 + pulse * 8) * dpr;

        ctx.beginPath();
        ctx.arc(ist.x, ist.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,151,58,${(1 - pulse) * 0.55})`;
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 7 * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,151,58,0.28)';
        ctx.lineWidth = 0.8 * dpr;
        ctx.stroke();

        const grd = ctx.createRadialGradient(ist.x, ist.y, 0, ist.x, ist.y, 4.5 * dpr);
        grd.addColorStop(0, '#FFE49A');
        grd.addColorStop(1, '#C9973A');
        ctx.beginPath();
        ctx.arc(ist.x, ist.y, 4.5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        if (ph === 'aligning') {
          const rg = 10 * dpr, rl = 14 * dpr;
          ctx.beginPath();
          ctx.moveTo(ist.x, ist.y - rg); ctx.lineTo(ist.x, ist.y - rg - rl);
          ctx.moveTo(ist.x, ist.y + rg); ctx.lineTo(ist.x, ist.y + rg + rl);
          ctx.moveTo(ist.x - rg, ist.y); ctx.lineTo(ist.x - rg - rl, ist.y);
          ctx.moveTo(ist.x + rg, ist.y); ctx.lineTo(ist.x + rg + rl, ist.y);
          ctx.strokeStyle = 'rgba(201,151,58,0.7)';
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();
        }

        ctx.save();
        ctx.font = `bold ${9 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(255,228,154,0.95)';
        ctx.fillText('İSTANBUL', ist.x + 9 * dpr, ist.y - 3 * dpr);
        ctx.font = `${7 * dpr}px Georgia, serif`;
        ctx.fillStyle = 'rgba(201,151,58,0.5)';
        ctx.fillText("41°N · 28°E", ist.x + 9 * dpr, ist.y + 8 * dpr);
        ctx.restore();

        posRef.current(ist.x / (devicePixelRatio || 1), ist.y / (devicePixelRatio || 1));
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {geoStatus === 'loading' && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-kim-gold/40 text-[9px] font-mono uppercase tracking-widest pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full border border-kim-gold/30 border-t-kim-gold/70 animate-spin" />
          Loading map…
        </div>
      )}
      {geoStatus === 'error' && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-kim-gold/30 text-[9px] font-mono uppercase tracking-widest pointer-events-none">
          Grid mode
        </div>
      )}
    </>
  );
}
