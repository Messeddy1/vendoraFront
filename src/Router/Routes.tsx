import React from "react";
import { Routes, Route } from "react-router-dom";
import { renderPagesRoutes } from "../Pages/Pages_routers";
import MainLayout from "../Pages/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {renderPagesRoutes()}
      </Route>
      <Route
        path="*"
        element={<div className="p-8 text-center">Page not found</div>}
      />
    </Routes>
  );
}

export default AppRoutes;
