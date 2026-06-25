import React from "react";
import { Route, Routes } from "react-router-dom";
import SidBarLayout from "@/Components/SidBarLayout";

const Dashboard = React.lazy(() => import("./index"));
const Profile = React.lazy(() => import("../Profile/ProfileRoures"));
const RolesPermissions = React.lazy(
  () => import("../RolesPermissions/RolesPermissionsRoute"),
);
// Superadmin-only: Categories CRUD page
const Categories = React.lazy(
  () => import("../Categories/CategoriesRoute"),
);

export default function DashboardRoutes() {
  return (
    <SidBarLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="roles-permissions" element={<RolesPermissions />} />
        {/* Superadmin only — backed by `role:superadmin` API middleware */}
        <Route path="categories/*" element={<Categories />} />
      </Routes>
    </SidBarLayout>
  );
}

