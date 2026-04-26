import { useAppSelector } from "@/store/reduxHooks";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../../App";
import ProtectedRoute from "@/Components/ProtectedRoute";
import AuthRoute from "@/Components/AuthRoute";
const AuthRoutes = React.lazy(() => import("@/Pages/Auth/AuthRoutes"));
const PagesRoutes = React.lazy(() => import("@/Pages/PagesRoutes"));

export default function Routers() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          {/* Protected routes - always available, redirects if not authenticated */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PagesRoutes />
              </ProtectedRoute>
            }
          />

          {/* Auth routes - always available, redirects if authenticated */}
          <Route
            path="/auth/*"
            element={
              <AuthRoute>
                <AuthRoutes />
              </AuthRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route
            path="*"
            element={<Navigate to={user ? "/" : "/auth/login"} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
