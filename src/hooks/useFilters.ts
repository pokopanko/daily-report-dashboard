import { useMemo, useState } from "react";
import { DailyReport, Filter } from "../types/dailyReport";
import { addFilter, applyFilters } from "../utils/filter";
export function useFilters(data: DailyReport[]) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const filteredData = useMemo(
    () => applyFilters(data, filters),
    [data, filters],
  );
  const add = (f: Filter) => setFilters((x) => addFilter(x, f));
  const remove = (i: number) => setFilters((x) => x.filter((_, n) => n !== i));
  return { filters, filteredData, add, remove, clear: () => setFilters([]) };
}
