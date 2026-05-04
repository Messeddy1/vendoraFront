import React from "react";
import { Route, Routes } from "react-router-dom";
import SidBarLayout from "@/Components/SidBarLayout";

const Dashboard = React.lazy(() => import("./index"));
export default function DashboardRoutes() {
  return (
    <SidBarLayout>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    </SidBarLayout>
  );
}
