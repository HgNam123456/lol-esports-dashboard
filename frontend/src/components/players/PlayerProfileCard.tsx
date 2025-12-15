// placeholder
// frontend/src/components/players/PlayerProfileCard.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";
import RadarChart from "../../charts/RadarChart";
import KPICard from "../common/KPICard";

type PlayerDetail = {
  playername: string;
  teamname: string;
  games: number;
  wins: number;
  losses: number;
  kda: number;
  dpm: number;
  damageshare: number;
  visionscore: number;
  earnedgold: number;
  earnedgpm: number;
};

interface Props {
  playerName: string;
}

export default function PlayerProfileCard({ playerName }: Props) {
  const [detail, setDetail] = useState<PlayerDetail | null>(null);

  useEffect(() => {
    api
      .get<PlayerDetail>(`/players/players/${encodeURIComponent(playerName)}`)
      .then((res) => setDetail(res.data));
  }, [playerName]);

  if (!detail) return <div>Loading player...</div>;

  const radarData = [
    { stat: "KDA", value: detail.kda },
    { stat: "DPM", value: detail.dpm },
    { stat: "Vision", value: detail.visionscore },
    { stat: "Gold/min", value: detail.earnedgpm },
    { stat: "Damage Share", value: detail.damageshare * 100 },
  ];

  return (
    <div className="player-profile">
      <div className="kpi-grid">
        <KPICard title="Player" value={detail.playername} subtitle={detail.teamname} />
        <KPICard title="Games" value={detail.games} />
        <KPICard title="Wins" value={detail.wins} />
        <KPICard
          title="Winrate"
          value={`${((detail.wins / detail.games) * 100).toFixed(1)}%`}
        />
        <KPICard title="KDA" value={detail.kda.toFixed(2)} />
      </div>
      <RadarChart data={radarData} title="Playstyle Radar" />
    </div>
  );
}
