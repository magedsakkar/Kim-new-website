export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kim.org.tr';
export const SITE_NAME = 'KİM Vakfı';
export const SITE_NAME_EN = 'KIM Foundation';
export const SITE_DESCRIPTION_TR = 'Kültürlerarası anlayış ve diyalog için köprüler kuruyor, kalpler birleştiriyoruz.';
export const SITE_DESCRIPTION_EN = 'Building bridges and connecting hearts for cross-cultural understanding and dialogue.';

export const CONTACT = {
  email: 'info@crossculturalcenter.org',
  phone: '+90 553 787 18 46',
  address: {
    tr: 'Süleymaniye Mah. Kanuni Medresesi Sk. No:20, Fatih/İstanbul',
    en: 'Süleymaniye Mah. Kanuni Medresesi Sk. No:20, Fatih/Istanbul',
    ar: 'سليمانية مح. شارع مدرسة كانوني رقم 20، الفاتح/إسطنبول',
  },
  googleMapsUrl: 'https://maps.google.com/?q=Kanuni+Medresesi+Sokak+No+20+Fatih+Istanbul+Turkey',
  googleMapsEmbed: 'https://maps.google.com/maps?q=Kanuni+Medresesi+Sokak+No:20+Fatih+Istanbul+Turkey&output=embed&z=17',
  socialMedia: {
    instagram: 'https://instagram.com/kimvakfi',
    facebook: 'https://fb.com/crossculturalc',
    youtube: 'https://www.youtube.com/@kimvakfi',
    tripadvisor: 'https://www.tripadvisor.com/crossculturalc/',
  },
};

export const STATS = [
  { key: 'visitors', value: 4500, suffix: '+' },
  { key: 'volunteers', value: 105, suffix: '+' },
  { key: 'years', value: 15, suffix: '' },
  { key: 'countries', value: 80, suffix: '+' },
];

export const LOCALES = ['tr', 'en', 'ar', 'fr', 'es', 'it', 'pt', 'de', 'ru', 'uk', 'pl', 'sr', 'hr', 'el', 'hu', 'ro', 'sq', 'zh', 'ko', 'ja', 'fa'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  de: 'Deutsch',
  ru: 'Русский',
  uk: 'Українська',
  pl: 'Polski',
  sr: 'Srpski',
  hr: 'Hrvatski',
  el: 'Ελληνικά',
  hu: 'Magyar',
  ro: 'Română',
  sq: 'Shqip',
  zh: '中文',
  ko: '한국어',
  ja: '日本語',
  fa: 'فارسی',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  ar: '🇸🇦',
  fr: '🇫🇷',
  es: '🇪🇸',
  it: '🇮🇹',
  pt: '🇵🇹',
  de: '🇩🇪',
  ru: '🇷🇺',
  uk: '🇺🇦',
  pl: '🇵🇱',
  sr: '🇷🇸',
  hr: '🇭🇷',
  el: '🇬🇷',
  hu: '🇭🇺',
  ro: '🇷🇴',
  sq: '🇦🇱',
  zh: '🇨🇳',
  ko: '🇰🇷',
  ja: '🇯🇵',
  fa: '🇮🇷',
};
