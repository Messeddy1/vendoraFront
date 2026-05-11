import React from "react";
import { Route, Routes } from "react-router-dom";
import SidBarLayout from "@/Components/SidBarLayout";

const Dashboard = React.lazy(() => import("./index"));
const Profile = React.lazy(() => import("../Profile/ProfileRoures"));
const RolesPermissions = React.lazy(() => import("../RolesPermissions/RolesPermissionsRoute"));
export default function DashboardRoutes() {
  return (
    <SidBarLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="roles-permissions" element={<RolesPermissions />} />
      </Routes>
    </SidBarLayout>
  );
}
