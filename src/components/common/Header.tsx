import { Upload, Database } from "lucide-react";
export function Header({ onFile }: { onFile: (f: File) => void }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-950/70 px-6 py-4 backdrop-blur">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[.2em] text-cyan-300">
          <Database size={17} /> DAILY REPORT ANALYZER
        </div>
        <div className="mt-1 text-xs text-slate-500">
          CSVをブラウザ上で分析・探索
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-cyan-900 bg-cyan-950/40 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-900/50">
        <Upload size={16} /> CSVを開く
        <input
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </label>
    </header>
  );
}
