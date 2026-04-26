import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const ProfilePage = React.lazy(() => import("./profile"));

export default function ProfileRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route index element={<ProfilePage />} />
      </Routes>
    </Suspense>
  );
}