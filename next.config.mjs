import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'kimvakfi.org.tr' },
      { protocol: 'https', hostname: 'crossculturalcenter.org' },
      { protocol: 'https', hostname: 'panel.crossculturalcenter.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Scripts: self + Google Tag Manager / Analytics + Next.js inline scripts
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      // Styles: self + inline (Tailwind, Framer Motion inject inline styles)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs + external hosts used in the app
      "img-src 'self' data: blob: https://www.google-analytics.com https://images.unsplash.com https://kimvakfi.org.tr https://panel.crossculturalcenter.org",
      // Iframes: self + YouTube (embedded videos) + Google Maps
      "frame-src 'self' https://www.youtube.com https://maps.google.com https://www.google.com",
      // Fetch/XHR: self + GA + Resend (email API)
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.resend.com",
      // Media
      "media-src 'self'",
      // Workers (Next.js uses service workers in some configs)
      "worker-src 'self' blob:",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'X-DNS-Prefetch-Control',     value: 'on' },
          { key: 'Content-Security-Policy',    value: csp },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
