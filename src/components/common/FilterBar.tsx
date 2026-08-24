import { X, RotateCcw } from "lucide-react";
import { Filter } from "../../types/dailyReport";
export function FilterBar({
  filters,
  total,
  count,
  remove,
  clear,
}: {
  filters: Filter[];
  total: number;
  count: number;
  remove: (i: number) => void;
  clear: () => void;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#08111eeF] px-6 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] font-bold tracking-widest text-slate-500">
          FILTER
        </span>
        {filters.map((f, i) => (
          <button
            key={`${f.field}-${f.value}`}
            onClick={() => remove(i)}
            className="flex items-center gap-1 rounded-full border border-cyan-900 bg-cyan-950/50 px-2.5 py-1 text-xs text-cyan-200"
          >
            {String(f.value)} <X size={12} />
          </button>
        ))}
        {filters.length > 0 && (
          <button
            onClick={clear}
            className="ml-auto flex items-center gap-1 text-xs text-slate-400 hover:text-white"
          >
            <RotateCcw size={13} /> CLEAR ALL
          </button>
        )}
        {filters.length === 0 && (
          <span className="text-xs text-slate-600">条件をグラフから選択</span>
        )}
      </div>
      <div className="mt-2 text-xs text-slate-400">
        対象 <span className="font-semibold text-slate-200">{count}</span> /{" "}
        {total}件
      </div>
    </div>
  );
}
