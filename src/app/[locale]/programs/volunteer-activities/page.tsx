'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { Heart, Coffee, Globe, Users, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

const T = {
  en: {
    eyebrow: 'Volunteer Activities',
    title: 'Where Hearts Meet Hands',
    subtitle: 'Every week, our volunteers come together to host, serve, and connect — creating moments that change lives on both sides of the table.',
    badge: 'Get Involved',
    activitiesTitle: 'What We Do Together',
    activities: [
      {
        icon: Coffee,
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        glow: 'rgba(217,119,6,0.15)',
        title: 'Friday Breakfast',
        subtitle: 'Every Friday · 09:00 AM',
        desc: 'Our weekly cultural breakfast brings together visitors, locals, and volunteers for open conversation over tea and food. No agenda — just genuine human connection.',
        stat: '52× per year',
      },
      {
        icon: Heart,
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        glow: 'rgba(225,29,72,0.12)',
        title: 'Ramadan Iftar',
        subtitle: 'Every evening in Ramadan',
        desc: 'Our most beloved gathering. 30 nights of iftar dinners that bring together new Muslims, curious visitors, and community members from over 60 countries.',
        stat: '30 nights · 60+ nationalities',
      },
      {
        icon: Globe,
        color: 'text-teal-600 bg-teal-50 border-teal-200',
        glow: 'rgba(13,92,99,0.15)',
        title: 'Cultural Events',
        subtitle: 'Monthly programs',
        desc: 'Documentary screenings, panel discussions, and cross-cultural exchange evenings that explore the intersection of faith, culture, and contemporary life.',
        stat: 'Monthly',
      },
      {
        icon: Users,
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        glow: 'rgba(28,37,98,0.12)',
        title: 'Community Projects',
        subtitle: 'Year-round initiatives',
        desc: 'From mosque clean-ups to book donation drives, our volunteers lead community projects that strengthen bonds and serve the broader Istanbul community.',
        stat: 'Year-round',
      },
    ],
    howTitle: 'How Volunteers Make It Happen',
    howSteps: [
      { n: '01', title: 'Arrive Early', desc: 'Volunteers arrive 30 minutes before each event to set up, prepare food, and welcome guests as they arrive.' },
      { n: '02', title: 'Welcome & Host', desc: 'Greet guests from around the world, introduce KİM, and create a warm and inclusive atmosphere for everyone.' },
      { n: '03', title: 'Engage & Connect', desc: 'Join conversations, answer questions about Islam, and share your own story with authenticity and warmth.' },
      { n: '04', title: 'Reflect & Grow', desc: 'After each event, volunteers debrief together — celebrating wins, sharing learnings, and preparing for next time.' },
    ],
    impactTitle: 'The Impact So Far',
    stats: [
      { n: '2,600+', l: 'Breakfasts Hosted' },
      { n: '450+', l: 'Iftar Nights' },
      { n: '80+', l: 'Countries Represented' },
      { n: '100+', l: 'Active Volunteers' },
    ],
    ctaTitle: 'Ready to Join Our Volunteer Team?',
    ctaDesc: 'No experience needed — just a warm heart and an open mind. We train you for everything.',
    ctaButton: 'Become a Volunteer',
  },
  tr: {
    eyebrow: 'Gönüllü Etkinlikler',
    title: 'Kalpler El Ele Verdiğinde',
    subtitle: 'Her hafta gönüllülerimiz ev sahipliği yapmak, hizmet etmek ve bağlantı kurmak için bir araya gelir — her iki taraf için de hayatları değiştiren anlar yaratır.',
    badge: 'Dahil Ol',
    activitiesTitle: 'Birlikte Neler Yapıyoruz',
    activities: [
      {
        icon: Coffee,
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        glow: 'rgba(217,119,6,0.15)',
        title: 'Cuma Kahvaltısı',
        subtitle: 'Her Cuma · Sabah 09:00',
        desc: 'Haftalık kültürel kahvaltımız, ziyaretçileri, yerel halkı ve gönüllüleri çay ve yemek eşliğinde açık sohbet için bir araya getirir. Gündem yok — sadece gerçek insan bağlantısı.',
        stat: 'Yılda 52 kez',
      },
      {
        icon: Heart,
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        glow: 'rgba(225,29,72,0.12)',
        title: 'Ramazan İftarı',
        subtitle: "Ramazan'ın her akşamı",
        desc: "En sevilen buluşmamız. 60'tan fazla ülkeden yeni Müslümanları, meraklı ziyaretçileri ve topluluk üyelerini bir araya getiren 30 gece iftar yemeği.",
        stat: '30 gece · 60+ milliyet',
      },
      {
        icon: Globe,
        color: 'text-teal-600 bg-teal-50 border-teal-200',
        glow: 'rgba(13,92,99,0.15)',
        title: 'Kültürel Etkinlikler',
        subtitle: 'Aylık programlar',
        desc: 'İnanç, kültür ve çağdaş yaşamın kesişimini keşfeden belgesel gösterimleri, panel tartışmaları ve kültürlerarası değişim geceleri.',
        stat: 'Aylık',
      },
      {
        icon: Users,
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        glow: 'rgba(28,37,98,0.12)',
        title: 'Topluluk Projeleri',
        subtitle: 'Yıl boyu girişimler',
        desc: 'Cami temizliklerinden kitap bağışı kampanyalarına kadar, gönüllülerimiz daha geniş İstanbul topluluğuna hizmet eden projeler yürütür.',
        stat: 'Yıl boyu',
      },
    ],
    howTitle: 'Gönüllüler Nasıl Katkı Sağlar',
    howSteps: [
      { n: '01', title: 'Erken Gel', desc: 'Gönüllüler hazırlık, yemek düzenleme ve misafirleri karşılamak için her etkinlikten 30 dakika önce gelir.' },
      { n: '02', title: 'Karşıla ve Ev Sahipliği Yap', desc: "Dünyanın dört bir yanından gelen misafirleri selamlayın, KİM'i tanıtın ve herkes için sıcak bir ortam yaratın." },
      { n: '03', title: 'Katıl ve Bağlantı Kur', desc: 'Sohbetlere katılın, İslam hakkındaki soruları yanıtlayın ve kendi hikayenizi özgün bir şekilde paylaşın.' },
      { n: '04', title: 'Yansıt ve Büyü', desc: 'Her etkinlikten sonra gönüllüler birlikte değerlendirme yapar — başarıları kutlar, öğrendiklerini paylaşır ve bir sonrasına hazırlanır.' },
    ],
    impactTitle: 'Şimdiye Kadarki Etki',
    stats: [
      { n: '2.600+', l: 'Kahvaltı Düzenlendi' },
      { n: '450+', l: 'İftar Gecesi' },
      { n: '80+', l: 'Temsil Edilen Ülke' },
      { n: '100+', l: 'Aktif Gönüllü' },
    ],
    ctaTitle: 'Gönüllü Ekibimize Katılmaya Hazır mısınız?',
    ctaDesc: 'Deneyime gerek yok — sadece sıcak bir kalp ve açık bir zihin. Her şey için sizi eğitiyoruz.',
    ctaButton: 'Gönüllü Ol',
  },
  ar: {
    eyebrow: 'الأنشطة التطوعية',
    title: 'حيث تلتقي القلوب بالأيدي',
    subtitle: 'كل أسبوع، يجتمع متطوعونا للاستضافة والخدمة والتواصل — خالقين لحظات تغير الحياة على كلا جانبي الطاولة.',
    badge: 'شارك معنا',
    activitiesTitle: 'ما نفعله معاً',
    activities: [
      {
        icon: Coffee,
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        glow: 'rgba(217,119,6,0.15)',
        title: 'إفطار الجمعة',
        subtitle: 'كل جمعة · الساعة 09:00 صباحاً',
        desc: 'يجمع إفطارنا الثقافي الأسبوعي الزوار والسكان المحليين والمتطوعين لمحادثة مفتوحة على الشاي والطعام. لا أجندة — مجرد تواصل إنساني حقيقي.',
        stat: '52 مرة في السنة',
      },
      {
        icon: Heart,
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        glow: 'rgba(225,29,72,0.12)',
        title: 'إفطار رمضان',
        subtitle: 'كل مساء في رمضان',
        desc: 'أحب تجمعاتنا. 30 ليلة من موائد الإفطار التي تجمع المسلمين الجدد والزوار الفضوليين وأعضاء المجتمع من أكثر من 60 دولة.',
        stat: '30 ليلة · أكثر من 60 جنسية',
      },
      {
        icon: Globe,
        color: 'text-teal-600 bg-teal-50 border-teal-200',
        glow: 'rgba(13,92,99,0.15)',
        title: 'الفعاليات الثقافية',
        subtitle: 'برامج شهرية',
        desc: 'عروض أفلام وثائقية ونقاشات على لجان وأمسيات تبادل ثقافي تستكشف تقاطع الإيمان والثقافة والحياة المعاصرة.',
        stat: 'شهرياً',
      },
      {
        icon: Users,
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        glow: 'rgba(28,37,98,0.12)',
        title: 'مشاريع المجتمع',
        subtitle: 'مبادرات على مدار السنة',
        desc: 'من تنظيف المساجد إلى حملات التبرع بالكتب، يقود متطوعونا مشاريع مجتمعية تعزز الروابط وتخدم مجتمع إسطنبول الأوسع.',
        stat: 'طوال السنة',
      },
    ],
    howTitle: 'كيف يصنع المتطوعون الفارق',
    howSteps: [
      { n: '01', title: 'اوصل مبكراً', desc: 'يصل المتطوعون قبل 30 دقيقة من كل فعالية للإعداد وتجهيز الطعام والترحيب بالضيوف.' },
      { n: '02', title: 'رحّب واستضف', desc: 'استقبل الضيوف من جميع أنحاء العالم، عرّف بكيم، وأنشئ جواً دافئاً وشاملاً للجميع.' },
      { n: '03', title: 'شارك وتواصل', desc: 'انضم إلى المحادثات وأجب على الأسئلة حول الإسلام وشارك قصتك الخاصة بصدق ودفء.' },
      { n: '04', title: 'تأمل وانمُ', desc: 'بعد كل فعالية، يتقاسم المتطوعون التقييم — يحتفلون بالإنجازات ويتشاركون الدروس المستفادة.' },
    ],
    impactTitle: 'الأثر حتى الآن',
    stats: [
      { n: '+2,600', l: 'وجبة إفطار استُضيفت' },
      { n: '+450', l: 'ليلة إفطار رمضان' },
      { n: '+80', l: 'دولة ممثلة' },
      { n: '+100', l: 'متطوع نشط' },
    ],
    ctaTitle: 'هل أنت مستعد للانضمام إلى فريق المتطوعين؟',
    ctaDesc: 'لا حاجة لخبرة — فقط قلب دافئ وعقل منفتح. نحن ندرّبك على كل شيء.',
    ctaButton: 'كن متطوعاً',
  },
} as const;

export default function VolunteerActivitiesPage() {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.en;
  const isRtl = locale === 'ar';

  return (
    <div className="pt-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative bg-[#040B14] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="vol-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#C9973A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vol-dots)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(201,151,58,0.08),transparent)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 md:py-32">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-kim-gold/30 bg-kim-gold/8 text-kim-gold text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kim-gold/40 to-transparent" />
      </section>

      {/* Activities */}
      <section className="bg-kim-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-kim-navy-light text-kim-navy text-xs font-semibold uppercase tracking-widest mb-3">{t.badge}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-kim-charcoal">{t.activitiesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.activities.map((act, i) => {
              const Icon = act.icon;
              return (
                <motion.div
                  key={act.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${act.glow}, transparent)` }} />
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-5 ${act.color}`}>
                      <Icon className="w-6 h-6" strokeWidth={1.8} />
                    </div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif text-xl font-bold text-kim-charcoal group-hover:text-kim-navy transition-colors">{act.title}</h3>
                      <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-kim-stone bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                        <Calendar className="w-2.5 h-2.5" />{act.stat}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-kim-stone mb-3">
                      <Clock className="w-3 h-3" />{act.subtitle}
                    </div>
                    <p className="text-kim-stone text-sm leading-relaxed">{act.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-kim-charcoal text-center mb-14">{t.howTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howSteps.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-kim-gold/40 bg-kim-cream flex items-center justify-center mx-auto mb-4 hover:border-kim-gold hover:bg-kim-gold/10 transition-all duration-300">
                  <span className="font-serif text-xl font-bold text-kim-gold">{step.n}</span>
                </div>
                <h3 className="font-serif font-bold text-kim-charcoal mb-2">{step.title}</h3>
                <p className="text-kim-stone text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-kim-navy py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-white text-center mb-12">{t.impactTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.stats.map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center bg-white/8 rounded-2xl border border-white/10 p-6">
                <div className="font-serif text-3xl font-bold text-kim-gold mb-1">{s.n}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider">{s.l}</div>
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
          <Link href="/volunteer" className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors shadow-md">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
