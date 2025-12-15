// placeholder
// frontend/src/components/common/Sidebar.tsx
import React from "react"
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">LoL Esports Analytics</div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/players">Player Stats</NavLink>
        <NavLink to="/teams">Team Stats</NavLink>
        <NavLink to="/champions">Champion Stats</NavLink>
      </nav>
    </aside>
  );
}
