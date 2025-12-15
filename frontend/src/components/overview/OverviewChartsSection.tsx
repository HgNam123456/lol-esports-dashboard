// placeholder
// frontend/src/components/overview/OverviewChartsSection.tsx
import PieChart from "../../charts/PieChart";
import BarChart from "../../charts/BarChart";

interface Props {
  blueWinrate: number;
  redWinrate: number;
  // optional: thêm series cho bar chart nếu bạn có endpoint time-series
}

export default function OverviewChartsSection({ blueWinrate, redWinrate }: Props) {
  const pieData = [
    { id: "Blue", value: blueWinrate * 100 },
    { id: "Red", value: redWinrate * 100 },
  ];

  return (
    <div className="charts-grid">
      <PieChart data={pieData} title="Blue vs Red Winrate" />
      {/* Nếu có thêm data theo năm / league, binding vào BarChart ở đây */}
      <BarChart
        data={pieData.map((d) => ({ side: d.id, value: d.value }))}
        categoryKey="side"
        valueKey="value"
        title="Winrate by Side (%)"
      />
    </div>
  );
}
