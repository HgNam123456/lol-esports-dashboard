// frontend/src/layouts/DashboardLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function DashboardLayout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Navbar />
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
