import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import PlayerStatsPage from "./pages/PlayerStatsPage";
import TeamStatsPage from "./pages/TeamStatsPage";
import ChampionStatsPage from "./pages/ChampionStatsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "players", element: <PlayerStatsPage /> },
      { path: "teams", element: <TeamStatsPage /> },
      { path: "champions", element: <ChampionStatsPage /> },
    ],
  },
]);
