import React from "react";
import { Route, Routes } from "react-router-dom";
const HomeRoutes = React.lazy(() => import("./Home/HomeRoutes"));
const LoginRoutes = React.lazy(() => import("./Login/LoginRoutes"));
const NotFound = React.lazy(() => import("../Components/NotFound"));
export default function PagesRoutes() {
  return (
    <Routes>
      {/* here you can add your routes */}
      <Route path="/" element={<HomeRoutes />} />
      <Route path="/home/*" element={<HomeRoutes />} />
      <Route path="/login" element={<LoginRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
