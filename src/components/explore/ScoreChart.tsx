import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bucket } from "../../data/aggregations";
import { Filter } from "../../types/dailyReport";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
export function ScoreChart({
  items,
  onClick,
  field,
}: {
  items: Bucket[];
  onClick: (f: Filter) => void;
  field: Filter["field"];
}) {
  const max = Math.max(...items.map((x) => x.count), 1),
    total = items.reduce((a, b) => a + b.count, 0);
  return (
    <div className="h-[210px]">
      <Bar
        data={{
          labels: items.map((x) => x.label),
          datasets: [
            {
              data: items.map((x) => x.count),
              backgroundColor: "rgba(96,165,250,.62)",
              hoverBackgroundColor: "rgba(147,197,253,.95)",
              borderRadius: 5,
              barPercentage: 0.72,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              max,
              ticks: { color: "#64748b", precision: 0 },
              grid: { color: "rgba(51,65,85,.25)" },
            },
            y: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (c) => {
                  const n = c.raw as number;
                  return ` ${n}件 (${total ? ((n / total) * 100).toFixed(1) : 0}%)`;
                },
              },
            },
          },
          onClick: (_, els) => {
            if (els.length)
              onClick({
                field,
                value: items[els[0].index].label,
                mode: "equals",
              });
          },
        }}
      />
    </div>
  );
}
