import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import { FAQAccordion } from '@/components/volunteer/FAQAccordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Gönüllü Ol', en: 'Volunteer', ar: 'تطوع' };
  const descs = { tr: 'KİM Vakfı gönüllüsü ol', en: 'Become a KIM Foundation volunteer', ar: 'كن متطوعاً في مؤسسة كيم' };
  return buildMetadata({ locale, slug: 'volunteer', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const STEPS = [
  { num: '01', titles: { tr: 'Başvur', en: 'Apply', ar: 'تقدم' }, descs: { tr: 'Formu doldurun.', en: 'Fill out the form.', ar: 'املأ النموذج.' } },
  { num: '02', titles: { tr: 'Mülakat', en: 'Interview', ar: 'المقابلة' }, descs: { tr: 'Ekibimizle tanışın.', en: 'Meet our team.', ar: 'قابل فريقنا.' } },
  { num: '03', titles: { tr: 'Eğitim', en: 'Training', ar: 'التدريب' }, descs: { tr: 'KİM Akademi programını tamamlayın.', en: 'Complete KIM Academy.', ar: 'أكمل أكاديمية كيم.' } },
  { num: '04', titles: { tr: 'Başla', en: 'Start', ar: 'ابدأ' }, descs: { tr: 'Ekibimize katılın!', en: 'Join our team!', ar: 'انضم إلى فريقنا!' } },
];

export default async function VolunteerPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: { eyebrow: 'Gönüllü Ol', title: 'Ekibimize Katıl', sub: 'Anlayış ve diyalog köprüleri kurmak için gönüllü ekibimize katıl.' },
    en: { eyebrow: 'Volunteer', title: 'Join Our Team', sub: 'Join our volunteer team to build bridges of understanding and dialogue.' },
    ar: { eyebrow: 'تطوع', title: 'انضم إلى فريقنا', sub: 'انضم إلى فريق المتطوعين لبناء جسور الفهم والحوار.' },
  };
  const h = headings[l] || headings.tr;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">{h.eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{h.title}</h1>
          <p className="text-white/80 text-lg">{h.sub}</p>
        </div>
      </section>

      {/* How to join */}
      <section className="py-20 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'كيف تنضم' : l === 'en' ? 'How to Join' : 'Nasıl Katılırsın'}
            title={l === 'ar' ? 'عملية بسيطة من 4 خطوات' : l === 'en' ? 'Simple 4-Step Process' : '4 Adımlı Basit Süreç'}
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-kim-navy rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-serif font-bold text-kim-charcoal mb-2">{step.titles[l]}</h3>
                  <p className="text-kim-stone text-sm">{step.descs[l]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KIM Academy */}
      <section className="py-20 bg-kim-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-kim-gold text-sm font-semibold uppercase tracking-wider">
                {l === 'ar' ? 'أكاديمية كيم' : l === 'en' ? 'KIM Academy' : 'KİM Akademi'}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                {l === 'ar' ? 'برنامج تدريبي شامل' : l === 'en' ? 'Comprehensive Training Program' : 'Kapsamlı Eğitim Programı'}
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                {l === 'ar'
                  ? 'توفر أكاديمية كيم للمتطوعين المعرفة والمهارات اللازمة لتقديم أفضل تجربة ممكنة للضيوف. يشمل البرنامج التاريخ الإسلامي وتدريب الحساسية الثقافية ومهارات التواصل.'
                  : l === 'en'
                  ? 'KIM Academy provides volunteers with the knowledge and skills needed to offer guests the best possible experience. The program covers Islamic history, cultural sensitivity training, and communication skills.'
                  : 'KİM Akademi, gönüllülerimizin misafirlere en iyi deneyimi sunabilmesi için gereken bilgi ve becerileri edinmelerini sağlar. Program İslam tarihi, kültürel duyarlılık eğitimi ve iletişim becerilerini kapsar.'}
              </p>
              {(l === 'ar'
                ? ['التاريخ والثقافة الإسلامية', 'الحساسية الثقافية', 'مهارات التواصل', 'تقنيات الإرشاد']
                : l === 'en'
                ? ['Islamic history & culture', 'Cultural sensitivity', 'Communication skills', 'Guidance techniques']
                : ['İslam tarihi & kültürü', 'Kültürel duyarlılık', 'İletişim becerileri', 'Rehberlik teknikleri']
              ).map((item) => (
                <div key={item} className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 rounded-full bg-kim-gold/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-kim-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-6xl text-center mb-4">🎓</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '2', l: l === 'ar' ? 'أسبوعان تدريب' : l === 'en' ? 'Weeks Training' : 'Hafta Eğitim' },
                  { n: '100%', l: l === 'ar' ? 'مجاني' : l === 'en' ? 'Free' : 'Ücretsiz' },
                  { n: '20+', l: l === 'ar' ? 'موضوعاً' : l === 'en' ? 'Topics Covered' : 'Konu' },
                  { n: '∞', l: l === 'ar' ? 'دعم' : l === 'en' ? 'Ongoing Support' : 'Destek' },
                ].map((item) => (
                  <div key={item.l} className="text-center bg-white/10 rounded-xl p-4">
                    <div className="font-serif text-3xl font-bold text-white">{item.n}</div>
                    <div className="text-white/70 text-xs mt-1">{item.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application form + FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-8">
                {l === 'ar' ? 'نموذج الطلب' : l === 'en' ? 'Application Form' : 'Başvuru Formu'}
              </h2>
              <VolunteerForm />
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-8">
                {l === 'ar' ? 'الأسئلة الشائعة' : l === 'en' ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
              </h2>
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
