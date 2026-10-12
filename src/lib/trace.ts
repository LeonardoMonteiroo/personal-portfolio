// Pure layout math for the career trace, shared by the server render and the client script.

export type RangeKey = '1y' | '2y' | '3y' | 'all';

export const RANGE_MONTHS: Record<Exclude<RangeKey, 'all'>, number> = { '1y': 12, '2y': 24, '3y': 36 };

export interface SpanInput {
  /** Month index (year * 12 + month0) where the span starts. */
  start: number;
  /** Month index where the span ends, exclusive. Omit for ongoing spans. */
  end?: number;
}

export interface SpanLayout {
  /** Offset from the left edge of the domain, in percent. */
  left: number;
  /** Bar width, in percent. 0 when the span is fully outside the domain. */
  width: number;
  visible: boolean;
  clippedStart: boolean;
  clippedEnd: boolean;
}

export function domainFor(range: RangeKey, now: number, earliest: number): { from: number; to: number } {
  const to = now + 1;
  const from = range === 'all' ? earliest : Math.max(earliest, to - RANGE_MONTHS[range]);
  return { from, to };
}

export function layoutSpan(span: SpanInput, from: number, to: number): SpanLayout {
  const total = Math.max(1, to - from);
  const end = span.end ?? to;
  const s = Math.max(span.start, from);
  const e = Math.min(end, to);
  if (e <= s) {
    return { left: 0, width: 0, visible: false, clippedStart: false, clippedEnd: false };
  }
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    left: round(((s - from) / total) * 100),
    width: round(Math.max(((e - s) / total) * 100, 0.8)),
    visible: true,
    clippedStart: span.start < from,
    clippedEnd: end > to,
  };
}

/** Year ticks inside the domain, as label + percent offset pairs. */
export function yearTicks(from: number, to: number): { label: string; left: number }[] {
  const total = Math.max(1, to - from);
  const ticks: { label: string; left: number }[] = [];
  for (let y = Math.ceil(from / 12); y * 12 < to; y++) {
    ticks.push({ label: String(y), left: Math.round(((y * 12 - from) / total) * 10000) / 100 });
  }
  return ticks;
}
