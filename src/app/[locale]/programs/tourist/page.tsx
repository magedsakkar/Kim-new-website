'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { MapPin, Clock, Globe, BookOpen, MessageSquare, Coffee, Check, ArrowRight, Star } from 'lucide-react';

const T = {
  en: {
    eyebrow: 'Tourist Programs',
    title: 'Discover Islam in the Heart of Istanbul',
    subtitle: 'A journey through history, faith, and culture — guided by our expert team at the iconic Süleymaniye Mosque.',
    scheduleLabel: 'Daily Schedule',
    schedule: 'Every day · 09:00 – 17:00',
    locationLabel: 'Location',
    location: 'Süleymaniye Mosque, Fatih, İstanbul',
    languagesLabel: 'Languages',
    languages: 'EN · TR · AR · DE · FR',
    freeLabel: 'Entry',
    free: 'Free of Charge',
    whatsIncluded: "What's Included",
    highlights: [
      { icon: MapPin, label: 'Guided mosque tour with expert narration' },
      { icon: BookOpen, label: 'Introduction to Islamic beliefs and history' },
      { icon: MessageSquare, label: 'Open Q&A — no question is off-limits' },
      { icon: Coffee, label: 'Turkish tea and cultural conversation' },
      { icon: Globe, label: 'Free multilingual books and brochures' },
      { icon: Star, label: 'Welcome gift from KİM Vakfı' },
    ],
    experienceTitle: 'The Experience',
    steps: [
      { num: '01', title: 'Arrival & Welcome', desc: 'Our volunteer guides welcome you at the entrance of Süleymaniye Mosque. You\'ll receive a brief orientation and be introduced to the history of this 16th-century Ottoman masterpiece.' },
      { num: '02', title: 'Guided Mosque Tour', desc: 'Walk through the mosque with your guide, learning about Islamic architecture, the significance of different spaces, and the role of the mosque in Muslim daily life.' },
      { num: '03', title: 'Islamic Knowledge Session', desc: 'Join a relaxed educational session on Islamic beliefs, practices, and values — tailored to your level of familiarity and the questions you bring.' },
      { num: '04', title: 'Tea & Conversation', desc: 'Conclude with Turkish tea, a gift package of Islamic books, and open conversation with our volunteers. Many visitors say this is their favourite part.' },
    ],
    testimonialsTitle: 'What Visitors Say',
    testimonials: [
      { name: 'Emma R.', country: 'Germany', text: 'The most meaningful two hours I spent in Istanbul. Our guide was knowledgeable, patient, and genuinely warm.' },
      { name: 'James K.', country: 'United States', text: 'I came as a curious tourist and left with a completely new understanding of Islam. Highly recommended.' },
      { name: 'Yuki T.', country: 'Japan', text: 'The volunteers spoke Japanese! The tour was informative and very respectful of my background.' },
    ],
    ctaTitle: 'Plan Your Visit',
    ctaDesc: 'Tours run daily. No booking required — arrive at Süleymaniye Mosque and look for our volunteers.',
    ctaButton: 'Contact Us',
    orDropIn: 'Or just drop in — we\'re here every day.',
  },
  tr: {
    eyebrow: 'Turist Programları',
    title: "İstanbul'un Kalbinde İslam'ı Keşfet",
    subtitle: "Tarihin, inancın ve kültürün kesiştiği bir yolculuk — ikonik Süleymaniye Camii'nde uzman ekibimiz rehberliğinde.",
    scheduleLabel: 'Günlük Program',
    schedule: 'Her gün · 09:00 – 17:00',
    locationLabel: 'Konum',
    location: 'Süleymaniye Camii, Fatih, İstanbul',
    languagesLabel: 'Diller',
    languages: 'TR · EN · AR · DE · FR',
    freeLabel: 'Giriş',
    free: 'Ücretsiz',
    whatsIncluded: 'Program Neler Kapsar',
    highlights: [
      { icon: MapPin, label: 'Uzman anlatımıyla rehberli cami turu' },
      { icon: BookOpen, label: "İslami inanç ve tarihe giriş" },
      { icon: MessageSquare, label: 'Açık S&C — hiçbir soru yasak değil' },
      { icon: Coffee, label: 'Türk çayı ve kültürel sohbet' },
      { icon: Globe, label: 'Ücretsiz çok dilli kitap ve broşürler' },
      { icon: Star, label: "KİM Vakfı'ndan karşılama hediyesi" },
    ],
    experienceTitle: 'Deneyim',
    steps: [
      { num: '01', title: 'Varış ve Karşılama', desc: "Gönüllü rehberlerimiz sizi Süleymaniye Camii'nin girişinde karşılar. Kısa bir yönlendirme alacak ve bu 16. yüzyıl Osmanlı şaheserinin tarihiyle tanışacaksınız." },
      { num: '02', title: 'Rehberli Cami Turu', desc: "Rehberinizle birlikte camiyi gezerek İslam mimarisi, farklı mekanların önemi ve caminin Müslüman günlük yaşamındaki rolü hakkında bilgi edineceksiniz." },
      { num: '03', title: 'İslami Bilgi Oturumu', desc: "İslami inanç, ibadet ve değerler üzerine rahat bir eğitim oturumuna katılın — tanışıklık düzeyinize ve getirdiğiniz sorulara göre uyarlanır." },
      { num: '04', title: 'Çay ve Sohbet', desc: "Türk çayı, İslami kitaplar içeren hediye paketi ve gönüllülerimizle açık sohbetle sonlandırın. Pek çok ziyaretçi bunun en sevdiği kısım olduğunu söylüyor." },
    ],
    testimonialsTitle: 'Ziyaretçiler Ne Diyor',
    testimonials: [
      { name: 'Emma R.', country: 'Almanya', text: "İstanbul'da geçirdiğim en anlamlı iki saatti. Rehberimiz bilgili, sabırlı ve gerçekten sıcakkanlıydı." },
      { name: 'James K.', country: 'ABD', text: "Meraklı bir turist olarak geldim ve İslam hakkında tamamen yeni bir anlayışla ayrıldım. Kesinlikle tavsiye ederim." },
      { name: 'Yuki T.', country: 'Japonya', text: "Gönüllüler Japonca konuştu! Tur hem bilgilendirici hem de geçmişime çok saygılıydı." },
    ],
    ctaTitle: 'Ziyaretinizi Planlayın',
    ctaDesc: "Turlar her gün mevcuttur. Rezervasyon gerekmez — sadece Süleymaniye Camii'ne gelin ve gönüllülerimizi arayın.",
    ctaButton: 'Bize Ulaşın',
    orDropIn: 'Veya gelip bize uğrayın — her gün buradayız.',
  },
  ar: {
    eyebrow: 'برامج السياحة',
    title: 'اكتشف الإسلام في قلب إسطنبول',
    subtitle: 'رحلة عبر التاريخ والإيمان والثقافة — بإرشاد فريقنا الخبير في مسجد السليمانية الشهير.',
    scheduleLabel: 'الجدول اليومي',
    schedule: 'كل يوم · 09:00 – 17:00',
    locationLabel: 'الموقع',
    location: 'مسجد السليمانية، الفاتح، إسطنبول',
    languagesLabel: 'اللغات',
    languages: 'AR · EN · TR · DE · FR',
    freeLabel: 'الدخول',
    free: 'مجاني',
    whatsIncluded: 'ما يتضمنه البرنامج',
    highlights: [
      { icon: MapPin, label: 'جولة إرشادية في المسجد مع شرح متخصص' },
      { icon: BookOpen, label: 'مقدمة إلى العقيدة والتاريخ الإسلامي' },
      { icon: MessageSquare, label: 'جلسة أسئلة وأجوبة مفتوحة — لا سؤال محظور' },
      { icon: Coffee, label: 'شاي تركي ومحادثة ثقافية' },
      { icon: Globe, label: 'كتب وكتيبات مجانية متعددة اللغات' },
      { icon: Star, label: 'هدية ترحيبية من مؤسسة كيم' },
    ],
    experienceTitle: 'التجربة',
    steps: [
      { num: '01', title: 'الوصول والترحيب', desc: 'يرحب بك مرشدونا المتطوعون عند مدخل مسجد السليمانية. ستتلقى توجيهاً موجزاً وتتعرف على تاريخ هذه التحفة المعمارية العثمانية من القرن السادس عشر.' },
      { num: '02', title: 'الجولة الإرشادية في المسجد', desc: 'تجول في المسجد مع مرشدك، وتعلم عن العمارة الإسلامية وأهمية الفضاءات المختلفة ودور المسجد في الحياة اليومية للمسلمين.' },
      { num: '03', title: 'جلسة المعرفة الإسلامية', desc: 'انضم إلى جلسة تعليمية مريحة حول العقيدة والشعائر والقيم الإسلامية — مصممة وفق مستوى إلمامك والأسئلة التي تحملها.' },
      { num: '04', title: 'الشاي والحوار', desc: 'اختم بالشاي التركي وحزمة هدايا من الكتب الإسلامية ومحادثة مفتوحة مع متطوعينا. يقول كثير من الزوار إن هذا هو جزؤهم المفضل.' },
    ],
    testimonialsTitle: 'ماذا يقول الزوار',
    testimonials: [
      { name: 'Emma R.', country: 'ألمانيا', text: 'الساعتان الأكثر معنىً قضيتهما في إسطنبول. كان مرشدنا متمكناً وصبوراً ودافئاً حقاً.' },
      { name: 'James K.', country: 'الولايات المتحدة', text: 'جئت كسائح فضولي وغادرت بفهم جديد تماماً للإسلام. أوصي به بشدة.' },
      { name: 'Yuki T.', country: 'اليابان', text: 'تحدث المتطوعون باليابانية! كانت الجولة مفيدة ومحترمة جداً لخلفيتي.' },
    ],
    ctaTitle: 'خطط لزيارتك',
    ctaDesc: 'الجولات متاحة يومياً. لا يلزم حجز — تعال إلى مسجد السليمانية وابحث عن متطوعينا.',
    ctaButton: 'تواصل معنا',
    orDropIn: 'أو تفضل بزيارتنا — نحن هنا كل يوم.',
  },
} as const;

export default function TouristProgramPage() {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.en;
  const isRtl = locale === 'ar';

  return (
    <div className="pt-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-kim-navy via-[#0F1A42] to-kim-navy-dark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-kim-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kim-gold/40 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-bold uppercase tracking-widest">{t.eyebrow}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {t.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10">{t.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3">
            {[
              { icon: Clock, label: t.scheduleLabel, value: t.schedule },
              { icon: MapPin, label: t.locationLabel, value: t.location },
              { icon: Globe, label: t.languagesLabel, value: t.languages },
              { icon: Star, label: t.freeLabel, value: t.free },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/8 border border-white/12">
                <Icon className="w-3.5 h-3.5 text-kim-gold shrink-0" strokeWidth={2} />
                <div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">{label}</div>
                  <div className="text-white/85 text-xs font-medium">{value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Included */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-8 bg-kim-olive" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-kim-charcoal">{t.whatsIncluded}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={h.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-kim-navy-light border border-kim-navy/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-kim-navy" strokeWidth={1.8} />
                  </div>
                  <span className="text-kim-charcoal font-medium text-sm">{h.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal text-center mb-14">{t.experienceTitle}</h2>
          <div className="space-y-8">
            {t.steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: isRtl ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-kim-navy flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-kim-gold">{step.num}</span>
                </div>
                <div className="flex-1 bg-kim-cream rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-serif font-bold text-kim-charcoal mb-2">{step.title}</h3>
                  <p className="text-kim-stone text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-kim-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-white text-center mb-12">{t.testimonialsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.map((tst, i) => (
              <motion.div key={tst.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/8 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-kim-gold fill-kim-gold" />)}
                </div>
                <p className="text-white/75 text-sm leading-relaxed mb-4 italic">&ldquo;{tst.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-white text-sm">{tst.name}</div>
                  <div className="text-white/40 text-xs">{tst.country}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-kim-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-3">{t.ctaTitle}</h2>
          <p className="text-kim-stone mb-6">{t.ctaDesc}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors shadow-md">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-kim-stone text-sm mt-4 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-kim-teal" /> {t.orDropIn}
          </p>
        </div>
      </section>
    </div>
  );
}
