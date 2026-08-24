import { X } from "lucide-react";
import { DailyReport } from "../../types/dailyReport";
export function DetailPanel({
  row,
  onClose,
}: {
  row: DailyReport | null;
  onClose: () => void;
}) {
  if (!row) return null;
  const items = [
    ["昨日の睡眠時間", row.sleep],
    ["朝の疲労感", row.morningFatigue],
    ["夜の疲労感", row.eveningFatigue],
    ["勤怠", row.attendance],
    ["ストレス", row.stress],
    ["満足度", row.satisfaction],
    ["ポジティブ影響", row.positiveImpact],
    ["ネガティブ影響", row.negativeImpact],
    ["総合評価", row.overallRating],
  ];
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <aside className="scrollbar fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-auto border-l border-slate-800 bg-[#07101d] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs text-slate-500">日報詳細</div>
            <h2 className="mt-1 text-lg font-bold">{row.date}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <X />
          </button>
        </div>
        <div className="mt-5 space-y-1">
          {items.map(([k, v]) => (
            <div
              key={String(k)}
              className="flex justify-between gap-4 border-b border-slate-900 py-3 text-sm"
            >
              <span className="text-slate-500">{k}</span>
              <span className="text-right text-slate-200">{v || "—"}</span>
            </div>
          ))}
          <div className="border-b border-slate-900 py-3">
            <div className="text-xs text-slate-500">ストレス原因</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {row.stressCauses.length
                ? row.stressCauses.map((x) => (
                    <span
                      key={x}
                      className="rounded bg-slate-900 px-2 py-1 text-xs text-slate-300"
                    >
                      {x}
                    </span>
                  ))
                : "—"}
            </div>
          </div>
          <div className="border-b border-slate-900 py-3">
            <div className="text-xs text-slate-500">今日接触したもの</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {row.contacts.length
                ? row.contacts.map((x) => (
                    <span
                      key={x}
                      className="rounded bg-slate-900 px-2 py-1 text-xs text-slate-300"
                    >
                      {x}
                    </span>
                  ))
                : "—"}
            </div>
          </div>
          <div className="py-3">
            <div className="text-xs text-slate-500">備考</div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
              {row.note || "—"}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
