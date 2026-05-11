/**
 * Converts the body sections of dark pages to light theme.
 * Hero sections (the first dark section) are KEPT dark.
 */
const fs = require('fs');
const path = require('path');

function replace(src, from, to) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  const result = src.replace(regex, to);
  if (result === src) console.warn('  ⚠ no match for:', from.slice(0, 80));
  return result;
}

// ── HOW-I-LIVE-ISLAM ─────────────────────────────────────────────────────────
function convertHowILiveIslam(src) {
  // Wrapper background
  src = replace(src, 'className="min-h-screen bg-[#08101E]"', 'className="min-h-screen bg-white"');

  // Section backgrounds (keep hero dark → `overflow-hidden bg-[#08101E] pt-20` stays)
  src = replace(src, '<section className="bg-[#08101E] py-24">', '<section className="bg-white py-24">');
  src = replace(src, '<section className="relative bg-[#0B1628] py-24 overflow-hidden">', '<section className="relative bg-gray-50 py-24 overflow-hidden">');
  src = replace(src, '<section className="bg-[#08101E] py-20">', '<section className="bg-gray-50 py-20">');
  src = replace(src, '<section className="bg-[#0B1628] py-24">', '<section className="bg-white py-24">');
  src = replace(src, '<div className="bg-[#08101E] py-10">', '<div className="bg-gray-100 py-10">');

  // Topic cards
  src = replace(src,
    'className="group relative rounded-2xl border border-white/[0.07] bg-[#0D1728] p-7 hover:border-[#C9973A]/35 hover:bg-[#0D1E35] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,151,58,0.09)] flex flex-col"',
    'className="group relative rounded-2xl border border-gray-100 bg-white p-7 hover:border-[#C9973A]/40 hover:bg-amber-50/20 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(201,151,58,0.12)] flex flex-col"'
  );
  src = replace(src,
    'className="font-serif text-lg font-bold text-white mb-3 group-hover:text-[#E8B96A] transition-colors duration-300"',
    'className="font-serif text-lg font-bold text-gray-900 mb-3 group-hover:text-[#C9973A] transition-colors duration-300"'
  );
  src = replace(src,
    'className="text-white/55 text-sm leading-relaxed mb-5"',
    'className="text-gray-500 text-sm leading-relaxed mb-5"'
  );
  src = replace(src,
    '<span className="text-white/45 text-xs leading-relaxed">{tip}</span>',
    '<span className="text-gray-400 text-xs leading-relaxed">{tip}</span>'
  );
  src = replace(src,
    'className="mt-auto pt-4 border-t border-white/[0.06]"',
    'className="mt-auto pt-4 border-t border-gray-100"'
  );

  // Topics section heading
  src = replace(src,
    'className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"',
    'className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4"'
  );
  src = replace(src,
    'className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed"',
    'className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed"'
  );

  // Routine section heading
  src = replace(src,
    'className="text-white/50 text-base max-w-xl mx-auto"',
    'className="text-gray-500 text-base max-w-xl mx-auto"'
  );
  // (Note: the h2 in routine reuses same class as topics — covered above)

  // Timeline node circle
  src = replace(src,
    'className="w-12 h-12 rounded-full bg-[#0B1628] border-2 border-[#C9973A]/50 flex items-center justify-center"',
    'className="w-12 h-12 rounded-full bg-white border-2 border-[#C9973A]/50 flex items-center justify-center shadow-sm"'
  );

  // Timeline cards
  src = replace(src,
    '`flex-1 rounded-xl border border-white/[0.07] bg-[#0D1728] p-5 hover:border-[#C9973A]/25 transition-all duration-300 ${',
    '`flex-1 rounded-xl border border-gray-100 bg-white p-5 hover:border-[#C9973A]/30 shadow-sm transition-all duration-300 ${'
  );
  src = replace(src,
    'className="text-white/60 text-sm leading-relaxed">{step.desc}</p>',
    'className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>'
  );

  // Hadith quote section
  src = replace(src,
    'className="relative rounded-3xl overflow-hidden border border-white/[0.07]"',
    'className="relative rounded-3xl overflow-hidden border border-amber-100"'
  );
  src = replace(src,
    "style={{ background: 'linear-gradient(135deg, #0D1E35 0%, #0B1628 100%)' }}",
    "style={{ background: 'linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%)' }}"
  );
  src = replace(src,
    'className="font-serif text-3xl text-[#C9973A]/30 mb-2 leading-none"',
    'className="font-serif text-3xl text-[#C9973A]/40 mb-2 leading-none"'
  );
  src = replace(src,
    'className="font-serif text-5xl text-[#C9973A]/20 mb-2 leading-none"',
    'className="font-serif text-5xl text-[#C9973A]/30 mb-2 leading-none"'
  );
  src = replace(src,
    `className={\`font-serif text-xl md:text-2xl text-white/90 leading-relaxed \${isRtl ? 'text-right' : ''}\`}`,
    `className={\`font-serif text-xl md:text-2xl text-gray-800 leading-relaxed \${isRtl ? 'text-right' : ''}\`}`
  );

  // CTA section
  src = replace(src,
    'className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>',
    'className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>'
  );
  src = replace(src,
    'className="text-white/55 text-base leading-relaxed max-w-xl mx-auto mb-10"',
    'className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto mb-10"'
  );
  src = replace(src,
    'className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 text-white/80 font-semibold text-sm hover:border-white/40 hover:bg-white/10 transition-all duration-300"',
    'className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:border-[#C9973A]/50 hover:bg-amber-50 transition-all duration-300"'
  );

  // Back link
  src = replace(src,
    'className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-[#C9973A] transition-colors duration-300"',
    'className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#C9973A] transition-colors duration-300"'
  );

  return src;
}

// ── VOLUNTEER ────────────────────────────────────────────────────────────────
function convertVolunteer(src) {
  // Steps section
  src = replace(src, '<section className="bg-[#070C18] py-24">', '<section className="bg-white py-24">');
  src = replace(src,
    'className="font-serif text-3xl md:text-4xl font-bold text-white">{ss.title}</h2>',
    'className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{ss.title}</h2>'
  );
  // Step number badge
  src = replace(src,
    'className="relative z-10 w-20 h-20 rounded-full border-2 border-[#C9973A]/40 bg-[#0D1220] flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-[#C9973A] group-hover:bg-[#C9973A]/10 group-hover:shadow-[0_0_30px_rgba(201,151,58,0.2)]"',
    'className="relative z-10 w-20 h-20 rounded-full border-2 border-[#C9973A]/40 bg-amber-50 flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-[#C9973A] group-hover:bg-[#C9973A]/10 group-hover:shadow-[0_0_30px_rgba(201,151,58,0.2)]"'
  );
  src = replace(src,
    'className="font-serif text-lg font-bold text-white mb-2">',
    'className="font-serif text-lg font-bold text-gray-900 mb-2">'
  );
  src = replace(src,
    'className="text-white/50 text-sm leading-relaxed max-w-[180px]">',
    'className="text-gray-500 text-sm leading-relaxed max-w-[180px]">'
  );

  // KIM Academy section
  src = replace(src, '<section className="relative bg-[#0B1628] py-24 overflow-hidden">', '<section className="relative bg-gray-50 py-24 overflow-hidden">');
  src = replace(src,
    'className="font-serif text-3xl md:text-4xl font-bold text-white mt-2 mb-5">',
    'className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">'
  );
  src = replace(src,
    'className="text-white/60 leading-relaxed mb-8 text-base">{ac.body}</p>',
    'className="text-gray-500 leading-relaxed mb-8 text-base">{ac.body}</p>'
  );
  src = replace(src,
    '<span className="text-white/80 text-sm">{item}</span>',
    '<span className="text-gray-600 text-sm">{item}</span>'
  );
  // Stats card
  src = replace(src,
    'className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10"',
    'className="rounded-3xl border border-gray-100 bg-white shadow-sm p-10"'
  );
  src = replace(src,
    'className="text-center bg-white/5 border border-white/8 rounded-2xl p-5"',
    'className="text-center bg-gray-50 border border-gray-100 rounded-2xl p-5"'
  );
  src = replace(src,
    'className="font-serif text-3xl font-bold text-white mb-1">{s.n}</div>',
    'className="font-serif text-3xl font-bold text-gray-900 mb-1">{s.n}</div>'
  );
  src = replace(src,
    'className="text-white/50 text-xs">{s.label}</div>',
    'className="text-gray-400 text-xs">{s.label}</div>'
  );

  // Benefits section
  src = replace(src, '<section className="bg-[#070C18] py-24">', '<section className="bg-white py-24">');
  src = replace(src,
    'className="font-serif text-3xl md:text-4xl font-bold text-white">{bs.title}</h2>',
    'className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{bs.title}</h2>'
  );
  src = replace(src,
    'className="group rounded-2xl border border-white/[0.06] bg-[#0D1220] p-7 hover:border-[#C9973A]/30 hover:bg-[#0D1220] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,151,58,0.08)]"',
    'className="group rounded-2xl border border-gray-100 bg-white p-7 hover:border-[#C9973A]/30 hover:bg-amber-50/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,151,58,0.1)]"'
  );
  src = replace(src,
    'className="font-serif text-base font-bold text-white mb-2">{b.titles[l]}</h3>',
    'className="font-serif text-base font-bold text-gray-900 mb-2">{b.titles[l]}</h3>'
  );
  src = replace(src,
    'className="text-white/50 text-sm leading-relaxed">{b.descs[l]}</p>',
    'className="text-gray-500 text-sm leading-relaxed">{b.descs[l]}</p>'
  );

  // Form+FAQ section
  src = replace(src, '<section className="bg-[#0B1628] py-24">', '<section className="bg-gray-50 py-24">');
  src = replace(src,
    'className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">\n                {fl.form}',
    'className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">\n                {fl.form}'
  );
  src = replace(src,
    'className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">\n              {fl.faq}',
    'className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">\n              {fl.faq}'
  );

  return src;
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
function convertContact(src) {
  // Two-column body section
  src = replace(src, '<section className="bg-[#08101E] py-20 md:py-28">', '<section className="bg-white py-20 md:py-28">');

  // Info cards
  src = replace(src,
    'className="group flex items-start gap-5 p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-[#0D1728] hover:bg-[#0D1E35] hover:border-[#C9973A] transition-all duration-300"',
    'className="group flex items-start gap-5 p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-white shadow-sm hover:bg-amber-50/30 hover:border-[#C9973A] transition-all duration-300"'
  );
  src = replace(src,
    'className="text-white/85 text-sm leading-relaxed break-words">',
    'className="text-gray-700 text-sm leading-relaxed break-words">'
  );

  // Social row
  src = replace(src,
    'className="p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-[#0D1728]"',
    'className="p-5 rounded-2xl border-l-2 border-[#C9973A]/40 bg-white shadow-sm"'
  );
  src = replace(src,
    'className="w-10 h-10 rounded-full border border-[#C9973A]/30 flex items-center justify-center text-white/60 hover:text-[#C9973A] hover:border-[#C9973A] hover:bg-[#C9973A]/10 transition-all duration-300"',
    'className="w-10 h-10 rounded-full border border-[#C9973A]/30 flex items-center justify-center text-gray-500 hover:text-[#C9973A] hover:border-[#C9973A] hover:bg-amber-50 transition-all duration-300"'
  );

  // Map
  src = replace(src,
    'className="relative rounded-2xl overflow-hidden border border-white/[0.06]"',
    'className="relative rounded-2xl overflow-hidden border border-gray-100"'
  );
  src = replace(src,
    "style={{ border: 0, filter: 'grayscale(20%) invert(5%)' }}",
    "style={{ border: 0, filter: 'grayscale(15%)' }}"
  );
  src = replace(src,
    'className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1422]/90 to-transparent px-4 py-3 flex items-center justify-between"',
    'className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 flex items-center justify-between"'
  );

  // Form container
  src = replace(src,
    'className="rounded-3xl border border-white/[0.06] bg-[#0D1728] p-8 md:p-10"',
    'className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8 md:p-10"'
  );
  src = replace(src,
    'className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">',
    'className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">'
  );

  return src;
}

const FILES = [
  {
    rel: 'src/app/[locale]/new-muslim-care-area/how-i-live-islam/page.tsx',
    transform: convertHowILiveIslam,
  },
  {
    rel: 'src/app/[locale]/volunteer/page.tsx',
    transform: convertVolunteer,
  },
  {
    rel: 'src/app/[locale]/contact/page.tsx',
    transform: convertContact,
  },
];

const ROOT = path.join(__dirname, '..');
let errors = 0;

for (const { rel, transform } of FILES) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    console.error('NOT FOUND:', full);
    errors++;
    continue;
  }
  let src = fs.readFileSync(full, 'utf8');
  src = transform(src);
  fs.writeFileSync(full, src, 'utf8');
  console.log('✓', rel);
}

console.log(errors ? `Done with ${errors} error(s).` : 'All done.');
