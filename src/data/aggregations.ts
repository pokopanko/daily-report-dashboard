import { DailyReport } from "../types/dailyReport";
export type Bucket = { label: string; count: number };
export function buckets(
  data: DailyReport[],
  field: keyof DailyReport,
  multi = false,
): Bucket[] {
  const m = new Map<string, number>();
  for (const r of data) {
    const vals = multi ? (r[field] as string[]) : [String(r[field] ?? "")];
    for (const v of vals) {
      if (v) m.set(v, (m.get(v) || 0) + 1);
    }
  }
  return [...m]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}
export function scoreBuckets(data: DailyReport[], field: keyof DailyReport) {
  const m = [1, 2, 3, 4, 5].map((n) => ({ label: String(n), count: 0 }));
  data.forEach((r) => {
    const v = r[field] as number | null;
    if (v) m[v - 1].count++;
  });
  const vals = data
    .map((r) => r[field] as number | null)
    .filter((x): x is number => x !== null);
  return {
    buckets: m,
    average: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null,
  };
}
export function avg(data: DailyReport[], field: keyof DailyReport) {
  const v = data
    .map((r) => r[field] as number | null)
    .filter((x): x is number => x !== null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}
export function ranking(
  data: DailyReport[],
  field: keyof DailyReport,
  multi = false,
) {
  return buckets(data, field, multi).slice(0, 10);
}
