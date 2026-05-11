/**
 * Converts dark-themed page sections (below the hero) to a light theme.
 * Strategy: keep the first <section> dark (hero); convert all subsequent sections.
 */
const fs = require('fs');
const path = require('path');

function lightifyFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');

  // ── Section background replacements ──────────────────────────────
  // We track whether we're past the hero section by using a two-pass approach:
  // Pass 1: Keep hero section dark (first occurrence of each pattern).
  // Since the files are structured so the hero is always first,
  // we replace ALL occurrences and handle the hero separately by keeping a
  // specific class on its outer wrapper.

  // Replace body section backgrounds
  src = src.replace(/className="bg-\[#08101E\] py-/g, 'className="bg-white py-');
  src = src.replace(/className="bg-\[#070C18\] py-/g, 'className="bg-white py-');
  src = src.replace(/className="bg-\[#0B1628\] py-/g, 'className="bg-gray-50 py-');
  src = src.replace(/className="relative bg-\[#0B1628\] py-/g, 'className="relative bg-gray-50 py-');

  // Wrapper divs that set the page background
  src = src.replace(/className="min-h-screen bg-\[#08101E\]"/g, 'className="min-h-screen bg-white"');
  src = src.replace(/ bg-\[#08101E\]" dir=/g, ' bg-white" dir=');

  // Card backgrounds
  src = src.replace(/bg-\[#0D1728\]/g, 'bg-white');
  src = src.replace(/bg-\[#0D1220\]/g, 'bg-gray-50');
  src = src.replace(/hover:bg-\[#0D1E35\]/g, 'hover:bg-gray-50');
  src = src.replace(/hover:bg-\[#0D1728\]/g, 'hover:bg-gray-50');

  // Step number badge backgrounds
  src = src.replace(/bg-\[#0D1220\] flex/g, 'bg-gray-50 flex');

  // Timeline vertical line background (for routine section)
  src = src.replace(/bg-\[#0B1628\] border-2/g, 'bg-white border-2');

  // Bottom spacing divs
  src = src.replace(/<div className="bg-\[#08101E\] py-10"><\/div>/g, '<div className="bg-white py-10"></div>');

  // ── Text color replacements ─────────────────────────────────────
  src = src.replace(/text-white\/85/g, 'text-gray-700');
  src = src.replace(/text-white\/80/g, 'text-gray-600');
  src = src.replace(/text-white\/70/g, 'text-gray-600');
  src = src.replace(/text-white\/60/g, 'text-gray-500');
  src = src.replace(/text-white\/55/g, 'text-gray-500');
  src = src.replace(/text-white\/50/g, 'text-gray-400');
  src = src.replace(/text-white\/42/g, 'text-gray-400');
  src = src.replace(/text-white\/40/g, 'text-gray-400');
  src = src.replace(/text-white\/28/g, 'text-gray-300');
  src = src.replace(/text-white\/20/g, 'text-gray-300');
  // Headings
  src = src.replace(/text-white leading-/g, 'text-gray-900 leading-');
  src = src.replace(/text-white mb-/g, 'text-gray-900 mb-');
  src = src.replace(/text-white font-/g, 'text-gray-900 font-');
  src = src.replace(/"text-white">/g, '"text-gray-900">');
  src = src.replace(/\btext-white\b(?=\s+(?:leading|mb|font|text|mt|pt|pb|m-|p-|gap))/g, 'text-gray-900');

  // ── Border replacements ──────────────────────────────────────────
  src = src.replace(/border-white\/\[0\.06\]/g, 'border-gray-100');
  src = src.replace(/border-white\/\[0\.07\]/g, 'border-gray-100');
  src = src.replace(/border-white\/15/g, 'border-gray-200');
  src = src.replace(/border-white\/20/g, 'border-gray-200');
  src = src.replace(/border border-white\/\[0\.06\]/g, 'border border-gray-100');

  // ── Button/badge on dark bg → light bg adaptation ────────────────
  // Keep the gold CTA button as-is (text-[#08101E] on gold bg is fine)
  // But the outline button needs updating
  src = src.replace(/border-white\/20 bg-white\/5 text-white\/80/g, 'border-gray-300 bg-white text-gray-700');
  src = src.replace(/hover:border-white\/40 hover:bg-white\/10/g, 'hover:border-gray-400 hover:bg-gray-50');
  src = src.replace(/bg-white\/5 text-white\/60/g, 'bg-gray-100 text-gray-500');
  src = src.replace(/border-white\/15 bg-white\/5 text-white\/60/g, 'border-gray-200 bg-gray-50 text-gray-500');

  // Map overlay gradient (contact page map)
  src = src.replace(/from-\[#0A1422\]\/90/g, 'from-black\/60');

  // Map iframe filter (lighter)
  src = src.replace(/filter: 'grayscale\(20%\) invert\(5%\)'/g, "filter: 'grayscale(10%)'");

  // Hero-specific: We need to RESTORE the hero section backgrounds.
  // The hero uses `relative bg-[#08101E] overflow-hidden` or `relative bg-[#070C18] overflow-hidden`
  // But we've already replaced them. Let's restore them:
  src = src.replace(/className="relative bg-white overflow-hidden"(\s*>[\s\S]*?<\/section>\s*\n\s*{?\/\* ── (?:Steps|Two-column|Topics|Routine))/,
    (match) => match.replace('className="relative bg-white overflow-hidden"', 'className="relative bg-[#08101E] overflow-hidden"')
  );

  fs.writeFileSync(filePath, src, 'utf8');
  console.log('Lightified:', path.relative(process.cwd(), filePath));
}

const files = [
  'src/app/[locale]/contact/page.tsx',
  'src/app/[locale]/volunteer/page.tsx',
  'src/app/[locale]/new-muslim-care-area/how-i-live-islam/page.tsx',
];

for (const f of files) {
  const full = path.join(__dirname, '..', f);
  if (fs.existsSync(full)) lightifyFile(full);
  else console.log('NOT FOUND:', full);
}
console.log('Done.');
