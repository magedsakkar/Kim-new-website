const WORDS = [
  'Cross Cultural', '✦', 'Kültürlerarası', '✦', 'عابر الثقافات', '✦',
  'Istanbul', '✦', 'Süleymaniye', '✦', 'Est. 2010', '✦',
  'KİM Vakfı', '✦', '80+ Countries', '✦', 'New Muslims', '✦',
  'Dialogue', '✦', 'Understanding', '✦', 'Faith', '✦',
];

export function MarqueeBanner() {
  const repeated = [...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden bg-kim-olive/90 py-3 border-y border-kim-olive/30">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((word, i) => (
          <span
            key={i}
            className={`mx-4 text-sm font-medium ${
              word === '✦' ? 'text-white/40 text-xs' : 'text-white/80'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
