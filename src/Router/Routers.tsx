import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../../App";
import { useAppDispatch } from "@/store/reduxHooks";
import { getUserInfo } from "@/Pages/Auth/cors/_request";
import ProtectedRoute from "@/Components/ProtectedRoute";
import AuthRoute from "@/Components/AuthRoute";

const AuthRoutes = React.lazy(() => import("@/Pages/Auth/AuthRoutes"));
const PagesRoutes = React.lazy(() => import("@/Pages/PagesRoutes"));

export default function Routers() {
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);

  // Restore session on app load
  useEffect(() => {
    dispatch(getUserInfo()).finally(() => {
      setInitialized(true);
    });
  }, [dispatch]);

  // Show loading while checking authentication
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          {/* Auth routes - check first if user is already logged in */}
          <Route
            path="/auth/*"
            element={
              <AuthRoute>
                <AuthRoutes />
              </AuthRoute>
            }
          />

          {/* Protected routes - all other paths are protected */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <PagesRoutes />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
