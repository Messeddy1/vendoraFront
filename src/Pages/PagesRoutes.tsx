import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/reduxHooks";
import React from "react";
const HomeRoutes = React.lazy(() => import("./Home/HomeRoutes"));
const AuthRoutes = React.lazy(() => import("./Auth/AuthRoutes"));
export default function PagesRoutes() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/home/*" element={<HomeRoutes />} />

      <Route
        path="/auth/*"
        element={user ? <Navigate to="/home" replace /> : <AuthRoutes />}
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
