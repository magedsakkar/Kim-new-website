import { ContactForm } from '@/components/contact/ContactForm';
import { CONTACT } from '@/lib/constants';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'İletişim', en: 'Contact', ar: 'اتصل بنا' };
  const descs = { tr: 'Bize ulaşın', en: 'Get in touch', ar: 'تواصل معنا' };
  return buildMetadata({
    locale,
    slug: 'contact',
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descs[locale as keyof typeof descs] || descs.tr,
  });
}

// ── SVG icons ──────────────────────────────────────────────────────────────

function IconLocation() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: { eyebrow: 'İletişim', title: 'Bize Ulaşın', sub: 'Sorularınız için bizimle iletişime geçin.' },
    en: { eyebrow: 'Contact', title: 'Get in Touch', sub: 'Contact us for any questions or inquiries.' },
    ar: { eyebrow: 'اتصل بنا', title: 'تواصل معنا', sub: 'اتصل بنا لأي أسئلة أو استفسارات.' },
  };
  const h = headings[l] ?? headings.tr;

  const infoCards = [
    {
      key: 'address',
      Icon: IconLocation,
      labels: { tr: 'Adres', en: 'Address', ar: 'العنوان' },
      value: { tr: CONTACT.address.tr, en: CONTACT.address.en, ar: CONTACT.address.ar },
      href: CONTACT.googleMapsUrl,
    },
    {
      key: 'phone',
      Icon: IconPhone,
      labels: { tr: 'Telefon', en: 'Phone', ar: 'الهاتف' },
      value: { tr: CONTACT.phone, en: CONTACT.phone, ar: CONTACT.phone },
      href: `tel:${CONTACT.phone}`,
    },
    {
      key: 'email',
      Icon: IconMail,
      labels: { tr: 'E-posta', en: 'Email', ar: 'البريد الإلكتروني' },
      value: { tr: CONTACT.email, en: CONTACT.email, ar: CONTACT.email },
      href: `mailto:${CONTACT.email}`,
    },
  ];

  const socialLinks = [
    { label: 'Instagram', href: CONTACT.socialMedia.instagram, Icon: IconInstagram },
    { label: 'YouTube', href: CONTACT.socialMedia.youtube, Icon: IconYouTube },
    { label: 'X / Twitter', href: 'https://twitter.com/kimvakfi', Icon: IconTwitterX },
  ];

  const formTitle = { tr: 'Bize Mesaj Gönderin', en: 'Send Us a Message', ar: 'أرسل لنا رسالة' };
  const mapsLabel = { tr: "Google Maps'te aç", en: 'Open in Google Maps', ar: 'عرض على خرائط جوجل' };

  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <section className="relative bg-[#08101E] overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <svg width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="contact-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1" fill="#C9973A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-dots)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(13,92,99,0.2),transparent)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          {/* Coordinates badge — explorer's map style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A] animate-pulse inline-block" />
              41°02′N · 28°58′E
            </span>
            <span className="hidden sm:block text-white/20 text-xs">—</span>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest">
              {h.eyebrow}
            </span>
          </div>

          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {h.title}
            </h1>
            <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">{h.sub}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9973A]/50 to-transparent" />
      </section>

      {/* ── Two-column body ── */}
      <section className="bg-[#08101E] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Left column: info cards + map */}
            <div className="space-y-4">
              {/* Info cards */}
              {infoCards.map(({ key, Icon, labels, value, href }) => (
                <a
                  key={key}
                  href={href}
                  target={key === 'address' ? '_blank' : undefined}
                  rel={key === 'address' ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-5 p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-[#0D1728] hover:bg-[#0D1E35] hover:border-[#C9973A] transition-all duration-300"
                >
                  {/* Icon circle */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#C9973A]/10 border border-[#C9973A]/25 flex items-center justify-center group-hover:bg-[#C9973A]/20 transition-colors duration-300">
                    <span style={{ color: '#C9973A' }}>
                      <Icon />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#C9973A]/70 text-xs font-semibold uppercase tracking-wider mb-1">
                      {labels[l]}
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed break-words">
                      {value[l]}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social row */}
              <div className="p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-[#0D1728]">
                <div className="text-[#C9973A]/70 text-xs font-semibold uppercase tracking-wider mb-4">
                  {l === 'ar' ? 'وسائل التواصل الاجتماعي' : l === 'en' ? 'Social Media' : 'Sosyal Medya'}
                </div>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-[#C9973A]/30 flex items-center justify-center text-white/60 hover:text-[#C9973A] hover:border-[#C9973A] hover:bg-[#C9973A]/10 transition-all duration-300"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A1422]" style={{ height: '220px' }}>
                {/* Dark map-like background */}
                <div className="absolute inset-0">
                  {/* Grid lines mimicking a map grid */}
                  <svg width="100%" height="100%" aria-hidden="true" className="absolute inset-0">
                    <defs>
                      <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9973A" strokeWidth="0.3" opacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)" />
                    {/* Meridian/parallel accent lines */}
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#C9973A" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 8" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C9973A" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 8" />
                  </svg>
                </div>

                {/* Subtle radial glow at centre */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(13,92,99,0.25),transparent)] pointer-events-none" />

                {/* Concentric circles (sonar pulse) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {[60, 90, 120].map((r) => (
                    <div
                      key={r}
                      className="absolute rounded-full border border-[#C9973A]/15"
                      style={{
                        width: r,
                        height: r,
                        top: -r / 2,
                        left: -r / 2,
                      }}
                    />
                  ))}
                </div>

                {/* Centre marker */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C9973A]/20 border border-[#C9973A]/50 flex items-center justify-center">
                    <span style={{ color: '#C9973A' }}>
                      <IconMapPin />
                    </span>
                  </div>
                  <span className="font-serif text-sm font-semibold text-white/80">
                    Süleymaniye · İstanbul
                  </span>
                  <span className="text-white/35 text-xs font-mono">41°01′N 28°57′E</span>
                </div>

                {/* Open in Maps link */}
                <a
                  href={CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 text-xs text-[#C9973A]/60 hover:text-[#C9973A] transition-colors duration-200"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {mapsLabel[l]}
                </a>
              </div>
            </div>

            {/* Right column: contact form */}
            <div className="rounded-3xl border border-white/[0.06] bg-[#0D1728] p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">
                {formTitle[l]}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
