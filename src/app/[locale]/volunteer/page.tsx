import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import { FAQAccordion } from '@/components/volunteer/FAQAccordion';
import { buildMetadata } from '@/lib/metadata';
import {
  BookOpen,
  Globe,
  MessageSquare,
  Compass,
  Users,
  Heart,
  Award,
} from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Gönüllü Ol', en: 'Volunteer', ar: 'تطوع' };
  const descs = {
    tr: 'KİM Vakfı gönüllüsü ol',
    en: 'Become a KIM Foundation volunteer',
    ar: 'كن متطوعاً في مؤسسة كيم',
  };
  return buildMetadata({
    locale,
    slug: 'volunteer',
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descs[locale as keyof typeof descs] || descs.tr,
  });
}

const STEPS = [
  {
    num: '01',
    titles: { tr: 'Başvur', en: 'Apply', ar: 'تقدم' },
    descs: {
      tr: 'Online formu doldurun ve bize başvurun.',
      en: 'Fill out the online form and apply to us.',
      ar: 'املأ النموذج الإلكتروني وتقدم إلينا.',
    },
  },
  {
    num: '02',
    titles: { tr: 'Mülakat', en: 'Interview', ar: 'المقابلة' },
    descs: {
      tr: 'Ekibimizle tanışın ve motivasyonunuzu paylaşın.',
      en: 'Meet our team and share your motivation.',
      ar: 'قابل فريقنا وشارك دوافعك.',
    },
  },
  {
    num: '03',
    titles: { tr: 'Eğitim', en: 'Training', ar: 'التدريب' },
    descs: {
      tr: 'KİM Akademi programını başarıyla tamamlayın.',
      en: 'Successfully complete the KIM Academy program.',
      ar: 'أكمل برنامج أكاديمية كيم بنجاح.',
    },
  },
  {
    num: '04',
    titles: { tr: 'Başla', en: 'Start', ar: 'ابدأ' },
    descs: {
      tr: 'Aktif gönüllü olarak ekibimize katılın!',
      en: 'Join our team as an active volunteer!',
      ar: 'انضم إلى فريقنا كمتطوع نشط!',
    },
  },
];

const BENEFITS = [
  {
    Icon: Globe,
    titles: { tr: 'Küresel Ağ', en: 'Global Network', ar: 'شبكة عالمية' },
    descs: {
      tr: '80+ ülkeden insanlarla tanışma ve kalıcı dostluklar kurma fırsatı.',
      en: 'Opportunity to meet people from 80+ countries and build lasting friendships.',
      ar: 'فرصة للتعرف على أشخاص من أكثر من 80 دولة وبناء صداقات دائمة.',
    },
  },
  {
    Icon: BookOpen,
    titles: { tr: 'Ücretsiz Eğitim', en: 'Free Training', ar: 'تدريب مجاني' },
    descs: {
      tr: 'İslam tarihi, kültürel iletişim ve rehberlik konularında kapsamlı ücretsiz eğitim.',
      en: 'Comprehensive free training on Islamic history, cross-cultural communication, and guidance.',
      ar: 'تدريب مجاني شامل على التاريخ الإسلامي والتواصل الثقافي والإرشاد.',
    },
  },
  {
    Icon: Heart,
    titles: { tr: 'Anlam ve Amaç', en: 'Meaning & Purpose', ar: 'معنى وهدف' },
    descs: {
      tr: 'Her hafta gerçek değişim yaratın ve insanların hayatına dokunun.',
      en: 'Create real change every week and touch people\'s lives.',
      ar: 'أحدث تغييراً حقيقياً كل أسبوع والمس حياة الناس.',
    },
  },
  {
    Icon: Award,
    titles: { tr: 'Sertifika', en: 'Certificate', ar: 'شهادة' },
    descs: {
      tr: 'Deneyiminizi belgeleyen resmi KİM Akademi sertifikası.',
      en: 'Official KIM Academy certificate documenting your experience.',
      ar: 'شهادة أكاديمية كيم الرسمية التي توثق تجربتك.',
    },
  },
  {
    Icon: Users,
    titles: { tr: 'Topluluk', en: 'Community', ar: 'مجتمع' },
    descs: {
      tr: '100+ aktif gönüllüden oluşan sıcak ve destekleyici bir aile.',
      en: 'A warm and supportive family of 100+ active volunteers.',
      ar: 'عائلة دافئة وداعمة تضم أكثر من 100 متطوع نشط.',
    },
  },
  {
    Icon: Compass,
    titles: {
      tr: 'Kişisel Gelişim',
      en: 'Personal Growth',
      ar: 'نمو شخصي',
    },
    descs: {
      tr: 'Liderlik, iletişim ve kültürlerarası yetkinliklerde sürekli büyüme.',
      en: 'Continuous growth in leadership, communication, and cross-cultural competencies.',
      ar: 'نمو مستمر في مجالات القيادة والتواصل والكفاءات متعددة الثقافات.',
    },
  },
];

export default async function VolunteerPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: {
      eyebrow: 'Gönüllü Ol',
      title: 'Ekibimize Katıl',
      sub: 'Anlayış ve diyalog köprüleri kurmak için gönüllü ekibimize katıl.',
    },
    en: {
      eyebrow: 'Volunteer',
      title: 'Join Our Team',
      sub: 'Join our volunteer team to build bridges of understanding and dialogue.',
    },
    ar: {
      eyebrow: 'تطوع',
      title: 'انضم إلى فريقنا',
      sub: 'انضم إلى فريق المتطوعين لبناء جسور الفهم والحوار.',
    },
  };
  const h = headings[l] ?? headings.tr;

  const stepSection = {
    tr: { eyebrow: 'Nasıl Katılırsın', title: '4 Adımlı Basit Süreç' },
    en: { eyebrow: 'How to Join', title: 'Simple 4-Step Process' },
    ar: { eyebrow: 'كيف تنضم', title: 'عملية بسيطة من 4 خطوات' },
  };
  const ss = stepSection[l] ?? stepSection.tr;

  const academyContent = {
    tr: {
      eyebrow: 'KİM Akademi',
      title: 'Kapsamlı Eğitim Programı',
      body: "KİM Akademi, gönüllülerimizin misafirlere en iyi deneyimi sunabilmesi için gereken bilgi ve becerileri edinmelerini sağlar. Program İslam tarihi, kültürel duyarlılık eğitimi ve iletişim becerilerini kapsar.",
      items: ['İslam tarihi & kültürü', 'Kültürel duyarlılık', 'İletişim becerileri', 'Rehberlik teknikleri'],
      stats: [
        { n: '2', label: 'Hafta Eğitim' },
        { n: '100%', label: 'Ücretsiz' },
        { n: '20+', label: 'Konu' },
        { n: '∞', label: 'Destek' },
      ],
    },
    en: {
      eyebrow: 'KIM Academy',
      title: 'Comprehensive Training Program',
      body: 'KIM Academy provides volunteers with the knowledge and skills needed to offer guests the best possible experience. The program covers Islamic history, cultural sensitivity training, and communication skills.',
      items: ['Islamic history & culture', 'Cultural sensitivity', 'Communication skills', 'Guidance techniques'],
      stats: [
        { n: '2', label: 'Weeks Training' },
        { n: '100%', label: 'Free' },
        { n: '20+', label: 'Topics Covered' },
        { n: '∞', label: 'Ongoing Support' },
      ],
    },
    ar: {
      eyebrow: 'أكاديمية كيم',
      title: 'برنامج تدريبي شامل',
      body: 'توفر أكاديمية كيم للمتطوعين المعرفة والمهارات اللازمة لتقديم أفضل تجربة ممكنة للضيوف. يشمل البرنامج التاريخ الإسلامي وتدريب الحساسية الثقافية ومهارات التواصل.',
      items: ['التاريخ والثقافة الإسلامية', 'الحساسية الثقافية', 'مهارات التواصل', 'تقنيات الإرشاد'],
      stats: [
        { n: '2', label: 'أسبوعان تدريب' },
        { n: '100%', label: 'مجاني' },
        { n: '20+', label: 'موضوعاً' },
        { n: '∞', label: 'دعم' },
      ],
    },
  };
  const ac = academyContent[l] ?? academyContent.tr;

  const benefitSection = {
    tr: { eyebrow: 'Avantajlar', title: 'Neden KİM Gönüllüsü Olmalısın?' },
    en: { eyebrow: 'Benefits', title: 'Why Volunteer with KIM?' },
    ar: { eyebrow: 'المزايا', title: 'لماذا تتطوع مع كيم؟' },
  };
  const bs = benefitSection[l] ?? benefitSection.tr;

  const formLabels = {
    tr: { form: 'Başvuru Formu', faq: 'Sık Sorulan Sorular' },
    en: { form: 'Application Form', faq: 'Frequently Asked Questions' },
    ar: { form: 'نموذج الطلب', faq: 'الأسئلة الشائعة' },
  };
  const fl = formLabels[l] ?? formLabels.tr;

  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <section className="relative bg-[#070C18] overflow-hidden">
        {/* Islamic star pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="vol-geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <polygon
                  points="30,3 39,21 57,21 42,33 48,51 30,41 12,51 18,33 3,21 21,21"
                  fill="none"
                  stroke="#C9973A"
                  strokeWidth="0.7"
                />
                <circle cx="30" cy="30" r="8" fill="none" stroke="#C9973A" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vol-geo)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(13,92,99,0.25),transparent)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-28 md:py-36">
          <span className="inline-block px-5 py-1.5 rounded-full border border-[#C9973A]/40 bg-[#C9973A]/10 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-6">
            {h.eyebrow}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {h.title}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">{h.sub}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9973A]/50 to-transparent" />
      </section>

      {/* ── Steps Timeline ── */}
      <section className="bg-[#070C18] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-4">
              {ss.eyebrow}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">{ss.title}</h2>
          </div>

          {/* Horizontal timeline desktop / vertical mobile */}
          <div className="relative">
            {/* Connecting dotted line — desktop only */}
            <div
              className="hidden lg:block absolute top-10 left-0 right-0 h-px"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, #C9973A 0, #C9973A 6px, transparent 6px, transparent 18px)',
                opacity: 0.35,
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Gold number badge */}
                  <div className="relative z-10 w-20 h-20 rounded-full border-2 border-[#C9973A]/40 bg-[#0D1220] flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-[#C9973A] group-hover:bg-[#C9973A]/10 group-hover:shadow-[0_0_30px_rgba(201,151,58,0.2)]">
                    <span className="font-serif text-2xl font-bold text-[#C9973A]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {step.titles[l]}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-[180px]">
                    {step.descs[l]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KIM Academy ── */}
      <section className="relative bg-[#0B1628] py-24 overflow-hidden">
        {/* Animated gold grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="gold-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9973A" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gold-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D5C63]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9973A]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block px-4 py-1 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-5">
                {ac.eyebrow}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2 mb-5">
                {ac.title}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-base">{ac.body}</p>

              <ul className="space-y-3">
                {ac.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C9973A]/15 border border-[#C9973A]/30 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#C9973A"
                        strokeWidth={3}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9973A]/15 border border-[#C9973A]/25 mx-auto mb-8">
                <MessageSquare className="w-8 h-8" style={{ color: '#C9973A' }} strokeWidth={1.5} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {ac.stats.map((s) => (
                  <div
                    key={s.label}
                    className="text-center bg-white/5 border border-white/8 rounded-2xl p-5"
                  >
                    <div className="font-serif text-3xl font-bold text-white mb-1">{s.n}</div>
                    <div className="text-white/50 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-[#070C18] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-4">
              {bs.eyebrow}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">{bs.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => {
              const { Icon } = b;
              return (
                <div
                  key={b.titles.en}
                  className="group rounded-2xl border border-white/[0.06] bg-[#0D1220] p-7 hover:border-[#C9973A]/30 hover:bg-[#0D1220] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,151,58,0.08)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9973A]/10 border border-[#C9973A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C9973A]/18 transition-colors duration-300">
                    <Icon className="w-5 h-5" style={{ color: '#C9973A' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-2">{b.titles[l]}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.descs[l]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + FAQ ── */}
      <section className="bg-[#0B1628] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">
                {fl.form}
              </h2>
              <VolunteerForm />
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">
                {fl.faq}
              </h2>
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
