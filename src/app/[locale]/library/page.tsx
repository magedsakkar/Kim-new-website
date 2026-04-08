'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { libraryResources } from '@/data/library';
import { Link } from '@/lib/i18n/navigation';
import {
  Search, Book, FileText, Play, LayoutGrid, BookOpen,
  Star, Bookmark, Heart, Leaf, Award, Globe, Mail,
  ArrowUpRight, X, List, SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';

const TYPES = ['all', 'book', 'brochure', 'video'] as const;

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  all:          { tr: 'Tüm Konular',           en: 'All Topics',           ar: 'جميع الموضوعات' },
  quran:        { tr: 'Kuran',                 en: 'Quran',                ar: 'القرآن' },
  belief:       { tr: 'İnanç ve Teoloji',      en: 'Belief & Theology',    ar: 'العقيدة' },
  seerah:       { tr: 'Peygamberin Hayatı',    en: "Prophet's Life",       ar: 'سيرة النبي' },
  worship:      { tr: 'İbadet ve Namaz',       en: 'Worship & Prayer',     ar: 'العبادة' },
  'new-muslim': { tr: 'Yeni Müslümanlar',      en: 'New Muslims',          ar: 'المسلمون الجدد' },
  ethics:       { tr: 'Ahlak ve Karakter',     en: 'Ethics & Character',   ar: 'الأخلاق' },
  comparative:  { tr: 'Karşılaştırmalı Din',   en: 'Comparative Religion', ar: 'الأديان المقارنة' },
};

const CATEGORIES = [
  { id: 'all' },
  { id: 'quran' },
  { id: 'belief' },
  { id: 'seerah' },
  { id: 'worship' },
  { id: 'new-muslim' },
  { id: 'ethics' },
  { id: 'comparative' },
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  all:          LayoutGrid,
  quran:        BookOpen,
  belief:       Star,
  seerah:       Bookmark,
  worship:      Heart,
  'new-muslim': Leaf,
  ethics:       Award,
  comparative:  Globe,
};

const LANGUAGE_KEYS = ['All', 'English', 'Turkish', 'Arabic', 'Multi'] as const;
const LANGUAGE_LABELS: Record<string, Record<string, string>> = {
  All:     { tr: 'Tümü',       en: 'All',     ar: 'الكل' },
  English: { tr: 'İngilizce',  en: 'English', ar: 'الإنجليزية' },
  Turkish: { tr: 'Türkçe',     en: 'Turkish', ar: 'التركية' },
  Arabic:  { tr: 'Arapça',     en: 'Arabic',  ar: 'العربية' },
  Multi:   { tr: 'Çok Dilli',  en: 'Multi',   ar: 'متعدد اللغات' },
};

const TYPE_ICONS: Record<string, LucideIcon> = {
  all: LayoutGrid, book: Book, brochure: FileText, video: Play,
};

const TYPE_GRADIENTS: Record<string, string> = {
  book:     'from-kim-navy to-kim-navy-dark',
  brochure: 'from-kim-olive to-[#6B5800]',
  video:    'from-kim-teal to-kim-teal-dark',
};

const TYPE_LABELS: Record<string, Record<string, string>> = {
  book:     { tr: 'Kitap',  en: 'Book',     ar: 'كتاب' },
  brochure: { tr: 'Broşür', en: 'Brochure', ar: 'كتيّب' },
  video:    { tr: 'Video',  en: 'Video',    ar: 'فيديو' },
};

const LABELS = {
  tr: {
    eyebrow: 'Dijital Kitaplık', title: 'Kaynaklar & Yayınlar',
    sub: 'İslam, kültür ve diyalog üzerine kapsamlı kaynak koleksiyonumuz. Ücretsiz erişim.',
    search: 'Kaynak ara...', all: 'Tümü', book: 'Kitaplar', brochure: 'Broşürler', video: 'Videolar',
    download: 'İndir / Eriş', suggest: 'Kaynak Öner', noResults: 'Sonuç bulunamadı',
    filterFormat: 'Format', filterTopic: 'Konu', filterLang: 'Dil', clearFilters: 'Filtreleri temizle',
    languages: 'Dil', resources: 'kaynak',
    suggestDesc: 'Kütüphanemizde bulunmasını istediğiniz bir kaynak biliyor musunuz? Bize bildirin.',
    contactUs: 'Bize ulaşın', helpGrow: 'Büyümemize Yardım Edin',
    improveLib: 'Kütüphanemizi Geliştirin',
    improveDesc: 'Eklememiz gereken değerli bir İslami kitap, video veya kaynak biliyor musunuz? Kütüphanemizi genişletmemize yardımcı olun.',
    browseAll: 'Tüm Kaynaklara Göz At',
  },
  en: {
    eyebrow: 'Digital Library', title: 'Resources & Publications',
    sub: 'Our comprehensive resource collection on Islam, culture, and dialogue. Free access.',
    search: 'Search resources...', all: 'All', book: 'Books', brochure: 'Brochures', video: 'Videos',
    download: 'Access', suggest: 'Suggest a Resource', noResults: 'No results found',
    filterFormat: 'Format', filterTopic: 'Topic', filterLang: 'Language', clearFilters: 'Clear filters',
    languages: 'Languages', resources: 'resources',
    suggestDesc: "Know a great Islamic resource we're missing? Let us know.",
    contactUs: 'Contact us', helpGrow: 'Help Us Grow',
    improveLib: 'Improve Our Library',
    improveDesc: 'Know a valuable Islamic book, video, or resource we should add? Help us expand our library to serve more people worldwide.',
    browseAll: 'Browse All Resources',
  },
  ar: {
    eyebrow: 'المكتبة الرقمية', title: 'الموارد والمنشورات',
    sub: 'مجموعتنا الشاملة من الموارد حول الإسلام والثقافة والحوار. وصول مجاني.',
    search: 'ابحث عن موارد...', all: 'الكل', book: 'كتب', brochure: 'كتيبات', video: 'فيديوهات',
    download: 'وصول', suggest: 'اقترح مصدرًا', noResults: 'لا توجد نتائج',
    filterFormat: 'الصيغة', filterTopic: 'الموضوع', filterLang: 'اللغة', clearFilters: 'مسح الفلاتر',
    languages: 'اللغات', resources: 'مصدر',
    suggestDesc: 'هل تعرف مصدرًا إسلاميًا رائعًا مفقودًا لدينا؟ أخبرنا.',
    contactUs: 'تواصل معنا', helpGrow: 'ساعدنا في النمو',
    improveLib: 'حسّن مكتبتنا',
    improveDesc: 'هل تعرف كتابًا إسلاميًا أو فيديو أو مصدرًا قيمًا يجب إضافته؟ ساعدنا في توسيع مكتبتنا.',
    browseAll: 'تصفح جميع الموارد',
  },
};

const DOT_TEXTURE = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

export default function LibraryPage() {
  const locale = useLocale() as 'tr' | 'en' | 'ar';
  const lb = LABELS[locale] || LABELS.en;

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'book' | 'brochure' | 'video'>('all');
  const [catFilter, setCatFilter] = useState('all');
  const [langFilter, setLangFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = libraryResources.filter((r) => {
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    const matchSearch = !search.trim() ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === 'All' || r.language === langFilter || (langFilter === 'Multi' && r.language.includes('/'));
    return matchType && matchSearch && matchLang;
  });

  const hasActiveFilters = typeFilter !== 'all' || catFilter !== 'all' || langFilter !== 'All' || search.trim() !== '';
  const clearAll = () => { setSearch(''); setTypeFilter('all'); setCatFilter('all'); setLangFilter('All'); };

  return (
    <div className="pt-20 min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-kim-navy to-kim-navy-dark py-20">
        <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-kim-gold" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-10 bg-blue-400" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{lb.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">{lb.title}</h1>
          <p className="text-white/60 text-lg max-w-xl mb-8">{lb.sub}</p>

          {/* Search */}
          <div className="relative max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-kim-gold transition-colors" strokeWidth={2} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lb.search}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-kim-gold/40 focus:border-kim-gold/40 focus:bg-white/15 text-sm transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10">
            {[
              { n: libraryResources.filter(r => r.type === 'book').length + '+',     l: lb.book,      Icon: Book },
              { n: libraryResources.filter(r => r.type === 'brochure').length + '+', l: lb.brochure,  Icon: FileText },
              { n: libraryResources.filter(r => r.type === 'video').length + '+',    l: lb.video,     Icon: Play },
              { n: '12',                                                              l: lb.languages, Icon: Globe },
            ].map(s => (
              <div key={s.l} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <s.Icon className="w-4 h-4 text-kim-gold" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white leading-none">{s.n}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ───────────────────────────────────── */}
      <section className="py-10 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kim-navy text-white text-sm font-medium shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
              {lb.filterFormat}
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-kim-gold" />}
            </button>
            {hasActiveFilters && (
              <button onClick={clearAll} className="text-xs text-kim-stone hover:text-red-500 transition-colors flex items-center gap-1">
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                {lb.clearFilters}
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-7">

            {/* ── Sidebar ────────────────────────────────── */}
            <aside className={`lg:w-56 shrink-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 space-y-6">

                {/* Format */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kim-stone/60 mb-2.5">{lb.filterFormat}</p>
                  <div className="space-y-1">
                    {TYPES.map((type) => {
                      const Icon = TYPE_ICONS[type];
                      const isActive = typeFilter === type;
                      const count = type === 'all' ? libraryResources.length : libraryResources.filter(r => r.type === type).length;
                      return (
                        <button
                          key={type}
                          onClick={() => setTypeFilter(type)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                            isActive
                              ? 'bg-kim-navy text-white shadow-sm'
                              : 'text-kim-stone hover:bg-white hover:text-kim-charcoal hover:shadow-sm'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-kim-gold' : ''}`} strokeWidth={isActive ? 2 : 1.8} />
                          <span className="flex-1">{type === 'all' ? lb.all : lb[type as keyof typeof lb] as string}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-kim-stone'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kim-stone/60 mb-2.5">{lb.filterTopic}</p>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = CATEGORY_ICONS[cat.id] || LayoutGrid;
                      const isActive = catFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setCatFilter(cat.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                            isActive
                              ? 'bg-kim-olive text-white shadow-sm'
                              : 'text-kim-stone hover:bg-white hover:text-kim-charcoal hover:shadow-sm'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2 : 1.8} />
                          <span className="flex-1 truncate">{(CATEGORY_LABELS[cat.id] || {})[locale] || cat.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kim-stone/60 mb-2.5">{lb.filterLang}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {LANGUAGE_KEYS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLangFilter(lang)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          langFilter === lang
                            ? 'bg-kim-navy text-white shadow-sm'
                            : 'bg-white border border-gray-100 text-kim-stone hover:bg-kim-navy-light hover:text-kim-navy'
                        }`}
                      >
                        {(LANGUAGE_LABELS[lang] || {})[locale] || lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear all */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-kim-stone hover:text-red-500 border border-dashed border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                    {lb.clearFilters}
                  </button>
                )}

                {/* Suggest card */}
                <div className="relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 p-4">
                  <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
                  <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full blur-2xl opacity-30 bg-kim-gold" />
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-kim-gold/20 border border-kim-gold/25 flex items-center justify-center mb-3">
                      <Mail className="w-4 h-4 text-kim-gold" strokeWidth={1.8} />
                    </div>
                    <p className="text-xs font-semibold text-white mb-1.5">{lb.suggest}</p>
                    <p className="text-[11px] text-white/40 leading-relaxed mb-3">{lb.suggestDesc}</p>
                    <Link href="/contact" className="inline-flex items-center gap-1 text-kim-gold text-xs font-bold hover:gap-1.5 transition-all">
                      {lb.contactUs}
                      <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Resource area ──────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-kim-stone">
                  <span className="font-bold text-kim-charcoal text-base tabular-nums">{filtered.length}</span>
                  <span className="ml-1">{lb.resources}</span>
                </p>
                <div className="flex items-center gap-1 bg-white rounded-xl p-1 ring-1 ring-gray-100 shadow-sm">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-kim-navy text-white shadow-sm' : 'text-kim-stone hover:text-kim-charcoal'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-kim-navy text-white shadow-sm' : 'text-kim-stone hover:text-kim-charcoal'}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-kim-navy ring-1 ring-white/10 text-center py-20 px-8"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-7 h-7 text-white/25" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold text-white mb-1">{lb.noResults}</p>
                    <button onClick={clearAll} className="mt-2 text-sm text-kim-gold hover:underline">
                      {lb.clearFilters}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${typeFilter}-${catFilter}-${langFilter}-${search}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={view === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                      : 'space-y-3'
                    }
                  >
                    {filtered.map((resource, i) => {
                      const TypeIcon = TYPE_ICONS[resource.type] || Book;
                      const typeLabel = TYPE_LABELS[resource.type]?.[locale] || resource.type;
                      const gradient = TYPE_GRADIENTS[resource.type] || 'from-kim-navy to-kim-navy-dark';

                      if (view === 'grid') {
                        return (
                          <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-kim-navy/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                          >
                            {/* Gradient top */}
                            <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} px-5 pt-5 pb-7`}>
                              <div className="absolute inset-0 opacity-[0.05]" style={DOT_TEXTURE} />
                              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 bg-white" />
                              <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold to-transparent" />
                              <div className="relative z-10 flex items-start justify-between">
                                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/22 transition-all duration-300">
                                  <TypeIcon className="w-5 h-5 text-white" strokeWidth={1.8} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/15 border border-white/20 rounded-full px-2.5 py-1 text-white/80">
                                  {typeLabel}
                                </span>
                              </div>
                            </div>

                            {/* Body */}
                            <div className="p-5 flex flex-col flex-1">
                              <h3 className="font-serif font-bold text-kim-charcoal text-base leading-snug mb-2 group-hover:text-kim-navy transition-colors">
                                {resource.title}
                              </h3>
                              <p className="text-sm text-kim-stone leading-relaxed flex-1 mb-4">
                                {resource.description}
                              </p>
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-[10px] font-medium bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-kim-stone">
                                  {resource.language}
                                </span>
                                <a
                                  href={resource.url}
                                  className="inline-flex items-center gap-1.5 text-kim-navy text-xs font-bold uppercase tracking-wider hover:gap-2.5 transition-all"
                                >
                                  {lb.download}
                                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        );
                      }

                      // List view
                      return (
                        <motion.div
                          key={resource.id}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: Math.min(i * 0.04, 0.25) }}
                          className="group flex items-center gap-4 rounded-xl bg-white ring-1 ring-gray-100 hover:ring-kim-navy/20 hover:shadow-md px-4 py-3.5 transition-all duration-200"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${gradient}`}>
                            <TypeIcon className="w-5 h-5 text-white" strokeWidth={1.8} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-semibold text-kim-charcoal text-sm group-hover:text-kim-navy transition-colors truncate">
                                {resource.title}
                              </h3>
                              <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-kim-stone">
                                {resource.language}
                              </span>
                            </div>
                            <p className="text-xs text-kim-stone line-clamp-1">{resource.description}</p>
                          </div>
                          <a
                            href={resource.url}
                            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kim-navy-light text-kim-navy text-xs font-bold hover:bg-kim-navy hover:text-white transition-all duration-200"
                          >
                            <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                            {lb.download}
                          </a>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kim-navy to-kim-navy-dark p-8 md:p-10">
            <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
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
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-kim-gold text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" strokeWidth={2} />
                  {lb.suggest}
                </Link>
                <Link
                  href="/what-is-islam"
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
