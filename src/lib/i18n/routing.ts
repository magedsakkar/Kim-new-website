import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en', 'ar', 'fr', 'es', 'it', 'pt', 'de', 'ru', 'uk', 'pl', 'sr', 'hr', 'el', 'hu', 'ro', 'sq', 'zh', 'ko', 'ja', 'fa'],
  defaultLocale: 'tr',
  localePrefix: 'always',
});
