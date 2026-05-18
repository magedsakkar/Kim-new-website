import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Gizlilik Politikası', en: 'Privacy Policy', ar: 'سياسة الخصوصية' };
  const descs = { tr: 'KİM Vakfı gizlilik politikası.', en: 'KIM Foundation privacy policy.', ar: 'سياسة خصوصية مؤسسة كيم.' };
  return buildMetadata({ locale, slug: 'privacy', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const CONTENT = {
  tr: {
    title: 'Gizlilik Politikası',
    updated: 'Son güncelleme: Mayıs 2025',
    sections: [
      {
        heading: 'Topladığımız Bilgiler',
        body: 'Web sitemizi ziyaret ettiğinizde anonim kullanım verisi (sayfa görüntülemeleri, oturum süresi) toplayabiliriz. İletişim formu aracılığıyla gönderdiğiniz ad, e-posta adresi ve mesaj gibi kişisel bilgiler yalnızca talebinizi yanıtlamak amacıyla kullanılır.',
      },
      {
        heading: 'Bilgilerin Kullanımı',
        body: 'Topladığımız veriler; hizmetlerimizi iyileştirmek, sorularınızı yanıtlamak ve etkinlikler hakkında bilgilendirme sağlamak amacıyla kullanılmaktadır. Kişisel verileriniz üçüncü taraflarla satılmaz veya paylaşılmaz.',
      },
      {
        heading: 'Çerezler',
        body: 'Sitemiz, kullanıcı deneyimini geliştirmek amacıyla analitik çerezler kullanabilir. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.',
      },
      {
        heading: 'Haklarınız',
        body: 'Kişisel verilerinize erişme, düzeltme veya silme hakkına sahipsiniz. Bu talepler için bizimle iletişime geçebilirsiniz.',
      },
      {
        heading: 'İletişim',
        body: 'Gizlilik politikamıza ilişkin sorularınız için lütfen kim@kimvakfi.com adresine e-posta gönderin.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2025',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'When you visit our website, we may collect anonymous usage data (page views, session duration). Personal information you submit via the contact form — such as your name, email address, and message — is used solely to respond to your request.',
      },
      {
        heading: 'How We Use Information',
        body: 'We use collected data to improve our services, respond to inquiries, and share information about events. Your personal data is never sold or shared with third parties.',
      },
      {
        heading: 'Cookies',
        body: 'Our website may use analytics cookies to enhance your browsing experience. You can disable cookies through your browser settings.',
      },
      {
        heading: 'Your Rights',
        body: 'You have the right to access, correct, or delete your personal data. Please contact us to submit such a request.',
      },
      {
        heading: 'Contact',
        body: 'If you have questions about this privacy policy, please email us at kim@kimvakfi.com.',
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث: مايو 2025',
    sections: [
      {
        heading: 'المعلومات التي نجمعها',
        body: 'عند زيارتك لموقعنا، قد نجمع بيانات استخدام مجهولة الهوية (مشاهدات الصفحة، مدة الجلسة). يتم استخدام المعلومات الشخصية التي ترسلها عبر نموذج الاتصال — مثل الاسم وعنوان البريد الإلكتروني والرسالة — فقط للرد على طلبك.',
      },
      {
        heading: 'كيف نستخدم المعلومات',
        body: 'نستخدم البيانات المجمعة لتحسين خدماتنا والرد على الاستفسارات ومشاركة معلومات الفعاليات. لا يتم بيع بياناتك الشخصية أو مشاركتها مع أطراف ثالثة.',
      },
      {
        heading: 'ملفات تعريف الارتباط',
        body: 'قد يستخدم موقعنا ملفات تعريف الارتباط التحليلية لتحسين تجربة التصفح. يمكنك تعطيلها من خلال إعدادات المتصفح.',
      },
      {
        heading: 'حقوقك',
        body: 'يحق لك الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. يرجى التواصل معنا لتقديم طلبك.',
      },
      {
        heading: 'التواصل',
        body: 'إذا كانت لديك أسئلة حول سياسة الخصوصية، يرجى مراسلتنا على kim@kimvakfi.com.',
      },
    ],
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const l = (locale as keyof typeof CONTENT) in CONTENT ? (locale as keyof typeof CONTENT) : 'en';
  const c = CONTENT[l];
  const isRtl = l === 'ar';

  return (
    <div className="pt-20 min-h-screen bg-kim-cream" dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{c.title}</h1>
          <p className="text-white/50 text-sm">{c.updated}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-8 md:p-12 space-y-10">
            {c.sections.map((section) => (
              <div key={section.heading}>
                <div className="w-8 h-1 bg-kim-gold rounded-full mb-4" />
                <h2 className="font-serif text-xl font-bold text-kim-charcoal mb-3">{section.heading}</h2>
                <p className="text-kim-stone leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
