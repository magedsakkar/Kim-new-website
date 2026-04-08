import { SectionHeading } from '@/components/ui/SectionHeading';
import { buildMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/constants';
import { MessageSquare, Globe, BookOpen, Star, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = { tr: 'Hakkımızda', en: 'About Us', ar: 'من نحن' };
  const descs = { tr: 'KİM Vakfı hakkında bilgi edinin.', en: 'Learn about KIM Foundation.', ar: 'تعرف على مؤسسة كيم.' };
  return buildMetadata({ locale, slug: 'about', title: titles[locale as keyof typeof titles] || titles.tr, description: descs[locale as keyof typeof descs] || descs.tr });
}

const VALUES: { icon: LucideIcon; title: Record<string, string>; desc: Record<string, string> }[] = [
  {
    icon: MessageSquare,
    title: { tr: 'Diyalog', en: 'Dialogue', ar: 'الحوار' },
    desc: { tr: 'Açık ve samimi iletişimi teşvik ediyoruz.', en: 'We promote open and sincere communication.', ar: 'نشجع التواصل المفتوح والصادق.' },
  },
  {
    icon: Globe,
    title: { tr: 'Kapsayıcılık', en: 'Inclusivity', ar: 'الشمولية' },
    desc: { tr: 'Her geçmişten insanı kucaklıyoruz.', en: 'We embrace people from all backgrounds.', ar: 'نحتضن الناس من جميع الخلفيات.' },
  },
  {
    icon: BookOpen,
    title: { tr: 'Eğitim', en: 'Education', ar: 'التعليم' },
    desc: { tr: 'Bilgiye dayalı anlayışı destekliyoruz.', en: 'We support knowledge-based understanding.', ar: 'ندعم الفهم القائم على المعرفة.' },
  },
  {
    icon: Star,
    title: { tr: 'Saygı', en: 'Respect', ar: 'الاحترام' },
    desc: { tr: 'Her insana değer ve saygıyla yaklaşıyoruz.', en: 'We treat every person with dignity and respect.', ar: 'نعامل كل شخص بكرامة واحترام.' },
  },
];

const DOT_TEXTURE = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as 'tr' | 'en' | 'ar';

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kim-navy to-kim-navy-dark py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            {l === 'ar' ? 'من نحن' : l === 'en' ? 'About Us' : 'Hakkımızda'}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            {l === 'ar' ? 'من أجل الفهم والحوار' : l === 'en' ? 'For Understanding & Dialogue' : 'Anlayış ve Diyalog İçin'}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            {l === 'ar'
              ? 'تأسست مؤسسة كيم في إسطنبول عام 2010 وتبني جسوراً لتعريف غير المسلمين بالإسلام.'
              : l === 'en'
              ? 'Founded in Istanbul in 2010, KIM Foundation builds bridges to introduce Islam to non-Muslim visitors, students, and residents.'
              : "2010 yılında İstanbul'da kurulan KİM Vakfı, Müslüman olmayan ziyaretçilere İslam'ı tanıtmak için köprüler inşa ediyor."}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-1 bg-kim-gold mb-6 rounded-full" />
              <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-4">
                {l === 'ar' ? 'مهمتنا' : l === 'en' ? 'Our Mission' : 'Misyonumuz'}
              </h2>
              <p className="text-kim-stone leading-relaxed mb-8">
                {l === 'ar'
                  ? 'تعزيز التفاهم والحوار بين الثقافات من خلال توفير لقاءات مباشرة وأصيلة مع الإسلام للناس من خلفيات مختلفة.'
                  : l === 'en'
                  ? 'To strengthen cross-cultural understanding and dialogue by providing people from different backgrounds with direct and authentic encounters with Islam.'
                  : 'Kültürlerarası anlayışı ve diyaloğu güçlendirerek, farklı geçmişlerden gelen insanların İslam ile doğrudan ve otantik bir şekilde buluşmasını sağlamak.'}
              </p>

              <div className="w-12 h-1 bg-kim-gold mb-6 rounded-full" />
              <h2 className="font-serif text-3xl font-bold text-kim-charcoal mb-4">
                {l === 'ar' ? 'رؤيتنا' : l === 'en' ? 'Our Vision' : 'Vizyonumuz'}
              </h2>
              <p className="text-kim-stone leading-relaxed">
                {l === 'ar'
                  ? 'بناء عالم تكون فيه الاختلافات الثقافية والدينية جسوراً، وتسود فيه المفاهيم والاحترام.'
                  : l === 'en'
                  ? 'To build a world where cultural and religious differences serve as bridges, and where understanding and respect prevail.'
                  : 'Kültürel ve dini farklılıkların köprü olduğu, anlayış ve saygının egemen olduğu bir dünya inşa etmek.'}
              </p>
            </div>

            {/* Stats — dark cards with gold numbers */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '2010', label: l === 'ar' ? 'سنة التأسيس' : l === 'en' ? 'Founded' : 'Kuruluş Yılı' },
                { number: '4500+', label: l === 'ar' ? 'زائر شهرياً' : l === 'en' ? 'Monthly Visitors' : 'Aylık Ziyaretçi' },
                { number: '105+', label: l === 'ar' ? 'متطوع نشط' : l === 'en' ? 'Active Volunteers' : 'Aktif Gönüllü' },
                { number: '80+', label: l === 'ar' ? 'دولة' : l === 'en' ? 'Countries' : 'Ülke' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 hover:ring-white/20 p-6 text-center hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                >
                  <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
                  <div className="absolute inset-0 bg-gradient-to-br from-kim-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-30 bg-kim-gold transition-opacity" />
                  <div className="relative z-10">
                    <div className="font-serif text-4xl font-black text-kim-gold mb-1">{stat.number}</div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values — dark navy cards with icon */}
      <section className="py-20 bg-kim-cream" id="values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'قيمنا' : l === 'en' ? 'Our Values' : 'Değerlerimiz'}
            title={l === 'ar' ? 'ما الذي يحركنا' : l === 'en' ? 'What Drives Us' : 'Bizi Harekete Geçiren'}
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-kim-navy ring-1 ring-white/10 hover:ring-white/20 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.04]" style={DOT_TEXTURE} />
                {/* Gold glow on hover */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-25 bg-kim-gold transition-opacity duration-400" />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-kim-gold to-transparent" />

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-kim-gold/15 border border-kim-gold/20 flex items-center justify-center mb-5 group-hover:bg-kim-gold/25 group-hover:border-kim-gold/35 transition-all duration-300">
                    <v.icon className="w-5 h-5 text-kim-gold" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif font-bold text-white text-lg mb-2 group-hover:text-kim-gold transition-colors duration-200">
                    {v.title[l]}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{v.desc[l]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white" id="leadership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={l === 'ar' ? 'موقعنا' : l === 'en' ? 'Our Location' : 'Konumumuz'}
            title={l === 'ar' ? 'قلب إسطنبول التاريخي' : l === 'en' ? 'Historical Heart of Istanbul' : "İstanbul'un Tarihi Kalbi"}
            subtitle={l === 'ar' ? 'نحن في منطقة سليمانية التاريخية' : l === 'en' ? 'We are located in the historic Süleymaniye district' : "Tarihi Süleymaniye semtinde yer alıyoruz"}
            className="mb-12"
          />
          <div className="rounded-2xl overflow-hidden shadow-xl h-80 ring-1 ring-gray-200">
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
          <p className="mt-3 text-sm text-kim-stone text-center">
            {CONTACT.address[l]}
            {' · '}
            <a
              href={CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-kim-navy hover:underline font-medium"
            >
              {l === 'ar' ? 'فتح في خرائط جوجل' : l === 'en' ? 'Open in Google Maps' : "Google Maps'te Aç"}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
