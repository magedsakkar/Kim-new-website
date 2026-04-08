import type { Event } from '@/types';

export const upcomingEvents: Record<string, Event[]> = {
  en: [
    {
      id: '1',
      title: 'Friday Morning Breakfast',
      description: 'Join us for our weekly Friday morning breakfast and cultural exchange session. All are welcome!',
      date: '2026-04-04',
      location: 'Süleymaniye, Istanbul',
    },
    {
      id: '2',
      title: 'Guided Mosque Tour',
      description: 'Explore the magnificent Süleymaniye Mosque with our experienced volunteer guides.',
      date: '2026-04-10',
      location: 'Süleymaniye Mosque, Istanbul',
    },
    {
      id: '3',
      title: 'Student Seminar: Islam & Culture',
      description: 'An academic seminar for university students exploring the intersection of Islam, history, and modern culture.',
      date: '2026-04-18',
      location: 'KIM Foundation Center, Istanbul',
    },
  ],
  tr: [
    {
      id: '1',
      title: 'Cuma Sabah Kahvaltısı',
      description: 'Haftalık Cuma sabah kahvaltısı ve kültürel alışveriş oturumuna katılın. Herkese açık!',
      date: '2026-04-04',
      location: 'Süleymaniye, İstanbul',
    },
    {
      id: '2',
      title: 'Rehberli Cami Turu',
      description: 'Deneyimli gönüllü rehberlerimizle muhteşem Süleymaniye Camii\'ni keşfedin.',
      date: '2026-04-10',
      location: 'Süleymaniye Camii, İstanbul',
    },
    {
      id: '3',
      title: 'Öğrenci Semineri: İslam & Kültür',
      description: 'İslam, tarih ve modern kültürün kesişimini araştıran üniversite öğrencileri için akademik seminer.',
      date: '2026-04-18',
      location: 'KİM Vakfı Merkezi, İstanbul',
    },
  ],
};
