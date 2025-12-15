// frontend/src/pages/PlayerStatsPage.tsx
import React, { useState } from "react";
import PlayerSearchBar from "../components/players/PlayerSearchBar";
import PlayerProfileCard from "../components/players/PlayerProfileCard";
import PlayerChampionsChart from "../components/players/PlayerChampionsChart";
import PlayerRulesSection from "../components/players/PlayerRulesSection";

export default function PlayerStatsPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const handleSelectPlayer = (name: string) => {
    setSelectedPlayer(name);
  };

  return (
    <div className="player-stats-page">
      <PlayerSearchBar onSelectPlayer={handleSelectPlayer} />
      {selectedPlayer && (
        <>
          <PlayerProfileCard playerName={selectedPlayer} />
          <PlayerChampionsChart playerName={selectedPlayer} />
          <PlayerRulesSection playerName={selectedPlayer} />
        </>
      )}
    </div>
  );
}
