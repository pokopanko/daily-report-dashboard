import { DailyReport } from "../../types/dailyReport";
import { avg, buckets } from "../../data/aggregations";
export function Overview({
  data,
  total,
}: {
  data: DailyReport[];
  total: number;
}) {
  const cards: [keyof DailyReport, string][] = [
    ["morningFatigue", "朝の疲労感"],
    ["eveningFatigue", "夜の疲労感"],
    ["stress", "ストレス"],
    ["satisfaction", "満足度"],
    ["overallRating", "総合評価"],
  ];
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="text-xs text-slate-500">対象日数</div>
          <div className="mt-2 text-3xl font-bold text-cyan-300">
            {data.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">全{total}件</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="text-xs text-slate-500">期間</div>
          <div className="mt-2 text-sm font-semibold text-slate-200">
            {data.length
              ? [...data].sort((a, b) => a.date.localeCompare(b.date))[0].date
              : "—"}
          </div>
          <div className="text-sm text-slate-400">
            〜{" "}
            {data.length
              ? [...data].sort((a, b) => b.date.localeCompare(a.date))[0].date
              : "—"}
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([f, t]) => (
          <div
            key={String(f)}
            className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
          >
            <div className="text-xs text-slate-500">{t}</div>
            <div className="mt-2 text-2xl font-bold text-slate-100">
              {avg(data, f)?.toFixed(2) ?? "—"}
            </div>
            <div className="mt-1 text-[10px] text-slate-600">5件法の平均</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
        <h2 className="mb-4 text-sm font-semibold">現在のデータで多い項目</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["stressCauses", "ストレス原因", true],
            ["contacts", "接触したもの", true],
            ["positiveImpact", "ポジティブ影響", false],
          ].map(([f, t, m]) => (
            <div key={String(f)}>
              <div className="mb-2 text-xs text-slate-500">{String(t)}</div>
              {buckets(data, f as keyof DailyReport, m as boolean)
                .slice(0, 5)
                .map((x, i) => (
                  <div
                    key={x.label}
                    className="flex justify-between border-b border-slate-900 py-2 text-xs"
                  >
                    <span>
                      <span className="mr-2 text-slate-600">{i + 1}</span>
                      {x.label}
                    </span>
                    <span className="text-cyan-300">{x.count}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
