import { ContactForm } from '@/components/contact/ContactForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT } from '@/lib/constants';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'İletişim', en: 'Contact', ar: 'اتصل بنا' };
  const descs = { tr: 'Bize ulaşın', en: 'Get in touch', ar: 'تواصل معنا' };
  return buildMetadata({ locale, slug: 'contact', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const INFO = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    labels: { tr: 'Adres', en: 'Address', ar: 'العنوان' },
    value: { tr: CONTACT.address.tr, en: CONTACT.address.en, ar: CONTACT.address.ar },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    labels: { tr: 'Telefon', en: 'Phone', ar: 'الهاتف' },
    value: { tr: CONTACT.phone, en: CONTACT.phone, ar: CONTACT.phone },
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    labels: { tr: 'E-posta', en: 'Email', ar: 'البريد الإلكتروني' },
    value: { tr: CONTACT.email, en: CONTACT.email, ar: CONTACT.email },
    href: `mailto:${CONTACT.email}`,
  },
];

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  const headings = {
    tr: { eyebrow: 'İletişim', title: 'Bize Ulaşın', sub: 'Sorularınız için bizimle iletişime geçin.' },
    en: { eyebrow: 'Contact', title: 'Get in Touch', sub: 'Contact us for any questions or inquiries.' },
    ar: { eyebrow: 'اتصل بنا', title: 'تواصل معنا', sub: 'اتصل بنا لأي أسئلة أو استفسارات.' },
  };
  const h = headings[l] || headings.tr;

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">{h.eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{h.title}</h1>
          <p className="text-white/80 text-lg">{h.sub}</p>
        </div>
      </section>

      <section className="py-20 bg-kim-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {INFO.map((item) => (
                <div key={item.labels.en} className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 bg-kim-navy-light rounded-xl flex items-center justify-center text-kim-navy flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-kim-stone mb-1">{item.labels[l]}</div>
                    {item.href ? (
                      <a href={item.href} className="text-kim-charcoal hover:text-kim-navy transition-colors font-medium">
                        {item.value[l]}
                      </a>
                    ) : (
                      <p className="text-kim-charcoal font-medium">{item.value[l]}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-sm h-56">
                <iframe
                  src={CONTACT.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KİM Vakfı Location"
                />
              </div>
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-kim-stone hover:text-kim-navy transition-colors mt-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {l === 'ar' ? 'عرض على خرائط جوجل' : l === 'en' ? 'Open in Google Maps' : "Google Maps'te aç"}
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-kim-charcoal mb-8">
                {l === 'ar' ? 'أرسل لنا رسالة' : l === 'en' ? 'Send us a message' : 'Bize Mesaj Gönderin'}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
