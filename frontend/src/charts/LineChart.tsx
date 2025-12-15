// placeholder
// frontend/src/charts/LineChart.tsx
import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface LineSeries {
  id: string;
  data: { x: string | number; y: number }[];
}

interface LineChartProps {
  series: LineSeries[];
  title?: string;
}

export default function LineChart({ series, title }: LineChartProps) {
  return (
    <div style={{ height: 320 }}>
      {title && <h4 style={{ marginBottom: 8 }}>{title}</h4>}
      <ResponsiveLine
        data={series}
        margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
        axisBottom={{
          tickRotation: -45,
        }}
        axisLeft={{
          legend: "",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "purple_blue" }}
        pointSize={6}
        pointBorderWidth={1}
        pointBorderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        useMesh={true}
      />
    </div>
  );
}
