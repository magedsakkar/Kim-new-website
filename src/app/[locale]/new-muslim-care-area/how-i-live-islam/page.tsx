'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Sunrise,
  ShoppingBasket,
  Banknote,
  Users,
  Heart,
  MessageCircle,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

const T = {
  en: {
    badge: 'New Muslim Care Area',
    eyebrow: 'How I Live Islam',
    title: 'Living Islam in the Modern World',
    subtitle:
      'Practical, grounded guidance for every dimension of a Muslim life — from the rhythm of daily prayer to building a faith-centred family and community.',
    topicsEyebrow: 'Your Six Pillars of Practice',
    topicsTitle: 'Explore the Core Areas',
    topicsSubtitle:
      'Each area offers practical steps, evidence-based guidance, and community support to help you live Islam authentically.',
    routineEyebrow: 'A Day in the Life',
    routineTitle: 'The Muslim Daily Rhythm',
    routineSubtitle:
      'Islam structures time with purpose. Five daily prayers anchor every day — here is what a typical Muslim day looks like.',
    routineSteps: [
      { time: 'Fajr · Dawn', desc: 'Wake before sunrise. Two rak\'ahs Sunnah, then two Fard. Begin the day with dhikr and intention.' },
      { time: 'Dhuhr · Midday', desc: 'Four rak\'ahs Sunnah, four Fard. A midday pause — a reminder that success comes from Allah.' },
      { time: 'Asr · Afternoon', desc: 'Four rak\'ahs Fard. Prophet ﷺ said: "The one who misses Asr — it is as if he has lost his family and wealth."' },
      { time: 'Maghrib · Sunset', desc: 'Three rak\'ahs Fard. The Quran recommends reciting Surah Al-Kahf on Fridays. Family gathers.' },
      { time: 'Isha · Night', desc: 'Four rak\'ahs Fard plus Witr. The night closes in gratitude. Optional Tahajjud for the devoted.' },
    ],
    quoteText: 'The best of people are those who are most beneficial to people.',
    quoteAuthor: 'Prophet Muhammad ﷺ',
    ctaTitle: 'Start Your Journey',
    ctaSubtitle: 'Explore What is Islam to build your foundations, then return here to live it daily.',
    ctaButton: 'What is Islam',
    ctaContact: 'Talk to Our Team',
    back: 'Back to New Muslim Care Area',
    topics: [
      {
        key: 'prayer',
        title: 'Prayer Life',
        desc: 'The five daily prayers are the backbone of Muslim identity. They punctuate every day with connection, gratitude, and direction.',
        tips: [
          'Download a prayer time app and set Adhan alerts',
          'Learn Surah Al-Fatiha and three short Surahs first',
          'Find a clean prayer area at home or office',
          'Prayer is valid even if your Arabic is imperfect — keep going',
        ],
        cta: 'Learn How to Pray',
      },
      {
        key: 'halal',
        title: 'Halal Living',
        desc: 'Halal is not just food — it is a lens through which you make ethical, conscious choices in every purchase, interaction, and habit.',
        tips: [
          'Look for certified halal meat or fish as the default',
          'Avoid pork derivatives (gelatin, lard) in packaged foods',
          'Alcohol-free is the Islamic standard — check ingredients',
          'Ethical consumption is part of halal — avoid waste',
        ],
        cta: 'Halal Guidance',
      },
      {
        key: 'finance',
        title: 'Islamic Finance',
        desc: 'Islam prohibits Riba (interest/usury) and encourages ethical wealth — generosity, Zakat, and investment in what benefits society.',
        tips: [
          'Calculate and pay your annual Zakat (2.5% of savings above Nisab)',
          'Explore Islamic mortgage or rent-to-own alternatives',
          'Keep spending simple: needs before wants',
          'Sadaqah (voluntary charity) can be given any amount, any time',
        ],
        cta: 'Finance Principles',
      },
      {
        key: 'family',
        title: 'Family & Marriage',
        desc: 'The family is the first school in Islam. Marriage is described as half of the religion — a covenant before Allah, built on mercy and tranquility.',
        tips: [
          'Marriage in Islam requires mutual consent and Mahr (gift)',
          'Both spouses have rights and responsibilities defined by the Quran',
          'Raising children with Bismillah, prayer, and stories of the Prophet ﷺ',
          'Family disagreements are resolved through Shura (consultation)',
        ],
        cta: 'Family in Islam',
      },
      {
        key: 'community',
        title: 'Community',
        desc: 'No Muslim is an island. The Ummah is a global family — your local mosque is your neighbourhood community centre and spiritual home.',
        tips: [
          'Attend Friday Jumu\'ah prayer when possible',
          'Join a local Islamic study circle or new Muslim group',
          'Volunteer at your mosque — even one hour a week matters',
          'The Prophet ﷺ said: "None of you truly believes until he loves for his brother what he loves for himself."',
        ],
        cta: 'Find Community',
      },
      {
        key: 'dawah',
        title: 'Sharing Your Faith',
        desc: 'Dawah is not pressure — it is living Islam so beautifully that others are naturally drawn to ask about it. Be a walking answer.',
        tips: [
          'Your character is your first and best Dawah',
          'Answer questions honestly — "I don\'t know, let me find out" is fine',
          'Share resources: books, trusted websites, or visit KİM Vakfı',
          'Invite friends to experience Islamic culture — food, Ramadan, Eid',
        ],
        cta: 'Dawah Resources',
      },
    ],
  },
  tr: {
    badge: 'Yeni Müslüman Bakım Alanı',
    eyebrow: 'İslam\'ı Nasıl Yaşıyorum',
    title: 'Modern Dünyada İslam\'ı Yaşamak',
    subtitle:
      'Günlük namaz ritüelinden, iman merkezli bir aile ve topluluk oluşturmaya kadar Müslüman yaşamının her boyutu için pratik, sağlam rehberlik.',
    topicsEyebrow: 'Pratiğin Altı Temel Direği',
    topicsTitle: 'Ana Alanları Keşfedin',
    topicsSubtitle:
      'Her alan, İslam\'ı özgün biçimde yaşamanıza yardımcı olmak için pratik adımlar, kanıta dayalı rehberlik ve topluluk desteği sunar.',
    routineEyebrow: 'Bir Günün Hayatı',
    routineTitle: 'Müslüman Günlük Ritmi',
    routineSubtitle:
      'İslam, zamanı amaçlı olarak yapılandırır. Beş vakit namaz her günü çıpalayan unsurdur — tipik bir Müslüman günü şöyle görünür.',
    routineSteps: [
      { time: 'Sabah · Fajr', desc: 'Güneş doğmadan önce kalk. İki rekat sünnet, ardından iki rekat farz. Günü zikir ve niyetle başlat.' },
      { time: 'Öğle · Dhuhr', desc: 'Dört rekat sünnet, dört rekat farz. Öğle molası — başarının Allah\'tan geldiğinin hatırlatıcısı.' },
      { time: 'İkindi · Asr', desc: 'Dört rekat farz. Hz. Peygamber ﷺ: "Asrı kaçıran, sanki ailesi ve malını yitirmiş gibidir."' },
      { time: 'Akşam · Maghrib', desc: 'Üç rekat farz. Cuma günleri Kehf suresi okunması tavsiye edilir. Aile bir araya gelir.' },
      { time: 'Yatsı · Isha', desc: 'Dört rekat farz ve Vitir. Gece şükranla kapanır. İbadet ehli için Teheccüd seçeneği var.' },
    ],
    quoteText: 'İnsanların en hayırlısı, onlara en çok faydalı olandır.',
    quoteAuthor: 'Hz. Muhammed ﷺ',
    ctaTitle: 'Yolculuğuna Başla',
    ctaSubtitle: 'Temellerini oluşturmak için İslam Nedir\'i keşfet, ardından buraya dönerek her gün yaşa.',
    ctaButton: 'İslam Nedir',
    ctaContact: 'Ekibimizle Konuş',
    back: 'Yeni Müslüman Bakım Alanı\'na Dön',
    topics: [
      {
        key: 'prayer',
        title: 'Namaz Hayatı',
        desc: 'Beş vakit namaz, Müslüman kimliğinin omurgasını oluşturur. Her günü bağlantı, şükran ve yönelişle noktalandırır.',
        tips: [
          'Bir namaz vakti uygulaması indir ve ezan uyarılarını ayarla',
          'Önce Fatiha suresini ve üç kısa sure öğren',
          'Evde veya ofiste temiz bir namaz alanı bul',
          'Arapçan mükemmel olmasa da namaz geçerlidir — devam et',
        ],
        cta: 'Namaz Kılmayı Öğren',
      },
      {
        key: 'halal',
        title: 'Helal Yaşam',
        desc: 'Helal, yalnızca yemekle ilgili değildir — her satın alma, etkileşim ve alışkanlıkta bilinçli, etik seçimler yapmanın bir merceğidir.',
        tips: [
          'Varsayılan olarak sertifikalı helal et veya balık tercih et',
          'Paketli ürünlerde domuz türevlerine (jelatin, yağ) dikkat et',
          'Alkol içermemek İslami standarttır — içerik listesini kontrol et',
          'Etik tüketim helalin parçasıdır — israftan kaçın',
        ],
        cta: 'Helal Rehberi',
      },
      {
        key: 'finance',
        title: 'İslami Finans',
        desc: 'İslam, Riba\'yı (faiz/tefecilik) yasaklar ve etik serveti teşvik eder — cömertlik, Zekât ve topluma fayda sağlayan yatırım.',
        tips: [
          'Yıllık Zekâtını hesapla ve öde (Nisap üzerindeki tasarrufların %2,5\'i)',
          'Faizsiz mortgage veya kiralama alternatiflerini araştır',
          'Harcamayı sade tut: ihtiyaçları isteklerin önünde tut',
          'Sadaka her miktarda, her zaman verilebilir',
        ],
        cta: 'Finans İlkeleri',
      },
      {
        key: 'family',
        title: 'Aile ve Evlilik',
        desc: 'Aile, İslam\'da ilk okuldur. Evlilik, dinin yarısı olarak tanımlanır — Allah katında merhamet ve huzur üzerine kurulmuş bir ahit.',
        tips: [
          'İslam\'da evlilik karşılıklı rıza ve Mehir gerektirir',
          'Her iki eşin Kuran\'da tanımlı hakları ve sorumlulukları vardır',
          'Besmele, namaz ve Hz. Peygamber\'in hikâyeleriyle çocuk yetiştir',
          'Aile anlaşmazlıkları istişare (Şura) ile çözülür',
        ],
        cta: 'İslam\'da Aile',
      },
      {
        key: 'community',
        title: 'Topluluk',
        desc: 'Hiçbir Müslüman tek başına bir ada değildir. Ümmet küresel bir ailedir — yerel camii senin mahalle topluluk merkezin ve manevi yuvanızdır.',
        tips: [
          'Mümkün olduğunda Cuma namazına katıl',
          'Yerel bir İslam sohbet halkasına veya yeni Müslüman grubuna katıl',
          'Caminde gönüllü ol — haftada bir saat bile önem taşır',
          'Hz. Peygamber ﷺ: "Kendisi için istediğini kardeşi için istemedikçe hiçbiriniz gerçek anlamda iman etmiş olmaz."',
        ],
        cta: 'Topluluk Bul',
      },
      {
        key: 'dawah',
        title: 'İnancını Paylaşmak',
        desc: 'Davet baskı değildir — İslam\'ı o kadar güzel yaşamaktır ki başkaları doğal olarak sorular sormaya çekilir. Yürüyen bir cevap ol.',
        tips: [
          'Karakterin ilk ve en iyi davetin',
          'Soruları dürüstçe yanıtla — "Bilmiyorum, öğreneceğim" iyidir',
          'Kaynakları paylaş: kitaplar, güvenilir web siteleri veya KİM Vakfı\'nı ziyaret edin',
          'Arkadaşları İslam kültürünü yaşamaya davet et — yemek, Ramazan, Bayram',
        ],
        cta: 'Davet Kaynakları',
      },
    ],
  },
  ar: {
    badge: 'منطقة رعاية المسلم الجديد',
    eyebrow: 'كيف أعيش الإسلام',
    title: 'العيش بالإسلام في العالم الحديث',
    subtitle:
      'إرشادات عملية وراسخة لكل جانب من جوانب الحياة الإسلامية — من إيقاع الصلاة اليومية إلى بناء أسرة ومجتمع متمحورين حول الإيمان.',
    topicsEyebrow: 'أعمدتك الستة للممارسة',
    topicsTitle: 'استكشف المجالات الأساسية',
    topicsSubtitle:
      'يوفر كل مجال خطوات عملية وإرشادات مبنية على الأدلة ودعم المجتمع لمساعدتك على عيش الإسلام بأصالة.',
    routineEyebrow: 'يوم في الحياة',
    routineTitle: 'الإيقاع اليومي للمسلم',
    routineSubtitle:
      'ينظّم الإسلام الوقت بهدف. الصلوات الخمس ترسّخ كل يوم — إليك شكل يوم مسلم نموذجي.',
    routineSteps: [
      { time: 'الفجر · الفجر', desc: 'الاستيقاظ قبل شروق الشمس. ركعتا سنة ثم ركعتان فرض. ابدأ اليوم بالذكر والنية.' },
      { time: 'الظهر · الظهر', desc: 'أربع ركعات سنة وأربع ركعات فرض. توقف في منتصف النهار — تذكير بأن النجاح يأتي من الله.' },
      { time: 'العصر · العصر', desc: 'أربع ركعات فرض. قال النبي ﷺ: "من فاتته صلاة العصر فكأنما وُتر أهله وماله."' },
      { time: 'المغرب · المغرب', desc: 'ثلاث ركعات فرض. يُستحب قراءة سورة الكهف يوم الجمعة. تجتمع العائلة.' },
      { time: 'العشاء · العشاء', desc: 'أربع ركعات فرض والوتر. ينتهي الليل بالشكر. صلاة التهجد اختيارية للمتفانين.' },
    ],
    quoteText: 'خير الناس أنفعهم للناس.',
    quoteAuthor: 'النبي محمد ﷺ',
    ctaTitle: 'ابدأ رحلتك',
    ctaSubtitle: 'استكشف "ما هو الإسلام" لبناء أسسك، ثم عُد هنا لتعيشه يومياً.',
    ctaButton: 'ما هو الإسلام',
    ctaContact: 'تحدث مع فريقنا',
    back: 'العودة إلى منطقة رعاية المسلم الجديد',
    topics: [
      {
        key: 'prayer',
        title: 'حياة الصلاة',
        desc: 'الصلوات الخمس هي العمود الفقري للهوية الإسلامية. تُضفي على كل يوم طابع التواصل والشكر والاتجاه.',
        tips: [
          'حمّل تطبيق مواقيت الصلاة وفعّل تنبيهات الأذان',
          'ابدأ بتعلم سورة الفاتحة وثلاث سور قصيرة',
          'خصص مكاناً نظيفاً للصلاة في المنزل أو المكتب',
          'الصلاة صحيحة حتى لو لم تكن عربيتك مثالية — استمر',
        ],
        cta: 'تعلم كيفية الصلاة',
      },
      {
        key: 'halal',
        title: 'الحياة الحلال',
        desc: 'الحلال ليس الطعام فحسب — بل هو عدسة ترى من خلالها كل خيار أخلاقي وواعٍ في كل عملية شراء وتفاعل وعادة.',
        tips: [
          'اختر اللحوم أو السمك الحلال المعتمد كخيار افتراضي',
          'تجنب مشتقات لحم الخنزير (الجيلاتين، الشحم) في الأطعمة المعلبة',
          'خلو المنتج من الكحول هو المعيار الإسلامي — تحقق من المكونات',
          'الاستهلاك الأخلاقي جزء من الحلال — تجنب الإسراف',
        ],
        cta: 'إرشادات الحلال',
      },
      {
        key: 'finance',
        title: 'التمويل الإسلامي',
        desc: 'يحرّم الإسلام الربا ويشجع على الثروة الأخلاقية — الكرم والزكاة والاستثمار فيما ينفع المجتمع.',
        tips: [
          'احسب زكاتك السنوية وادفعها (2.5% من المدخرات فوق النصاب)',
          'استكشف بدائل الرهن العقاري الإسلامي أو الإيجار المنتهي بالتمليك',
          'بسّط الإنفاق: الاحتياجات قبل الرغبات',
          'الصدقة يمكن إعطاؤها بأي مبلغ وفي أي وقت',
        ],
        cta: 'مبادئ التمويل',
      },
      {
        key: 'family',
        title: 'الأسرة والزواج',
        desc: 'الأسرة هي المدرسة الأولى في الإسلام. يوصف الزواج بأنه نصف الدين — ميثاق أمام الله مبني على الرحمة والسكينة.',
        tips: [
          'الزواج في الإسلام يستلزم الموافقة المتبادلة والمهر',
          'كلا الزوجين لهما حقوق ومسؤوليات محددة في القرآن',
          'تربية الأطفال بالبسملة والصلاة وقصص النبي ﷺ',
          'تُحل الخلافات الأسرية من خلال الشورى',
        ],
        cta: 'الأسرة في الإسلام',
      },
      {
        key: 'community',
        title: 'المجتمع',
        desc: 'لا يعيش مسلم في جزيرة. الأمة عائلة عالمية — مسجدك المحلي هو مركز مجتمعك في الحي وموطنك الروحي.',
        tips: [
          'حضور صلاة الجمعة كلما أمكن',
          'الانضمام إلى حلقة دراسة إسلامية محلية أو مجموعة للمسلمين الجدد',
          'التطوع في مسجدك — حتى ساعة واحدة في الأسبوع تحدث فرقاً',
          'قال النبي ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه."',
        ],
        cta: 'ابحث عن مجتمع',
      },
      {
        key: 'dawah',
        title: 'مشاركة إيمانك',
        desc: 'الدعوة ليست ضغطاً — بل هي العيش بالإسلام بجمال حتى ينجذب الآخرون بشكل طبيعي إلى السؤال عنه. كن إجابة سائرة.',
        tips: [
          'شخصيتك هي دعوتك الأولى والأفضل',
          'أجب على الأسئلة بصدق — "لا أعلم، سأبحث" مقبول تماماً',
          'شارك الموارد: كتب، مواقع موثوقة، أو زيارة مؤسسة كيم',
          'ادعُ الأصدقاء لتجربة الثقافة الإسلامية — طعام، رمضان، عيد',
        ],
        cta: 'موارد الدعوة',
      },
    ],
  },
};

const TOPIC_ICONS = [Sunrise, ShoppingBasket, Banknote, Heart, Users, MessageCircle];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function HowILiveIslamPage() {
  const locale = useLocale();
  const l = (locale === 'tr' || locale === 'ar') ? locale : 'en';
  const t = T[l];
  const isRtl = l === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#08101E] pt-20">
        <div className="absolute inset-0 pointer-events-none opacity-[0.055]">
          <svg width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="hili-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.2" fill="#C9973A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hili-dots)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_45%,rgba(13,92,99,0.22),transparent)] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#C9973A]/6 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest">
              <BookOpen className="w-3 h-3" />
              {t.badge}
            </span>
            <span className="hidden sm:block text-white/20 text-xs">—</span>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest">
              {t.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9973A]/40 to-transparent" />
      </section>

      {/* ── Six Topic Cards ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-4"
            >
              {t.topicsEyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {t.topicsTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed"
            >
              {t.topicsSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.topics.map((topic, i) => {
              const Icon = TOPIC_ICONS[i];
              return (
                <motion.div
                  key={topic.key}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-7 hover:border-[#C9973A]/40 hover:bg-amber-50/20 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(201,151,58,0.12)] flex flex-col"
                >
                  {/* Glow blob on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,151,58,0.06), transparent 70%)' }} />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#C9973A]/10 border border-[#C9973A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C9973A]/18 group-hover:border-[#C9973A]/35 transition-all duration-300 flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#C9973A]" strokeWidth={1.6} />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 group-hover:text-[#C9973A] transition-colors duration-300">
                    {topic.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {topic.desc}
                  </p>

                  {/* Tips list */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {topic.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9973A]/60 flex-shrink-0" />
                        <span className="text-gray-400 text-xs leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom bar progress */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[#C9973A]/60 text-xs font-medium">{topic.cta}</span>
                      <Arrow className="w-4 h-4 text-[#C9973A]/40 group-hover:text-[#C9973A] group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Daily Routine Timeline ── */}
      <section className="relative bg-gray-50 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="hili-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9973A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hili-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D5C63]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-[#C9973A]/30 bg-[#C9973A]/8 text-[#C9973A] text-xs font-semibold uppercase tracking-widest mb-4"
            >
              {t.routineEyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {t.routineTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-500 text-base max-w-xl mx-auto"
            >
              {t.routineSubtitle}
            </motion.p>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Central line */}
            <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#C9973A]/5 via-[#C9973A]/40 to-[#C9973A]/5 ${isRtl ? 'right-6 sm:right-auto sm:left-1/2' : 'left-6 sm:left-1/2'} -translate-x-px`} />

            <div className="space-y-8">
              {t.routineSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`relative flex items-start gap-6 ${
                      isRtl
                        ? 'flex-row-reverse sm:flex-row-reverse'
                        : isEven
                        ? 'sm:flex-row'
                        : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Node */}
                    <div className={`relative z-10 flex-shrink-0 ${
                      isRtl
                        ? 'order-first'
                        : 'order-first sm:order-none'
                    }`}>
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#C9973A]/50 flex items-center justify-center shadow-sm">
                        <span className="font-serif text-sm font-bold text-[#C9973A]">{i + 1}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 rounded-xl border border-gray-100 bg-white p-5 hover:border-[#C9973A]/30 shadow-sm transition-all duration-300 ${
                      isRtl ? '' : isEven ? 'sm:mr-auto sm:max-w-[calc(50%-3rem)]' : 'sm:ml-auto sm:max-w-[calc(50%-3rem)]'
                    }`}>
                      <div className="text-[#C9973A] text-xs font-bold uppercase tracking-wider mb-2">{step.time}</div>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hadith Quote ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden border border-amber-100"
            style={{ background: 'linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%)' }}
          >
            <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-1.5 h-full bg-gradient-to-b from-[#C9973A] to-[#C9973A]/30`} />
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#C9973A]/5 blur-2xl" />

            <div className="px-10 py-10 md:px-12 relative z-10">
              {isRtl && (
                <p className="font-serif text-3xl text-[#C9973A]/40 mb-2 leading-none">&ldquo;</p>
              )}
              {!isRtl && (
                <p className="font-serif text-5xl text-[#C9973A]/30 mb-2 leading-none">&ldquo;</p>
              )}
              <p className={`font-serif text-xl md:text-2xl text-gray-800 leading-relaxed ${isRtl ? 'text-right' : ''}`}>
                {t.quoteText}
              </p>
              <footer className={`mt-5 text-sm font-bold text-[#C9973A] ${isRtl ? 'text-right' : ''}`}>
                — {t.quoteAuthor}
              </footer>
            </div>
          </motion.blockquote>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto mb-10">{t.ctaSubtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/what-is-islam"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9973A] text-[#08101E] font-bold text-sm hover:bg-[#E8B96A] transition-colors duration-300"
              >
                {t.ctaButton}
                <Arrow className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:border-[#C9973A]/50 hover:bg-amber-50 transition-all duration-300"
              >
                {t.ctaContact}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Back link ── */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/new-muslim-care-area"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#C9973A] transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
