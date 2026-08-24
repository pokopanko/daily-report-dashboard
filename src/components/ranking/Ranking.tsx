import { DailyReport, Filter } from "../../types/dailyReport";
import { ranking } from "../../data/aggregations";
export function Ranking({
  data,
  onFilter,
}: {
  data: DailyReport[];
  onFilter: (f: Filter) => void;
}) {
  const groups: [keyof DailyReport, string, boolean][] = [
    ["stressCauses", "ストレス原因", true],
    ["contacts", "今日接触したもの", true],
    ["positiveImpact", "最もポジティブな影響", false],
    ["negativeImpact", "最もネガティブな影響", false],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {groups.map(([f, t, m]) => (
        <section
          key={String(f)}
          className="rounded-xl border border-slate-800 bg-slate-950/50 p-5"
        >
          <h2 className="mb-4 text-sm font-semibold">{t} RANKING</h2>
          {ranking(data, f, m).map((x, i) => (
            <button
              key={x.label}
              onClick={() =>
                onFilter({
                  field: f,
                  value: x.label,
                  mode: m ? "contains" : "equals",
                })
              }
              className="flex w-full items-center gap-3 border-b border-slate-900 py-3 text-left hover:bg-slate-900/50"
            >
              <span className="w-7 text-center text-xs text-slate-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm text-slate-300">{x.label}</span>
              <span className="text-sm font-semibold text-cyan-300">
                {x.count}
              </span>
            </button>
          ))}
        </section>
      ))}
    </div>
  );
}
