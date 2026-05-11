import { ContactForm } from '@/components/contact/ContactForm';
import { CONTACT } from '@/lib/constants';
import { buildMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'İletişim', en: 'Contact', ar: 'اتصل بنا' };
  const descs = {
    tr: "KİM Vakfı ile iletişime geçin — Süleymaniye, İstanbul. Tur rezervasyonu, gönüllülük veya İslam hakkında sorularınız için bize yazın.",
    en: 'Contact KIM Foundation in Süleymaniye, Istanbul. Reach us for tour bookings, volunteering, or any questions about Islam and our programs.',
    ar: 'تواصل مع مؤسسة كيم في سليمانية، إسطنبول. اكتب لنا لحجز الجولات أو التطوع أو أي أسئلة حول الإسلام وبرامجنا.',
  };
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
  const t = await getTranslations({ locale, namespace: 'contact' });

  const infoCards = [
    {
      key: 'address',
      Icon: IconLocation,
      label: t('address'),
      value: t('addressValue'),
      href: CONTACT.googleMapsUrl,
    },
    {
      key: 'phone',
      Icon: IconPhone,
      label: t('phone'),
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
    },
    {
      key: 'email',
      Icon: IconMail,
      label: t('email'),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
  ];

  const socialLinks = [
    { label: 'Instagram', href: CONTACT.socialMedia.instagram, Icon: IconInstagram },
    { label: 'YouTube', href: CONTACT.socialMedia.youtube, Icon: IconYouTube },
    { label: 'X / Twitter', href: 'https://twitter.com/kimvakfi', Icon: IconTwitterX },
  ];

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
              {t('eyebrow')}
            </span>
          </div>

          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {t('title')}
            </h1>
            <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">{t('subtitle')}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9973A]/50 to-transparent" />
      </section>

      {/* ── Two-column body ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Left column: info cards + map */}
            <div className="space-y-4">
              {/* Info cards */}
              {infoCards.map(({ key, Icon, label, value, href }) => (
                <a
                  key={key}
                  href={href}
                  target={key === 'address' ? '_blank' : undefined}
                  rel={key === 'address' ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-5 p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-white shadow-sm hover:bg-amber-50/30 hover:border-[#C9973A] transition-all duration-300"
                >
                  {/* Icon circle */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#C9973A]/10 border border-[#C9973A]/25 flex items-center justify-center group-hover:bg-[#C9973A]/20 transition-colors duration-300">
                    <span style={{ color: '#C9973A' }}>
                      <Icon />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#C9973A]/70 text-xs font-semibold uppercase tracking-wider mb-1">
                      {label}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed break-words">
                      {value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social row */}
              <div className="p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-white shadow-sm">
                <div className="text-[#C9973A]/70 text-xs font-semibold uppercase tracking-wider mb-4">
                  {t('socialMedia')}
                </div>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-[#C9973A]/30 flex items-center justify-center text-gray-500 hover:text-[#C9973A] hover:border-[#C9973A] hover:bg-amber-50 transition-all duration-300"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-100" style={{ height: '260px' }}>
                <iframe
                  src={CONTACT.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(15%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KİM Vakfı location"
                />
                {/* Bottom links overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 flex items-center justify-between">
                  <a href="/library-map" className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-[#C9973A] transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('allLocations')}
                  </a>
                  <a href={CONTACT.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C9973A]/70 hover:text-[#C9973A] transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('mapsLabel')}
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: contact form */}
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {t('formTitle')}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
