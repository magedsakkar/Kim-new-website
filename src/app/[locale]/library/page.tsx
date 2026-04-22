'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { libraryResources } from '@/data/library';
import type { Resource } from '@/types';
import { Link } from '@/lib/i18n/navigation';
import {
  Search, LayoutGrid, Mail, X, List, SlidersHorizontal,
  Globe, ChevronDown,
} from 'lucide-react';
import {
  L, TYPES, LANGUAGE_OPTIONS, CATEGORIES,
  TYPE_ICONS, CAT_ICONS, DOT_BG, langFlag,
} from '@/components/library/constants';
import { PreviewModal }  from '@/components/library/PreviewModal';
import { ResourceCard }  from '@/components/library/ResourceCard';
import { ResourceRow }   from '@/components/library/ResourceRow';

const PAGE_SIZE = 12;

export default function LibraryPage() {
  const locale = useLocale() as 'tr' | 'en' | 'ar';
  const lb     = L[locale] ?? L.en;
  const isRTL  = locale === 'ar';

  const [search,      setSearch]      = useState('');
  const [typeFilter,  setTypeFilter]  = useState<(typeof TYPES)[number]>('all');
  const [catFilter,   setCatFilter]   = useState<string>('all');
  const [langFilter,  setLangFilter]  = useState<string>('All');
  const [view,        setView]        = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page,        setPage]        = useState(1);
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);

  // Reset to page 1 whenever filters change
  useEffect(() => setPage(1), [typeFilter, catFilter, langFilter, search]);

  const filtered = libraryResources.filter((r) => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (catFilter  !== 'all' && r.category !== catFilter) return false;
    if (langFilter !== 'All') {
      if (langFilter === 'Multi') {
        if (!r.languages || r.languages.length < 2) return false;
      } else {
        if (r.language !== langFilter && !r.languages?.includes(langFilter)) return false;
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!r.title.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore   = filtered.length > page * PAGE_SIZE;
  const hasFilters = typeFilter !== 'all' || catFilter !== 'all' || langFilter !== 'All' || search.trim() !== '';
  const clearAll   = () => { setSearch(''); setTypeFilter('all'); setCatFilter('all'); setLangFilter('All'); };

  const stats = [
    { n: libraryResources.filter(r => r.type === 'book').length,     l: lb.books,     I: TYPE_ICONS.book },
    { n: libraryResources.filter(r => r.type === 'brochure').length, l: lb.brochures, I: TYPE_ICONS.brochure },
    { n: libraryResources.filter(r => r.type === 'video').length,    l: lb.videos,    I: TYPE_ICONS.video },
    { n: LANGUAGE_OPTIONS.length - 2,                                l: lb.languages, I: Globe },
  ];

  return (
    <div className="pt-20 min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>

      {previewResource && (
        <PreviewModal resource={previewResource} lb={lb} onClose={() => setPreviewResource(null)} />
      )}

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-kim-navy to-kim-navy-dark py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.04]" style={DOT_BG} />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-kim-gold" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-10 bg-blue-400" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{lb.eyebrow}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">{lb.title}</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mb-8">{lb.sub}</p>

          {/* Search bar */}
          <div className="relative max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-kim-gold transition-colors pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lb.search}
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-kim-gold/40 focus:border-kim-gold/40 focus:bg-white/15 text-sm transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10">
            {stats.map(s => (
              <div key={s.l} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <s.I className="w-4 h-4 text-kim-gold" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white leading-none">{s.n}+</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + Content ─────────────────────────────────── */}
      <section className="py-8 sm:py-10 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile filter button */}
          <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kim-navy text-white text-sm font-medium shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {lb.format}
              {hasFilters && <span className="w-2 h-2 rounded-full bg-kim-gold" />}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex items-center gap-1.5">
              {hasFilters && (
                <button onClick={clearAll} className="text-xs text-kim-stone hover:text-red-500 transition-colors flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> {lb.clearFilters}
                </button>
              )}
              <div className="flex items-center gap-1 bg-white rounded-xl p-1 ring-1 ring-gray-100 shadow-sm">
                <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-kim-navy text-white' : 'text-kim-stone'}`} aria-label="Grid">
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-kim-navy text-white' : 'text-kim-stone'}`} aria-label="List">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-7">

            {/* ── Sidebar ─────────────────────────────── */}
            <aside className={`lg:w-56 shrink-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 space-y-5">

                {/* Format */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kim-stone/60 mb-2.5">{lb.format}</p>
                  <div className="space-y-1">
                    {TYPES.map((t) => {
                      const Icon = TYPE_ICONS[t];
                      const n = t === 'all' ? libraryResources.length : libraryResources.filter(r => r.type === t).length;
                      return (
                        <button key={t} onClick={() => setTypeFilter(t)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${typeFilter === t ? 'bg-kim-navy text-white shadow-sm' : 'text-kim-stone hover:bg-white hover:shadow-sm'}`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${typeFilter === t ? 'text-kim-gold' : ''}`} strokeWidth={typeFilter === t ? 2 : 1.8} />
                          <span className="flex-1">{t === 'all' ? lb.all : t === 'book' ? lb.books : t === 'brochure' ? lb.brochures : lb.videos}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${typeFilter === t ? 'bg-white/20 text-white' : 'bg-gray-100 text-kim-stone'}`}>{n}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kim-stone/60 mb-2.5">{lb.topic}</p>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = CAT_ICONS[cat] ?? CAT_ICONS.all;
                      return (
                        <button key={cat} onClick={() => setCatFilter(cat)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${catFilter === cat ? 'bg-kim-olive text-white shadow-sm' : 'text-kim-stone hover:bg-white hover:shadow-sm'}`}
                        >
                          <Icon className="w-4 h-4 shrink-0" strokeWidth={catFilter === cat ? 2 : 1.8} />
                          <span className="flex-1 truncate">{(lb.categories as Record<string, string>)[cat] ?? cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kim-stone/60 mb-2.5">{lb.lang}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <button key={lang} onClick={() => setLangFilter(lang)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${langFilter === lang ? 'bg-kim-navy text-white shadow-sm' : 'bg-white border border-gray-100 text-kim-stone hover:bg-kim-navy-light hover:text-kim-navy'}`}
                      >
                        {langFlag(lang)} {(lb.langLabels as Record<string, string>)[lang] ?? lang}
                      </button>
                    ))}
                  </div>
                </div>

                {hasFilters && (
                  <button onClick={clearAll}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-kim-stone hover:text-red-500 border border-dashed border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />{lb.clearFilters}
                  </button>
                )}

                {/* Suggest card */}
                <div className="relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 p-4">
                  <div className="absolute inset-0 opacity-[0.04]" style={DOT_BG} />
                  <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full blur-2xl opacity-30 bg-kim-gold" />
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-kim-gold/20 border border-kim-gold/25 flex items-center justify-center mb-3">
                      <Mail className="w-4 h-4 text-kim-gold" />
                    </div>
                    <p className="text-xs font-semibold text-white mb-1.5">{lb.suggest}</p>
                    <p className="text-[11px] text-white/40 leading-relaxed mb-3">{lb.suggestDesc}</p>
                    <Link href="/contact" className="inline-flex items-center gap-1 text-kim-gold text-xs font-bold hover:gap-1.5 transition-all">
                      {lb.contactUs} →
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Resource grid / list ──────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Topbar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-kim-stone">
                  <span className="font-bold text-kim-charcoal text-base tabular-nums">{filtered.length}</span>
                  <span className="ml-1">{lb.resources}</span>
                </p>
                <div className="hidden lg:flex items-center gap-1 bg-white rounded-xl p-1 ring-1 ring-gray-100 shadow-sm">
                  <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-kim-navy text-white' : 'text-kim-stone hover:text-kim-charcoal'}`} aria-label="Grid view">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-kim-navy text-white' : 'text-kim-stone hover:text-kim-charcoal'}`} aria-label="List view">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="rounded-2xl bg-kim-navy ring-1 ring-white/10 text-center py-20 px-8"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-7 h-7 text-white/25" />
                    </div>
                    <p className="font-semibold text-white mb-2">{lb.noResults}</p>
                    <button onClick={clearAll} className="text-sm text-kim-gold hover:underline">{lb.clearFilters}</button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${typeFilter}-${catFilter}-${langFilter}-${search}-${view}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-3'}
                  >
                    {paginated.map((r, i) =>
                      view === 'grid' ? (
                        <ResourceCard key={r.id} resource={r} lb={lb} onPreview={setPreviewResource} i={i} />
                      ) : (
                        <ResourceRow key={r.id} resource={r} lb={lb} onPreview={setPreviewResource} i={i} />
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Load more */}
              {hasMore && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    className="px-8 py-3 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-sm shadow-sm"
                  >
                    {lb.loadMore} ({filtered.length - paginated.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark p-8 md:p-10">
            <div className="absolute inset-0 opacity-[0.04]" style={DOT_BG} />
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 bg-kim-gold" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-6 bg-kim-gold" />
                  <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{lb.helpGrow}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">{lb.improveLib}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{lb.improveDesc}</p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-kim-gold text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm shadow-lg shadow-kim-gold/25"
                >
                  <Mail className="w-4 h-4" /> {lb.suggest}
                </Link>
                <Link href="/what-is-islam"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  {lb.browseAll}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
