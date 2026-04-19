import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/reduxHooks";
import React from "react";
const HomeRoutes = React.lazy(() => import("./Home/HomeRoutes"));
const LoginRoutes = React.lazy(() => import("./Login/LoginRoutes"));
const NotFound = React.lazy(() => import("../Components/NotFound"));
export default function PagesRoutes() {
  const { user } = useAppSelector((state) => state.login);

  return (
    <Routes>
      <Route path="/home/*" element={<HomeRoutes />} />

      <Route
        path="/login/*"
        element={user.name ? <Navigate to="/home" replace /> : <LoginRoutes />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
