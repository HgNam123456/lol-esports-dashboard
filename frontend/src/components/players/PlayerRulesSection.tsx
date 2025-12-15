// placeholder
// frontend/src/components/players/PlayerRulesSection.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";
import DataTable from "../common/DataTable";

type PlayerRule = {
  rule_id: number;
  antecedent: string;
  consequent: string;
  support: number;
  confidence: number;
  lift: number;
};

interface Props {
  playerName: string;
}

export default function PlayerRulesSection({ playerName }: Props) {
  const [rules, setRules] = useState<PlayerRule[]>([]);

  useEffect(() => {
    api.get<PlayerRule[]>(`/players/players/${encodeURIComponent(playerName)}/rules`).then((res) => setRules(res.data));
  }, [playerName]);

  return (
    <div className="player-rules">
      <h2>Association Rules for {playerName}</h2>
      <DataTable
        columns={[
          { key: "antecedent", label: "If" },
          { key: "consequent", label: "Then" },
          { key: "support", label: "Support" },
          { key: "confidence", label: "Confidence" },
          { key: "lift", label: "Lift" },
        ]}
        data={rules}
      />
      {/* Có thể thêm một mini graph: node = item, edge = rule, dùng d3-force hoặc react-force-graph */}
    </div>
  );
}
