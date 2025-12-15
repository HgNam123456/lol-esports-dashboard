// placeholder
// frontend/src/charts/PieChart.tsx
import React from "react"
import { ResponsivePie } from "@nivo/pie";

interface PieChartProps {
  data: { id: string; label?: string; value: number }[];
  title?: string;
}

export default function PieChart({ data, title }: PieChartProps) {
  return (
    <div style={{ height: 320 }}>
      {title && <h4 style={{ marginBottom: 8 }}>{title}</h4>}
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 60, bottom: 40, left: 60 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={6}
        colors={{ scheme: "purple_blue" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#9CA3AF"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#111827"
        valueFormat={(value) => `${value.toFixed(1)}%`}
      />
    </div>
  );
}
