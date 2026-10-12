// Copies the résumé JSON (single source of truth) from the sibling `career` repo.
// Run locally with `npm run sync:career`; the copies in src/data are committed so CI can build.
import { copyFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const careerDir = process.env.CAREER_DIR ?? resolve(root, '..', 'career');

for (const lang of ['en', 'pt']) {
  const from = resolve(careerDir, lang, 'resume.json');
  const to = resolve(root, 'src', 'data', `resume.${lang}.json`);
  await access(from);
  await copyFile(from, to);
  console.log(`synced ${from} -> ${to}`);
}
