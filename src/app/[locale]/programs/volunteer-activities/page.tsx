import { Link } from '@/lib/i18n/navigation';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Gönüllü Etkinlikler', en: 'Volunteer Activities', ar: 'الأنشطة التطوعية' };
  const descs = { tr: 'Gönüllü etkinliklerimiz', en: 'Our volunteer activities', ar: 'أنشطتنا التطوعية' };
  return buildMetadata({ locale, slug: 'programs/volunteer-activities', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

export default async function VolunteerActivitiesPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = { tr: 'Gönüllü Etkinlikler', en: 'Volunteer Activities', ar: 'الأنشطة التطوعية' };
  const intros = {
    tr: 'Gönüllülerimizin aktif katılımıyla gerçekleştirilen iftar yemekleri, cuma kahvaltıları ve topluluk etkinlikleri.',
    en: 'Iftar dinners, Friday breakfasts, and community events carried out with active volunteer participation.',
    ar: 'موائد الإفطار ووجبات إفطار الجمعة وفعاليات المجتمع التي تُنفَّذ بمشاركة المتطوعين.',
  };

  const activities = [
    { icon: '🍽️', titles: { tr: 'İftar Yemekleri', en: 'Iftar Dinners', ar: 'موائد الإفطار' }, descs: { tr: 'Ramazan boyunca her akşam', en: 'Every evening during Ramadan', ar: 'كل مساء خلال رمضان' } },
    { icon: '☕', titles: { tr: 'Cuma Kahvaltısı', en: 'Friday Breakfast', ar: 'إفطار الجمعة' }, descs: { tr: 'Her Cuma sabahı', en: 'Every Friday morning', ar: 'كل صباح جمعة' } },
    { icon: '🎭', titles: { tr: 'Kültürel Etkinlikler', en: 'Cultural Events', ar: 'الفعاليات الثقافية' }, descs: { tr: 'Aylık kültür etkinlikleri', en: 'Monthly cultural events', ar: 'فعاليات ثقافية شهرية' } },
    { icon: '🤲', titles: { tr: 'Topluluk Projeleri', en: 'Community Projects', ar: 'مشاريع المجتمع' }, descs: { tr: 'Sosyal sorumluluk projeleri', en: 'Social responsibility projects', ar: 'مشاريع المسؤولية الاجتماعية' } },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🤝</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{headings[l]}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{intros[l]}</p>
        </div>
      </section>

      <section className="py-20 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {activities.map((a) => (
              <div key={a.icon} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex gap-5">
                <span className="text-4xl">{a.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-kim-charcoal mb-2">{a.titles[l]}</h3>
                  <p className="text-kim-stone text-sm">{a.descs[l]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/volunteer" className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-lg shadow-md">
              {l === 'ar' ? 'انضم كمتطوع' : l === 'en' ? 'Join as Volunteer' : 'Gönüllü Ol'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
