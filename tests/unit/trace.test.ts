import { describe, expect, it } from 'vitest';
import { domainFor, layoutSpan, yearTicks } from '../../src/lib/trace';
import { formatDuration, formatMonth, toMonthIndex } from '../../src/lib/resume';

const m = toMonthIndex;

describe('toMonthIndex', () => {
  it('orders months across years', () => {
    expect(m('2022-01') - m('2021-12')).toBe(1);
    expect(m('2026-04') - m('2022-02')).toBe(50);
  });
});

describe('domainFor', () => {
  const now = m('2026-09');
  const earliest = m('2021-03');

  it('spans the whole career for "all"', () => {
    expect(domainFor('all', now, earliest)).toEqual({ from: earliest, to: now + 1 });
  });

  it('covers the last 12 months for "1y"', () => {
    const d = domainFor('1y', now, earliest);
    expect(d.to - d.from).toBe(12);
    expect(d.from).toBe(m('2025-10'));
  });

  it('never starts before the earliest span', () => {
    expect(domainFor('3y', m('2022-01'), earliest).from).toBe(earliest);
  });
});

describe('layoutSpan', () => {
  const from = m('2025-10');
  const to = m('2026-10');

  it('hides spans entirely outside the domain', () => {
    const l = layoutSpan({ start: m('2021-12'), end: m('2022-02') }, from, to);
    expect(l.visible).toBe(false);
    expect(l.width).toBe(0);
  });

  it('clips spans that started before the domain', () => {
    const l = layoutSpan({ start: m('2022-02'), end: m('2026-04') }, from, to);
    expect(l).toMatchObject({ visible: true, left: 0, clippedStart: true, clippedEnd: false });
    expect(l.width).toBe(50);
  });

  it('runs ongoing spans to the right edge', () => {
    const l = layoutSpan({ start: m('2026-04') }, from, to);
    expect(l.left).toBe(50);
    expect(l.left + l.width).toBe(100);
  });

  it('keeps very short spans visible with a minimum width', () => {
    const l = layoutSpan({ start: m('2021-12'), end: m('2022-02') }, m('2021-03'), m('2026-10'));
    expect(l.visible).toBe(true);
    expect(l.width).toBeGreaterThanOrEqual(0.8);
  });
});

describe('yearTicks', () => {
  it('places a tick on each January inside the domain', () => {
    const ticks = yearTicks(m('2021-03'), m('2026-10'));
    expect(ticks.map((t) => t.label)).toEqual(['2022', '2023', '2024', '2025', '2026']);
    for (const t of ticks) {
      expect(t.left).toBeGreaterThan(0);
      expect(t.left).toBeLessThan(100);
    }
  });
});

describe('formatters', () => {
  it('formats durations in both languages', () => {
    expect(formatDuration(50, 'en')).toBe('4 yrs 2 mos');
    expect(formatDuration(2, 'pt')).toBe('2 meses');
    expect(formatDuration(13, 'pt')).toBe('1 ano 1 mês');
    expect(formatDuration(0, 'en')).toBe('1 mo');
  });

  it('formats months and open-ended dates', () => {
    expect(formatMonth('2026-04', 'en')).toBe('Apr 2026');
    expect(formatMonth(undefined, 'en')).toBe('Present');
    expect(formatMonth(undefined, 'pt')).toBe('Atual');
    expect(formatMonth('2026-04', 'pt')).toMatch(/^abr\.? 2026$/);
  });
});
