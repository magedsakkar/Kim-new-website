'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { libraryResources } from '@/data/library';
import type { Resource } from '@/types';
import { Link } from '@/lib/i18n/navigation';
import {
  Search, Book, FileText, Play, LayoutGrid, BookOpen,
  Star, Bookmark, Heart, Leaf, Award, Globe, Mail,
  X, List, SlidersHorizontal, Download, Eye,
  ChevronDown, Languages, type LucideIcon,
} from 'lucide-react';

// ── Filter constants ───────────────────────────────────────────────────────

const TYPES = ['all', 'book', 'brochure', 'video'] as const;

const LANGUAGE_OPTIONS = [
  'All', 'English', 'Turkish', 'Arabic', 'German', 'French', 'Russian', 'Spanish', 'Indonesian', 'Multi',
] as const;

const CATEGORIES = ['all', 'quran', 'belief', 'seerah', 'worship', 'new-muslim', 'ethics', 'comparative'] as const;

// ── Translations ───────────────────────────────────────────────────────────

const L = {
  tr: {
    eyebrow: 'Dijital Kitaplık', title: 'Kaynaklar ve Yayınlar',
    sub: 'İslam, kültür ve diyalog üzerine kapsamlı kaynak koleksiyonumuz. Ücretsiz erişim.',
    search: 'Kaynak ara...', noResults: 'Sonuç bulunamadı',
    clearFilters: 'Filtreleri temizle', format: 'Format', topic: 'Konu', lang: 'Dil',
    preview: 'Önizle', download: 'İndir', all: 'Tümü',
    books: 'Kitap', brochures: 'Broşür', videos: 'Video', languages: 'Dil',
    pages: 'sayfa', of: '/', resources: 'kaynak',
    suggest: 'Kaynak Öner', suggestDesc: 'Kütüphanemizde bulunmasını istediğiniz bir kaynak biliyor musunuz?',
    contactUs: 'Bize ulaşın', helpGrow: 'Büyümemize Yardım Edin',
    improveLib: 'Kütüphanemizi Geliştirin',
    improveDesc: 'Eklememiz gereken değerli bir kaynak biliyor musunuz? Kütüphanemizi genişletmemize yardımcı olun.',
    browseAll: 'Tüm Kaynaklara Göz At',
    previewTitle: 'Önizleme', closePreview: 'Kapat', openExternal: 'Yeni sekmede aç',
    availIn: 'Mevcut diller',
    categories: {
      all: 'Tüm Konular', quran: 'Kuran', belief: 'İnanç & Teoloji',
      seerah: 'Peygamberin Hayatı', worship: 'İbadet & Namaz',
      'new-muslim': 'Yeni Müslümanlar', ethics: 'Ahlak & Karakter',
      comparative: 'Karşılaştırmalı Din',
    },
    langLabels: {
      All: 'Tümü', English: 'İngilizce', Turkish: 'Türkçe', Arabic: 'Arapça',
      German: 'Almanca', French: 'Fransızca', Russian: 'Rusça',
      Spanish: 'İspanyolca', Indonesian: 'Endonezce', Multi: 'Çok Dilli',
    },
  },
  en: {
    eyebrow: 'Digital Library', title: 'Resources & Publications',
    sub: 'Our comprehensive resource collection on Islam, culture, and dialogue. Free access.',
    search: 'Search resources...', noResults: 'No results found',
    clearFilters: 'Clear filters', format: 'Format', topic: 'Topic', lang: 'Language',
    preview: 'Preview', download: 'Download', all: 'All',
    books: 'Books', brochures: 'Brochures', videos: 'Videos', languages: 'Languages',
    pages: 'pages', of: 'of', resources: 'resources',
    suggest: 'Suggest a Resource', suggestDesc: "Know a great Islamic resource we're missing? Let us know.",
    contactUs: 'Contact us', helpGrow: 'Help Us Grow',
    improveLib: 'Improve Our Library',
    improveDesc: 'Know a valuable book, video, or resource we should add? Help us expand our library.',
    browseAll: 'Browse All Resources',
    previewTitle: 'Preview', closePreview: 'Close', openExternal: 'Open in new tab',
    availIn: 'Available in',
    categories: {
      all: 'All Topics', quran: 'Quran', belief: 'Belief & Theology',
      seerah: "Prophet's Life", worship: 'Worship & Prayer',
      'new-muslim': 'New Muslims', ethics: 'Ethics & Character',
      comparative: 'Comparative Religion',
    },
    langLabels: {
      All: 'All', English: 'English', Turkish: 'Turkish', Arabic: 'Arabic',
      German: 'German', French: 'French', Russian: 'Russian',
      Spanish: 'Spanish', Indonesian: 'Indonesian', Multi: 'Multi-language',
    },
  },
  ar: {
    eyebrow: 'المكتبة الرقمية', title: 'الموارد والمنشورات',
    sub: 'مجموعتنا الشاملة من الموارد حول الإسلام والثقافة والحوار. وصول مجاني.',
    search: 'ابحث عن موارد...', noResults: 'لا توجد نتائج',
    clearFilters: 'مسح الفلاتر', format: 'الصيغة', topic: 'الموضوع', lang: 'اللغة',
    preview: 'معاينة', download: 'تحميل', all: 'الكل',
    books: 'كتب', brochures: 'كتيبات', videos: 'فيديوهات', languages: 'لغات',
    pages: 'صفحة', of: 'من', resources: 'مصدر',
    suggest: 'اقترح مصدرًا', suggestDesc: 'هل تعرف مصدرًا إسلاميًا رائعًا مفقودًا لدينا؟',
    contactUs: 'تواصل معنا', helpGrow: 'ساعدنا في النمو',
    improveLib: 'حسّن مكتبتنا',
    improveDesc: 'هل تعرف كتابًا أو فيديو أو مصدرًا قيمًا يجب إضافته؟ ساعدنا في توسيع مكتبتنا.',
    browseAll: 'تصفح جميع الموارد',
    previewTitle: 'معاينة', closePreview: 'إغلاق', openExternal: 'فتح في تبويب جديد',
    availIn: 'متاح بـ',
    categories: {
      all: 'جميع الموضوعات', quran: 'القرآن', belief: 'العقيدة',
      seerah: 'سيرة النبي', worship: 'العبادة',
      'new-muslim': 'المسلمون الجدد', ethics: 'الأخلاق',
      comparative: 'الأديان المقارنة',
    },
    langLabels: {
      All: 'الكل', English: 'الإنجليزية', Turkish: 'التركية', Arabic: 'العربية',
      German: 'الألمانية', French: 'الفرنسية', Russian: 'الروسية',
      Spanish: 'الإسبانية', Indonesian: 'الإندونيسية', Multi: 'متعدد اللغات',
    },
  },
};

// ── Icons ──────────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, LucideIcon> = { all: LayoutGrid, book: Book, brochure: FileText, video: Play };
const CAT_ICONS: Record<string, LucideIcon> = {
  all: LayoutGrid, quran: BookOpen, belief: Star, seerah: Bookmark,
  worship: Heart, 'new-muslim': Leaf, ethics: Award, comparative: Globe,
};
const TYPE_GRADIENT: Record<string, string> = {
  book: 'from-kim-navy to-kim-navy-dark',
  brochure: 'from-[#6B5800] to-kim-olive',
  video: 'from-kim-teal to-[#064045]',
};
const DOT_BG = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function langFlag(lang: string) {
  const flags: Record<string, string> = {
    English: '🇬🇧', Turkish: '🇹🇷', Arabic: '🇸🇦', German: '🇩🇪',
    French: '🇫🇷', Russian: '🇷🇺', Spanish: '🇪🇸', Indonesian: '🇮🇩', Multi: '🌐',
  };
  return flags[lang] ?? '📄';
}

// ── PDF Preview Modal ──────────────────────────────────────────────────────

function PreviewModal({ resource, lb, onClose }: {
  resource: Resource;
  lb: typeof L['en'];
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Use Google Docs Viewer for better cross-browser PDF preview
  const isPlaceholder = resource.url === '#' || !resource.url;
  const viewerUrl = isPlaceholder
    ? null
    : resource.url.startsWith('http')
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(resource.url)}&embedded=true`
    : resource.url;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === overlayRef.current && onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          className="relative z-10 bg-kim-navy rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10 flex-shrink-0">
            <div className="min-w-0 flex-1">
              <p className="text-kim-gold text-[9px] font-bold uppercase tracking-[0.25em] mb-1">{lb.previewTitle}</p>
              <h3 className="font-serif font-bold text-white text-base leading-snug line-clamp-2">{resource.title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/70">
                  {langFlag(resource.language)} {resource.language}
                </span>
                {resource.pages && (
                  <span className="text-[10px] text-white/40">{resource.pages} {lb.pages}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isPlaceholder && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/18 text-white text-xs font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lb.openExternal}</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 min-h-0 bg-[#030810]">
            {isPlaceholder ? (
              <div className="flex flex-col items-center justify-center h-full py-20 px-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white/25" />
                </div>
                <p className="text-white/50 font-semibold mb-2">PDF not yet linked</p>
                <p className="text-white/28 text-sm max-w-sm leading-relaxed">
                  This book is in our archive. Add the PDF URL from the book archive panel to enable preview.
                </p>
              </div>
            ) : (
              <iframe
                src={viewerUrl ?? resource.url}
                className="w-full h-full"
                style={{ minHeight: '500px' }}
                title={resource.title}
                allowFullScreen
              />
            )}
          </div>

          {/* Footer — download button */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
            <p className="text-white/35 text-xs line-clamp-1 hidden sm:block">{resource.description}</p>
            {isPlaceholder ? (
              <span className="text-white/30 text-xs italic">PDF link pending</span>
            ) : (
              <a
                href={resource.url}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-kim-gold text-white text-sm font-semibold hover:bg-amber-500 transition-colors shadow-md shadow-kim-gold/25 flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                {lb.download}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Resource Card (Grid) ───────────────────────────────────────────────────

function ResourceCard({ resource, lb, onPreview, i }: {
  resource: Resource;
  lb: typeof L['en'];
  onPreview: (r: Resource) => void;
  i: number;
}) {
  const TypeIcon = TYPE_ICONS[resource.type] ?? Book;
  const gradient = TYPE_GRADIENT[resource.type] ?? 'from-kim-navy to-kim-navy-dark';
  const isPlaceholder = resource.url === '#' || !resource.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-kim-navy/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Gradient top band */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} px-5 pt-5 pb-7`}>
        <div className="absolute inset-0 opacity-[0.05]" style={DOT_BG} />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 bg-white" />
        <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold to-transparent" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/22 transition-all duration-300">
            <TypeIcon className="w-5 h-5 text-white" strokeWidth={1.8} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/15 border border-white/20 rounded-full px-2.5 py-1 text-white/80">
              {resource.type}
            </span>
            {resource.pages && (
              <span className="text-[9px] text-white/50">{resource.pages} {lb.pages}</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-kim-charcoal text-base leading-snug mb-2 group-hover:text-kim-navy transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-sm text-kim-stone leading-relaxed flex-1 mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Languages available */}
        {resource.languages && resource.languages.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <Languages className="w-3 h-3 text-kim-stone/50 flex-shrink-0" />
            {resource.languages.map((l) => (
              <span key={l} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-kim-stone/70">
                {l}
              </span>
            ))}
          </div>
        )}

        {/* Footer: language tag + action buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
          <span className="text-[10px] font-medium bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-kim-stone flex items-center gap-1">
            {langFlag(resource.language)} {resource.language}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Preview */}
            <button
              onClick={() => onPreview(resource)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-navy-light text-kim-navy text-[10px] font-semibold hover:bg-kim-navy hover:text-white transition-all duration-200"
            >
              <Eye className="w-3 h-3" strokeWidth={2} />
              {lb.preview}
            </button>

            {/* Download */}
            {isPlaceholder ? (
              <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-gray-300 text-[10px] font-semibold cursor-not-allowed">
                <Download className="w-3 h-3" />
                {lb.download}
              </span>
            ) : (
              <a
                href={resource.url}
                download
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-gold text-white text-[10px] font-semibold hover:bg-amber-500 transition-all duration-200 shadow-sm shadow-kim-gold/20"
              >
                <Download className="w-3 h-3" strokeWidth={2} />
                {lb.download}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Resource Row (List view) ───────────────────────────────────────────────

function ResourceRow({ resource, lb, onPreview, i }: {
  resource: Resource;
  lb: typeof L['en'];
  onPreview: (r: Resource) => void;
  i: number;
}) {
  const TypeIcon = TYPE_ICONS[resource.type] ?? Book;
  const gradient = TYPE_GRADIENT[resource.type] ?? 'from-kim-navy to-kim-navy-dark';
  const isPlaceholder = resource.url === '#' || !resource.url;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.25) }}
      className="group flex items-center gap-3 sm:gap-4 rounded-xl bg-white ring-1 ring-gray-100 hover:ring-kim-navy/20 hover:shadow-md px-3 sm:px-4 py-3 transition-all duration-200"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${gradient}`}>
        <TypeIcon className="w-5 h-5 text-white" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <h3 className="font-semibold text-kim-charcoal text-sm group-hover:text-kim-navy transition-colors truncate">
            {resource.title}
          </h3>
          <span className="shrink-0 text-[9px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-kim-stone">
            {langFlag(resource.language)} {resource.language}
          </span>
        </div>
        <p className="text-xs text-kim-stone line-clamp-1">{resource.description}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onPreview(resource)}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-navy-light text-kim-navy text-xs font-bold hover:bg-kim-navy hover:text-white transition-all"
        >
          <Eye className="w-3 h-3" />
          {lb.preview}
        </button>
        {isPlaceholder ? (
          <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-300 text-xs font-bold cursor-not-allowed">
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">{lb.download}</span>
          </span>
        ) : (
          <a
            href={resource.url}
            download
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-kim-gold text-white text-xs font-bold hover:bg-amber-500 transition-all shadow-sm"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">{lb.download}</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const locale = useLocale() as 'tr' | 'en' | 'ar';
  const lb = L[locale] ?? L.en;
  const isRTL = locale === 'ar';

  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>('all');
  const [catFilter, setCatFilter]   = useState<string>('all');
  const [langFilter, setLangFilter] = useState<string>('All');
  const [view, setView]             = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);

  const filtered = libraryResources.filter((r) => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (catFilter !== 'all' && r.category !== catFilter) return false;
    if (langFilter !== 'All') {
      if (langFilter === 'Multi') {
        if (!r.languages || r.languages.length < 2) return false;
      } else {
        const match = r.language === langFilter || r.languages?.includes(langFilter);
        if (!match) return false;
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!r.title.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const hasFilters = typeFilter !== 'all' || catFilter !== 'all' || langFilter !== 'All' || search.trim() !== '';
  const clearAll = () => { setSearch(''); setTypeFilter('all'); setCatFilter('all'); setLangFilter('All'); };

  const stats = [
    { n: libraryResources.filter(r => r.type === 'book').length,     l: lb.books,     I: Book },
    { n: libraryResources.filter(r => r.type === 'brochure').length, l: lb.brochures, I: FileText },
    { n: libraryResources.filter(r => r.type === 'video').length,    l: lb.videos,    I: Play },
    { n: LANGUAGE_OPTIONS.length - 2, l: lb.languages, I: Globe }, // -2 for All + Multi
  ];

  return (
    <div className="pt-20 min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* PDF Preview Modal */}
      {previewResource && (
        <PreviewModal
          resource={previewResource}
          lb={lb}
          onClose={() => setPreviewResource(null)}
        />
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
                      const Icon = CAT_ICONS[cat] ?? LayoutGrid;
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
                {/* Desktop view toggle */}
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
                    {filtered.map((r, i) =>
                      view === 'grid' ? (
                        <ResourceCard key={r.id} resource={r} lb={lb} onPreview={setPreviewResource} i={i} />
                      ) : (
                        <ResourceRow key={r.id} resource={r} lb={lb} onPreview={setPreviewResource} i={i} />
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
