import { useState } from "react";
import { DailyReport } from "../types/dailyReport";
import { parseCsv } from "../data/csvParser";
export function useCsvData() {
  const [data, setData] = useState<DailyReport[]>([]);
  const [error, setError] = useState("");
  const load = async (file: File) => {
    try {
      setError("");
      setData(await parseCsv(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "CSVを読み込めませんでした");
    }
  };
  return { data, error, load };
}
