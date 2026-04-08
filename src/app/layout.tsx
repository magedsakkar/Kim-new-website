import { headers } from 'next/headers';

// Root layout — required by Next.js 16 to own <html> and <body>
// Reads locale from the header set by next-intl middleware to apply lang/dir server-side
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  // next-intl middleware sets x-next-intl-locale on every matched request
  const locale = headersList.get('x-next-intl-locale') ?? 'tr';
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="bg-kim-cream font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
