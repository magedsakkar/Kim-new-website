import { Link } from '@/lib/i18n/navigation';

const CHANNELS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+90 553 787 18 46',
    desc: 'Message us directly on WhatsApp. Our team and AI assistant respond in English, Turkish, and Arabic.',
    color: 'bg-[#25D366]',
    textColor: 'text-white',
    borderColor: 'border-[#25D366]/20',
    bgLight: 'bg-[#25D366]/8',
    href: 'https://wa.me/905537871846',
    cta: 'Open WhatsApp',
    available: '24/7 AI · Team response within 24h',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: '@kimvakfi_bot',
    desc: 'Chat with our Islam bot on Telegram. Ask anything about Islam and receive structured, sourced answers instantly.',
    color: 'bg-[#2CA5E0]',
    textColor: 'text-white',
    borderColor: 'border-[#2CA5E0]/20',
    bgLight: 'bg-[#2CA5E0]/8',
    href: 'https://t.me/kimvakfi',
    cta: 'Open Telegram',
    available: '24/7 AI responses',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram DM',
    handle: '@kimvakfi',
    desc: 'Send us a direct message on Instagram. We respond to questions about Islam, our programs, and visitor information.',
    color: 'bg-gradient-to-br from-[#E1306C] to-[#833AB4]',
    textColor: 'text-white',
    borderColor: 'border-pink-200',
    bgLight: 'bg-pink-50',
    href: 'https://instagram.com/kimvakfi',
    cta: 'Open Instagram',
    available: 'Team responds within 48h',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    handle: 'KİM Vakfı',
    desc: 'Chat with us on Facebook Messenger. We answer questions about Islam and help new Muslims find resources and support.',
    color: 'bg-[#0084FF]',
    textColor: 'text-white',
    borderColor: 'border-blue-200',
    bgLight: 'bg-blue-50',
    href: 'https://facebook.com/kimvakfi',
    cta: 'Open Messenger',
    available: 'Team responds within 48h',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
      </svg>
    ),
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'info@kim.org.tr',
    desc: 'For detailed questions, partnership inquiries, or if you prefer email. We respond within 1–3 business days.',
    color: 'bg-kim-navy',
    textColor: 'text-white',
    borderColor: 'border-kim-navy/20',
    bgLight: 'bg-kim-navy-light',
    href: 'mailto:info@kim.org.tr',
    cta: 'Send Email',
    available: 'Response within 1–3 business days',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose a Channel', desc: 'Pick any messaging platform you already use — WhatsApp, Telegram, Instagram, or Facebook.' },
  { step: '02', title: 'Ask Your Question', desc: 'Type any question about Islam — belief, worship, ethics, the Prophet, the Quran, or practical life.' },
  { step: '03', title: 'Get an Answer', desc: 'Our AI chatbot responds instantly with sourced, scholarly answers. Complex questions are escalated to our team.' },
  { step: '04', title: 'Go Deeper', desc: 'Browse recommended resources, follow up with more questions, or connect with our counselors for personal support.' },
];

export default function ChatbotPage() {
  return (
    <div>
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-kim-navy to-kim-navy-dark px-6 py-10 mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-kim-gold/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-kim-gold text-xs font-semibold uppercase tracking-widest">What is Islam</span>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-xs">Islam Chatbot</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-kim-gold/20 border border-kim-gold/30 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                Islam Chatbot
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Available 24/7</span>
              </div>
            </div>
          </div>
          <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl">
            Have a question about Islam? Ask our AI chatbot through any messaging platform you already use.
            Scholarly, sourced answers — available in English, Turkish, and Arabic.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-bold text-kim-charcoal mb-5">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="text-3xl font-bold text-kim-navy/15 font-serif mb-2 leading-none">{step.step}</div>
              <h3 className="font-semibold text-kim-charcoal text-sm mb-1.5">{step.title}</h3>
              <p className="text-xs text-kim-stone leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Channel cards */}
      <h2 className="font-serif text-xl font-bold text-kim-charcoal mb-5">Connect on Your Platform</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CHANNELS.map((channel) => (
          <div
            key={channel.id}
            className={`group rounded-2xl border ${channel.borderColor} ${channel.bgLight} p-5 hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className={`w-12 h-12 rounded-2xl ${channel.color} ${channel.textColor} flex items-center justify-center shadow-sm`}>
                {channel.icon}
              </div>
              <span className="text-[10px] font-semibold text-kim-stone bg-white rounded-full px-2.5 py-1 border border-gray-100">
                {channel.available}
              </span>
            </div>

            <h3 className="font-bold text-kim-charcoal mb-0.5">{channel.name}</h3>
            <p className="text-xs text-kim-stone font-medium mb-2">{channel.handle}</p>
            <p className="text-sm text-kim-stone leading-relaxed mb-4">{channel.desc}</p>

            <a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${channel.color} ${channel.textColor} text-sm font-semibold hover:opacity-90 transition-opacity`}
            >
              {channel.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      {/* Topics the chatbot handles */}
      <div className="rounded-2xl bg-white border border-gray-100 p-6 mb-6">
        <h3 className="font-serif font-bold text-kim-charcoal mb-4">Topics the Chatbot Handles</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Who is Allah?', 'The 5 Pillars', 'How to pray', 'The Quran', 'Prophet Muhammad ﷺ',
            'Halal & Haram', 'Islamic ethics', 'How to become Muslim', 'Ramadan & fasting',
            'Common misconceptions', 'Islam and science', 'Du\'a (supplication)', 'Family in Islam',
            'Zakat & charity', 'Islamic history', 'Hajj & Umrah',
          ].map(topic => (
            <span key={topic} className="text-xs font-medium px-3 py-1.5 rounded-full bg-kim-navy-light text-kim-navy border border-kim-navy/10">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-kim-olive-light border border-kim-olive/20">
        <span className="text-lg mt-0.5">📌</span>
        <div>
          <p className="text-sm font-semibold text-kim-charcoal mb-0.5">Note on AI responses</p>
          <p className="text-xs text-kim-stone leading-relaxed">
            Our chatbot is designed to provide accurate, scholarly Islamic answers. For sensitive or complex matters (family issues, religious rulings, personal guidance),
            we recommend following up with our human team at <a href="mailto:info@kim.org.tr" className="text-kim-navy underline">info@kim.org.tr</a> or visiting us in Istanbul.
          </p>
        </div>
      </div>
    </div>
  );
}
