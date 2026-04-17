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
  const isRTL = locale === 'ar';

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 40);
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

  const navLinks = [
    { href: '/', label: t('home') },
    {
      href: '/about',
      label: t('about'),
      children: [
        { href: '/about', label: t('whoWeAre') },
        { href: '/about#leadership', label: t('leadership') },
        { href: '/about#media', label: t('media') },
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
      {/* ── Floating Island Header ─────────────────────────── */}
      <header
        className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-4 lg:px-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div
          className={cn(
            'relative max-w-7xl mx-auto rounded-2xl border transition-all duration-500',
            scrolled
              ? 'bg-kim-navy/96 backdrop-blur-xl border-white/15 shadow-2xl shadow-kim-navy/50'
              : 'bg-kim-navy/88 backdrop-blur-lg border-white/10 shadow-lg shadow-kim-navy/30'
          )}
        >
          {/* Inner clip wrapper — keeps progress bar and pattern clipped to rounded corners */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {/* ── Scroll progress bar ── */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-kim-gold via-amber-300 to-kim-gold transition-[width] duration-100 ease-linear"
              style={{ width: `${scrollProgress}%` }}
            />

            {/* ── Islamic star tile background ── */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 4l2.5 9.5 8-5.5-4 8.5 9.5 2-9.5 2 4 8.5-8-5.5L24 33l-2.5-9.5-8 5.5 4-8.5-9.5-2 9.5-2-4-8.5 8 5.5Z' fill='white'/%3E%3C/svg%3E")`,
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          {/* ── Main row ── */}
          <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-5">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-kim-gold/20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" />
                <Image
                  src="/images/logo_kim_aklamasz-removebg-preview.png"
                  alt="KİM Vakfı"
                  width={40}
                  height={40}
                  className="relative h-8 w-auto object-contain"
                  priority
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-sm leading-tight tracking-wide">KİM Vakfı</div>
                <div className="text-kim-gold text-[9px] font-semibold uppercase tracking-[0.18em] leading-none">Cross Cultural</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={cn(
                        'relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1 overflow-hidden',
                        isActive ? 'text-kim-gold' : 'text-white/70 hover:text-white'
                      )}
                    >
                      {/* Animated active bg */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-bg"
                          className="absolute inset-0 rounded-xl bg-white/10"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                      {link.children && (
                        <svg
                          className="relative z-10 w-3.5 h-3.5 text-kim-gold/70 group-hover:text-kim-gold group-hover:rotate-180 transition-all duration-200"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown */}
                    {link.children && (
                      <div className="absolute top-full left-0 mt-2 w-52 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                        <div className="bg-kim-navy/96 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-kim-navy/50 overflow-hidden">
                          {/* Dropdown triangle */}
                          <div className="absolute -top-1.5 left-5 w-3 h-3 bg-kim-navy/96 border-l border-t border-white/10 rotate-45" />
                          <div className="pt-2 pb-1.5">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/65 hover:text-white hover:bg-white/8 transition-all duration-150 group/item"
                              >
                                <span className="w-1 h-1 rounded-full bg-kim-gold/40 group-hover/item:bg-kim-gold transition-colors shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <LocaleSwitcher variant="header" />

              <Link
                href="/donate"
                className="hidden sm:inline-flex items-center px-4 py-2 bg-kim-gold text-white text-sm font-bold rounded-xl hover:bg-amber-500 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-kim-gold/25 hover:-translate-y-px"
              >
                {t('donate')}
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex flex-col items-center justify-center gap-1.5 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <span className={cn('block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')} />
                <span className={cn('block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300', mobileOpen && 'opacity-0 scale-x-0')} />
                <span className={cn('block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ x: isRTL ? '-100%' : '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRTL ? '-100%' : '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-80 max-w-[88vw] bg-kim-navy overflow-y-auto lg:hidden',
              isRTL ? 'left-0 rounded-r-3xl' : 'right-0 rounded-l-3xl'
            )}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Star pattern bg */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 4l2.5 9.5 8-5.5-4 8.5 9.5 2-9.5 2 4 8.5-8-5.5L24 33l-2.5-9.5-8 5.5 4-8.5-9.5-2 9.5-2-4-8.5 8 5.5Z' fill='white'/%3E%3C/svg%3E")`,
                backgroundSize: '48px 48px',
              }}
            />

            {/* Gold top bar */}
            <div className="h-1 bg-gradient-to-r from-kim-gold via-amber-300 to-kim-gold" />

            <div className="relative z-10 p-5">
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
                    <div className="text-white font-bold text-sm leading-tight">KİM Vakfı</div>
                    <div className="text-kim-gold text-[9px] font-semibold uppercase tracking-[0.18em]">Cross Cultural</div>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Language switcher */}
              <div className="mb-5 pb-5 border-b border-white/8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Language</p>
                <LocaleSwitcher variant="mobile" />
              </div>

              {/* Nav links */}
              <nav className="space-y-0.5 mb-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm',
                        pathname === link.href
                          ? 'text-kim-gold bg-white/10'
                          : 'text-white/75 hover:text-white hover:bg-white/8'
                      )}
                    >
                      {pathname === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-kim-gold shrink-0" />
                      )}
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-6 mt-0.5 space-y-0.5 mb-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-white/40 hover:text-white/75 hover:bg-white/5 transition-all"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Donate CTA */}
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3.5 bg-kim-gold text-white font-bold rounded-xl hover:bg-amber-500 transition-colors shadow-lg shadow-kim-gold/25 text-sm"
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
