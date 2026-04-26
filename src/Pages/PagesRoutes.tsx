import { Route, Routes } from "react-router-dom";

import React, { Suspense } from "react";
const HomeRoutes = React.lazy(() => import("./Home/HomeRoutes"));
const ProfileRoutes = React.lazy(() => import("./Profile/ProfileRoures"));
export default function PagesRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<HomeRoutes />} />
        <Route path="home/*" element={<HomeRoutes />} />
        <Route path="profile/*" element={<ProfileRoutes />} />
        <Route path="*" element={<HomeRoutes />} />
      </Routes>
    </Suspense>
  );
}
