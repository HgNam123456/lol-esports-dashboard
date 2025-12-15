// placeholder
// frontend/src/charts/BarChart.tsx
import React from "react"
import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
  data: any[];
  categoryKey: string;
  valueKey: string;
  title?: string;
  layout?: "horizontal" | "vertical";
}

export default function BarChart({
  data,
  categoryKey,
  valueKey,
  title,
  layout = "horizontal",
}: BarChartProps) {
  return (
    <div style={{ height: 350 }}>
      {title && <h4 style={{ marginBottom: 8 }}>{title}</h4>}
      <ResponsiveBar
        data={data}
        keys={[valueKey]}
        indexBy={categoryKey}
        layout={layout}
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        padding={0.3}
        axisBottom={{
          tickRotation: layout === "vertical" ? -45 : 0,
        }}
        axisLeft={{
          legend: valueKey,
          legendOffset: -60,
          legendPosition: "middle",
        }}
        colors={{ scheme: "purple_blue" }}
        animate={true}
      />
    </div>
  );
}
