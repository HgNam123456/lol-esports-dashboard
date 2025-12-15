// placeholder
// frontend/src/components/players/PlayerChampionsChart.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";
import BarChart from "../../charts/BarChart";

type PlayerChampionStat = {
  champion: string;
  games: number;
  wins: number;
  winrate: number;
};

interface Props {
  playerName: string;
}

export default function PlayerChampionsChart({ playerName }: Props) {
  const [data, setData] = useState<PlayerChampionStat[]>([]);

  useEffect(() => {
    api
      .get<PlayerChampionStat[]>(`/players/players/${encodeURIComponent(playerName)}/champions`)
      .then((res) => setData(res.data));
  }, [playerName]);

  const barData = data.map((c) => ({
    champion: c.champion,
    value: c.winrate * 100, // hoặc games tuỳ biểu đồ
  }));

  return (
    <div className="player-champions-chart">
      <h3>Top Champions for {playerName}</h3>
      <BarChart
        data={barData}
        categoryKey="champion"
        valueKey="value"
        title="Champion Winrate (%)"
        layout="vertical"
      />
    </div>
  );
}
