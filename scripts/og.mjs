// Generates social preview images (Open Graph / Twitter), the Person image and the touch icon.
// Run with `npm run og` after changing the photo or the headline; the output is committed.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => resolve(root, 'public', p);
await mkdir(out('og'), { recursive: true });

const photoPath = resolve(root, 'src/assets/profile.png');
const photo = await sharp(photoPath).extract({ left: 150, top: 0, width: 500, height: 500 }).resize(360, 360).png().toBuffer();
const photoB64 = photo.toString('base64');

const copy = {
  en: {
    role: 'Full Stack Developer &amp; Tech Lead',
    line: 'React · Node.js · TypeScript · Google Cloud',
    stats: [
      ['800+', 'PRs reviewed'],
      ['80+', 'features shipped'],
      ['1,600+', 'prod tickets solved'],
    ],
  },
  pt: {
    role: 'Desenvolvedor Full Stack &amp; Tech Lead',
    line: 'React · Node.js · TypeScript · Google Cloud',
    stats: [
      ['800+', 'PRs revisados'],
      ['80+', 'features entregues'],
      ['1.600+', 'chamados resolvidos'],
    ],
  },
};

const font = "Inter, 'Segoe UI', Arial, sans-serif";
const mono = "'JetBrains Mono', Consolas, 'Courier New', monospace";

function svg(lang) {
  const c = copy[lang];
  const stats = c.stats
    .map(
      ([v, l], i) => `
    <g transform="translate(${80 + i * 230}, 470)">
      <rect width="210" height="96" rx="10" fill="#111318" stroke="#242833"/>
      <text x="18" y="46" font-family="${mono}" font-size="34" font-weight="700" fill="#e7e9ee">${v.replace('+', '')}<tspan fill="#ff8a3d">+</tspan></text>
      <text x="18" y="76" font-family="${font}" font-size="18" fill="#8b93a1">${l}</text>
    </g>`,
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="#ffffff" stroke-opacity="0.04"/>
    </pattern>
    <radialGradient id="glow" cx="1" cy="0" r="0.9">
      <stop offset="0" stop-color="#ff8a3d" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="avatar"><rect x="800" y="110" width="320" height="320" rx="24"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="#0b0c0f"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80, 72)">
    <rect width="34" height="34" rx="8" fill="#ff8a3d"/>
    <text x="17" y="23" text-anchor="middle" font-family="${mono}" font-size="15" font-weight="700" fill="#1a0d03">lm</text>
    <text x="50" y="23" font-family="${mono}" font-size="18" fill="#8b93a1">leonardo-monteiro / career-observability</text>
    <circle cx="560" cy="17" r="6" fill="#3fb950"/>
  </g>
  <text x="80" y="228" font-family="${font}" font-size="76" font-weight="700" fill="#e7e9ee" letter-spacing="-2">Leonardo Monteiro</text>
  <text x="80" y="292" font-family="${font}" font-size="38" font-weight="500" fill="#ff8a3d">${c.role}</text>
  <text x="80" y="350" font-family="${mono}" font-size="22" fill="#b7bdc8">${c.line}</text>
  ${stats}
  <image href="data:image/png;base64,${photoB64}" x="800" y="110" width="320" height="320" clip-path="url(#avatar)" preserveAspectRatio="xMidYMid slice"/>
  <rect x="800" y="110" width="320" height="320" rx="24" fill="none" stroke="#323846" stroke-width="2"/>
</svg>`;
}

for (const lang of ['en', 'pt']) {
  await sharp(Buffer.from(svg(lang))).png({ compressionLevel: 9 }).toFile(out(`og/${lang}.png`));
  console.log(`wrote public/og/${lang}.png`);
}

await sharp(photoPath).extract({ left: 100, top: 0, width: 600, height: 600 }).resize(600, 600).jpeg({ quality: 82, mozjpeg: true }).toFile(out('og/profile.jpg'));
console.log('wrote public/og/profile.jpg');

const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" rx="36" fill="#ff8a3d"/><text x="90" y="116" text-anchor="middle" font-family="${mono}" font-size="84" font-weight="700" fill="#1a0d03">lm</text></svg>`;
await sharp(Buffer.from(touch)).png().toFile(out('apple-touch-icon.png'));
console.log('wrote public/apple-touch-icon.png');

await writeFile(
  out('favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#ff8a3d"/><text x="32" y="42" text-anchor="middle" font-family="ui-monospace, Consolas, monospace" font-size="28" font-weight="700" fill="#1a0d03">lm</text></svg>\n`,
);
console.log('wrote public/favicon.svg');
