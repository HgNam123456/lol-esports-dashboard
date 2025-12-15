import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export type ChampionPerformancePoint = {
  champion: string;
  games: number;
  wins: number;
  winrate: number; // 0–1
};

interface Props {
  data: ChampionPerformancePoint[];
  title?: string;
}

const ChampionScatterChart: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="chart-card">
      {title && <h3 className="chart-title">{title}</h3>}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="games" name="Games">
              <Label value="Số trận pick" position="insideBottom" offset={-25} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="winrate"
              name="Winrate"
              domain={[0, 1]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
            >
              <Label
                value="Winrate"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ScatterTooltip />}
              formatter={(value, name, props) => {
                if (name === "winrate") {
                  return [`${(value as number * 100).toFixed(1)}%`, "Winrate"];
                }
                if (name === "games") return [value, "Games"];
                return [props?.payload?.champion ?? "", "Champion"];
              }}
            />
            <Scatter data={data} fill="#60a5fa" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChampionScatterChart;


// Thêm component nhỏ ngay trong file
const ScatterTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload as {
    champion: string;
    games: number;
    winrate: number;
  };

  return (
    <div className="rounded-md bg-slate-900/95 px-3 py-2 text-sm shadow-lg border border-slate-700">
      <div className="font-semibold text-slate-100">{point.champion}</div>
      <div className="text-slate-300">
        Games: <span className="font-medium">{point.games}</span>
      </div>
      <div className="text-slate-300">
        Winrate:{" "}
        <span className="font-medium">
          {(point.winrate * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};
