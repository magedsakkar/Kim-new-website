import {
  Book, FileText, Play, LayoutGrid, BookOpen,
  Star, Bookmark, Heart, Leaf, Award, Globe,
  type LucideIcon,
} from 'lucide-react';

export const TYPES = ['all', 'book', 'brochure', 'video'] as const;

export const LANGUAGE_OPTIONS = [
  'All', 'English', 'Turkish', 'Arabic', 'German', 'French', 'Russian', 'Spanish', 'Indonesian', 'Multi',
] as const;

export const CATEGORIES = ['all', 'quran', 'belief', 'seerah', 'worship', 'new-muslim', 'ethics', 'comparative'] as const;

export const L = {
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
    availIn: 'Mevcut diller', loadMore: 'Daha fazla yükle',
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
    availIn: 'Available in', loadMore: 'Load more',
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
    availIn: 'متاح بـ', loadMore: 'تحميل المزيد',
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

export type LocaleStrings = typeof L['en'];

export const TYPE_ICONS: Record<string, LucideIcon> = {
  all: LayoutGrid, book: Book, brochure: FileText, video: Play,
};

export const CAT_ICONS: Record<string, LucideIcon> = {
  all: LayoutGrid, quran: BookOpen, belief: Star, seerah: Bookmark,
  worship: Heart, 'new-muslim': Leaf, ethics: Award, comparative: Globe,
};

export const TYPE_GRADIENT: Record<string, string> = {
  book:     'from-kim-navy to-kim-navy-dark',
  brochure: 'from-[#6B5800] to-kim-olive',
  video:    'from-kim-teal to-[#064045]',
};

export const DOT_BG = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

export function langFlag(lang: string): string {
  const flags: Record<string, string> = {
    English: '🇬🇧', Turkish: '🇹🇷', Arabic: '🇸🇦', German: '🇩🇪',
    French: '🇫🇷', Russian: '🇷🇺', Spanish: '🇪🇸', Indonesian: '🇮🇩', Multi: '🌐',
  };
  return flags[lang] ?? '📄';
}
