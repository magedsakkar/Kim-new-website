import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Kullanım Koşulları', en: 'Terms of Use', ar: 'شروط الاستخدام' };
  const descs = { tr: 'KİM Vakfı kullanım koşulları.', en: 'KIM Foundation terms of use.', ar: 'شروط استخدام مؤسسة كيم.' };
  return buildMetadata({ locale, slug: 'terms', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const CONTENT = {
  tr: {
    title: 'Kullanım Koşulları',
    updated: 'Son güncelleme: Mayıs 2025',
    sections: [
      {
        heading: 'Kabul',
        body: 'Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş olursunuz. Bu koşullarla aynı fikirde değilseniz lütfen siteyi kullanmayın.',
      },
      {
        heading: 'Hizmetin Kullanımı',
        body: 'Bu site, KİM Vakfı hakkında bilgi sunmak ve kültürlerarası diyaloğu desteklemek amacıyla tasarlanmıştır. İçerikler yalnızca kişisel ve eğitim amaçlı kullanılabilir. Ticari amaçlarla kopyalanması yasaktır.',
      },
      {
        heading: 'Fikri Mülkiyet',
        body: 'Sitedeki tüm içerikler, görseller ve metinler KİM Vakfı\'na aittir ve telif hakkı yasalarıyla korunmaktadır. İzin alınmadan yeniden dağıtılamaz.',
      },
      {
        heading: 'Harici Bağlantılar',
        body: 'Sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriğinden veya gizlilik uygulamalarından sorumlu değiliz.',
      },
      {
        heading: 'Değişiklikler',
        body: 'Bu koşulları önceden bildirim yapmaksızın güncelleme hakkını saklı tutarız. Güncel koşullar her zaman bu sayfada yayımlanır.',
      },
      {
        heading: 'İletişim',
        body: 'Kullanım koşullarına ilişkin sorularınız için kim@kimvakfi.com adresine yazabilirsiniz.',
      },
    ],
  },
  en: {
    title: 'Terms of Use',
    updated: 'Last updated: May 2025',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By using this website, you agree to the following terms. If you do not agree, please refrain from using the site.',
      },
      {
        heading: 'Use of Service',
        body: 'This site is designed to share information about KIM Foundation and support cross-cultural dialogue. Content may be used for personal and educational purposes only. Commercial reproduction is prohibited.',
      },
      {
        heading: 'Intellectual Property',
        body: 'All content, images, and text on this site are the property of KIM Foundation and are protected by copyright law. Redistribution without permission is not allowed.',
      },
      {
        heading: 'External Links',
        body: 'Our site may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.',
      },
      {
        heading: 'Changes',
        body: 'We reserve the right to update these terms without prior notice. The current terms are always published on this page.',
      },
      {
        heading: 'Contact',
        body: 'For questions about these terms, please write to kim@kimvakfi.com.',
      },
    ],
  },
  ar: {
    title: 'شروط الاستخدام',
    updated: 'آخر تحديث: مايو 2025',
    sections: [
      {
        heading: 'القبول',
        body: 'باستخدامك لهذا الموقع، فإنك توافق على الشروط التالية. إذا لم توافق عليها، يرجى الامتناع عن استخدام الموقع.',
      },
      {
        heading: 'استخدام الخدمة',
        body: 'تم تصميم هذا الموقع لمشاركة معلومات عن مؤسسة كيم ودعم الحوار بين الثقافات. يمكن استخدام المحتوى للأغراض الشخصية والتعليمية فقط. يُحظر النسخ التجاري.',
      },
      {
        heading: 'الملكية الفكرية',
        body: 'جميع المحتويات والصور والنصوص على هذا الموقع هي ملك لمؤسسة كيم وتحميها قوانين حقوق النشر. لا يجوز إعادة توزيعها دون إذن.',
      },
      {
        heading: 'الروابط الخارجية',
        body: 'قد يحتوي موقعنا على روابط لمواقع جهات خارجية. نحن غير مسؤولين عن محتواها أو ممارسات الخصوصية فيها.',
      },
      {
        heading: 'التغييرات',
        body: 'نحتفظ بالحق في تحديث هذه الشروط دون إشعار مسبق. تُنشر الشروط الحالية دائمًا على هذه الصفحة.',
      },
      {
        heading: 'التواصل',
        body: 'لأي أسئلة حول هذه الشروط، يرجى الكتابة إلى kim@kimvakfi.com.',
      },
    ],
  },
};

export default async function TermsPage({ params }: Props) {
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
