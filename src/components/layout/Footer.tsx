import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { CONTACT } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const contact = useTranslations('contact');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kim-navy-dark text-white">
      {/* Gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-kim-gold/50 to-transparent" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/images/logo_kim_aklamasz-removebg-preview.png"
                alt="KİM Vakfı"
                width={52}
                height={52}
                className="object-contain"
              />
              <div>
                <div className="text-xl font-bold font-serif text-white leading-tight">KİM Vakfı</div>
                <div className="text-kim-gold text-[10px] font-semibold uppercase tracking-[0.2em]">Cross Cultural Center</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {[
                {
                  name: 'Instagram',
                  href: CONTACT.socialMedia.instagram,
                  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                },
                {
                  name: 'Facebook',
                  href: CONTACT.socialMedia.facebook,
                  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
                {
                  name: 'YouTube',
                  href: CONTACT.socialMedia.youtube,
                  path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                },
                {
                  name: 'TripAdvisor',
                  href: CONTACT.socialMedia.tripadvisor,
                  path: 'M23.544 10.634l.456-.481H20.16C18.112 8.694 15.168 7.68 12 7.68c-3.168 0-6.112 1.014-8.16 2.473H0l.456.481a6.34 6.34 0 0 1 1.664 4.32A6.367 6.367 0 0 1 0 17.28h3.264C4.8 18.88 7.584 20 12 20c4.416 0 7.2-1.12 8.736-2.72H24a6.367 6.367 0 0 1-2.12-2.326 6.34 6.34 0 0 1 1.664-4.32zM6.72 17.6a4.48 4.48 0 1 1 0-8.96 4.48 4.48 0 0 1 0 8.96zm10.56 0a4.48 4.48 0 1 1 0-8.96 4.48 4.48 0 0 1 0 8.96zM6.72 10.56a2.56 2.56 0 1 0 0 5.12 2.56 2.56 0 0 0 0-5.12zm10.56 0a2.56 2.56 0 1 0 0 5.12 2.56 2.56 0 0 0 0-5.12zM12 9.28c1.056 0 2.048.192 2.944.544C13.6 9.44 12.832 9.28 12 9.28c-.832 0-1.6.16-2.944.544A7.68 7.68 0 0 1 12 9.28z',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-kim-gold/20 hover:text-kim-gold transition-all duration-200 flex items-center justify-center text-white/50"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">{t('quickLinks')}</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: nav('home') },
                { href: '/about', label: nav('about') },
                { href: '/programs', label: nav('programs') },
                { href: '/volunteer', label: nav('volunteer') },
                { href: '/library', label: nav('library') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">{t('programs')}</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/programs/tourist', label: nav('tourist') },
                { href: '/programs/volunteer-activities', label: nav('volunteerActivities') },
                { href: '/programs/student-meetings', label: nav('studentMeetings') },
                { href: '/new-muslim-care-area', label: nav('newToIslam') },
                { href: '/donate', label: nav('donate') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-kim-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-kim-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-white/55 text-sm leading-relaxed">{contact('addressValue')}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-kim-gold/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-kim-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={`tel:${CONTACT.phone}`} className="text-white/55 hover:text-white text-sm transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-kim-gold/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-kim-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="text-white/55 hover:text-white text-sm transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {currentYear} KİM Vakfı. {t('rights')}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              {t('privacy')}
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
