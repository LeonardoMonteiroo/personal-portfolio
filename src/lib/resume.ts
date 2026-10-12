import en from '../data/resume.en.json';
import pt from '../data/resume.pt.json';

export type Lang = 'en' | 'pt';

export type Resume = typeof en;

const resumes: Record<Lang, Resume> = { en, pt: pt as Resume };

export function getResume(lang: Lang): Resume {
  return resumes[lang];
}

/** "2022-02" -> months since year 0, so spans can be compared and measured. */
export function toMonthIndex(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

export function monthIndexOf(date: Date): number {
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}

export function formatDuration(months: number, lang: Lang): string {
  const total = Math.max(1, months);
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts: string[] = [];
  if (y) parts.push(lang === 'en' ? `${y} yr${y > 1 ? 's' : ''}` : `${y} ano${y > 1 ? 's' : ''}`);
  if (m) parts.push(lang === 'en' ? `${m} mo${m > 1 ? 's' : ''}` : `${m} ${m > 1 ? 'meses' : 'mês'}`);
  return parts.join(' ');
}

export function formatMonth(ym: string | undefined, lang: Lang): string {
  if (!ym) return lang === 'en' ? 'Present' : 'Atual';
  const [y, m] = ym.split('-').map(Number);
  const label = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'pt-BR', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, 1)));
  return label.replace('.', '').replace(' de ', ' ');
}

/** Joins a site-relative path onto the configured base, always ending in "/" for pages. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  if (!clean) return `${base}/`;
  const isFile = /\.[a-z0-9]+$/i.test(clean.split('#')[0]);
  const [p, hash] = clean.split('#');
  const withSlash = isFile || p.endsWith('/') || p === '' ? p : `${p}/`;
  return `${base}/${withSlash}${hash !== undefined ? `#${hash}` : ''}`;
}

export function localePath(lang: Lang, path = ''): string {
  return url(lang === 'pt' ? `pt/${path.replace(/^\/+/, '')}` : path);
}
