'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isRTL = locale === 'ar' || locale === 'fa';

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? Math.min((scrollTop / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    {
      href: '/about',
      label: t('about'),
      children: [
        { href: '/about', label: t('whoWeAre') },
        { href: '/our-projects', label: t('ourProjects') },
        { href: '/library-map', label: t('locations') },
      ],
    },
    {
      href: '/programs',
      label: t('programs'),
      children: [
        { href: '/programs/tourist', label: t('tourist') },
        { href: '/programs/volunteer-activities', label: t('volunteerActivities') },
        { href: '/programs/student-meetings', label: t('studentMeetings') },
      ],
    },
    { href: '/volunteer', label: t('volunteer') },
    { href: '/new-muslim-care-area', label: t('newToIslam') },
    { href: '/library', label: t('library') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-kim-navy/[0.97] backdrop-blur-2xl border-b border-white/[0.08] shadow-xl shadow-black/30'
            : 'bg-kim-navy/[0.82] backdrop-blur-xl border-b border-white/[0.05]'
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Scroll progress bar — thin gold line at very top */}
        <div
          className={cn(
            'absolute top-0 left-0 h-[2px] transition-opacity duration-300 pointer-events-none',
            scrolled ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, rgba(201,151,58,0.6), #C9973A, rgba(201,151,58,0.6))',
            boxShadow: '0 0 8px rgba(201,151,58,0.5)',
          }}
        />

        {/* Main row */}
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[60px] md:h-[68px] px-4 sm:px-6 lg:px-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative flex items-center justify-center">
              {/* Glow ring on hover */}
              <div className="absolute inset-0 rounded-full bg-kim-gold/0 group-hover:bg-kim-gold/12 transition-all duration-350 scale-150" />
              <Image
                src="/images/logo_kim_aklamasz-removebg-preview.png"
                alt="KİM Vakfı"
                width={44}
                height={44}
                className="relative h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-100 opacity-90"
                priority
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-bold text-[15px] tracking-wide">KİM Vakfı</span>
              <span
                className="text-[9px] font-semibold uppercase"
                style={{ color: 'rgba(201,151,58,0.8)', letterSpacing: '0.2em' }}
              >
                Cross Cultural
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5" role="navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenDropdown(link.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-200 group/link',
                      isActive
                        ? 'text-kim-gold'
                        : 'text-white/65 hover:text-white/95'
                    )}
                  >
                    {/* Animated bottom underline for active */}
                    <span
                      className={cn(
                        'absolute bottom-1 left-3.5 right-3.5 h-[1.5px] rounded-full transition-all duration-300',
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover/link:opacity-40 group-hover/link:scale-x-75'
                      )}
                      style={{ background: '#C9973A', transformOrigin: 'center' }}
                    />
                    <span className="relative z-10">{link.label}</span>
                    {link.children && (
                      <svg
                        className={cn(
                          'relative z-10 w-3 h-3 transition-all duration-200',
                          openDropdown === link.href ? 'rotate-180 text-kim-gold' : 'text-white/35'
                        )}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {openDropdown === link.href && (
                        <motion.div
                          key="dropdown"
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className={cn(
                            'absolute top-full mt-1.5 w-52 z-50',
                            isRTL ? 'right-0' : 'left-0'
                          )}
                        >
                          <div
                            className="rounded-2xl overflow-hidden border"
                            style={{
                              background: 'rgba(10,15,35,0.97)',
                              backdropFilter: 'blur(20px)',
                              borderColor: 'rgba(255,255,255,0.08)',
                              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,151,58,0.06)',
                            }}
                          >
                            {/* Gold top line */}
                            <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,151,58,0.4), transparent)' }} />
                            <div className="py-1.5">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="group/item flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-all duration-150"
                                  style={{ color: 'rgba(255,255,255,0.55)' }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.95)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                                >
                                  <span
                                    className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150"
                                    style={{ background: 'rgba(201,151,58,0.4)' }}
                                  />
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher variant="header" />

            <Link
              href="/donate"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-lg transition-all duration-200 hover:-translate-y-px"
              style={{
                background: 'rgba(201,151,58,1)',
                color: '#fff',
                boxShadow: '0 2px 12px rgba(201,151,58,0.3)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b8841f'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,151,58,0.45)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,151,58,1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(201,151,58,0.3)'; }}
            >
              {t('donate')}
            </Link>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'lg:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9 rounded-lg transition-all duration-200',
                mobileOpen
                  ? 'bg-white/15'
                  : 'hover:bg-white/8'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                style={{
                  width: '20px',
                  transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
                }}
              />
              <span
                className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                style={{
                  width: '14px',
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? 'scaleX(0)' : 'none',
                  alignSelf: 'flex-end',
                  marginRight: '2px',
                }}
              />
              <span
                className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                style={{
                  width: '20px',
                  transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-[300px] max-w-[90vw] overflow-y-auto lg:hidden',
              isRTL ? 'left-0' : 'right-0'
            )}
            style={{ background: 'rgba(8,12,30,0.98)', backdropFilter: 'blur(20px)' }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Gold top bar */}
            <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #C9973A 30%, #FFE49A 50%, #C9973A 70%, transparent)' }} />

            <div className="p-5">
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <Image
                    src="/images/logo_kim_aklamasz-removebg-preview.png"
                    alt="KİM Vakfı"
                    width={40}
                    height={40}
                    className="h-9 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  <div>
                    <div className="text-white font-bold text-[14px]">KİM Vakfı</div>
                    <div className="text-[9px] font-semibold uppercase" style={{ color: 'rgba(201,151,58,0.8)', letterSpacing: '0.18em' }}>
                      Cross Cultural
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Language */}
              <div className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[10px] font-bold uppercase mb-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.22em' }}>
                  Language
                </p>
                <LocaleSwitcher variant="mobile" />
              </div>

              {/* Nav links */}
              <nav className="space-y-0.5 mb-6">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: isRTL ? -14 : 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-all"
                        style={{
                          color: isActive ? 'rgba(201,151,58,1)' : 'rgba(255,255,255,0.65)',
                          background: isActive ? 'rgba(201,151,58,0.1)' : 'transparent',
                        }}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C9973A' }} />
                        )}
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-5 mt-0.5 space-y-0 mb-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-all"
                              style={{ color: 'rgba(255,255,255,0.35)' }}
                            >
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }} />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Donate */}
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3.5 rounded-xl font-bold text-white text-[14px] transition-all"
                style={{
                  background: '#C9973A',
                  boxShadow: '0 4px 20px rgba(201,151,58,0.3)',
                }}
              >
                {t('donate')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
