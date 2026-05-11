import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Index = React.lazy(() => import("./Index"));
export default function RolesPermissionsRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route index element={<Index />} />
      </Routes>
    </Suspense>
  );
}