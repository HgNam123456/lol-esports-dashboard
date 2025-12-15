// placeholder
// frontend/src/components/overview/OverviewKPISection.tsx
import KPICard from "../common/KPICard";

interface OverviewProps {
  totalMatches: number;
  totalPlayers: number;
  totalTeams: number;
  totalChampions: number;
}

export default function OverviewKPISection({
  totalMatches,
  totalPlayers,
  totalTeams,
  totalChampions,
}: OverviewProps) {
  return (
    <div className="kpi-grid">
      <KPICard title="Total Matches" value={totalMatches} />
      <KPICard title="Players" value={totalPlayers} />
      <KPICard title="Teams" value={totalTeams} />
      <KPICard title="Champions" value={totalChampions} />
    </div>
  );
}
