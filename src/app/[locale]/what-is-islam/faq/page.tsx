'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'god', label: 'God & Belief' },
  { id: 'quran', label: 'The Quran' },
  { id: 'prophet', label: 'The Prophet ﷺ' },
  { id: 'worship', label: 'Worship' },
  { id: 'science', label: 'Islam & Science' },
  { id: 'misconceptions', label: 'Misconceptions' },
  { id: 'newmuslim', label: 'New Muslims' },
];

const FAQS = [
  // God & Belief
  { id: 1, cat: 'god', q: 'Who is Allah?', a: 'Allah is the Arabic word for God — the same God worshipped by Jews and Christians. In Islam, God is One (Tawhid), with no partners, no children, and no equals. He is the Creator of everything, All-Knowing, All-Powerful, and Most Merciful. The name "Allah" has no gender, no plural, and has been used by Arabic-speaking Jews, Christians, and Muslims throughout history.' },
  { id: 2, cat: 'god', q: 'How do Muslims know God exists?', a: 'Islam uses both revelation and reason. The Quran appeals to rational arguments: the existence of the universe demands a cause; design in nature points to a Designer; the human instinct to worship (fitra) points to a Creator. Scholars like Hamza Tzortzis have elaborated these arguments in a modern philosophical context. Muslims believe the evidence for God is overwhelming both logically and experientially.' },
  { id: 3, cat: 'god', q: 'What are the 6 pillars of Islamic faith (Iman)?', a: '1) Belief in Allah (God), 2) Belief in the Angels, 3) Belief in the divine Books (Torah, Gospel, Psalms, Quran), 4) Belief in the Prophets and Messengers, 5) Belief in the Day of Judgment, 6) Belief in divine decree (Qadar — that Allah knows and has willed all things). Together these form the complete worldview of a Muslim.' },
  { id: 4, cat: 'god', q: 'Why does God allow suffering and evil?', a: 'Islam teaches that this world is a test, not the final destination. Suffering serves purposes: it can be a trial that builds character, an expiation for sins, a path to nearness to God, or a mercy in disguise. Allah promises that no one will bear more than they can handle (Quran 2:286). The full picture of justice will only be revealed on the Day of Judgment, where all wrongs will be addressed.' },

  // The Quran
  { id: 5, cat: 'quran', q: 'What is the Quran?', a: 'The Quran is the literal word of God revealed to Prophet Muhammad ﷺ over 23 years through the angel Jibreel (Gabriel). It is the primary source of Islamic guidance and the central miracle of Islam. Unlike other scriptures, the Quran has been perfectly preserved in its original Arabic language since its revelation, memorised by millions of people (hafiz) across every generation.' },
  { id: 6, cat: 'quran', q: 'Is the Quran really the unaltered word of God?', a: 'The Quran is the only religious scripture in history that has been continuously memorized word-for-word by millions of people across every generation — a process that has ensured its preservation independently of any physical manuscript. Today, identical Qurans exist from Morocco to Malaysia. No other book in human history has been preserved this way. This oral chain (tawatur) is considered stronger protection than any single manuscript tradition.' },
  { id: 7, cat: 'quran', q: 'Does the Quran contain scientific miracles?', a: 'The Quran contains descriptions of embryonic development, the expanding universe, the water cycle, and ocean currents that align with modern discoveries — over 1400 years before science confirmed them. While Islam does not base its truth-claim solely on science, these correspondences suggest a knowledge beyond human understanding of the 7th century. Dr. Keith Moore, a renowned Canadian embryologist, was moved to acknowledge the Quran\'s accurate description of embryonic stages.' },

  // The Prophet
  { id: 8, cat: 'prophet', q: 'Who was Muhammad ﷺ?', a: 'Muhammad ﷺ (570–632 CE) was the final prophet and messenger of God, born in Mecca. He was known as Al-Amin (the Trustworthy) even before his prophethood. He received the Quran over 23 years, built the first Muslim community, and transformed the Arabian Peninsula from tribal warfare and idol worship to a unified civilization built on monotheism, justice, and mercy. Even non-Muslim historians regard him as one of the most influential people in history.' },
  { id: 9, cat: 'prophet', q: 'Was Muhammad ﷺ violent or a warlord?', a: 'This is one of the most common misconceptions. All defensive battles fought by the Prophet were in response to aggression by those who sought to destroy the early Muslim community. He forgave his worst enemies when he had power over them — most famously when he entered Mecca without bloodshed and declared a general amnesty. His companions described a man of extraordinary gentleness, humor, and compassion. He specifically forbade the killing of non-combatants, women, children, and the elderly.' },
  { id: 10, cat: 'prophet', q: 'Why did the Prophet marry multiple wives?', a: 'Most of the Prophet\'s marriages were for political, humanitarian, or social reasons — to strengthen alliances, care for widows, or forge community bonds. Khadijah, his first and beloved wife, was older than him and his only wife for 25 years. Of his other marriages, the majority were to widows or divorcees. Aisha, his youngest wife, was from a context where betrothal ages differed significantly from today. Classical and modern scholars have written extensively on the wisdom behind each marriage.' },

  // Worship
  { id: 11, cat: 'worship', q: 'What are the 5 pillars of Islam?', a: '1) Shahada — Declaration of faith: "There is no god but Allah, and Muhammad is His messenger." 2) Salah — Five daily prayers at defined times. 3) Zakat — Obligatory charity (2.5% of annual savings above a threshold). 4) Sawm — Fasting during the month of Ramadan. 5) Hajj — Pilgrimage to Mecca at least once in a lifetime, if one is physically and financially able.' },
  { id: 12, cat: 'worship', q: 'Why do Muslims pray five times a day?', a: 'Prayer (Salah) is the direct connection between a human being and God. Praying five times daily keeps this connection alive throughout the day and is a reminder of your ultimate purpose. Scientifically, the act of prayer has been shown to reduce stress and bring mental clarity. Spiritually, it cleanses the heart and creates a regular moment of gratitude and surrender. The Prophet ﷺ described prayer as "the pillar of the religion."' },
  { id: 13, cat: 'worship', q: 'What is Ramadan?', a: 'Ramadan is the 9th month of the Islamic lunar calendar, during which Muslims fast from dawn to sunset — abstaining from food, drink, and intimate relations. It is the month in which the Quran began to be revealed. Beyond physical fasting, it is a month of heightened prayer, charity, Quran recitation, and spiritual renewal. It ends with the celebration of Eid Al-Fitr.' },

  // Islam & Science
  { id: 14, cat: 'science', q: 'Is Islam against science?', a: 'Quite the opposite. The first word revealed in the Quran was "Read (Iqra)" — a command to seek knowledge. Islamic civilization produced some of the greatest scientists in history: Ibn al-Haytham (optics), Ibn Sina (medicine), Al-Biruni (astronomy), and Al-Khwarizmi (algebra). Islam has no conflict with empirical science. Where apparent conflicts arise between religion and science, Islamic scholarship distinguishes between Quranic certainties and speculative scientific theories.' },
  { id: 15, cat: 'science', q: 'Does Islam accept evolution?', a: 'Muslim scholars have varied views on evolution. The majority maintain that Adam (peace be upon him) was created directly by God, as clearly stated in the Quran. Many accept micro-evolution (adaptation within species) while questioning macro-evolution (common descent from a single ancestor). Some contemporary Muslim scholars argue that theistic evolution is compatible with Islam. This remains an area of scholarly discussion, but faith in Adam\'s special creation is mainstream.' },

  // Misconceptions
  { id: 16, cat: 'misconceptions', q: 'Does Islam oppress women?', a: 'Islam was the first major world religion to give women formal legal rights: the right to own property, inherit, initiate divorce, and retain their own financial earnings — rights European women only gained centuries later. The modesty code applies to both men and women. Many Muslim women wear hijab as a personal expression of faith and identity, not oppression. The Prophet ﷺ said: "The best of you are those who are best to their wives." Problems seen in some Muslim-majority countries are often cultural, not Islamic.' },
  { id: 17, cat: 'misconceptions', q: 'Does Islam promote terrorism?', a: 'Islam explicitly forbids the killing of innocent people. The Quran states: "Whoever kills an innocent soul, it is as if he killed all of humanity" (5:32). Terrorism violates fundamental Islamic principles of protecting life, property, and human dignity. Groups that commit violence in the name of Islam are contradicting the clear teachings of the Quran and the Prophet. 1.8 billion Muslims live peacefully worldwide. Judging Islam by the actions of a tiny extremist fringe is like judging all of Christianity by the Crusades.' },
  { id: 18, cat: 'misconceptions', q: 'Is Islam the same as Arab culture?', a: 'No. Islam is a universal religion for all humanity, transcending race, nationality, and culture. Only about 20% of Muslims are Arab. The largest Muslim populations are in Indonesia, Pakistan, Bangladesh, and India. Islamic civilization has absorbed and enriched Persian, Turkish, South Asian, African, and European cultures throughout history. Many cultural practices in Muslim-majority countries are local traditions that have nothing to do with Islam.' },

  // New Muslims
  { id: 19, cat: 'newmuslim', q: 'How do I become Muslim?', a: 'To become Muslim, you sincerely declare the Shahada: "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah" (I testify there is no god but Allah, and Muhammad is His messenger). This can be done privately or in front of witnesses at a mosque. All previous sins are erased. It is recommended to learn the basics of prayer as soon as possible. KİM Vakfı offers personal guidance for new Muslims.' },
  { id: 20, cat: 'newmuslim', q: 'Do I have to change my name after becoming Muslim?', a: 'No, there is no requirement to change your name unless your current name has a meaning that contradicts Islamic monotheism (e.g., a name meaning "slave of another deity"). Many converts keep their birth names. Choosing an Arabic or Islamic name is a personal preference, not an obligation.' },
  { id: 21, cat: 'newmuslim', q: 'What should I learn first as a new Muslim?', a: 'Focus on three things first: 1) The basics of prayer (Salah) — the backbone of your daily spiritual life. 2) The concept of Tawhid (monotheism) — understanding who Allah is. 3) The life of the Prophet ﷺ — your practical role model. Beyond that, take it gradually. Islam does not demand perfection from day one. The Prophet ﷺ said: "The most beloved actions to Allah are those done consistently, even if small."' },
];

function AccordionItem({ item, isOpen, onToggle }: { item: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-kim-navy/15 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-kim-charcoal text-sm md:text-base leading-snug">{item.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-kim-navy text-white' : 'bg-gray-100 text-kim-stone'}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 border-t border-gray-50">
              <p className="text-kim-stone text-sm leading-relaxed pt-4">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [openId, setOpenId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(f => {
    const matchCat = activeCat === 'all' || f.cat === activeCat;
    const matchSearch = search.trim() === '' ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-6 py-10 mb-8 relative overflow-hidden">
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-kim-navy/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">What is Islam</span>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-xs">Q & A</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            Questions & Answers
          </h1>
          <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            Honest, evidence-based answers to the most common questions about Islam — from belief and worship to misconceptions and science.
          </p>
          {/* Search */}
          <div className="relative max-w-lg">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-kim-gold/50 focus:border-kim-gold/50"
            />
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCat(cat.id); setOpenId(null); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeCat === cat.id
                ? 'bg-kim-navy text-white'
                : 'bg-white border border-gray-200 text-kim-stone hover:border-kim-navy/30 hover:text-kim-navy'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-kim-stone mb-4 font-medium">{filtered.length} answers found</p>

      {/* Accordion */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-kim-stone">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">No matching questions found</p>
            <p className="text-sm mt-1">Try a different search or browse all categories</p>
          </div>
        ) : (
          filtered.map(item => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))
        )}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-kim-navy px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <p className="font-serif font-bold text-white text-lg mb-1">Still have a question?</p>
          <p className="text-white/55 text-sm">Our Islam Chatbot is available 24/7 on WhatsApp, Telegram, and social media.</p>
        </div>
        <Link
          href="/what-is-islam/chatbot"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-kim-gold text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm"
        >
          Ask the Chatbot
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
