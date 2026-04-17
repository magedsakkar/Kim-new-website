'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { MapPin } from 'lucide-react';
import type { MapLocation } from '@/components/maps/KimMap';

// ── Translations ───────────────────────────────────────────────────────────
const T = {
  tr: {
    badge:       'KİM Vakfı Ağı',
    title:       'KİM Vakfı Küresel Ağı',
    description: "İstanbul'dan Tokyo'ya, Tiran'dan Kıbrıs'a uzanan kütüphane ve kültür merkezlerimizi keşfedin.",
    stats:       { locations: 'Lokasyon', countries: 'Ülke', languages: 'Dil' },
    tabs:        { istanbul: 'İstanbul', turkey: 'Türkiye', world: 'Dünya' },
    listLabel:   'Lokasyonları',
    loading:     'Harita yükleniyor…',
    interior:    'İç Mekan',
    exterior:    'Dış Mekan',
    photoSoon:   'Fotoğraf yakında',
  },
  en: {
    badge:       'KİM Foundation Network',
    title:       'KİM Foundation Global Network',
    description: 'Explore our library and cultural centres from Istanbul to Tokyo, from Tirana to Cyprus.',
    stats:       { locations: 'Locations', countries: 'Countries', languages: 'Languages' },
    tabs:        { istanbul: 'Istanbul', turkey: 'Turkey', world: 'World' },
    listLabel:   'Locations',
    loading:     'Loading map…',
    interior:    'Interior',
    exterior:    'Exterior',
    photoSoon:   'Photo coming soon',
  },
  ar: {
    badge:       'شبكة مؤسسة كيم',
    title:       'الشبكة العالمية لمؤسسة كيم',
    description: 'استكشف مكتباتنا ومراكزنا الثقافية من إسطنبول إلى طوكيو ومن تيرانا إلى قبرص.',
    stats:       { locations: 'موقع', countries: 'دولة', languages: 'لغة' },
    tabs:        { istanbul: 'إسطنبول', turkey: 'تركيا', world: 'العالم' },
    listLabel:   'المواقع',
    loading:     'جارٍ تحميل الخريطة…',
    interior:    'الداخل',
    exterior:    'الخارج',
    photoSoon:   'الصورة قريباً',
  },
} as const;

// ── Location Data ──────────────────────────────────────────────────────────

const ISTANBUL_LOCATIONS: MapLocation[] = [
  { id: 1,  name: 'Süleymaniye Camii',                              city: 'İstanbul', country: 'Türkiye', lat: 41.0160, lng: 28.9639, address: 'Süleymaniye Mah., Fatih/İstanbul' },
  { id: 2,  name: 'Süleymaniye Kültür Merkezi',                    city: 'İstanbul', country: 'Türkiye', lat: 41.0155, lng: 28.9645, address: 'Süleymaniye Mah., Fatih/İstanbul' },
  { id: 3,  name: 'Islamic Experience Center – Şeyhülislam Medresesi', city: 'İstanbul', country: 'Türkiye', lat: 41.0150, lng: 28.9655, address: 'Süleymaniye Mah., Fatih/İstanbul' },
  { id: 4,  name: 'Laleli Camii',                                  city: 'İstanbul', country: 'Türkiye', lat: 41.0125, lng: 28.9532, address: 'Ordu Cd., Fatih/İstanbul' },
  { id: 5,  name: 'Taksim Camii',                                  city: 'İstanbul', country: 'Türkiye', lat: 41.0384, lng: 28.9880, address: 'Taksim Meydanı, Beyoğlu/İstanbul' },
  { id: 6,  name: 'Valide-i Cedid Camii',                         city: 'İstanbul', country: 'Türkiye', lat: 41.0210, lng: 29.0145, address: 'Üsküdar/İstanbul' },
  { id: 7,  name: 'Mihrimah Sultan Camii',                        city: 'İstanbul', country: 'Türkiye', lat: 41.0348, lng: 28.9378, address: 'Edirnekapı, Fatih/İstanbul' },
  { id: 8,  name: 'Şehzade Camii',                                city: 'İstanbul', country: 'Türkiye', lat: 41.0165, lng: 28.9545, address: 'Şehzadebaşı Cd., Fatih/İstanbul' },
  { id: 9,  name: 'Yavuz Sultan Selim Camii',                     city: 'İstanbul', country: 'Türkiye', lat: 41.0312, lng: 28.9412, address: 'Yavuz Selim Mah., Fatih/İstanbul' },
  { id: 10, name: 'Molla Zeyrek Camii',                           city: 'İstanbul', country: 'Türkiye', lat: 41.0195, lng: 28.9510, address: 'Zeyrek Mah., Fatih/İstanbul' },
  { id: 11, name: 'Kariye Camii',                                  city: 'İstanbul', country: 'Türkiye', lat: 41.0298, lng: 28.9355, address: 'Edirnekapı Mah., Fatih/İstanbul' },
  { id: 12, name: 'Sinan Erdebili Tekkesi',                       city: 'İstanbul', country: 'Türkiye', lat: 41.0072, lng: 28.9478, address: 'Koca Mustafapaşa, Fatih/İstanbul' },
  { id: 13, name: 'Kalenderhane Camii',                           city: 'İstanbul', country: 'Türkiye', lat: 41.0152, lng: 28.9580, address: 'Vezneciler, Fatih/İstanbul' },
  { id: 14, name: 'Yeraltı Camii',                                city: 'İstanbul', country: 'Türkiye', lat: 41.0228, lng: 28.9748, address: 'Karaköy, Beyoğlu/İstanbul' },
  { id: 15, name: '18 Sekbanlar Camii',                           city: 'İstanbul', country: 'Türkiye', lat: 41.0055, lng: 28.9390, address: 'Koca Mustafapaşa, Fatih/İstanbul' },
  { id: 16, name: 'Rüstem Paşa Camii',                           city: 'İstanbul', country: 'Türkiye', lat: 41.0159, lng: 28.9601, address: 'Hasırcılar Cd., Eminönü/İstanbul' },
  { id: 17, name: 'Beyazıt Camii',                                city: 'İstanbul', country: 'Türkiye', lat: 41.0107, lng: 28.9654, address: 'Beyazıt Mah., Fatih/İstanbul' },
  { id: 18, name: 'Fatih Camii',                                  city: 'İstanbul', country: 'Türkiye', lat: 41.0198, lng: 28.9500, address: 'Fatih Mah., Fatih/İstanbul' },
];

const TURKEY_ONLY_LOCATIONS: MapLocation[] = [
  { id: 19, name: 'Selimiye Camii',              city: 'Edirne',   country: 'Türkiye', lat: 41.6783, lng: 26.5597, address: 'Mimar Sinan Mah., Edirne' },
  { id: 20, name: 'Bursa Ulu Camii',             city: 'Bursa',    country: 'Türkiye', lat: 40.1826, lng: 29.0601, address: 'Atatürk Cd., Osmangazi/Bursa' },
  { id: 21, name: 'Ahi Şerafettin Camii',        city: 'Ankara',   country: 'Türkiye', lat: 39.9391, lng: 32.8514, address: 'Ulus, Altındağ/Ankara' },
  { id: 22, name: 'Göreme Kasabası Merkez Camii',city: 'Nevşehir', country: 'Türkiye', lat: 38.6431, lng: 34.8278, address: 'Göreme, Nevşehir' },
  { id: 23, name: 'Selçuk İsabey Camii',         city: 'İzmir',    country: 'Türkiye', lat: 37.9495, lng: 27.3655, address: 'Selçuk, İzmir' },
  { id: 24, name: 'Mevlana Türbesi',             city: 'Konya',    country: 'Türkiye', lat: 37.8740, lng: 32.4931, address: 'Aziziye Mah., Meram/Konya' },
  { id: 25, name: 'Sultan Selim Camii',          city: 'Konya',    country: 'Türkiye', lat: 37.8680, lng: 32.4850, address: 'Konya Merkez' },
  { id: 26, name: 'Yivli Minare Camii',          city: 'Antalya',  country: 'Türkiye', lat: 36.8880, lng: 30.7005, address: 'Kaleiçi, Muratpaşa/Antalya' },
  { id: 27, name: 'Tekeli Mehmet Paşa Camii',    city: 'Antalya',  country: 'Türkiye', lat: 36.8872, lng: 30.7025, address: 'Kaleiçi, Muratpaşa/Antalya' },
  { id: 28, name: 'Şehzade Korkut Camii',        city: 'Antalya',  country: 'Türkiye', lat: 36.8865, lng: 30.7040, address: 'Kaleiçi, Muratpaşa/Antalya' },
  { id: 29, name: 'Merkez Külliye Camii',        city: 'Antalya',  country: 'Türkiye', lat: 36.8840, lng: 30.6980, address: 'Muratpaşa/Antalya' },
  { id: 30, name: 'Alanya Süleymaniye Camii',    city: 'Alanya',   country: 'Türkiye', lat: 36.5437, lng: 31.9990, address: 'Alanya, Antalya' },
  { id: 31, name: 'Selimiye Camii',              city: 'Lefkoşa',  country: 'Kıbrıs',  lat: 35.1753, lng: 33.3642, address: 'Lefkoşa, Kıbrıs' },
  { id: 32, name: 'Bilal Ağa Mescidi',           city: 'Lefkoşa',  country: 'Kıbrıs',  lat: 35.1740, lng: 33.3628, address: 'Lefkoşa, Kıbrıs' },
];

const WORLD_ONLY_LOCATIONS: MapLocation[] = [
  { id: 33, name: 'Tokyo Camii',                city: 'Tokyo', country: 'Japonya',     lat: 35.6636, lng: 139.6815, address: 'Yoyogi, Shibuya-ku, Tokyo, Japan' },
  { id: 34, name: 'Namazgah / Tiran Merkez Camii', city: 'Tiran', country: 'Arnavutluk', lat: 41.3275, lng: 19.8187, address: 'Tirana, Albania' },
];

// ── Merged sets for tabs ───────────────────────────────────────────────────
// Turkey tab: Istanbul + Turkey/Cyprus cities (all 32 Turkish-area locations)
const TURKEY_ALL: MapLocation[] = [...ISTANBUL_LOCATIONS, ...TURKEY_ONLY_LOCATIONS];
// World tab: every location (all 34)
const WORLD_ALL: MapLocation[] = [...ISTANBUL_LOCATIONS, ...TURKEY_ONLY_LOCATIONS, ...WORLD_ONLY_LOCATIONS];

// ── Dynamic import ─────────────────────────────────────────────────────────
const KimMap = dynamic(
  () => import('@/components/maps/KimMap').then((m) => m.KimMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-kim-navy-light flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-kim-navy border-t-kim-gold rounded-full animate-spin" />
          <span className="text-kim-stone text-sm">Loading…</span>
        </div>
      </div>
    ),
  }
);

type TabKey = 'istanbul' | 'turkey' | 'world';

// Group locations by city+country
function groupByCity(locations: MapLocation[]) {
  return locations.reduce<Record<string, MapLocation[]>>((acc, loc) => {
    const key = `${loc.city}, ${loc.country}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});
}

export default function LibraryMapPage() {
  const raw    = useLocale();
  const locale = (raw in T ? raw : 'en') as keyof typeof T;
  const t      = T[locale];

  const [activeTab, setActiveTab] = useState<TabKey>('istanbul');

  const TABS: { key: TabKey; label: string; count: number; center: [number, number]; zoom: number; locations: MapLocation[] }[] = [
    {
      key: 'istanbul',
      label: t.tabs.istanbul,
      count: ISTANBUL_LOCATIONS.length,
      center: [41.010, 28.960],
      zoom: 13,
      locations: ISTANBUL_LOCATIONS,
    },
    {
      key: 'turkey',
      label: t.tabs.turkey,
      // All Turkey-area locations including Istanbul
      count: TURKEY_ALL.length,
      center: [39.5, 34.0],
      zoom: 5,
      locations: TURKEY_ALL,
    },
    {
      key: 'world',
      label: t.tabs.world,
      // All 34 locations worldwide
      count: WORLD_ALL.length,
      center: [30, 60],
      zoom: 2,
      locations: WORLD_ALL,
    },
  ];

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const grouped    = groupByCity(currentTab.locations);

  const drawerLabels = {
    interior:  t.interior,
    exterior:  t.exterior,
    photoSoon: t.photoSoon,
    loading:   t.loading,
  };

  return (
    <div className="pt-16 min-h-screen bg-kim-cream" dir={locale === 'ar' ? 'rtl' : 'ltr'}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-kim-navy-dark py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,151,58,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-[0.25em]">
              {t.badge}
            </span>
            <span className="h-px w-10 bg-kim-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {t.title}
          </h1>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: '34', label: t.stats.locations },
              { value: '3',  label: t.stats.countries },
              { value: '25+',label: t.stats.languages },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-kim-gold">{stat.value}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map Section ───────────────────────────────────────── */}
      <section className="bg-white shadow-sm">
        {/* Tab bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 pt-5 border-b border-kim-navy/10 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 sm:px-5 py-3 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-kim-gold text-kim-navy bg-kim-gold/5'
                    : 'border-transparent text-kim-stone hover:text-kim-navy hover:bg-kim-navy-light/50'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 px-1.5 py-0.5 text-xs rounded-full font-bold ${
                    activeTab === tab.key
                      ? 'bg-kim-gold text-white'
                      : 'bg-kim-navy-light text-kim-stone'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Map — taller on desktop, usable on mobile */}
        <div className="h-[50vh] sm:h-[60vh] min-h-[320px] sm:min-h-[420px] relative">
          <KimMap
            key={activeTab}
            locations={currentTab.locations}
            center={currentTab.center}
            zoom={currentTab.zoom}
            drawerLabels={drawerLabels}
          />
        </div>
      </section>

      {/* ── Location list ─────────────────────────────────────── */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="h-px w-8 bg-kim-gold" />
          <h2 className="font-serif text-xl md:text-2xl font-bold text-kim-charcoal">
            {currentTab.label} — {t.listLabel}
          </h2>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([cityCountry, locs]) => (
            <div key={cityCountry}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-kim-stone mb-4">
                {cityCountry}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {locs.map((loc) => (
                  <div
                    key={loc.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-kim-navy/8 hover:shadow-md hover:border-kim-gold/30 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Number badge — matches the map marker */}
                      <div className="w-8 h-8 shrink-0 bg-kim-gold rounded-full flex items-center justify-center text-kim-navy text-xs font-bold">
                        {loc.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-kim-charcoal text-sm leading-snug group-hover:text-kim-navy transition-colors">
                          {loc.name}
                        </div>
                        <div className="flex items-center gap-1 mt-1.5 text-kim-stone text-xs">
                          <MapPin className="w-3 h-3 shrink-0 text-kim-gold" />
                          <span className="truncate">{loc.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
