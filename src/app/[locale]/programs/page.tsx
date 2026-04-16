import { Link } from '@/lib/i18n/navigation';
import { buildMetadata } from '@/lib/metadata';
import { Globe, Users, GraduationCap, Check, ArrowRight, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Programlar', en: 'Programs', ar: 'البرامج' };
  const descs = { tr: 'KİM Vakfı programları', en: 'KIM Foundation programs', ar: 'برامج مؤسسة كيم' };
  return buildMetadata({
    locale,
    slug: 'programs',
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descs[locale as keyof typeof descs] || descs.tr,
  });
}

const PROGRAMS = [
  {
    num: '01',
    href: '/programs/tourist',
    Icon: Globe,
    gradient: 'from-[#0A1628] via-[#0D1E3D] to-[#141A4A]',
    accentColor: '#C9973A',
    titles: { tr: 'Turist Programları', en: 'Tourist Programs', ar: 'برامج السياحة' },
    descs: {
      tr: "İstanbul'u ziyaret eden turistler için rehberli cami turları, kültürel sohbetler ve İslam'ı tanıma oturumları. Her hafta yüzlerce ziyaretçiye ev sahipliği yapıyoruz.",
      en: 'Guided mosque tours, cultural conversations, and Islam introduction sessions for visitors to Istanbul. We host hundreds of visitors every week.',
      ar: 'جولات إرشادية في المساجد ومحادثات ثقافية وجلسات تعريف بالإسلام للزوار. نستضيف مئات الزوار كل أسبوع.',
    },
    features: {
      tr: ['Süleymaniye Camii turu', 'Soru-cevap oturumları', 'Çay ve sohbet', 'Çok dilli rehberlik'],
      en: ['Süleymaniye Mosque tour', 'Q&A sessions', 'Tea and conversation', 'Multilingual guidance'],
      ar: ['جولة مسجد السليمانية', 'جلسات الأسئلة والأجوبة', 'الشاي والحوار', 'إرشاد متعدد اللغات'],
    },
  },
  {
    num: '02',
    href: '/programs/volunteer-activities',
    Icon: Users,
    gradient: 'from-[#0A1A0F] via-[#0F2218] to-[#162E20]',
    accentColor: '#C9973A',
    titles: { tr: 'Gönüllü Etkinlikler', en: 'Volunteer Activities', ar: 'الأنشطة التطوعية' },
    descs: {
      tr: 'Gönüllülerimizin aktif katılımıyla gerçekleştirilen iftar yemekleri, cuma kahvaltıları ve topluluk etkinlikleri.',
      en: 'Iftar dinners, Friday breakfasts, and community events carried out with active volunteer participation.',
      ar: 'موائد الإفطار ووجبات إفطار الجمعة وفعاليات المجتمع التي تُنفَّذ بمشاركة المتطوعين.',
    },
    features: {
      tr: ['İftar yemekleri', 'Cuma kahvaltısı', 'Kültürel geziler', 'Topluluk projeleri'],
      en: ['Iftar dinners', 'Friday breakfast', 'Cultural trips', 'Community projects'],
      ar: ['موائد الإفطار', 'وجبة الجمعة', 'الرحلات الثقافية', 'مشاريع المجتمع'],
    },
  },
  {
    num: '03',
    href: '/programs/student-meetings',
    Icon: GraduationCap,
    gradient: 'from-[#0D1A1E] via-[#0D2028] to-[#0D3040]',
    accentColor: '#C9973A',
    titles: { tr: 'Öğrenci Buluşmaları', en: 'Student Meetings', ar: 'لقاءات الطلاب' },
    descs: {
      tr: "Üniversite öğrencilerine yönelik seminerler, atölyeler ve eğitim oturumları ile akademik perspektiften İslam'ı keşfetme imkânı.",
      en: 'Seminars, workshops, and educational sessions for university students exploring Islam from an academic perspective.',
      ar: 'ندوات وورش عمل وجلسات تعليمية لطلاب الجامعات لاستكشاف الإسلام من منظور أكاديمي.',
    },
    features: {
      tr: ['Akademik seminerler', 'Tartışma oturumları', 'Kampüs ziyaretleri', 'Araştırma desteği'],
      en: ['Academic seminars', 'Discussion sessions', 'Campus visits', 'Research support'],
      ar: ['الندوات الأكاديمية', 'جلسات النقاش', 'زيارات الحرم الجامعي', 'دعم البحث'],
    },
  },
];

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: {
      eyebrow: 'Programlarımız',
      title: 'Farklı İhtiyaçlara Yönelik Programlar',
      sub: 'Kültürlerarası diyaloğu güçlendiren kapsamlı programlarımız.',
    },
    en: {
      eyebrow: 'Our Programs',
      title: 'Programs for Different Needs',
      sub: 'Comprehensive programs that strengthen cross-cultural dialogue.',
    },
    ar: {
      eyebrow: 'برامجنا',
      title: 'برامج لاحتياجات مختلفة',
      sub: 'برامج شاملة تعزز الحوار بين الثقافات.',
    },
  };
  const h = headings[l] ?? headings.tr;

  const ctaLabels = {
    tr: { text: 'Daha fazla bilgi için bize ulaşın', btn: 'İletişime Geç' },
    en: { text: 'Get in touch for more information', btn: 'Contact Us' },
    ar: { text: 'تواصل معنا للمزيد من المعلومات', btn: 'اتصل بنا' },
  };
  const cta = ctaLabels[l] ?? ctaLabels.tr;

  const exploreLbl = l === 'ar' ? 'استكشف' : l === 'en' ? 'Explore' : 'Keşfet';

  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <section className="relative bg-[#08101E] overflow-hidden">
        {/* Islamic geometric SVG pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="geo-pattern"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                {/* 8-pointed star (two overlapping squares) */}
                <polygon
                  points="40,4 52,28 76,28 56,44 64,68 40,54 16,68 24,44 4,28 28,28"
                  fill="none"
                  stroke="#C9973A"
                  strokeWidth="0.8"
                />
                <rect
                  x="20"
                  y="20"
                  width="40"
                  height="40"
                  fill="none"
                  stroke="#C9973A"
                  strokeWidth="0.5"
                  transform="rotate(45 40 40)"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="10"
                  fill="none"
                  stroke="#C9973A"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-pattern)" />
          </svg>
        </div>

        {/* Radial glow in centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(20,26,74,0.6),transparent)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-28 md:py-36">
          <span className="inline-block px-5 py-1.5 rounded-full border border-[#C9973A]/40 bg-[#C9973A]/10 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-6">
            {h.eyebrow}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {h.title}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">{h.sub}</p>
        </div>

        {/* Gold accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9973A]/60 to-transparent" />
      </section>

      {/* ── Program Cards Grid ── */}
      <section className="py-24 md:py-32 bg-[#08101E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((program) => {
              const { Icon } = program;
              return (
                <div
                  key={program.href}
                  className={`group relative flex flex-col rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-b ${program.gradient} transition-all duration-500 hover:scale-[1.02] hover:border-[#C9973A]/40 hover:shadow-[0_0_40px_rgba(201,151,58,0.15)]`}
                >
                  {/* Watermark number */}
                  <span
                    className="absolute top-4 right-6 font-serif text-[5.5rem] font-bold leading-none select-none pointer-events-none"
                    style={{ color: 'rgba(201,151,58,0.07)' }}
                    aria-hidden="true"
                  >
                    {program.num}
                  </span>

                  {/* Card body */}
                  <div className="relative z-10 p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-[#C9973A]/10 border border-[#C9973A]/25 flex items-center justify-center mb-6 group-hover:bg-[#C9973A]/20 transition-colors duration-300">
                      <Icon
                        className="w-7 h-7"
                        style={{ color: '#C9973A' }}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl font-bold text-white mb-3">
                      {program.titles[l]}
                    </h2>

                    {/* Description */}
                    <p className="text-white/55 text-sm leading-relaxed mb-6 line-clamp-3">
                      {program.descs[l]}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2.5 mb-8">
                      {program.features[l].map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-white/75">
                          <Check
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: '#C9973A' }}
                            strokeWidth={2.5}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Grow spacer so CTA always sits at bottom */}
                    <div className="flex-1" />

                    {/* CTA */}
                    <Link
                      href={program.href}
                      className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-[#C9973A]/10 border border-[#C9973A]/30 text-[#C9973A] text-sm font-semibold transition-all duration-300 hover:bg-[#C9973A] hover:text-[#08101E] hover:border-[#C9973A]"
                    >
                      {exploreLbl}
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </Link>
                  </div>

                  {/* Bottom gold line that intensifies on hover */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9973A]/20 to-transparent group-hover:via-[#C9973A]/50 transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Strip ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#C9973A] via-[#D4A84B] to-[#C9973A]">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#08101E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <MessageCircle className="w-9 h-9 text-[#08101E]/70 flex-shrink-0" strokeWidth={1.5} />
            <p className="font-serif text-xl md:text-2xl font-bold text-[#08101E]">
              {cta.text}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-7 py-3.5 rounded-xl bg-[#08101E] text-[#C9973A] font-bold text-sm uppercase tracking-wider hover:bg-[#141A4A] transition-colors duration-300 whitespace-nowrap"
          >
            {cta.btn}
          </Link>
        </div>
      </section>
    </div>
  );
}
