import { useMemo, useState } from "react";
import { Header } from "./components/common/Header";
import { Navigation } from "./components/common/Navigation";
import { FilterBar } from "./components/common/FilterBar";
import { Overview } from "./components/overview/Overview";
import { Explore } from "./components/explore/Explore";
import { Ranking } from "./components/ranking/Ranking";
import { DetailPanel } from "./components/detail/DetailPanel";
import { useCsvData } from "./hooks/useCsvData";
import { useFilters } from "./hooks/useFilters";
import { View, DailyReport, Filter } from "./types/dailyReport";
export default function App() {
  const { data, error, load } = useCsvData();
  const { filters, filteredData, add, remove, clear } = useFilters(data);
  const [view, setView] = useState<View>("overview");
  const [detail, setDetail] = useState<DailyReport | null>(null);
  const range = useMemo(
    () =>
      data.length ? [...data].sort((a, b) => a.date.localeCompare(b.date)) : [],
    [data],
  );
  return (
    <div className="min-h-screen">
      <Header onFile={load} />
      <Navigation view={view} setView={setView} />
      {data.length > 0 && (
        <FilterBar
          filters={filters}
          total={data.length}
          count={filteredData.length}
          remove={remove}
          clear={clear}
        />
      )}
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        {error && (
          <div className="mb-4 rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
        {!data.length && !error && (
          <div className="flex min-h-[65vh] items-center justify-center">
            <div className="max-w-lg text-center">
              <div className="text-5xl">▦</div>
              <h1 className="mt-5 text-2xl font-bold">
                日報データを可視化する
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                GoogleスプレッドシートからCSVをダウンロードし、「CSVを開く」から選択してください。データはブラウザ内だけで処理されます。
              </p>
            </div>
          </div>
        )}
        {data.length > 0 && view === "overview" && (
          <Overview data={filteredData} total={data.length} />
        )}{" "}
        {data.length > 0 && view === "explore" && (
          <Explore
            data={filteredData}
            onFilter={(f: Filter) => add(f)}
            onDate={setDetail}
          />
        )}{" "}
        {data.length > 0 && view === "ranking" && (
          <Ranking
            data={filteredData}
            onFilter={(f: Filter) => {
              add(f);
              setView("explore");
            }}
          />
        )}
      </main>
      <DetailPanel row={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
