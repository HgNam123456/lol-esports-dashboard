// frontend/src/pages/OverviewPage.tsx
import React, { useEffect, useState } from "react";
import api from "../services/apiClient";
import KPICard from "../components/common/KPICard";
import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import DataTable from "../components/common/DataTable";

type OverviewStats = {
  total_matches: number;
  total_players: number;
  total_teams: number;
  total_champions: number;
  blue_side_winrate: number;
  red_side_winrate: number;
};

type OverviewChampionStat = {
  champion: string;
  games: number;
  wins: number;
  winrate: number; // 0–1
};

export default function OverviewPage() {
  const [data, setData] = useState<OverviewStats | null>(null);
  const [champions, setChampions] = useState<OverviewChampionStat[]>([]);

  useEffect(() => {
    api.get<OverviewStats>("/overview").then((res) => setData(res.data));
    api
      .get<OverviewChampionStat[]>("/overview/champions?limit=50")
      .then((res) => setChampions(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const winrateData = [
    { id: "Blue", value: data.blue_side_winrate * 100 },
    { id: "Red", value: data.red_side_winrate * 100 },
  ];

  return (
    <div className="overview-page">
      <div className="kpi-grid">
        <KPICard title="Total Matches" value={data.total_matches} />
        <KPICard title="Players" value={data.total_players} />
        <KPICard title="Teams" value={data.total_teams} />
        <KPICard title="Champions" value={data.total_champions} />
      </div>

      <div className="charts-grid">
        <PieChart data={winrateData} title="Blue vs Red Winrate" />
        <BarChart
          data={winrateData}
          categoryKey="id"
          valueKey="value"
          title="Winrate by Side (%)"
        />
      </div>

      {/* NEW: bảng champion pick & winrate */}
      <div className="overview-champions-table">
        <h3>Champion Pick & Winrate</h3>
        <DataTable
          columns={[
            { key: "champion", label: "Champion" },
            { key: "games", label: "Games" },
            { key: "wins", label: "Wins" },
            { key: "winrate", label: "Winrate (%)" },
          ]}
          data={champions.map((c) => ({
            champion: c.champion,
            games: c.games,
            wins: c.wins,
            winrate: (c.winrate * 100).toFixed(1),
          }))}
        />
      </div>
    </div>
  );
}
