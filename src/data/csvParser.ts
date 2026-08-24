import Papa from "papaparse";
import { DailyReport } from "../types/dailyReport";
const H = {
  timestamp: "タイムスタンプ",
  date: "日付",
  sleep: "昨日の睡眠時間",
  morningFatigue: "朝の疲労感",
  eveningFatigue: "夜の疲労感",
  attendance: "勤怠",
  stress: "ストレス",
  satisfaction: "満足度",
  stressCauses: "ストレス原因",
  contacts: "今日接触したもの",
  positiveImpact: "最もポジティブな影響があったもの",
  negativeImpact: "最もネガティブな影響があったもの",
  overallRating: "1日の総合評価",
  note: "備考（事後休などあれば）",
} as const;
const split = (v: string | undefined) =>
  v
    ?.split(";")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];
const score = (v: string | undefined) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
};
export function parseCsv(file: File): Promise<DailyReport[]> {
  return new Promise((resolve, reject) =>
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (r) => {
        try {
          const data = r.data.map((row, i: number) => {
            const date = row[H.date] || "";
            const d = new Date(date);
            return {
              id: `${date}-${i}`,
              timestamp: row[H.timestamp] || "",
              date,
              weekday: Number.isNaN(d.getTime())
                ? ""
                : new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(
                    d,
                  ),
              sleep: row[H.sleep] || "",
              morningFatigue: score(row[H.morningFatigue]),
              eveningFatigue: score(row[H.eveningFatigue]),
              attendance: row[H.attendance] || "",
              stress: score(row[H.stress]),
              satisfaction: score(row[H.satisfaction]),
              stressCauses: split(row[H.stressCauses]),
              contacts: split(row[H.contacts]),
              positiveImpact: row[H.positiveImpact] || "",
              negativeImpact: row[H.negativeImpact] || "",
              overallRating: score(row[H.overallRating]),
              note: row[H.note] || "",
            };
          });
          if (!data.length) throw Error("CSVにデータがありません");
          resolve(data);
        } catch (e) {
          reject(e);
        }
      },
      error: (e) => reject(e),
    }),
  );
}
