'use client';

import { useEffect, useRef, useState } from 'react';
import { X, MapPin, Camera } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

export interface MapLocation {
  id: number;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  address: string;
}

interface KimMapProps {
  locations: MapLocation[];
  center: [number, number];
  zoom: number;
  drawerLabels?: {
    interior: string;
    exterior: string;
    photoSoon: string;
    loading: string;
  };
}

export function KimMap({ locations, center, zoom, drawerLabels }: KimMapProps) {
  const mapRef     = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<import('leaflet').Map | null>(null);
  const [selected, setSelected]   = useState<MapLocation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const labels = {
    interior: drawerLabels?.interior  ?? 'Interior',
    exterior: drawerLabels?.exterior  ?? 'Exterior',
    photoSoon: drawerLabels?.photoSoon ?? 'Photo coming soon',
    loading:  drawerLabels?.loading   ?? 'Loading map…',
  };

  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;

    let L: typeof import('leaflet');
    let map: import('leaflet').Map;

    const init = async () => {
      L = (await import('leaflet')).default;

      // Fix webpack icon path issue
      // @ts-expect-error — leaflet internal
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      map = L.map(mapRef.current!, {
        center,
        zoom,
        zoomControl: false,
        attributionControl: true,
      });

      leafletRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      // Add markers — use loc.id so number matches the location list card
      locations.forEach((loc) => {
        const icon = L.divIcon({
          html: `<div style="
            width:32px;height:32px;
            background:#C9973A;border:2.5px solid #1C2562;border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            font-size:11px;font-weight:700;color:#1C2562;
            font-family:system-ui,sans-serif;
            box-shadow:0 2px 8px rgba(28,37,98,0.35);cursor:pointer;
          ">${loc.id}</div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon });

        marker.bindTooltip(
          `<div style="font-family:system-ui,sans-serif;padding:4px 2px;">
            <div style="font-weight:700;color:#1C2562;font-size:13px;">${loc.name}</div>
            <div style="color:#8C8277;font-size:11px;margin-top:2px;">${loc.city} · ${loc.country}</div>
          </div>`,
          { direction: 'top', offset: [0, -14], className: 'kim-tooltip' }
        );

        marker.on('click', () => {
          setSelected(loc);
          setDrawerOpen(true);
        });

        marker.addTo(map);
      });

      // Auto-fit to show ALL markers — works for any tab (Turkey, World, etc.)
      if (locations.length > 0) {
        const bounds = L.latLngBounds(
          locations.map((l) => [l.lat, l.lng] as [number, number])
        );
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      }
    };

    init();

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <div className="relative w-full h-full">
      <style>{`
        .kim-tooltip { background:white; border:1px solid #1C2562; border-radius:8px; padding:6px 10px; box-shadow:0 4px 16px rgba(28,37,98,0.15); }
        .kim-tooltip::before { border-top-color:#1C2562 !important; }
        .leaflet-attribution-flag { display:none !important; }
      `}</style>

      {/* Map */}
      <div ref={mapRef} className="w-full h-full rounded-b-2xl" />

      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => leafletRef.current?.zoomIn()}
          className="w-9 h-9 bg-white border border-kim-navy/20 rounded-lg shadow-md flex items-center justify-center text-kim-navy font-bold text-lg hover:bg-kim-navy hover:text-white transition-colors"
          aria-label="Zoom in"
        >+</button>
        <button
          onClick={() => leafletRef.current?.zoomOut()}
          className="w-9 h-9 bg-white border border-kim-navy/20 rounded-lg shadow-md flex items-center justify-center text-kim-navy font-bold text-lg hover:bg-kim-navy hover:text-white transition-colors"
          aria-label="Zoom out"
        >−</button>
      </div>

      {/* Mobile overlay behind drawer */}
      {selected && (
        <div
          className={`absolute inset-0 z-[1000] bg-black/40 sm:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeDrawer}
        />
      )}

      {/* Side Drawer — full-width on mobile, fixed 320 on sm+ */}
      {selected && (
        <div
          className={`absolute top-0 right-0 bottom-0 z-[1001] w-full sm:w-80 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="bg-kim-navy p-5 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-serif text-lg font-bold text-white leading-snug">
                {selected.name}
              </h3>
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-kim-gold/20 border border-kim-gold/40 rounded-full text-kim-gold text-xs font-semibold">
                {selected.city} · {selected.country}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors mt-0.5"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div className="flex items-start gap-2.5 text-kim-stone text-sm">
              <MapPin className="w-4 h-4 shrink-0 text-kim-gold mt-0.5" />
              <span>{selected.address}</span>
            </div>

            <div className="space-y-3">
              {[labels.interior, labels.exterior].map((label) => (
                <div
                  key={label}
                  className="w-full h-36 bg-kim-navy-light rounded-xl flex flex-col items-center justify-center gap-2 border border-kim-navy/10"
                >
                  <Camera className="w-7 h-7 text-kim-stone/50" />
                  <div className="text-center">
                    <div className="text-xs font-semibold text-kim-stone/60 uppercase tracking-widest">{label}</div>
                    <div className="text-xs text-kim-stone/40 mt-0.5">{labels.photoSoon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
