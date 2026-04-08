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
  ],
};
