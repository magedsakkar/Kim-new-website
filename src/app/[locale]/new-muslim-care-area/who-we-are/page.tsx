'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const T = {
  en: {
    backLink: 'New Muslim Care Area',
    badge: 'New Muslim Care Area',
    title: 'Who We Are',
    subtitle: 'KİM Vakfı — Kültürlerarası İletişim Merkezi. A cross-cultural centre dedicated to authentic Islamic education, meaningful human connection, and global dialogue since 2010.',
    stats: [
      { n: '15+', l: 'Years of Service' },
      { n: '80+', l: 'Partner Countries' },
      { n: '80K+', l: 'Annual Visitors' },
      { n: '12', l: 'Languages' },
    ],
    foundationBadge: 'Foundation',
    foundationTitle: 'Our Foundation',
    pillars: [
      {
        icon: '🌿',
        title: 'Our Mission',
        body: 'KİM Vakfı (Cross Cultural Center) builds bridges of understanding between cultures, faiths, and peoples — providing education, support, and community for new Muslims and curious minds worldwide.',
      },
      {
        icon: '🌍',
        title: 'Our Vision',
        body: 'A world where every seeker of truth has access to authentic, compassionate, and intellectually honest Islamic education — regardless of language, location, or background.',
      },
      {
        icon: '🤝',
        title: 'Our Team',
        body: 'Scholars, educators, designers, and volunteers united by one purpose. We operate across Turkey, Europe, and the Middle East, with partnerships in over 80 countries.',
      },
      {
        icon: '📖',
        title: 'Our History',
        body: 'Founded in Istanbul in 2010, KİM Vakfı has served new Muslims and interfaith dialogue for over 15 years. Our Süleymaniye centre has welcomed hundreds of thousands of visitors from every corner of the world.',
      },
    ],
    digitalBadge: 'Digital Experience',
    digitalTitle: 'Süleymaniye Mosque',
    digitalTitleAccent: 'Tablet App',
    digitalDesc: 'Our interactive tablet application, deployed throughout the Süleymaniye Mosque complex, provides an immersive digital experience for visitors from around the world. Available in 12 languages.',
    requestDemo: 'Request Demo',
    tabletFeatures: [
      { icon: '🗺️', title: 'Interactive Map', desc: 'Full interactive map of Süleymaniye Mosque with points of interest and audio guides.' },
      { icon: '🎧', title: 'Audio Tour', desc: 'Self-guided audio tour available in English, Turkish, Arabic, French, German and Spanish.' },
      { icon: '📚', title: 'Islamic Library', desc: 'Digital library of Islamic texts, brochures, and introductory materials for instant download.' },
      { icon: '🤖', title: 'Ask a Question', desc: 'Built-in chatbot answering visitor questions about Islam and the mosque — available 24/7.' },
      { icon: '🌐', title: 'Multi-Language', desc: 'Fully translated into 12 languages, ensuring every visitor can engage with the mosque\'s history.' },
      { icon: '📋', title: 'Program Guide', desc: 'Browse KİM\'s current programs, upcoming events, and sign up for tours directly from the tablet.' },
    ],
    centersBadge: 'Our Centers',
    centersTitle: 'KİM 1, 2, 3 — Our Three Centers',
    centersSub: 'Three interconnected centers in the heart of Istanbul, each serving a distinct purpose in our mission.',
    centers: [
      {
        id: '1',
        name: 'KİM 1 — Süleymaniye',
        type: 'Visitor Centre & Mosque',
        desc: 'Our flagship centre adjacent to the Süleymaniye Mosque. This is where thousands of tourists, students, and researchers connect with Islam each year — guided tours, prayer demos, Q&A sessions, and a full digital library.',
        highlight: 'Main visitor hub · Est. 2010',
        visits: '80,000+ annual visitors',
      },
      {
        id: '2',
        name: 'KİM 2 — Madrasa',
        type: 'Educational Madrasa',
        desc: 'A restored Ottoman madrasa converted into an Islamic education centre. Home to our structured curriculum, new Muslim support groups, language classes, and academic seminars.',
        highlight: 'Islamic education & seminars',
        visits: 'Weekly classes & programs',
      },
      {
        id: '3',
        name: 'KİM 3 — Media',
        type: 'Media Production Centre',
        desc: 'Our media centre produces documentaries, educational videos, brochures, and digital content for global distribution. Home to our podcast studio and multilingual publication team.',
        highlight: 'Media, content & publication',
        visits: 'Global digital reach',
      },
    ],
    bookTour: 'Book a Tour',
    volBadge: 'Join Us',
    volTitle: 'Our Volunteering Places',
    volSub: 'Whether you are in Istanbul or anywhere in the world, there is a role for you in our mission.',
    volunteerPlaces: [
      { icon: '🕌', title: 'Süleymaniye Visitor Guide', desc: 'Welcome tourists at the mosque, answer questions about Islam and the site\'s history. No prior experience required — full training provided.', location: 'Istanbul, Turkey', type: 'On-site' },
      { icon: '📖', title: 'Islamic Education Facilitator', desc: 'Support our What is Islam educational journey — help new Muslims and curious visitors navigate the curriculum.', location: 'Istanbul, Turkey', type: 'On-site / Online' },
      { icon: '🎬', title: 'Media & Content Creator', desc: 'Help produce videos, write articles, design graphics, or translate content for our multilingual media library.', location: 'Remote', type: 'Remote' },
      { icon: '🌐', title: 'Online Support Counselor', desc: 'Provide online guidance and emotional support for new Muslims through our chatbot platform and social media channels.', location: 'Remote', type: 'Remote' },
      { icon: '🗣️', title: 'Language Translator', desc: 'Help translate our educational materials, brochures, and digital content into Urdu, Malay, French, German, and Russian.', location: 'Remote', type: 'Remote' },
      { icon: '🤝', title: 'Partner Liaison', desc: 'Connect us with mosques, Islamic centers, and universities in your country to expand our global partner network.', location: 'Your Country', type: 'Remote' },
    ],
    readyVol: 'Ready to volunteer?',
    readyVolDesc: 'Contact us to discuss which role fits you best. We welcome all backgrounds and skill sets.',
    getInTouch: 'Get in Touch',
    quoteText: '"The best of people is he who is most beneficial to people."',
    quoteAuthor: '— Prophet Muhammad ﷺ',
    back: 'Back to New Muslim Care Area',
  },
  tr: {
    backLink: 'Yeni Müslüman Bakım Alanı',
    badge: 'Yeni Müslüman Bakım Alanı',
    title: 'Biz Kimiz',
    subtitle: 'KİM Vakfı — Kültürlerarası İletişim Merkezi. 2010\'dan bu yana özgün İslam eğitimine, anlamlı insan bağlantısına ve küresel diyaloğa adanmış bir kültürlerarası merkez.',
    stats: [
      { n: '15+', l: 'Yıllık Hizmet' },
      { n: '80+', l: 'Ortak Ülke' },
      { n: '80K+', l: 'Yıllık Ziyaretçi' },
      { n: '12', l: 'Dil' },
    ],
    foundationBadge: 'Vakıf',
    foundationTitle: 'Temelimiz',
    pillars: [
      {
        icon: '🌿',
        title: 'Misyonumuz',
        body: 'KİM Vakfı (Kültürlerarası İletişim Merkezi), kültürler, inançlar ve halklar arasında anlayış köprüleri kurar — dünya genelinde yeni Müslümanlara ve meraklı zihinlere eğitim, destek ve topluluk sağlar.',
      },
      {
        icon: '🌍',
        title: 'Vizyonumuz',
        body: 'Gerçeği arayan herkesin — dili, konumu ve geçmişinden bağımsız olarak — özgün, şefkatli ve entelektüel açıdan dürüst bir İslam eğitimine erişebildiği bir dünya.',
      },
      {
        icon: '🤝',
        title: 'Ekibimiz',
        body: 'Tek bir amaç etrafında birleşmiş âlimler, eğitimciler, tasarımcılar ve gönüllüler. Türkiye, Avrupa ve Orta Doğu\'da faaliyet gösteriyor, 80\'den fazla ülkede ortaklıklarımız bulunuyor.',
      },
      {
        icon: '📖',
        title: 'Tarihimiz',
        body: '2010 yılında İstanbul\'da kurulan KİM Vakfı, 15 yılı aşkın süredir yeni Müslümanlara ve dinlerarası diyaloğa hizmet etmektedir. Süleymaniye merkezimiz, dünyanın her köşesinden yüz binlerce ziyaretçiyi ağırlamıştır.',
      },
    ],
    digitalBadge: 'Dijital Deneyim',
    digitalTitle: 'Süleymaniye Camii',
    digitalTitleAccent: 'Tablet Uygulaması',
    digitalDesc: 'Süleymaniye Camii kompleksine yerleştirilen interaktif tablet uygulamamız, dünyanın dört bir yanından gelen ziyaretçilere sürükleyici bir dijital deneyim sunar. 12 dilde kullanılabilir.',
    requestDemo: 'Demo Talep Et',
    tabletFeatures: [
      { icon: '🗺️', title: 'İnteraktif Harita', desc: 'Süleymaniye Camii\'nin ilgi noktaları ve sesli rehberlerle tam interaktif haritası.' },
      { icon: '🎧', title: 'Sesli Tur', desc: 'İngilizce, Türkçe, Arapça, Fransızca, Almanca ve İspanyolca olarak kendi kendine rehberli sesli tur.' },
      { icon: '📚', title: 'İslam Kütüphanesi', desc: 'Anında indirilebilir İslami metinler, broşürler ve tanıtıcı materyallerin dijital kütüphanesi.' },
      { icon: '🤖', title: 'Soru Sor', desc: 'İslam ve camii hakkında ziyaretçi sorularını yanıtlayan yerleşik sohbet robotu — 7/24.' },
      { icon: '🌐', title: 'Çok Dilli', desc: 'Her ziyaretçinin camiin tarihi ve İslam ile etkileşimini sağlamak için 12 dile tamamen çevrilmiştir.' },
      { icon: '📋', title: 'Program Rehberi', desc: 'KİM\'in güncel programlarına göz atın, yaklaşan etkinlikleri görün ve turları doğrudan kaydedin.' },
    ],
    centersBadge: 'Merkezlerimiz',
    centersTitle: 'KİM 1, 2, 3 — Üç Merkezimiz',
    centersSub: 'İstanbul\'un kalbinde, her biri misyonumuzda farklı bir amaca hizmet eden üç bağlantılı merkez.',
    centers: [
      {
        id: '1',
        name: 'KİM 1 — Süleymaniye',
        type: 'Ziyaretçi Merkezi & Cami',
        desc: 'Süleymaniye Camii\'ne bitişik amiral gemisi merkezimiz. Her yıl binlerce turist, öğrenci ve araştırmacının İslam ile buluştuğu yer — rehberli turlar, namaz gösterileri, S&C oturumları.',
        highlight: 'Ana ziyaretçi merkezi · Kur. 2010',
        visits: 'Yılda 80.000+ ziyaretçi',
      },
      {
        id: '2',
        name: 'KİM 2 — Medrese',
        type: 'Eğitim Medresesi',
        desc: 'İslam eğitim merkezine dönüştürülmüş restore edilmiş Osmanlı medresesi. Yapılandırılmış müfredatımızın, yeni Müslüman destek gruplarının ve akademik seminerlerin evidir.',
        highlight: 'İslam eğitimi & seminerler',
        visits: 'Haftalık dersler & programlar',
      },
      {
        id: '3',
        name: 'KİM 3 — Medya',
        type: 'Medya Üretim Merkezi',
        desc: 'Medya merkezimiz küresel dağıtım için belgeseller, eğitim videoları, broşürler ve dijital içerik üretir. Podcast stüdyomuz ve çok dilli yayın ekibimizin evidir.',
        highlight: 'Medya, içerik & yayın',
        visits: 'Küresel dijital erişim',
      },
    ],
    bookTour: 'Tur Rezervasyonu',
    volBadge: 'Bize Katıl',
    volTitle: 'Gönüllülük Alanlarımız',
    volSub: 'İstanbul\'da olun veya dünyanın herhangi bir yerinde — misyonumuzda sizin için bir rol var.',
    volunteerPlaces: [
      { icon: '🕌', title: 'Süleymaniye Ziyaretçi Rehberi', desc: 'Camide turistleri karşılayın, İslam ve tarihi hakkındaki sorularını yanıtlayın. Önceki deneyim gerekmez — tam eğitim sağlanır.', location: 'İstanbul, Türkiye', type: 'Yerinde' },
      { icon: '📖', title: 'İslam Eğitimi Kolaylaştırıcısı', desc: 'İslam Nedir? eğitim yolculuğumuzu destekleyin — yeni Müslümanlara ve meraklı ziyaretçilere müfredatta rehberlik edin.', location: 'İstanbul, Türkiye', type: 'Yerinde / Çevrimiçi' },
      { icon: '🎬', title: 'Medya & İçerik Üreticisi', desc: 'Çok dilli medya kütüphanemiz için video üretmeye, makale yazmaya, grafik tasarlamaya veya içerik çevirmeye yardımcı olun.', location: 'Uzaktan', type: 'Uzaktan' },
      { icon: '🌐', title: 'Çevrimiçi Destek Danışmanı', desc: 'Chatbot platformumuz ve sosyal medya kanallarımız aracılığıyla yeni Müslümanlara çevrimiçi rehberlik ve destek sağlayın.', location: 'Uzaktan', type: 'Uzaktan' },
      { icon: '🗣️', title: 'Dil Çevirmeni', desc: 'Urduca, Malayca, Fransızca, Almanca ve Rusça başta olmak üzere eğitim materyallerimizi ve broşürlerimizi çevirmeye yardımcı olun.', location: 'Uzaktan', type: 'Uzaktan' },
      { icon: '🤝', title: 'Ortak İrtibat', desc: 'Küresel ortak ağımızı genişletmek için ülkenizdeki camiler, İslam merkezleri ve üniversitelerle bizi bağlayın.', location: 'Ülkeniz', type: 'Uzaktan' },
    ],
    readyVol: 'Gönüllü olmaya hazır mısınız?',
    readyVolDesc: 'Size en uygun rolü görüşmek için bize ulaşın. Her geçmişten ve beceri setinden memnuniyetle karşılarız.',
    getInTouch: 'İletişime Geç',
    quoteText: '"İnsanların en hayırlısı, insanlara en fazla faydalı olandır."',
    quoteAuthor: '— Hz. Muhammed ﷺ',
    back: 'Yeni Müslüman Bakım Alanı\'na Dön',
  },
  ar: {
    backLink: 'منطقة رعاية المسلم الجديد',
    badge: 'منطقة رعاية المسلم الجديد',
    title: 'من نحن',
    subtitle: 'مؤسسة كيم — مركز التواصل بين الثقافات. مركز ثقافي مخصص للتعليم الإسلامي الأصيل والتواصل الإنساني الهادف والحوار العالمي منذ عام 2010.',
    stats: [
      { n: '+15', l: 'سنة خدمة' },
      { n: '+80', l: 'دولة شريكة' },
      { n: '+80K', l: 'زائر سنوياً' },
      { n: '12', l: 'لغة' },
    ],
    foundationBadge: 'الأساس',
    foundationTitle: 'أساسنا',
    pillars: [
      {
        icon: '🌿',
        title: 'مهمتنا',
        body: 'تبني مؤسسة كيم جسور التفاهم بين الثقافات والأديان والشعوب — مقدمةً التعليم والدعم والمجتمع للمسلمين الجدد والعقول الفضولية في جميع أنحاء العالم.',
      },
      {
        icon: '🌍',
        title: 'رؤيتنا',
        body: 'عالم يحظى فيه كل باحث عن الحقيقة بإمكانية الوصول إلى تعليم إسلامي أصيل ورحيم وصادق فكرياً — بصرف النظر عن اللغة أو الموقع أو الخلفية.',
      },
      {
        icon: '🤝',
        title: 'فريقنا',
        body: 'علماء ومعلمون ومصممون ومتطوعون متحدون بغرض واحد. نعمل في تركيا وأوروبا والشرق الأوسط، مع شراكات في أكثر من 80 دولة.',
      },
      {
        icon: '📖',
        title: 'تاريخنا',
        body: 'تأسست مؤسسة كيم في إسطنبول عام 2010، وقد خدمت المسلمين الجدد والحوار بين الأديان لأكثر من 15 عاماً. استقبل مركزنا في السليمانية مئات الآلاف من الزوار من كل أنحاء العالم.',
      },
    ],
    digitalBadge: 'التجربة الرقمية',
    digitalTitle: 'مسجد السليمانية',
    digitalTitleAccent: 'تطبيق الجهاز اللوحي',
    digitalDesc: 'يوفر تطبيقنا التفاعلي للأجهزة اللوحية، المنتشر في مجمع مسجد السليمانية، تجربة رقمية غامرة للزوار من جميع أنحاء العالم. متاح بـ12 لغة.',
    requestDemo: 'طلب عرض تجريبي',
    tabletFeatures: [
      { icon: '🗺️', title: 'خريطة تفاعلية', desc: 'خريطة تفاعلية كاملة لمسجد السليمانية مع نقاط الاهتمام والمرشدين الصوتيين.' },
      { icon: '🎧', title: 'جولة صوتية', desc: 'جولة صوتية موجهة ذاتياً باللغات الإنجليزية والتركية والعربية والفرنسية والألمانية والإسبانية.' },
      { icon: '📚', title: 'مكتبة إسلامية', desc: 'مكتبة رقمية من النصوص الإسلامية والكتيبات والمواد التمهيدية للتنزيل الفوري.' },
      { icon: '🤖', title: 'اطرح سؤالاً', desc: 'روبوت محادثة مدمج يجيب على أسئلة الزوار حول الإسلام والمسجد — متاح على مدار الساعة.' },
      { icon: '🌐', title: 'متعدد اللغات', desc: 'مترجم بالكامل إلى 12 لغة، مما يضمن تفاعل كل زائر مع تاريخ المسجد والإسلام.' },
      { icon: '📋', title: 'دليل البرامج', desc: 'تصفح برامج كيم الحالية والفعاليات القادمة وسجّل في الجولات والجلسات التعليمية مباشرة.' },
    ],
    centersBadge: 'مراكزنا',
    centersTitle: 'كيم 1، 2، 3 — مراكزنا الثلاثة',
    centersSub: 'ثلاثة مراكز مترابطة في قلب إسطنبول، يخدم كل منها غرضاً مميزاً في مهمتنا.',
    centers: [
      {
        id: '1',
        name: 'كيم 1 — السليمانية',
        type: 'مركز الزوار والمسجد',
        desc: 'مركزنا الرئيسي المجاور لمسجد السليمانية. هنا يلتقي آلاف السياح والطلاب والباحثين بالإسلام كل عام — جولات إرشادية وعروض للصلاة وجلسات أسئلة وأجوبة.',
        highlight: 'المركز الرئيسي للزوار · تأسس 2010',
        visits: 'أكثر من 80,000 زائر سنوياً',
      },
      {
        id: '2',
        name: 'كيم 2 — المدرسة',
        type: 'المدرسة التعليمية',
        desc: 'مدرسة عثمانية مرممة تحولت إلى مركز للتعليم الإسلامي. موطن مناهجنا الدراسية المنظمة ومجموعات دعم المسلمين الجدد وحلقات الدراسة الأكاديمية.',
        highlight: 'التعليم الإسلامي والندوات',
        visits: 'فصول دراسية وبرامج أسبوعية',
      },
      {
        id: '3',
        name: 'كيم 3 — الإعلام',
        type: 'مركز الإنتاج الإعلامي',
        desc: 'يُنتج مركزنا الإعلامي وثائقياً وفيديوهات تعليمية وكتيبات ومحتوى رقمياً للتوزيع العالمي. موطن استوديو البودكاست وفريق النشر متعدد اللغات.',
        highlight: 'الإعلام والمحتوى والنشر',
        visits: 'وصول رقمي عالمي',
      },
    ],
    bookTour: 'حجز جولة',
    volBadge: 'انضم إلينا',
    volTitle: 'أماكن التطوع لدينا',
    volSub: 'سواء كنت في إسطنبول أو في أي مكان في العالم، هناك دور لك في مهمتنا.',
    volunteerPlaces: [
      { icon: '🕌', title: 'مرشد زوار السليمانية', desc: 'استقبل السياح في المسجد وأجب على أسئلتهم حول الإسلام وتاريخ الموقع. لا يلزم خبرة سابقة — يتم توفير تدريب كامل.', location: 'إسطنبول، تركيا', type: 'حضوري' },
      { icon: '📖', title: 'ميسّر التعليم الإسلامي', desc: 'دعم رحلتنا التعليمية "ما هو الإسلام" — مساعدة المسلمين الجدد والزوار الفضوليين في التنقل عبر المناهج الدراسية.', location: 'إسطنبول، تركيا', type: 'حضوري / عبر الإنترنت' },
      { icon: '🎬', title: 'منشئ محتوى إعلامي', desc: 'المساعدة في إنتاج مقاطع فيديو وكتابة مقالات وتصميم رسومات أو ترجمة محتوى لمكتبتنا الإعلامية متعددة اللغات.', location: 'عن بُعد', type: 'عن بُعد' },
      { icon: '🌐', title: 'مستشار دعم عبر الإنترنت', desc: 'تقديم إرشادات ودعم عاطفي عبر الإنترنت للمسلمين الجدد من خلال منصة الدردشة وقنوات التواصل الاجتماعي.', location: 'عن بُعد', type: 'عن بُعد' },
      { icon: '🗣️', title: 'مترجم لغوي', desc: 'المساعدة في ترجمة موادنا التعليمية والكتيبات والمحتوى الرقمي. نحتاج بشكل خاص إلى مترجمين في الأردية والملايوية والفرنسية والألمانية والروسية.', location: 'عن بُعد', type: 'عن بُعد' },
      { icon: '🤝', title: 'ارتباط الشراكة', desc: 'ربطنا بالمساجد والمراكز الإسلامية والجامعات في بلدك لتوسيع شبكة شركائنا العالمية.', location: 'بلدك', type: 'عن بُعد' },
    ],
    readyVol: 'هل أنت مستعد للتطوع؟',
    readyVolDesc: 'تواصل معنا لمناقشة الدور الأنسب لك. نرحب بجميع الخلفيات ومجموعات المهارات.',
    getInTouch: 'تواصل معنا',
    quoteText: '"خير الناس أنفعهم للناس."',
    quoteAuthor: '— النبي محمد ﷺ',
    back: 'العودة إلى منطقة رعاية المسلم الجديد',
  },
} as const;

const CENTER_COLORS = ['bg-kim-navy', 'bg-kim-olive', 'bg-kim-navy'];

export default function WhoWeArePage() {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.en;
  const isRtl = locale === 'ar';
  const [activeCenter, setActiveCenter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-kim-cream" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-kim-navy to-kim-navy-dark px-6 py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-kim-olive/10 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-kim-navy/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Link href="/new-muslim-care-area" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs mb-6 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> {t.backLink}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{t.badge}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">{t.title}</h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{t.subtitle}</p>
          <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
            {t.stats.map(s => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-white">{s.n}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Team / History ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-olive" />
            <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">{t.foundationBadge}</span>
            <span className="h-px w-8 bg-kim-olive" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-kim-charcoal">{t.foundationTitle}</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-2xl bg-white border border-gray-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-kim-cream flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
              <h3 className="font-serif text-lg font-bold text-kim-charcoal mb-2 group-hover:text-kim-navy transition-colors">{p.title}</h3>
              <p className="text-sm text-kim-stone leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Tablet App ── */}
      <section className="bg-kim-navy text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-kim-gold" />
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">{t.digitalBadge}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {t.digitalTitle}<br />
                <span className="text-kim-gold">{t.digitalTitleAccent}</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">{t.digitalDesc}</p>
              <a
                href="mailto:info@crossculturalcenter.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-kim-gold text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors"
              >
                {t.requestDemo}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {t.tabletFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-xl bg-white/8 border border-white/10 p-4 hover:bg-white/12 transition-colors"
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="font-semibold text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KIM Centers ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-navy" />
              <span className="text-kim-navy text-xs font-semibold uppercase tracking-widest">{t.centersBadge}</span>
              <span className="h-px w-8 bg-kim-navy" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-kim-charcoal">{t.centersTitle}</h2>
            <p className="text-kim-stone mt-2 max-w-xl mx-auto text-sm">{t.centersSub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.centers.map((center, i) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveCenter(activeCenter === center.id ? null : center.id)}
              >
                <div className={`${CENTER_COLORS[i]} px-6 py-8 relative overflow-hidden`}>
                  <span className="absolute -right-4 -top-4 text-[5rem] font-bold text-white/10 leading-none select-none">{center.id}</span>
                  <span className="relative text-[10px] font-bold uppercase tracking-wider text-white/70 border border-white/20 rounded-full px-2.5 py-1">
                    {center.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-kim-charcoal mb-1 group-hover:text-kim-navy transition-colors">{center.name}</h3>
                  <p className="text-xs text-kim-stone font-medium mb-3">{center.highlight}</p>
                  <p className="text-sm text-kim-stone leading-relaxed mb-3">{center.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-kim-navy font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {center.visits}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-sm">
              {t.bookTour} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Volunteering Places ── */}
      <section className="bg-kim-cream py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-kim-olive" />
              <span className="text-kim-olive text-xs font-semibold uppercase tracking-widest">{t.volBadge}</span>
              <span className="h-px w-8 bg-kim-olive" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-kim-charcoal">{t.volTitle}</h2>
            <p className="text-kim-stone mt-2 max-w-xl mx-auto text-sm">{t.volSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {t.volunteerPlaces.map((place, i) => (
              <motion.div
                key={place.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-3">{place.icon}</div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    place.type === 'Remote' || place.type === 'Uzaktan' || place.type === 'عن بُعد'
                      ? 'bg-green-50 text-green-700'
                      : place.type === 'On-site' || place.type === 'Yerinde' || place.type === 'حضوري'
                      ? 'bg-kim-navy-light text-kim-navy'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {place.type}
                  </span>
                  <span className="text-xs text-kim-stone">{place.location}</span>
                </div>
                <h3 className="font-serif font-bold text-kim-charcoal text-sm mb-2">{place.title}</h3>
                <p className="text-xs text-kim-stone leading-relaxed">{place.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-kim-olive-light border border-kim-olive/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-kim-charcoal mb-1">{t.readyVol}</p>
              <p className="text-sm text-kim-stone">{t.readyVolDesc}</p>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-kim-olive text-white font-semibold rounded-xl hover:bg-kim-olive/80 transition-colors text-sm">
              {t.getInTouch} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <blockquote className="border-l-4 border-kim-navy bg-kim-navy-light rounded-r-2xl px-6 py-5">
          <p className="font-serif text-lg text-kim-charcoal italic">{t.quoteText}</p>
          <footer className="mt-2 text-sm font-semibold text-kim-stone">{t.quoteAuthor}</footer>
        </blockquote>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-12">
        <Link href="/new-muslim-care-area" className="inline-flex items-center gap-2 text-sm text-kim-stone hover:text-kim-navy transition-colors">
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </Link>
      </div>

    </div>
  );
}
