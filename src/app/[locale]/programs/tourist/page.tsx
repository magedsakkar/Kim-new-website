import { Link } from '@/lib/i18n/navigation';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Turist Programları', en: 'Tourist Programs', ar: 'برامج السياحة' };
  const descs = { tr: 'İstanbul\'u ziyaret eden turistler için programlar', en: 'Programs for tourists visiting Istanbul', ar: 'برامج للسياح الزائرين لإسطنبول' };
  return buildMetadata({ locale, slug: 'programs/tourist', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

export default async function TouristProgramPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const content = {
    tr: {
      title: 'Turist Programları',
      intro: 'İstanbul\'u ziyaret eden turistler için rehberli cami turları, kültürel sohbetler ve İslam\'ı tanıma oturumları düzenliyoruz.',
      highlights: ['Süleymaniye Camii rehberli turu', 'İslam hakkında uzman rehber anlatımı', 'Soru & cevap oturumu', 'Çay ve kültürel sohbet', 'Ücretsiz broşür ve kitaplar', 'Çok dilli hizmet'],
      schedule: 'Her gün sabah 09:00 - öğleden sonra 17:00 arası',
      cta: 'Rezervasyon Yap',
    },
    en: {
      title: 'Tourist Programs',
      intro: 'We organize guided mosque tours, cultural conversations, and Islam introduction sessions for visitors to Istanbul.',
      highlights: ['Guided tour of Süleymaniye Mosque', 'Expert guide narration about Islam', 'Q&A session', 'Tea and cultural conversation', 'Free brochures and books', 'Multilingual service'],
      schedule: 'Every day from 09:00 AM to 05:00 PM',
      cta: 'Make a Reservation',
    },
    ar: {
      title: 'برامج السياحة',
      intro: 'ننظم جولات إرشادية في المساجد ومحادثات ثقافية وجلسات تعريف بالإسلام للزوار.',
      highlights: ['جولة إرشادية في مسجد السليمانية', 'شرح مرشد خبير عن الإسلام', 'جلسة أسئلة وأجوبة', 'الشاي والحوار الثقافي', 'كتيبات وكتب مجانية', 'خدمة متعددة اللغات'],
      schedule: 'كل يوم من 09:00 صباحاً حتى 05:00 مساءً',
      cta: 'احجز موعداً',
    },
  };
  const c = content[l] || content.en;

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🌍</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{c.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{c.intro}</p>
        </div>
      </section>

      <section className="py-20 bg-kim-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-8">
            <h2 className="font-serif text-2xl font-bold text-kim-charcoal mb-6">
              {l === 'ar' ? 'ما الذي يتضمنه البرنامج؟' : l === 'en' ? 'What\'s included?' : 'Program neleri kapsar?'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {c.highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-kim-navy-light rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-kim-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-kim-charcoal text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-kim-navy text-white rounded-2xl p-6 mb-8 flex items-center gap-4">
            <span className="text-3xl">🕐</span>
            <div>
              <div className="font-semibold">{l === 'ar' ? 'المواعيد' : l === 'en' ? 'Schedule' : 'Program Saatleri'}</div>
              <div className="text-white/80 text-sm">{c.schedule}</div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-lg shadow-md">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
