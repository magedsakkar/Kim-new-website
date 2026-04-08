'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const FAQ_DATA: Record<string, { q: string; a: string }[]> = {
  en: [
    { q: 'Who can volunteer at KIM Foundation?', a: 'Anyone who is passionate about cross-cultural dialogue and has good communication skills can apply. We welcome volunteers from all backgrounds, nationalities, and faiths.' },
    { q: 'How much time do I need to commit?', a: 'We ask for a minimum commitment of one day per week. However, we are flexible and can work around your schedule.' },
    { q: 'Do I need to speak Turkish?', a: 'Turkish is helpful but not required. Many of our programs are conducted in English, and we always need volunteers who speak other languages to help our international visitors.' },
    { q: 'Is there training provided?', a: 'Yes! All volunteers go through our KIM Academy training program before starting. This includes Islamic history, cultural sensitivity training, and communication skills.' },
    { q: 'What activities will I do as a volunteer?', a: 'Volunteers participate in guided mosque tours, host international visitors, help organize events like Iftar dinners, translate materials, and support our student meeting programs.' },
  ],
  tr: [
    { q: 'KİM Vakfı\'nda kimler gönüllü olabilir?', a: 'Kültürlerarası diyaloga tutkuyla bağlı olan ve iyi iletişim becerilerine sahip herkes başvurabilir. Her geçmişten, ülkeden ve inançtan gönüllüleri memnuniyetle karşılıyoruz.' },
    { q: 'Ne kadar zaman ayırmam gerekiyor?', a: 'Haftada minimum bir gün ayırmalarını istiyoruz. Ancak esnek davranıyor ve programınıza göre ayarlama yapabiliyoruz.' },
    { q: 'Türkçe bilmem gerekiyor mu?', a: 'Türkçe yardımcı olur, ancak zorunlu değildir. Programlarımızın büyük bölümü İngilizce yürütülmektedir ve uluslararası ziyaretçilerimize yardımcı olacak farklı dil bilen gönüllülere her zaman ihtiyaç duyuyoruz.' },
    { q: 'Eğitim veriliyor mu?', a: 'Evet! Tüm gönüllüler başlamadan önce KİM Akademi eğitim programından geçer. Bu program İslam tarihi, kültürel duyarlılık eğitimi ve iletişim becerilerini kapsar.' },
    { q: 'Gönüllü olarak hangi faaliyetlere katılacağım?', a: 'Gönüllüler rehberli cami turlarına katılır, uluslararası ziyaretçilere ev sahipliği yapar, iftar yemekleri gibi etkinliklerin organizasyonuna yardımcı olur, materyaller çevirir ve öğrenci buluşmaları programlarımızı destekler.' },
  ],
};

export function FAQAccordion() {
  const locale = useLocale();
  const faqs = FAQ_DATA[locale] || FAQ_DATA.en;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-kim-navy-light transition-colors"
          >
            <span className="font-semibold text-kim-charcoal pr-4">{faq.q}</span>
            <svg
              className={cn('w-5 h-5 flex-shrink-0 text-kim-navy transition-transform duration-200', open === idx && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              open === idx ? 'max-h-48' : 'max-h-0'
            )}
          >
            <p className="px-6 py-4 text-kim-stone text-sm leading-relaxed border-t border-gray-100">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
