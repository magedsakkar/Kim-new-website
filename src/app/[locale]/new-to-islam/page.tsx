import { SectionHeading } from '@/components/ui/SectionHeading';
import { Link } from '@/lib/i18n/navigation';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: "İslam'a Yeni", en: 'New to Islam', ar: 'جديد في الإسلام' };
  const descs = { tr: "İslam'ı keşfet", en: 'Discover Islam', ar: 'اكتشف الإسلام' };
  return buildMetadata({ locale, slug: 'new-to-islam', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const STORIES = [
  { name: 'Michael Thompson', country: '🇺🇸 USA', excerpt: { en: '"I came to Istanbul as a tourist and left with a new understanding of Islam that changed my life forever."', tr: '"Bir turist olarak İstanbul\'a geldim ve hayatımı sonsuza kadar değiştiren yeni bir İslam anlayışıyla ayrıldım."', ar: '"جئت إسطنبول كسائح وغادرت بفهم جديد للإسلام غير حياتي للأبد."' } },
  { name: 'Anna Schmidt', country: '🇩🇪 Germany', excerpt: { en: '"The volunteers at KIM answered every question I had with such patience and warmth. I felt truly welcomed."', tr: '"KİM\'deki gönüllüler her soruma bu kadar sabır ve sıcaklıkla cevap verdiler. Gerçekten sıcak karşılandığımı hissettim."', ar: '"أجاب المتطوعون في كيم على كل سؤال لدي بصبر ودفء حقيقيين. شعرت بترحيب حقيقي."' } },
  { name: 'James O\'Brien', country: '🇮🇪 Ireland', excerpt: { en: '"After attending a student seminar at KIM, I realized how little I knew about Islam and how much I wanted to learn."', tr: '"KİM\'deki bir öğrenci seminerine katıldıktan sonra İslam hakkında ne kadar az bildiğimi ve ne kadar öğrenmek istediğimi fark ettim."', ar: '"بعد حضور ندوة طلابية في كيم، أدركت كم كنت أجهل عن الإسلام وكم أريد التعلم."' } },
];

const TOPICS = [
  { icon: '🤲', titles: { tr: 'Namaz', en: 'Prayer', ar: 'الصلاة' }, descs: { tr: 'İslam\'da namaz ve ibadet hakkında temel bilgiler', en: 'Basic information about prayer and worship in Islam', ar: 'معلومات أساسية حول الصلاة والعبادة في الإسلام' } },
  { icon: '📿', titles: { tr: 'İman Esasları', en: 'Articles of Faith', ar: 'أركان الإيمان' }, descs: { tr: 'İslam\'ın temel inanç esasları', en: 'The fundamental beliefs of Islam', ar: 'المعتقدات الأساسية للإسلام' } },
  { icon: '🌙', titles: { tr: 'Ramazan', en: 'Ramadan', ar: 'رمضان' }, descs: { tr: 'Ramazan ayı ve oruç hakkında bilgi edinin', en: 'Learn about Ramadan and fasting', ar: 'تعرف على شهر رمضان والصيام' } },
  { icon: '🕌', titles: { tr: 'Cami', en: 'Mosque', ar: 'المسجد' }, descs: { tr: 'Camilerin rolü ve cami ziyareti hakkında', en: 'About mosques and visiting one', ar: 'حول المساجد وزيارتها' } },
  { icon: '📖', titles: { tr: "Kur'an-ı Kerim", en: 'The Quran', ar: 'القرآن الكريم' }, descs: { tr: "İslam'ın kutsal kitabı hakkında", en: 'About the holy book of Islam', ar: 'حول الكتاب المقدس للإسلام' } },
  { icon: '🌍', titles: { tr: 'İslam\'ın Yayılışı', en: 'Spread of Islam', ar: 'انتشار الإسلام' }, descs: { tr: 'İslam tarihine genel bakış', en: 'Overview of Islamic history', ar: 'نظرة عامة على التاريخ الإسلامي' } },
];

export default async function NewToIslamPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: { eyebrow: "İslam'a Yeni", title: "İslam'ı Keşfet", sub: "İslam'a yeni adım atanlar için rehber kaynaklar ve ilham veren hikayeler." },
    en: { eyebrow: 'New to Islam', title: 'Discover Islam', sub: 'Guiding resources and inspiring stories for those new to Islam.' },
    ar: { eyebrow: 'جديد في الإسلام', title: 'اكتشف الإسلام', sub: 'موارد إرشادية وقصص ملهمة لمن هم جدد في الإسلام.' },
  };
  const h = headings[l] || headings.en;

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">{h.eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{h.title}</h1>
          <p className="text-white/80 text-lg">{h.sub}</p>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'ابدأ من هنا' : l === 'en' ? 'Start Here' : 'Buradan Başla'}
            title={l === 'ar' ? 'مواضيع مهمة' : l === 'en' ? 'Important Topics' : 'Önemli Konular'}
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
              <div key={topic.icon} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="font-serif font-bold text-kim-charcoal mb-2">{topic.titles[l]}</h3>
                <p className="text-kim-stone text-sm leading-relaxed">{topic.descs[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'شهادات' : l === 'en' ? 'Testimonials' : 'Tanıklıklar'}
            title={l === 'ar' ? 'قصص ملهمة' : l === 'en' ? 'Inspiring Stories' : 'İlham Veren Hikayeler'}
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORIES.map((story) => (
              <div key={story.name} className="bg-kim-cream rounded-2xl p-6 shadow-sm">
                <p className="text-kim-charcoal font-serif italic leading-relaxed mb-6">{story.excerpt[l]}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-kim-navy rounded-full flex items-center justify-center text-white font-bold">
                    {story.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-kim-charcoal text-sm">{story.name}</div>
                    <div className="text-kim-stone text-xs">{story.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-kim-navy-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-4">
            {l === 'ar' ? 'هل لديك أسئلة؟' : l === 'en' ? 'Have Questions?' : 'Sorularınız mı var?'}
          </h2>
          <p className="text-kim-stone mb-8">
            {l === 'ar' ? 'فريقنا مستعد للإجابة على جميع أسئلتك.' : l === 'en' ? 'Our team is ready to answer all your questions.' : 'Ekibimiz tüm sorularınızı yanıtlamaya hazır.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors shadow-md"
          >
            {l === 'ar' ? 'تواصل معنا' : l === 'en' ? 'Contact Us' : 'Bize Ulaşın'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
