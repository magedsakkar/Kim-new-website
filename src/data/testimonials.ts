import type { Testimonial } from '@/types';

export const testimonials: Record<string, Testimonial[]> = {
  en: [
    {
      id: '1',
      name: 'Sarah Mitchell',
      country: 'United Kingdom',
      countryFlag: '🇬🇧',
      quote: 'My visit to KIM Foundation completely changed my perspective on Islam. The volunteers were incredibly welcoming and answered all my questions with patience and kindness.',
    },
    {
      id: '2',
      name: 'Marco Rossi',
      country: 'Italy',
      countryFlag: '🇮🇹',
      quote: 'The guided tour of Süleymaniye Mosque was breathtaking. The KIM team made us feel so comfortable and provided such insightful explanations about Islamic culture and faith.',
    },
    {
      id: '3',
      name: 'Emma Müller',
      country: 'Germany',
      countryFlag: '🇩🇪',
      quote: 'As a university student studying comparative religion, KIM\'s student program was invaluable. The academic discussions were deep, respectful, and truly enlightening.',
    },
    {
      id: '4',
      name: 'David Chen',
      country: 'United States',
      countryFlag: '🇺🇸',
      quote: 'I attended the Friday breakfast and was amazed by the warmth of the community. This experience gave me a completely new understanding of Islamic hospitality.',
    },
    {
      id: '5',
      name: 'Yuki Tanaka',
      country: 'Japan',
      countryFlag: '🇯🇵',
      quote: 'Coming from Japan, I had many misconceptions about Islam. KIM Foundation patiently addressed each one with evidence, history, and genuine care. I left with a heart full of respect.',
    },
    {
      id: '6',
      name: 'Isabelle Fontaine',
      country: 'France',
      countryFlag: '🇫🇷',
      quote: 'The Ramadan iftar at KIM was one of the most moving experiences of my life. To share a meal with people from 30 nations in the shadow of an Ottoman mosque — I will never forget it.',
    },
    {
      id: '7',
      name: 'Carlos Mendes',
      country: 'Brazil',
      countryFlag: '🇧🇷',
      quote: 'I took my Shahada here after months of learning with the KIM team. They walked with me every step — teaching, supporting, celebrating. This community is my family now.',
    },
    {
      id: '8',
      name: 'Priya Sharma',
      country: 'India',
      countryFlag: '🇮🇳',
      quote: 'As a Hindu visiting Istanbul, I was nervous about entering a mosque. KIM\'s team made me feel completely at home. Their approach to dialogue is unlike anything I had experienced before.',
    },
  ],

  tr: [
    {
      id: '1',
      name: 'Sarah Mitchell',
      country: 'Birleşik Krallık',
      countryFlag: '🇬🇧',
      quote: 'KİM Vakfı\'nı ziyaretim İslam hakkındaki bakış açımı tamamen değiştirdi. Gönüllüler inanılmaz derecede samimi ve sorularımı sabırla yanıtladılar.',
    },
    {
      id: '2',
      name: 'Marco Rossi',
      country: 'İtalya',
      countryFlag: '🇮🇹',
      quote: 'Süleymaniye Camii rehberli tur muhteşemdi. KİM ekibi bizi çok rahat hissettirdi ve İslam kültürü hakkında çok değerli açıklamalar yaptı.',
    },
    {
      id: '3',
      name: 'Emma Müller',
      country: 'Almanya',
      countryFlag: '🇩🇪',
      quote: 'Karşılaştırmalı din okuyan bir üniversite öğrencisi olarak KİM\'in öğrenci programı paha biçilmezdi. Akademik tartışmalar derin ve aydınlatıcıydı.',
    },
    {
      id: '4',
      name: 'David Chen',
      country: 'Amerika Birleşik Devletleri',
      countryFlag: '🇺🇸',
      quote: 'Cuma kahvaltısına katıldım ve topluluğun sıcaklığına hayran kaldım. Bu deneyim İslami misafirperverlik hakkında tamamen yeni bir anlayış kazandırdı.',
    },
    {
      id: '5',
      name: 'Yuki Tanaka',
      country: 'Japonya',
      countryFlag: '🇯🇵',
      quote: 'Japonya\'dan gelirken İslam hakkında pek çok yanlış kanım vardı. KİM Vakfı her birini deliller ve samimiyet ile yanıtladı. Saygıyla dolu bir kalple ayrıldım.',
    },
    {
      id: '6',
      name: 'Carlos Mendes',
      country: 'Brezilya',
      countryFlag: '🇧🇷',
      quote: 'Aylarca KİM ekibiyle öğrendikten sonra burada Şehadet getirdim. Her adımda yanımda oldular — öğrettiler, desteklediler, kutladılar. Bu topluluk artık benim ailem.',
    },
  ],

  ar: [
    {
      id: '1',
      name: 'سارة ميتشيل',
      country: 'المملكة المتحدة',
      countryFlag: '🇬🇧',
      quote: 'زيارتي لمؤسسة كيم غيّرت نظرتي للإسلام تماماً. كان المتطوعون في غاية الترحيب وأجابوا على جميع أسئلتي بصبر ولطف.',
    },
    {
      id: '2',
      name: 'ماركو روسي',
      country: 'إيطاليا',
      countryFlag: '🇮🇹',
      quote: 'كانت الجولة الإرشادية في مسجد سليمانية رائعة. جعلنا فريق كيم نشعر بالراحة التامة وقدّموا شرحاً عميقاً عن الثقافة الإسلامية.',
    },
    {
      id: '3',
      name: 'كارلوس مينديز',
      country: 'البرازيل',
      countryFlag: '🇧🇷',
      quote: 'نطقت بالشهادة هنا بعد أشهر من التعلم مع فريق كيم. رافقوني في كل خطوة — يعلّمون ويدعمون ويحتفلون. هذا المجتمع أصبح عائلتي الآن.',
    },
    {
      id: '4',
      name: 'إيزابيل فونتين',
      country: 'فرنسا',
      countryFlag: '🇫🇷',
      quote: 'كان إفطار رمضان في مؤسسة كيم من أكثر تجاربي تأثيراً في حياتي. مشاركة الطعام مع أناس من 30 دولة في ظل مسجد عثماني — لن أنسى ذلك أبداً.',
    },
  ],
};
