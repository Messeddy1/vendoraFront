import { Route, Routes } from "react-router-dom";

import React, { Suspense } from "react";
const HomeRoutes = React.lazy(() => import("./Home/HomeRoutes"));
const ProfileRoutes = React.lazy(() => import("./Profile/ProfileRoures"));
const NotFoundPage = React.lazy(() => import("@/Components/NotFound"));
export default function PagesRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route index element={<HomeRoutes />} />
        <Route path="profile/*" element={<ProfileRoutes />} />
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
