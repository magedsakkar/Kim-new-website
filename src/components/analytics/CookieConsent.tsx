'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'kim_cookie_consent';

type ConsentState = 'accepted' | 'declined' | null;

const T = {
  en: {
    title: 'We use cookies',
    message: 'We use analytics cookies to understand which content helps visitors most. No advertising or tracking. You can opt out at any time.',
    privacy: 'Analytics only · No personal data sold',
    decline: 'Decline',
    accept: 'Accept Analytics',
    dismiss: 'Dismiss',
  },
  tr: {
    title: 'Çerez kullanıyoruz',
    message: 'Ziyaretçilere en çok hangi içeriklerin yardımcı olduğunu anlamak için analiz çerezleri kullanıyoruz. Reklam veya takip yok. İstediğiniz zaman çıkabilirsiniz.',
    privacy: 'Yalnızca analitik · Kişisel veri satışı yok',
    decline: 'Reddet',
    accept: 'Analitikleri Kabul Et',
    dismiss: 'Kapat',
  },
  ar: {
    title: 'نستخدم ملفات تعريف الارتباط',
    message: 'نستخدم ملفات تعريف ارتباط التحليلات لفهم المحتوى الأكثر فائدة للزوار. لا إعلانات ولا تتبع. يمكنك إلغاء الاشتراك في أي وقت.',
    privacy: 'تحليلات فقط · لا يتم بيع البيانات الشخصية',
    decline: 'رفض',
    accept: 'قبول التحليلات',
    dismiss: 'إغلاق',
  },
} as const;

export function CookieConsent() {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.en;
  const isRtl = locale === 'ar';

  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setConsent(stored);
      if (stored === 'accepted') enableAnalytics();
    }
  }, []);

  function enableAnalytics() {
    if (typeof window !== 'undefined' && (window as { gtag?: Function }).gtag) {
      (window as { gtag: Function }).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);
    enableAnalytics();
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setConsent('declined');
    setVisible(false);
  }

  if (consent !== null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[9999]"
          role="dialog"
          aria-label={t.title}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-kim-navy via-kim-gold to-kim-teal" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-kim-navy-light flex items-center justify-center shrink-0">
                    <Cookie className="w-4 h-4 text-kim-navy" />
                  </div>
                  <span className="font-semibold text-kim-charcoal text-sm">{t.title}</span>
                </div>
                <button
                  onClick={decline}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1"
                  aria-label={t.dismiss}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.message}</p>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-4">
                <ShieldCheck className="w-3 h-3 text-kim-teal shrink-0" />
                <span>{t.privacy}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={decline}
                  className="flex-1 px-4 py-2 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {t.decline}
                </button>
                <button
                  onClick={accept}
                  className="flex-1 px-4 py-2 text-xs font-medium text-white bg-kim-navy hover:bg-kim-navy-dark rounded-lg transition-colors"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
