'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { Check, ChevronDown, BookOpen, Users, Coffee, Utensils, Globe, Heart, Building2 } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

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
  {
    currency: 'GBP',
    flag: '🇬🇧',
    bank: 'Türkiye İş Bankası',
    holder: 'KİM Kültürlerarası İletişim Vakfı',
    iban: 'TR78 0006 4000 0041 2345 6789 04',
    swift: 'ISBKTRIS',
  },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: { en: 'US Dollar', tr: 'ABD Doları', ar: 'دولار أمريكي' } },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: { en: 'Euro', tr: 'Euro', ar: 'يورو' } },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: { en: 'British Pound', tr: 'İngiliz Sterlini', ar: 'جنيه إسترليني' } },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷', name: { en: 'Turkish Lira', tr: 'Türk Lirası', ar: 'ليرة تركية' } },
];

// Exchange rates relative to USD (approximate)
const RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, TRY: 32 };

interface ImpactTier {
  usd: number;
  icon: typeof BookOpen;
  color: string;
  label: Record<string, string>;
  desc: Record<string, string>;
}

const IMPACT_TIERS: ImpactTier[] = [
  {
    usd: 10,
    icon: BookOpen,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
    label: { en: '1 Book Gift', tr: '1 Kitap Hediyesi', ar: 'هدية كتاب واحد' },
    desc: { en: 'One Islamic book or brochure sent to a curious visitor or new Muslim.', tr: 'Merak eden bir ziyaretçiye veya yeni Müslümana bir İslami kitap gönderilir.', ar: 'كتاب أو كتيب إسلامي واحد يُرسل لزائر مهتم أو مسلم جديد.' },
  },
  {
    usd: 25,
    icon: Coffee,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    label: { en: 'Friday Breakfast', tr: 'Cuma Kahvaltısı', ar: 'إفطار يوم الجمعة' },
    desc: { en: 'Hosts one guest at our weekly Friday cultural breakfast with our volunteer team.', tr: 'Haftalık Cuma kahvaltısında bir misafiri ağırlar.', ar: 'يستضيف ضيفاً واحداً في وجبة الإفطار الثقافية الأسبوعية.' },
  },
  {
    usd: 50,
    icon: Users,
    color: 'text-violet-600 bg-violet-50 border-violet-200',
    label: { en: 'Mosque Tour', tr: 'Cami Turu', ar: 'جولة المسجد' },
    desc: { en: 'Sponsors one visitor for a full guided mosque tour with printed materials.', tr: 'Bir ziyaretçinin basılı materyallerle tam rehberli cami turunu destekler.', ar: 'يرعى زيارة شخص واحد لجولة مسجد إرشادية كاملة مع مواد مطبوعة.' },
  },
  {
    usd: 100,
    icon: Utensils,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    label: { en: 'Iftar Dinner', tr: 'İftar Yemeği', ar: 'وجبة إفطار رمضان' },
    desc: { en: 'Funds a full Ramadan iftar dinner for five guests from around the world.', tr: 'Dünyanın dört bir yanından gelen beş misafir için tam Ramazan iftar yemeğini karşılar.', ar: 'يموّل وجبة إفطار رمضان الكاملة لخمسة ضيوف من أنحاء العالم.' },
  },
  {
    usd: 250,
    icon: Globe,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    label: { en: 'Cultural Program', tr: 'Kültürel Program', ar: 'برنامج ثقافي' },
    desc: { en: 'Funds an entire cultural session for a group of 10 international visitors.', tr: '10 uluslararası ziyaretçi grubu için tüm bir kültürel oturumu finanse eder.', ar: 'يموّل جلسة ثقافية كاملة لمجموعة من 10 زوار دوليين.' },
  },
  {
    usd: 500,
    icon: Heart,
    color: 'text-kim-navy bg-kim-navy-light border-kim-navy/20',
    label: { en: 'New Muslim Care', tr: 'Yeni Müslüman Bakımı', ar: 'رعاية المسلم الجديد' },
    desc: { en: 'Covers full care for one new Muslim — welcome kit, mentorship, and 3 months of follow-up support.', tr: 'Bir yeni Müslüman için karşılama paketi, mentorluk ve 3 aylık takip desteğini karşılar.', ar: 'يغطي رعاية مسلم جديد كاملة — حزمة ترحيب وإرشاد و3 أشهر من دعم المتابعة.' },
  },
  {
    usd: 1000,
    icon: Building2,
    color: 'text-kim-olive bg-kim-olive-light border-kim-olive/20',
    label: { en: 'Foundation Patron', tr: 'Vakıf Hamisi', ar: 'راعي المؤسسة' },
    desc: { en: 'Becomes a Foundation Patron — your name or dedication on our donor wall and annual impact report.', tr: 'Vakıf Hamisi olun — bağışçı duvarımızda adınız ve yıllık etki raporunda yer alırsınız.', ar: 'كن راعياً للمؤسسة — اسمك على جدار المتبرعين وفي التقرير السنوي للأثر.' },
  },
];

const COPY_LABELS = {
  en: { copy: 'Copy', copied: '✓ Copied!' },
  tr: { copy: 'Kopyala', copied: '✓ Kopyalandı!' },
  ar: { copy: 'نسخ', copied: '✓ تم النسخ!' },
};

function CopyButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false);
  const labels = COPY_LABELS[locale as keyof typeof COPY_LABELS] ?? COPY_LABELS.en;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable — silently ignore
    }
  };
  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? labels.copied : labels.copy}
      className="px-3 py-1 text-xs font-medium rounded-lg bg-kim-navy-light text-kim-navy hover:bg-kim-navy hover:text-white transition-colors"
    >
      <span role="status" aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  );
}

export default function DonatePage() {
  const locale = useLocale();
  const l = (locale in { tr: 1, en: 1, ar: 1 } ? locale : 'en') as 'tr' | 'en' | 'ar';

  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const headings = {
    tr: { eyebrow: 'Bağış', title: 'Desteğinizle Büyüyoruz', sub: 'Her bağışınız, daha fazla insanın kültürlerarası diyalog deneyimi yaşamasına katkıda bulunur.' },
    en: { eyebrow: 'Donate', title: 'We Grow with Your Support', sub: 'Every donation contributes to more people experiencing cross-cultural dialogue and discovering Islam.' },
    ar: { eyebrow: 'تبرع', title: 'ننمو بدعمكم', sub: 'كل تبرع يساهم في تمكين المزيد من الناس من تجربة الحوار بين الثقافات واكتشاف الإسلام.' },
  };
  const h = headings[l] || headings.en;

  function toLocalAmount(usd: number) {
    const rate = RATES[selectedCurrency.code] || 1;
    const converted = Math.round(usd * rate);
    return `${selectedCurrency.symbol}${converted.toLocaleString()}`;
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kim-gold/60 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">{h.eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{h.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{h.sub}</p>
        </div>
      </section>

      {/* Impact Tiers with Currency Selector */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <h2 className="font-serif text-3xl font-bold text-kim-charcoal">
              {l === 'ar' ? 'ماذا يُموّل تبرعك؟' : l === 'tr' ? 'Bağışınız Neyi Destekler?' : 'What Does Your Donation Fund?'}
            </h2>

            {/* Currency selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen((v) => !v)}
                onKeyDown={(e) => e.key === 'Escape' && setCurrencyOpen(false)}
                aria-haspopup="listbox"
                aria-expanded={currencyOpen}
                aria-label={`Currency: ${selectedCurrency.code}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-kim-charcoal hover:border-kim-navy transition-colors"
              >
                <span>{selectedCurrency.flag}</span>
                <span>{selectedCurrency.code}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <ul
                  role="listbox"
                  aria-label="Select currency"
                  className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-[160px] overflow-hidden"
                >
                  {CURRENCIES.map((c) => (
                    <li key={c.code} role="option" aria-selected={c.code === selectedCurrency.code}>
                      <button
                        onClick={() => { setSelectedCurrency(c); setCurrencyOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-kim-navy-light transition-colors ${c.code === selectedCurrency.code ? 'bg-kim-navy-light text-kim-navy font-semibold' : 'text-kim-charcoal'}`}
                      >
                        <span>{c.flag}</span>
                        <span>{c.code}</span>
                        <span className="text-gray-400 text-xs ml-auto">{c.name[l] ?? c.name.en}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPACT_TIERS.map((tier, i) => {
              const Icon = tier.icon;
              const isSelected = selectedAmount === tier.usd;
              return (
                <motion.button
                  key={tier.usd}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => setSelectedAmount(isSelected ? null : tier.usd)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-kim-navy bg-kim-navy-light shadow-lg scale-[1.02]'
                      : 'border-gray-100 bg-white hover:border-kim-navy/30 hover:shadow-md'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${tier.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-bold text-kim-charcoal text-sm">{tier.label[l] || tier.label.en}</span>
                    <span className="font-bold text-kim-navy text-lg shrink-0">{toLocalAmount(tier.usd)}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{tier.desc[l] || tier.desc.en}</p>
                  {isSelected && (
                    <div className="mt-3 flex items-center gap-1.5 text-kim-navy text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      {l === 'ar' ? 'تم التحديد' : l === 'tr' ? 'Seçildi' : 'Selected'}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {selectedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-kim-navy rounded-xl text-white text-sm text-center"
            >
              {l === 'ar'
                ? `اختار تحويل ${toLocalAmount(selectedAmount)} إلى أحد الحسابات أدناه`
                : l === 'tr'
                ? `${toLocalAmount(selectedAmount)} tutarını aşağıdaki hesaplardan birine transfer edebilirsiniz`
                : `To donate ${toLocalAmount(selectedAmount)}, use one of the bank accounts below`}
              <span className="text-kim-gold font-semibold"> ↓</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bank accounts */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'معلومات البنك' : l === 'en' ? 'Bank Information' : 'Banka Bilgileri'}
            title={l === 'ar' ? 'معلومات الحساب البنكي' : l === 'en' ? 'Bank Account Details' : 'Banka Hesap Bilgileri'}
            subtitle={l === 'ar' ? 'يمكنك إجراء التحويل مباشرة إلى حسابنا البنكي.' : l === 'en' ? 'You can transfer directly to our bank account in your preferred currency.' : 'Tercih ettiğiniz para biriminde doğrudan banka hesabımıza havale yapabilirsiniz.'}
            className="mb-12"
          />

          <div className="space-y-6">
            {BANK_ACCOUNTS.map((acc) => {
              const curr = CURRENCIES.find((c) => c.code === acc.currency);
              return (
                <div
                  key={acc.currency}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                    selectedCurrency.code === acc.currency ? 'border-kim-navy' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{acc.flag}</span>
                    <div>
                      <div className="font-bold text-kim-charcoal">{acc.currency} — {curr ? (curr.name[l] ?? curr.name.en) : ''}</div>
                      <div className="text-kim-stone text-sm">{acc.bank}</div>
                    </div>
                    {selectedCurrency.code === acc.currency && (
                      <span className="ml-auto text-xs font-semibold text-kim-navy bg-kim-navy-light px-2.5 py-1 rounded-full">
                        {l === 'ar' ? 'مختار' : l === 'tr' ? 'Seçili Para Birimi' : 'Selected Currency'}
                      </span>
                    )}
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
                      <CopyButton text={acc.iban.replace(/\s/g, '')} locale={l} />
                    </div>

                    <div className="flex items-center justify-between gap-4 bg-kim-cream rounded-xl px-4 py-3">
                      <div>
                        <div className="text-xs font-medium text-kim-stone uppercase mb-1">SWIFT/BIC</div>
                        <div className="font-mono text-kim-charcoal font-medium tracking-wider">{acc.swift}</div>
                      </div>
                      <CopyButton text={acc.swift} locale={l} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-kim-stone text-sm mt-8">
            {l === 'ar'
              ? <>للاستفسارات حول التبرع، تواصل معنا على <a href={`mailto:${CONTACT.email}`} className="text-kim-navy hover:underline">{CONTACT.email}</a></>
              : l === 'en'
              ? <>For donation inquiries, contact us at <a href={`mailto:${CONTACT.email}`} className="text-kim-navy hover:underline">{CONTACT.email}</a></>
              : <>Bağış hakkında sorularınız için <a href={`mailto:${CONTACT.email}`} className="text-kim-navy hover:underline">{CONTACT.email}</a> adresine ulaşın.</>}
          </p>
        </div>
      </section>
    </div>
  );
}
