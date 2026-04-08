'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Resources', icon: '🗂️' },
  { id: 'books', label: 'Books & PDFs', icon: '📚' },
  { id: 'video', label: 'Video Lectures', icon: '🎬' },
  { id: 'audio', label: 'Audio & Recitation', icon: '🎧' },
  { id: 'tools', label: 'Interactive Tools', icon: '🛠️' },
  { id: 'websites', label: 'Trusted Websites', icon: '🌐' },
];

const RESOURCES = [
  // Books & PDFs
  { id: 1, category: 'books', title: 'The Quran — English Translation', author: 'Saheeh International', desc: 'A clear, modern English translation of the Quran with brief notes. Ideal for first-time readers.', lang: 'EN', tag: 'Quran', free: true, href: '#' },
  { id: 2, category: 'books', title: 'What Everyone Should Know About Islam', author: 'KİM Vakfı', desc: 'A concise, illustrated introduction to the basics of Islamic belief, worship, and lifestyle. Available in 12 languages.', lang: 'Multi', tag: 'Intro', free: true, href: '#' },
  { id: 3, category: 'books', title: 'The Life of the Prophet Muhammad ﷺ', author: 'Martin Lings', desc: 'The definitive English-language biography of Prophet Muhammad, widely praised by scholars worldwide.', lang: 'EN', tag: 'Seerah', free: false, href: '#' },
  { id: 4, category: 'books', title: 'Fortress of the Muslim (Hisnul Muslim)', author: 'Said bin Ali Al-Qahtani', desc: 'A pocket-sized collection of authentic duas (supplications) for all occasions in a Muslim\'s daily life.', lang: 'Multi', tag: "Du'a", free: true, href: '#' },
  { id: 5, category: 'books', title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)', author: 'Safi-ur-Rahman Al-Mubarakpuri', desc: 'Award-winning biography of the Prophet Muhammad ﷺ. One of the most comprehensive seerah books available.', lang: 'EN/AR', tag: 'Seerah', free: true, href: '#' },
  { id: 6, category: 'books', title: 'Don\'t Be Sad (La Tahzan)', author: 'Aaidh ibn Abdullah al-Qarni', desc: 'A spiritual guide for coping with life\'s hardships, drawing from the Quran, hadith, and Islamic wisdom.', lang: 'EN', tag: 'Spirituality', free: false, href: '#' },

  // Video
  { id: 7, category: 'video', title: 'Introduction to Islam — Full Course', author: 'KİM Vakfı', desc: 'A comprehensive 12-part video series covering all fundamentals of Islamic faith, worship, and ethics. Subtitled in 5 languages.', lang: 'TR/EN/AR', tag: 'Course', free: true, href: '#' },
  { id: 8, category: 'video', title: 'Understanding the Quran (Lecture Series)', author: 'Nouman Ali Khan', desc: 'Deep, accessible explanations of Quranic meaning for English-speaking audiences. Over 100 episodes available.', lang: 'EN', tag: 'Quran', free: true, href: '#' },
  { id: 9, category: 'video', title: 'Rational Proofs for the Existence of God', author: 'Hamza Tzortzis', desc: 'Philosophical and scientific arguments for monotheism. Ideal for skeptics and seekers.', lang: 'EN', tag: 'Rational', free: true, href: '#' },
  { id: 10, category: 'video', title: 'Daily Islamic Reminders (Türkçe)', author: 'KİM Vakfı TR', desc: 'Short 3–5 minute daily video reminders on Islamic character, worship, and spiritual growth. In Turkish.', lang: 'TR', tag: 'Reminders', free: true, href: '#' },

  // Audio
  { id: 11, category: 'audio', title: 'Quran Recitation — Mishary Al-Afasy', author: 'Mishary Rashid Al-Afasy', desc: 'Full Quran recitation with crystal-clear audio. Available by surah or as a complete download.', lang: 'AR', tag: 'Quran', free: true, href: '#' },
  { id: 12, category: 'audio', title: 'The 99 Names of Allah', author: 'KİM Audio Library', desc: 'Pronunciation guide and meaning of each of the 99 divine names. With English, Turkish, and Arabic audio.', lang: 'Multi', tag: 'Dhikr', free: true, href: '#' },
  { id: 13, category: 'audio', title: 'Salah — Step by Step Audio Guide', author: 'KİM Vakfı', desc: 'Learn all five daily prayers step-by-step with audio guidance. Covers pronunciation, movements, and meaning.', lang: 'EN/TR', tag: 'Prayer', free: true, href: '#' },

  // Tools
  { id: 14, category: 'tools', title: 'Prayer Times Calculator', author: 'KİM Digital', desc: 'Accurate daily prayer times for any city in the world. Supports Hanafi and Shafi\'i calculation methods.', lang: 'Multi', tag: 'Prayer', free: true, href: '#' },
  { id: 15, category: 'tools', title: 'Qibla Compass Web App', author: 'KİM Digital', desc: 'Find the direction of Mecca from anywhere in the world. Works on any device with a browser.', lang: 'Multi', tag: 'Prayer', free: true, href: '#' },
  { id: 16, category: 'tools', title: 'Islamic Knowledge Quiz', author: 'KİM Vakfı', desc: 'Test your understanding of Islamic fundamentals with our interactive quiz. 5 difficulty levels.', lang: 'EN/TR', tag: 'Quiz', free: true, href: '#' },

  // Websites
  { id: 17, category: 'websites', title: 'IslamQA.info', author: 'Sheikh Saleh Al-Munajjid', desc: 'One of the most comprehensive Islamic Q&A websites, covering all aspects of Islamic law and theology.', lang: 'Multi', tag: 'Fatwa', free: true, href: 'https://islamqa.info' },
  { id: 18, category: 'websites', title: 'Sunnah.com', author: 'Open source', desc: 'Searchable database of all major hadith collections including Bukhari, Muslim, and Abu Dawood, with English translations.', lang: 'EN/AR', tag: 'Hadith', free: true, href: 'https://sunnah.com' },
  { id: 19, category: 'websites', title: 'Quran.com', author: 'Quran.com', desc: 'Read, listen, and study the Quran online. Includes multiple translations, word-by-word analysis, and tafsir.', lang: 'Multi', tag: 'Quran', free: true, href: 'https://quran.com' },
];

export default function ResourcesPage() {
  const [active, setActive] = useState('all');

  const filtered = RESOURCES.filter(r => active === 'all' || r.category === active);

  return (
    <div>
      {/* Page hero */}
      <div className="rounded-2xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-6 py-10 mb-8 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-kim-olive/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">What is Islam</span>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-xs">Tools & Resources</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            Tools, Media & Resources
          </h1>
          <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl">
            A curated library of books, videos, audio recitations, interactive tools, and trusted websites to support your journey of understanding Islam.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === cat.id
                ? 'bg-kim-navy text-white shadow-md'
                : 'bg-white border border-gray-100 text-kim-stone hover:border-kim-navy/20 hover:text-kim-navy'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-kim-stone mb-5 font-medium uppercase tracking-wider">
        {filtered.length} resources found
      </p>

      {/* Resource grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filtered.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-kim-navy/15 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-kim-navy-light text-kim-navy">
                      {resource.tag}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-kim-stone">
                      {resource.lang}
                    </span>
                    {resource.free && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                        Free
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-kim-charcoal group-hover:text-kim-navy transition-colors leading-snug">
                    {resource.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-kim-stone leading-relaxed mb-1">{resource.author}</p>
              <p className="text-sm text-kim-stone/80 leading-relaxed mb-4">{resource.desc}</p>
              <a
                href={resource.href}
                className="inline-flex items-center gap-1.5 text-kim-navy text-xs font-semibold hover:gap-2.5 transition-all"
              >
                Access Resource
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="mt-10 p-6 rounded-2xl bg-kim-olive-light border border-kim-olive/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-kim-charcoal">Can't find what you're looking for?</p>
          <p className="text-sm text-kim-stone mt-0.5">Ask our Islam Chatbot or browse our full library.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link href="/what-is-islam/chatbot" className="px-4 py-2 bg-kim-olive text-white text-sm font-semibold rounded-xl hover:bg-kim-olive/80 transition-colors">
            Ask Chatbot
          </Link>
          <Link href="/library" className="px-4 py-2 border border-kim-olive text-kim-olive text-sm font-semibold rounded-xl hover:bg-kim-olive-light transition-colors">
            Full Library
          </Link>
        </div>
      </div>
    </div>
  );
}
