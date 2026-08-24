import { DailyReport, Filter } from "../types/dailyReport";
export function applyFilters(data: DailyReport[], filters: Filter[]) {
  return data.filter((r) =>
    filters.every((f) =>
      f.mode === "contains"
        ? Array.isArray(r[f.field])
          ? (r[f.field] as string[]).includes(f.value)
          : String(r[f.field]).includes(f.value)
        : String(r[f.field]) === f.value,
    ),
  );
}
export const addFilter = (filters: Filter[], f: Filter) =>
  filters.some((x) => x.field === f.field && x.value === f.value)
    ? filters
    : [...filters, f];
