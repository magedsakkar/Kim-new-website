import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buildMetadata } from '@/lib/metadata';
import { Globe, Users, GraduationCap } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Programlar', en: 'Programs', ar: 'البرامج' };
  const descs = { tr: 'KİM Vakfı programları', en: 'KIM Foundation programs', ar: 'برامج مؤسسة كيم' };
  return buildMetadata({ locale, slug: 'programs', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const PROGRAM_ICONS = {
  '/programs/tourist': Globe,
  '/programs/volunteer-activities': Users,
  '/programs/student-meetings': GraduationCap,
} as const;

const PROGRAMS = [
  {
    href: '/programs/tourist',
    gradient: 'from-kim-navy to-kim-navy-dark',
    icon: '🌍',
    titles: { tr: 'Turist Programları', en: 'Tourist Programs', ar: 'برامج السياحة' },
    descs: {
      tr: 'İstanbul\'u ziyaret eden turistler için rehberli cami turları, kültürel sohbetler ve İslam\'ı tanıma oturumları. Her hafta yüzlerce ziyaretçiye ev sahipliği yapıyoruz.',
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
    href: '/programs/volunteer-activities',
    gradient: 'from-kim-olive to-[#6B5800]',
    icon: '🤝',
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
    href: '/programs/student-meetings',
    gradient: 'from-kim-gold to-amber-600',
    icon: '📚',
    titles: { tr: 'Öğrenci Buluşmaları', en: 'Student Meetings', ar: 'لقاءات الطلاب' },
    descs: {
      tr: 'Üniversite öğrencilerine yönelik seminerler, atölyeler ve eğitim oturumları ile akademik perspektiften İslam\'ı keşfetme imkânı.',
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
    tr: { eyebrow: 'Programlarımız', title: 'Farklı İhtiyaçlara Yönelik Programlar', sub: 'Kültürlerarası diyaloğu güçlendiren kapsamlı programlarımız.' },
    en: { eyebrow: 'Our Programs', title: 'Programs for Different Needs', sub: 'Comprehensive programs that strengthen cross-cultural dialogue.' },
    ar: { eyebrow: 'برامجنا', title: 'برامج لاحتياجات مختلفة', sub: 'برامج شاملة تعزز الحوار بين الثقافات.' },
  };
  const h = headings[l] || headings.tr;

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            {h.eyebrow}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">{h.title}</h1>
          <p className="text-white/80 text-lg leading-relaxed">{h.sub}</p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {PROGRAMS.map((program, idx) => (
            <div
              key={program.href}
              className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Visual */}
              <div className={`bg-gradient-to-br ${program.gradient} p-16 flex items-center justify-center relative overflow-hidden ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                {/* Decorative rings */}
                <div className="absolute w-72 h-72 rounded-full border border-white/8 -top-12 -right-12 pointer-events-none" />
                <div className="absolute w-56 h-56 rounded-full border border-white/6 -bottom-8 -left-16 pointer-events-none" />
                <div className="absolute w-40 h-40 rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                {/* Icon plate */}
                {(() => {
                  const Icon = PROGRAM_ICONS[program.href as keyof typeof PROGRAM_ICONS];
                  return Icon ? (
                    <div className="relative z-10 w-32 h-32 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                      <Icon className="w-16 h-16 text-white/90" strokeWidth={1.2} />
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-4">{program.titles[l]}</h2>
                <p className="text-kim-stone leading-relaxed mb-6">{program.descs[l]}</p>

                <ul className="space-y-2 mb-8">
                  {program.features[l].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-kim-charcoal text-sm">
                      <div className="w-5 h-5 rounded-full bg-kim-navy-light flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-kim-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={program.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors w-fit"
                >
                  {l === 'ar' ? 'اعرف المزيد' : l === 'en' ? 'Learn More' : 'Daha Fazla Bilgi'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
