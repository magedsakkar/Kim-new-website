export function safeLocale<T extends Record<string, unknown>>(
  locale: string,
  translations: T,
  fallback: keyof T = 'en' as keyof T,
): keyof T {
  return (locale in translations ? locale : fallback) as keyof T;
}
