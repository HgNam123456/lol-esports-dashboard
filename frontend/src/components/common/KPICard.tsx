// placeholder
// frontend/src/components/common/KPICard.tsx
import React from "react"
interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function KPICard({ title, value, subtitle }: KPICardProps) {
  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
    </div>
  );
}
