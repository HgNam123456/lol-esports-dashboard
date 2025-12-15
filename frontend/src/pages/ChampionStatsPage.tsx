// frontend/src/pages/ChampionStatsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../services/apiClient";
import BarChart from "../charts/BarChart";
import NetworkGraph from "../charts/NetworkGraph";
import DataTable from "../components/common/DataTable";

type ChampionPairStat = {
  pair_type: "MID_JNG" | "BOT_SUP";
  role1: string;
  champ1: string;
  role2: string;
  champ2: string;
  support: number;     // tần suất xuất hiện
  confidence: number;  // xác suất có champ2 khi đã có champ1
  lift: number;        // độ “bất ngờ”
};

type MidJngPairStat = {
  mid_champ: string;
  jng_champ: string;
  games: number;
  wins: number;
  winrate: number;
};

type BotSupPairStat = {
  bot_champ: string;
  sup_champ: string;
  games: number;
  wins: number;
  winrate: number;
};

type ChampionFirstBloodStat = {
  champion: string;
  games: number;
  first_blood_rate: number;
};

type ChampionGoldDiff15Stat = {
  champion: string;
  avg_gold_diff_15: number;
};

type ChampionAssociationsResponse = {
  synergy_pairs: ChampionPairStat[];
  mid_jng_top: MidJngPairStat[];
  bot_sup_top: BotSupPairStat[];
  first_blood_top: ChampionFirstBloodStat[];
  gold_diff_15_top: ChampionGoldDiff15Stat[];
};

export default function ChampionStatsPage() {
  const [data, setData] = useState<ChampionAssociationsResponse | null>(null);

  useEffect(() => {
    api
      .get<ChampionAssociationsResponse>("/champions/associations")
      .then((res) => setData(res.data));
  }, []);

  const networkData = useMemo(() => {
    if (!data) return { nodes: [], links: [] };

    const nodeMap = new Map<string, { id: string }>();
    data.synergy_pairs.forEach((pair) => {
      if (!nodeMap.has(pair.champ1)) nodeMap.set(pair.champ1, { id: pair.champ1 });
      if (!nodeMap.has(pair.champ2)) nodeMap.set(pair.champ2, { id: pair.champ2 });
    });

    const nodes = Array.from(nodeMap.values());
    const links = data.synergy_pairs.map((pair) => ({
      source: pair.champ1,
      target: pair.champ2,
      value: pair.lift,
      pairType: pair.pair_type,
    }));

    return { nodes, links };
  }, [data]);

  if (!data) return <div>Loading...</div>;

  const firstBloodData = data.first_blood_top.map((d) => ({
    champion: d.champion,
    value: +(d.first_blood_rate * 100).toFixed(2),
  }));

  const goldDiffData = data.gold_diff_15_top.map((d) => ({
    champion: d.champion,
    value: +d.avg_gold_diff_15.toFixed(2),
  }));

  // Chuẩn hóa data cho DataTable (giống cách xử lý ở Match History)
  const ruleTableData = data.synergy_pairs.slice(0, 100).map((p) => ({
    lane: p.pair_type === "MID_JNG" ? "Mid–Jungle" : "Bot–Support",
    pair: `${p.champ1} (${p.role1}) + ${p.champ2} (${p.role2})`,
    support: +(p.support * 100).toFixed(1),      // %
    confidence: +(p.confidence * 100).toFixed(1),// %
    lift: +p.lift.toFixed(2),
  }));

  return (
    <div className="champion-stats-page">
      {/* Header */}
      <div className="champion-header">
        <h2>Champion Synergy & Objectives</h2>
      </div>

      {/* Network */}
      <div className="network-section">
        <h3>Champion Synergy Network</h3>
        {networkData.nodes.length === 0 ? (
          <div>No synergy data available.</div>
        ) : (
          <NetworkGraph nodes={networkData.nodes} links={networkData.links} />
        )}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <BarChart
          data={firstBloodData}
          categoryKey="champion"
          valueKey="value"
          title="Top First Blood Champions"
          layout="vertical"
        />
        <BarChart
          data={goldDiffData}
          categoryKey="champion"
          valueKey="value"
          title="Top Gold Diff @15 Champions"
          layout="vertical"
        />
      </div>

      {/* RULE TABLE – dùng đúng DataTable như Match History */}
      <div className="rules-table">
        <h3>Synergy Rules (Support, Confidence, Lift)</h3>
        <DataTable
          columns={[
            { key: "lane", label: "Lane" },
            { key: "pair", label: "Pair" },
            { key: "support", label: "Support (%)" },
            { key: "confidence", label: "Confidence (%)" },
            { key: "lift", label: "Lift" },
          ]}
          data={ruleTableData}
        />
      </div>
    </div>
  );
}
