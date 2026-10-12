// Guards the "no inflated numbers" rule: every figure the site shows must exist in the verified résumé.
import { describe, expect, it } from 'vitest';
import en from '../../src/data/resume.en.json';
import pt from '../../src/data/resume.pt.json';
import { cases } from '../../src/data/cases';
import { ui } from '../../src/i18n/ui';

const corpus = {
  en: JSON.stringify(en),
  pt: JSON.stringify(pt),
};

/** "1,600+" / "1.600+" / "~100" / "54%" -> "1600" / "100" / "54" */
const digits = (v: string | number) => String(v).replace(/[^\d]/g, '');

// The résumé spells small numbers out ("two screens", "seis módulos").
const words: Record<'en' | 'pt', Record<string, string[]>> = {
  en: { '2': ['two'], '3': ['three'], '4': ['four'], '6': ['six'] },
  pt: { '2': ['dois', 'duas'], '3': ['três'], '4': ['quatro'], '6': ['seis'] },
};

function inResume(lang: 'en' | 'pt', value: string | number): boolean {
  const d = digits(value);
  const flat = corpus[lang].replace(/(\d)[.,](\d{3})/g, '$1$2').replace(/(\d+) mil(?![\p{L}])/gu, '$1000');
  if (new RegExp(`(^|\\D)${d}(\\D|$)`).test(flat)) return true;
  return (words[lang][d] ?? []).some((w) => new RegExp(`(^|[^\\p{L}])${w}([^\\p{L}]|$)`, 'iu').test(flat));
}

describe('headline numbers come from the résumé', () => {
  for (const lang of ['en', 'pt'] as const) {
    it(`stats and signals (${lang})`, () => {
      for (const s of ui[lang].stats) expect(inResume(lang, s.value), `${s.value} ${s.label}`).toBe(true);
      for (const s of ui[lang].signals) expect(inResume(lang, s.value), `${s.value} ${s.label}`).toBe(true);
    });

    it(`case study metrics (${lang})`, () => {
      for (const c of cases) {
        for (const metric of c[lang].metrics) {
          // "3 telemetry signals" is a count of Prometheus/Loki/Tempo, not a résumé figure.
          if (/telemetry|telemetria/.test(metric.label)) continue;
          expect(inResume(lang, metric.value), `${c.slug}: ${metric.value} ${metric.label}`).toBe(true);
        }
      }
    });
  }
});

describe('bilingual parity', () => {
  it('each case has the same structure in both languages', () => {
    for (const c of cases) {
      for (const key of ['metrics', 'context', 'problem', 'approach', 'outcome'] as const) {
        expect(c.pt[key].length, `${c.slug}.${key}`).toBe(c.en[key].length);
      }
    }
  });

  it('résumés list the same roles and dates', () => {
    expect(pt.work.map((w) => [w.startDate, w.endDate])).toEqual(en.work.map((w) => [w.startDate, w.endDate]));
    expect(pt.education.map((e) => e.startDate)).toEqual(en.education.map((e) => e.startDate));
  });

  it('case slugs are unique and URL-safe', () => {
    const slugs = cases.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });
});

describe('SEO copy', () => {
  for (const lang of ['en', 'pt'] as const) {
    it(`meta title and description fit search snippets (${lang})`, () => {
      expect(ui[lang].metaTitle.length).toBeLessThanOrEqual(90);
      expect(ui[lang].metaDescription.length).toBeGreaterThanOrEqual(110);
      expect(ui[lang].metaDescription.length).toBeLessThanOrEqual(165);
    });
  }

  it('case summaries work as meta descriptions', () => {
    for (const c of cases) {
      for (const lang of ['en', 'pt'] as const) {
        expect(c[lang].summary.length, `${c.slug} ${lang}`).toBeGreaterThanOrEqual(90);
        expect(c[lang].summary.length, `${c.slug} ${lang}`).toBeLessThanOrEqual(200);
      }
    }
  });
});
