'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { GraduationCap, BookOpen, Lightbulb, Users, Globe, Search, ArrowRight, CalendarDays, Clock } from 'lucide-react';

const T = {
  en: {
    eyebrow: 'Student Meetings',
    title: 'Islam Through an Academic Lens',
    subtitle: 'Where intellectual curiosity meets authentic Islamic scholarship. Open to all students — regardless of background or belief.',
    badge: 'Academic Programs',
    featuresTitle: 'What We Offer Students',
    features: [
      { icon: GraduationCap, title: 'Academic Seminars', desc: 'Structured seminars on Islam, Islamic history, civilisation, and its contributions to science, philosophy, and art. Presented by researchers and scholars.' },
      { icon: BookOpen, title: 'Research Support', desc: 'Need sources, expert contacts, or a visit to our archive? Our team actively supports student researchers with academic-quality resources and references.' },
      { icon: Lightbulb, title: 'Discussion Sessions', desc: 'Open-format conversations exploring Islam\'s answers to contemporary questions — theology, ethics, social justice, science and religion.' },
      { icon: Users, title: 'Community Access', desc: 'Connect with KİM\'s global network of scholars, professionals, and alumni — open doors for internships, collaborations, and lifelong friendships.' },
      { icon: Globe, title: 'International Perspective', desc: 'Meet students and academics from 80+ countries. Exchange experiences across traditions, disciplines, and worldviews in a respectful environment.' },
      { icon: Search, title: 'Library Resources', desc: 'Access our digital and physical library of Islamic texts, scholarly papers, and multilingual educational materials — free of charge.' },
    ],
    upcomingTitle: 'Upcoming Sessions',
    upcoming: [
      { tag: 'Seminar', title: 'The Quran and Modern Science', date: 'Every Thursday', time: '18:00 – 20:00', lang: 'EN / TR' },
      { tag: 'Workshop', title: 'Research Methods in Islamic Studies', date: 'First Saturday monthly', time: '10:00 – 13:00', lang: 'EN' },
      { tag: 'Discussion', title: 'Islam, Modernity & Identity', date: 'Second Tuesday monthly', time: '19:00 – 21:00', lang: 'EN / TR / AR' },
    ],
    whoTitle: 'Who Comes to Student Meetings',
    whoItems: [
      { icon: '🎓', label: 'University students researching Islam' },
      { icon: '🔬', label: 'Academics and researchers' },
      { icon: '🌍', label: 'International students in Istanbul' },
      { icon: '📝', label: 'Journalists and documentary makers' },
      { icon: '🤔', label: 'Curious minds at any stage of life' },
      { icon: '🕌', label: 'New Muslims seeking deeper knowledge' },
    ],
    ctaTitle: 'Join the Next Session',
    ctaDesc: 'Sessions are free and open to everyone. Register your interest and we\'ll confirm your place.',
    ctaButton: 'Register Interest',
  },
  tr: {
    eyebrow: 'Öğrenci Buluşmaları',
    title: "Akademik Bir Bakış Açısıyla İslam",
    subtitle: "Entelektüel merakın özgün İslami ilimle buluştuğu yer. Tüm öğrencilere açık — geçmiş veya inançtan bağımsız olarak.",
    badge: 'Akademik Programlar',
    featuresTitle: 'Öğrencilere Neler Sunuyoruz',
    features: [
      { icon: GraduationCap, title: 'Akademik Seminerler', desc: 'İslam, İslam tarihi, medeniyet ve onun bilim, felsefe ve sanata katkıları üzerine yapılandırılmış seminerler. Araştırmacılar ve âlimler tarafından sunulmaktadır.' },
      { icon: BookOpen, title: 'Araştırma Desteği', desc: 'Kaynak, uzman bağlantısı veya arşivimizi ziyaret etmeniz mi gerekiyor? Ekibimiz öğrenci araştırmacıları akademik kalitede kaynak ve referanslarla aktif olarak destekler.' },
      { icon: Lightbulb, title: 'Tartışma Oturumları', desc: "İslam'ın çağdaş sorulara — teoloji, etik, sosyal adalet, bilim ve din — verdiği yanıtları keşfeden açık formatlı sohbetler." },
      { icon: Users, title: 'Topluluk Erişimi', desc: "KİM'in küresel akademisyen, profesyonel ve mezun ağıyla tanışın — stajlar, işbirlikleri ve ömür boyu dostluklar için kapılar açılsın." },
      { icon: Globe, title: 'Uluslararası Perspektif', desc: '80\'den fazla ülkeden öğrenci ve akademisyenle tanışın. Saygılı bir ortamda farklı gelenekler, disiplinler ve dünya görüşlerinde deneyim paylaşın.' },
      { icon: Search, title: 'Kütüphane Kaynakları', desc: 'İslami metinler, akademik makaleler ve çok dilli eğitim materyallerinden oluşan dijital ve fiziksel kütüphanemize ücretsiz erişin.' },
    ],
    upcomingTitle: 'Yaklaşan Oturumlar',
    upcoming: [
      { tag: 'Seminer', title: 'Kuran ve Modern Bilim', date: 'Her Perşembe', time: '18:00 – 20:00', lang: 'TR / EN' },
      { tag: 'Atölye', title: 'İslam Araştırmalarında Yöntemler', date: 'Ayın ilk Cumartesi', time: '10:00 – 13:00', lang: 'TR' },
      { tag: 'Tartışma', title: 'İslam, Modernite ve Kimlik', date: 'Ayın ikinci Salı', time: '19:00 – 21:00', lang: 'TR / EN / AR' },
    ],
    whoTitle: 'Öğrenci Buluşmalarına Kimler Geliyor',
    whoItems: [
      { icon: '🎓', label: "İslam'ı araştıran üniversite öğrencileri" },
      { icon: '🔬', label: 'Akademisyenler ve araştırmacılar' },
      { icon: '🌍', label: "İstanbul'daki uluslararası öğrenciler" },
      { icon: '📝', label: 'Gazeteciler ve belgesel yapımcıları' },
      { icon: '🤔', label: 'Hayatın her aşamasında meraklı zihinler' },
      { icon: '🕌', label: 'Daha derin bilgi arayan yeni Müslümanlar' },
    ],
    ctaTitle: 'Bir Sonraki Oturuma Katılın',
    ctaDesc: 'Oturumlar ücretsiz ve herkese açıktır. İlginizi belirtin, yerinizi onaylayalım.',
    ctaButton: 'İlgi Belirt',
  },
  ar: {
    eyebrow: 'لقاءات الطلاب',
    title: 'الإسلام من منظور أكاديمي',
    subtitle: 'حيث يلتقي الفضول الفكري بالعلم الإسلامي الأصيل. مفتوح لجميع الطلاب — بغض النظر عن الخلفية أو المعتقد.',
    badge: 'البرامج الأكاديمية',
    featuresTitle: 'ما نقدمه للطلاب',
    features: [
      { icon: GraduationCap, title: 'الندوات الأكاديمية', desc: 'ندوات منظمة حول الإسلام والتاريخ الإسلامي والحضارة ومساهماتها في العلوم والفلسفة والفن. تُقدَّم من قِبَل باحثين وعلماء.' },
      { icon: BookOpen, title: 'دعم البحث', desc: 'هل تحتاج إلى مصادر أو جهات اتصال خبراء أو زيارة أرشيفنا؟ يدعم فريقنا الباحثين الطلابيين بموارد ومراجع ذات جودة أكاديمية.' },
      { icon: Lightbulb, title: 'جلسات النقاش', desc: 'محادثات بتنسيق مفتوح تستكشف إجابات الإسلام على الأسئلة المعاصرة — علم اللاهوت والأخلاق والعدالة الاجتماعية والعلم والدين.' },
      { icon: Users, title: 'الوصول إلى المجتمع', desc: 'تواصل مع الشبكة العالمية لكيم من العلماء والمهنيين والخريجين — افتح أبواباً للتدريب والتعاون والصداقات المدى الحياة.' },
      { icon: Globe, title: 'المنظور الدولي', desc: 'التقِ بطلاب وأكاديميين من أكثر من 80 دولة. تبادل التجارب عبر التقاليد والتخصصات ووجهات النظر في بيئة محترمة.' },
      { icon: Search, title: 'موارد المكتبة', desc: 'الوصول إلى مكتبتنا الرقمية والمادية من النصوص الإسلامية والأوراق العلمية والمواد التعليمية متعددة اللغات — مجاناً.' },
    ],
    upcomingTitle: 'الجلسات القادمة',
    upcoming: [
      { tag: 'ندوة', title: 'القرآن والعلم الحديث', date: 'كل خميس', time: '18:00 – 20:00', lang: 'AR / EN' },
      { tag: 'ورشة عمل', title: 'مناهج البحث في الدراسات الإسلامية', date: 'أول سبت من كل شهر', time: '10:00 – 13:00', lang: 'AR / EN' },
      { tag: 'نقاش', title: 'الإسلام والحداثة والهوية', date: 'الثلاثاء الثاني من كل شهر', time: '19:00 – 21:00', lang: 'AR / EN / TR' },
    ],
    whoTitle: 'من يحضر لقاءات الطلاب',
    whoItems: [
      { icon: '🎓', label: 'طلاب الجامعات الذين يبحثون في الإسلام' },
      { icon: '🔬', label: 'الأكاديميون والباحثون' },
      { icon: '🌍', label: 'الطلاب الدوليون في إسطنبول' },
      { icon: '📝', label: 'الصحفيون وصانعو الأفلام الوثائقية' },
      { icon: '🤔', label: 'العقول الفضولية في أي مرحلة من الحياة' },
      { icon: '🕌', label: 'المسلمون الجدد الساعون إلى معرفة أعمق' },
    ],
    ctaTitle: 'انضم إلى الجلسة القادمة',
    ctaDesc: 'الجلسات مجانية ومفتوحة للجميع. سجّل اهتمامك وسنؤكد مكانك.',
    ctaButton: 'سجّل اهتمامك',
  },
} as const;

export default function StudentMeetingsPage() {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.en;
  const isRtl = locale === 'ar';

  return (
    <div className="pt-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C2562 0%, #141A4A 50%, #0B1628 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-kim-gold/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kim-gold/40 to-transparent" />
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
            className="text-white/60 text-lg leading-relaxed max-w-2xl">{t.subtitle}</motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-kim-navy-light text-kim-navy text-xs font-semibold uppercase tracking-widest mb-3">{t.badge}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-kim-charcoal">{t.featuresTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-kim-navy-light border border-kim-navy/15 flex items-center justify-center mb-5 group-hover:bg-kim-navy group-hover:border-kim-navy transition-all duration-300">
                    <Icon className="w-6 h-6 text-kim-navy group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif font-bold text-kim-charcoal mb-2 group-hover:text-kim-navy transition-colors">{f.title}</h3>
                  <p className="text-kim-stone text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming sessions */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal text-center mb-12">{t.upcomingTitle}</h2>
          <div className="space-y-4">
            {t.upcoming.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: isRtl ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-kim-cream rounded-2xl border border-gray-100 p-6 hover:border-kim-navy/20 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-kim-navy text-white">{s.tag}</span>
                  <h3 className="font-serif font-bold text-kim-charcoal">{s.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-kim-stone">
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-kim-olive" />{s.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-kim-olive" />{s.time}</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-kim-olive" />{s.lang}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who comes */}
      <section className="py-20 bg-kim-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-white text-center mb-12">{t.whoTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.whoItems.map((w, i) => (
              <motion.div key={w.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl p-4 hover:bg-white/12 transition-colors">
                <span className="text-2xl">{w.icon}</span>
                <span className="text-white/80 text-sm">{w.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-kim-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-3">{t.ctaTitle}</h2>
          <p className="text-kim-stone mb-8">{t.ctaDesc}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors shadow-md">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
