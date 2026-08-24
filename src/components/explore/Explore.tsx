import { DailyReport, Filter } from "../../types/dailyReport";
import { buckets, scoreBuckets, avg } from "../../data/aggregations";
import { QuestionCard } from "./QuestionCard";
import { CategoryChart } from "./CategoryChart";
import { ScoreChart } from "./ScoreChart";
const category: [keyof DailyReport, string, boolean][] = [
  ["sleep", "昨日の睡眠時間", false],
  ["attendance", "勤怠", false],
  ["positiveImpact", "最もポジティブな影響", false],
  ["negativeImpact", "最もネガティブな影響", false],
  ["stressCauses", "ストレス原因", true],
  ["contacts", "今日接触したもの", true],
];
const scores: [keyof DailyReport, string][] = [
  ["morningFatigue", "朝の疲労感"],
  ["eveningFatigue", "夜の疲労感"],
  ["stress", "ストレス"],
  ["satisfaction", "満足度"],
  ["overallRating", "1日の総合評価"],
];
export function Explore({
  data,
  onFilter,
  onDate,
}: {
  data: DailyReport[];
  onFilter: (f: Filter) => void;
  onDate: (r: DailyReport) => void;
}) {
  const scoreCard = (field: keyof DailyReport, title: string) => (
    <QuestionCard
      key={String(field)}
      title={title}
      average={scoreBuckets(data, field).average}
    >
      <ScoreChart
        items={scoreBuckets(data, field).buckets}
        field={field}
        onClick={onFilter}
      />
    </QuestionCard>
  );
  const catCard = (field: keyof DailyReport, title: string, multi = false) => (
    <QuestionCard key={String(field)} title={title}>
      <CategoryChart
        items={buckets(data, field, multi)}
        field={field}
        onClick={onFilter}
      />
    </QuestionCard>
  );
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="rounded-xl border border-slate-800 p-10 text-center text-slate-500">
          条件に一致するデータがありません
        </div>
      ) : (
        <>
          {catCard("sleep", "昨日の睡眠時間")}
          {scoreCard("morningFatigue", "朝の疲労感")}
          {scoreCard("eveningFatigue", "夜の疲労感")}
          {catCard("attendance", "勤怠")}
          {scoreCard("stress", "ストレス")}
          {scoreCard("satisfaction", "満足度")}
          {catCard("stressCauses", "ストレス原因", true)}
          {catCard("contacts", "今日接触したもの", true)}
          {catCard("positiveImpact", "最もポジティブな影響")}
          {catCard("negativeImpact", "最もネガティブな影響")}
          {scoreCard("overallRating", "1日の総合評価")}
          <QuestionCard title="日付・備考">
            <div className="space-y-2">
              {[...data]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onDate(r)}
                    className="block w-full rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-left text-xs text-slate-400 hover:border-cyan-800"
                  >
                    <span className="mr-3 text-cyan-300">{r.date}</span>
                    {r.note || "備考なし"}
                  </button>
                ))}
            </div>
          </QuestionCard>
        </>
      )}
    </div>
  );
}
