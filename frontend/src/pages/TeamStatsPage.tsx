// frontend/src/pages/TeamStatsPage.tsx
import React, { useEffect, useState } from "react";
import api from "../services/apiClient";
import KPICard from "../components/common/KPICard";
import DataTable from "../components/common/DataTable";
import BarChart from "../charts/BarChart";
import StackedBarChart from "../charts/StackedBarChart";
import ChampionScatterChart, {
  ChampionPerformancePoint,
} from "../charts/ChampionScatterChart";

type TeamDetail = {
  teamname: string;
  games: number;
  wins: number;
  losses: number;
  winrate: number;
  avg_gamelength: number;
};

type TeamObjectiveStats = {
  teamname: string;
  dragons: number;
  opp_dragons: number;
  barons: number;
  heralds: number;
  towers: number;
  inhibitors: number;
  turretplates: number;
};

type TeamMatchRow = {
  gameid: string;
  year: number;
  league: string;
  side: string;
  opponent: string;
  result: number;
  dragons: number;
  barons: number;
  heralds: number;
  towers: number;
  inhibitors: number;
};

type TeamChampionPerformance = {
  champion: string;
  games: number;
  wins: number;
  winrate: number;
};

type Pagination = {
  page: number;
  size: number;
  total: number;
};

type PaginatedResponse<T> = {
  items: T[];
  pagination: Pagination;
};

export default function TeamStatsPage() {
  const [teamName, setTeamName] = useState<string>("T1");
  const [detail, setDetail] = useState<TeamDetail | null>(null);
  const [objectives, setObjectives] = useState<TeamObjectiveStats | null>(null);
  const [matches, setMatches] = useState<TeamMatchRow[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [champions, setChampions] = useState<TeamChampionPerformance[]>([]);

  const fetchData = (name: string, page = 1, size = 20) => {
    const encoded = encodeURIComponent(name);

    api.get<TeamDetail>(`/teams/${encoded}`).then((res) => setDetail(res.data));

    api
      .get<TeamObjectiveStats>(`/teams/${encoded}/objectives`)
      .then((res) => setObjectives(res.data));

    api
      .get<PaginatedResponse<TeamMatchRow>>(
        `/teams/${encoded}/matches?page=${page}&size=${size}`
      )
      .then((res) => {
        setMatches(res.data.items);
        setPagination(res.data.pagination);
      });

    // NEW: champion performance for scatter plot
    api
      .get<TeamChampionPerformance[]>(`/teams/${encoded}/champions`)
      .then((res) => setChampions(res.data));
  };

  useEffect(() => {
    fetchData(teamName);
  }, [teamName]);

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  if (!detail || !objectives) return <div>Loading...</div>;

  const kpiWinrate = (detail.winrate * 100).toFixed(1) + "%";

  const objectiveBarData = [
    { objective: "Dragons", value: objectives.dragons },
    { objective: "Barons", value: objectives.barons },
    { objective: "Heralds", value: objectives.heralds },
    { objective: "Towers", value: objectives.towers },
  ];

  const dragonStackData = [
    {
      category: "Dragons",
      own: objectives.dragons,
      opp: objectives.opp_dragons,
    },
  ];

  return (
    <div className="team-stats-page">
      <div className="team-header">
        <h2>Team Stats</h2>
        <input
          value={teamName}
          onChange={handleTeamChange}
          placeholder="Enter team name (e.g. T1, G2, GEN)"
        />
      </div>

      <div className="kpi-grid">
        <KPICard title="Team" value={detail.teamname} />
        <KPICard title="Games" value={detail.games} />
        <KPICard title="Wins" value={detail.wins} />
        <KPICard title="Winrate" value={kpiWinrate} />
        <KPICard
          title="Avg Game Length (min)"
          value={detail.avg_gamelength.toFixed(1)}
        />
      </div>

      <div className="charts-grid">
        <BarChart
          data={objectiveBarData}
          categoryKey="objective"
          valueKey="value"
          title="Objectives per Game"
        />
        <StackedBarChart
          data={dragonStackData}
          keys={["own", "opp"]}
          indexBy="category"
          title="Dragons: Own vs Opponent"
        />
      </div>

      {/* NEW: scatter plot games vs winrate */}
      <div className="charts-grid">
        <ChampionScatterChart
          data={champions}
          title={`${teamName} Champion Performance`}
        />
      </div>

      <div className="matches-table">
        <h3>Match History</h3>
        <DataTable
          columns={[
            { key: "year", label: "Year" },
            { key: "league", label: "League" },
            { key: "side", label: "Side" },
            { key: "opponent", label: "Opponent" },
            { key: "result", label: "Result" },
            { key: "dragons", label: "Dragons" },
            { key: "barons", label: "Barons" },
            { key: "heralds", label: "Heralds" },
            { key: "towers", label: "Towers" },
            { key: "inhibitors", label: "Inhibitors" },
          ]}
          data={matches.map((m) => ({
            ...m,
            result: m.result === 1 ? "Win" : "Loss",
          }))}
        />
      </div>
    </div>
  );
}
