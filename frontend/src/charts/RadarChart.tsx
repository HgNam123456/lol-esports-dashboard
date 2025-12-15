import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
interface RadarChartProps {
  data: { stat: string; value: number }[];
  title?: string;
}

export default function RadarChart({ data, title }: RadarChartProps) {
  return (
    <div style={{ height: 360 }}>
      {title && <h4 style={{ marginBottom: 12 }}>{title}</h4>}
      <ResponsiveRadar
        data={data}
        keys={["value"]}
        indexBy="stat"
        margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
        gridShape="circular"
        gridLevels={5}
        colors={{ scheme: "accent" }}
        borderWidth={2}
        borderColor={{ from: "color" }}
        dotSize={6}
        dotBorderWidth={1}
        dotBorderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        fillOpacity={0.2}
        blendMode="normal"
        theme={{
          text: { fill: "#6b7280" },
          grid: { line: { stroke: "#4b5563", strokeWidth: 1 } },
        }}
      />
    </div>
  );
}
