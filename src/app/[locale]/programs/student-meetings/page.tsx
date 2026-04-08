import { Link } from '@/lib/i18n/navigation';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Öğrenci Buluşmaları', en: 'Student Meetings', ar: 'لقاءات الطلاب' };
  const descs = { tr: 'Üniversite öğrencilerine yönelik programlar', en: 'Programs for university students', ar: 'برامج لطلاب الجامعات' };
  return buildMetadata({ locale, slug: 'programs/student-meetings', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

export default async function StudentMeetingsPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = { tr: 'Öğrenci Buluşmaları', en: 'Student Meetings', ar: 'لقاءات الطلاب' };
  const intros = {
    tr: 'Üniversite öğrencilerine yönelik seminerler, atölyeler ve eğitim oturumları ile akademik perspektiften İslam\'ı keşfetme imkânı.',
    en: 'Seminars, workshops, and educational sessions for university students exploring Islam from an academic perspective.',
    ar: 'ندوات وورش عمل وجلسات تعليمية لطلاب الجامعات لاستكشاف الإسلام من منظور أكاديمي.',
  };

  const features = [
    { icon: '🎓', titles: { tr: 'Akademik Seminerler', en: 'Academic Seminars', ar: 'الندوات الأكاديمية' } },
    { icon: '💬', titles: { tr: 'Tartışma Oturumları', en: 'Discussion Sessions', ar: 'جلسات النقاش' } },
    { icon: '🔬', titles: { tr: 'Araştırma Desteği', en: 'Research Support', ar: 'دعم البحث' } },
    { icon: '🤝', titles: { tr: 'Networking', en: 'Networking', ar: 'التواصل' } },
    { icon: '📚', titles: { tr: 'Kaynak Erişimi', en: 'Resource Access', ar: 'الوصول للموارد' } },
    { icon: '🌍', titles: { tr: 'Uluslararası Perspektif', en: 'International Perspective', ar: 'منظور دولي' } },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-kim-gold to-amber-700 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{headings[l]}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{intros[l]}</p>
        </div>
      </section>

      <section className="py-20 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
            {features.map((f) => (
              <div key={f.icon} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-medium text-kim-charcoal text-sm">{f.titles[l]}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-lg shadow-md">
              {l === 'ar' ? 'تواصل معنا' : l === 'en' ? 'Contact Us' : 'Bize Ulaşın'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
