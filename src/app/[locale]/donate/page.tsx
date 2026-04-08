'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';

const BANK_ACCOUNTS = [
  {
    currency: 'TRY',
    flag: '🇹🇷',
    bank: 'Türkiye İş Bankası',
    holder: 'KİM Kültürlerarası İletişim Vakfı',
    iban: 'TR12 0006 4000 0011 2345 6789 01',
    swift: 'ISBKTRIS',
  },
  {
    currency: 'USD',
    flag: '🇺🇸',
    bank: 'Türkiye İş Bankası',
    holder: 'KİM Kültürlerarası İletişim Vakfı',
    iban: 'TR34 0006 4000 0021 2345 6789 02',
    swift: 'ISBKTRIS',
  },
  {
    currency: 'EUR',
    flag: '🇪🇺',
    bank: 'Türkiye İş Bankası',
    holder: 'KİM Kültürlerarası İletişim Vakfı',
    iban: 'TR56 0006 4000 0031 2345 6789 03',
    swift: 'ISBKTRIS',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs font-medium rounded-lg bg-kim-navy-light text-kim-navy hover:bg-kim-navy hover:text-white transition-colors"
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
}

export default function DonatePage() {
  const locale = useLocale();
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: { eyebrow: 'Bağış', title: 'Desteğinizle Büyüyoruz', sub: 'Her bağışınız, daha fazla insanın kültürlerarası diyalog deneyimi yaşamasına katkıda bulunur.' },
    en: { eyebrow: 'Donate', title: 'We Grow with Your Support', sub: 'Every donation contributes to more people experiencing cross-cultural dialogue.' },
    ar: { eyebrow: 'تبرع', title: 'ننمو بدعمكم', sub: 'كل تبرع يساهم في تمكين المزيد من الناس من تجربة الحوار بين الثقافات.' },
  };
  const h = headings[l] || headings.en;

  const impacts = [
    { icon: '🧳', n: '1', desc: { tr: 'Ziyaretçi turu', en: 'Visitor tour', ar: 'جولة زائر' } },
    { icon: '📚', n: '5', desc: { tr: 'Kitap dağıtımı', en: 'Book distributions', ar: 'توزيع الكتب' } },
    { icon: '🍽️', n: '1', desc: { tr: 'İftar yemeği', en: 'Iftar meal', ar: 'وجبة إفطار' } },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">{h.eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{h.title}</h1>
          <p className="text-white/80 text-lg">{h.sub}</p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-kim-gold-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-2xl font-bold text-kim-charcoal mb-10">
            {l === 'ar' ? 'ماذا يُموّل تبرعك؟' : l === 'en' ? 'What does your donation fund?' : 'Bağışınız neyi destekler?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {impacts.map((item) => (
              <div key={item.icon} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-kim-charcoal mb-1">
                  {l === 'tr' ? `${item.n} ${item.desc.tr}` : l === 'ar' ? `${item.n} ${item.desc.ar}` : `${item.n} ${item.desc.en}`}
                </div>
                <div className="text-kim-stone text-sm">
                  {l === 'ar' ? 'مقابل كل 10 دولار' : l === 'en' ? 'per $10 donated' : '10$ bağış için'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank accounts */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'معلومات البنك' : l === 'en' ? 'Bank Information' : 'Banka Bilgileri'}
            title={l === 'ar' ? 'معلومات الحساب البنكي' : l === 'en' ? 'Bank Account Details' : 'Banka Hesap Bilgileri'}
            subtitle={l === 'ar' ? 'يمكنك إجراء التحويل مباشرة إلى حسابنا البنكي.' : l === 'en' ? 'You can transfer directly to our bank account.' : 'Doğrudan banka hesabımıza havale yapabilirsiniz.'}
            className="mb-12"
          />

          <div className="space-y-6">
            {BANK_ACCOUNTS.map((acc) => (
              <div key={acc.currency} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{acc.flag}</span>
                  <div>
                    <div className="font-bold text-kim-charcoal">{acc.currency}</div>
                    <div className="text-kim-stone text-sm">{acc.bank}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-kim-stone uppercase mb-1">
                        {l === 'ar' ? 'اسم صاحب الحساب' : l === 'en' ? 'Account Holder' : 'Hesap Sahibi'}
                      </div>
                      <div className="text-kim-charcoal font-medium">{acc.holder}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-kim-cream rounded-xl px-4 py-3">
                    <div>
                      <div className="text-xs font-medium text-kim-stone uppercase mb-1">IBAN</div>
                      <div className="font-mono text-kim-charcoal font-medium tracking-wider text-sm">{acc.iban}</div>
                    </div>
                    <CopyButton text={acc.iban.replace(/\s/g, '')} />
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-kim-cream rounded-xl px-4 py-3">
                    <div>
                      <div className="text-xs font-medium text-kim-stone uppercase mb-1">SWIFT/BIC</div>
                      <div className="font-mono text-kim-charcoal font-medium tracking-wider">{acc.swift}</div>
                    </div>
                    <CopyButton text={acc.swift} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-kim-stone text-sm mt-8">
            {l === 'ar'
              ? 'للاستفسارات حول التبرع، تواصل معنا على info@kim.org.tr'
              : l === 'en'
              ? 'For donation inquiries, contact us at info@kim.org.tr'
              : 'Bağış hakkında sorularınız için info@kim.org.tr adresine ulaşın.'}
          </p>
        </div>
      </section>
    </div>
  );
}
