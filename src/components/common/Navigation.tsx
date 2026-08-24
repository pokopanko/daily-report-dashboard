import { View } from "../../types/dailyReport";
export function Navigation({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  return (
    <nav className="flex gap-1 border-b border-slate-800 px-4">
      {(["overview", "explore", "ranking"] as View[]).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`px-5 py-3 text-xs font-semibold tracking-wider transition ${view === v ? "border-b-2 border-cyan-400 text-cyan-300" : "text-slate-500 hover:text-slate-200"}`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
