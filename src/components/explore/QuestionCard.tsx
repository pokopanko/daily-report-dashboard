import { ReactNode } from "react";
export function QuestionCard({
  title,
  average,
  children,
}: {
  title: string;
  average?: number | null;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/45 p-5 shadow-xl shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        {average !== undefined && (
          <div className="text-xs text-slate-400">
            平均{" "}
            <span className="ml-1 text-lg font-bold text-cyan-300">
              {average === null ? "—" : average.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
