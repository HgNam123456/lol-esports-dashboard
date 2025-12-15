// frontend/src/charts/StackedBarChart.tsx
import React from "react"
import { ResponsiveBar } from "@nivo/bar";

interface StackedBarChartProps {
  data: any[];
  keys: string[];          // ví dụ ["own", "opp"] hoặc ["infernal","mountain",...]
  indexBy: string;         // ví dụ "category"
  title?: string;
}

export default function StackedBarChart({
  data,
  keys,
  indexBy,
  title,
}: StackedBarChartProps) {
  return (
    <div style={{ height: 320 }}>
      {title && <h4 style={{ marginBottom: 8 }}>{title}</h4>}
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        groupMode="stacked"
        margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
        padding={0.3}
        axisBottom={{
          tickRotation: 0,
        }}
        axisLeft={{
          legendOffset: -50,
          legendPosition: "middle",
        }}
        colors={{ scheme: "purple_blue" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.2]] }}
        labelSkipWidth={16}
        labelSkipHeight={16}
        animate={true}
      />
    </div>
  );
}
