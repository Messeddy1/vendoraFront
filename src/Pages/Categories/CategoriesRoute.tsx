import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy-load the main Categories page (code-splitting)
const Index = React.lazy(() => import("./Index"));

/**
 * CategoriesRoute
 *
 * Wraps the Categories feature in a Suspense boundary.
 * Mounted at /admin/categories/* from DashboardRoutes.
 * Access is already restricted to superadmin via the sidebar links,
 * but the API itself is also protected via `role:superadmin` middleware.
 */
export default function CategoriesRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-muted-foreground">Loading…</div>
        </div>
      }
    >
      <Routes>
        {/* Index — /admin/categories */}
        <Route index element={<Index />} />
      </Routes>
    </Suspense>
  );
}
