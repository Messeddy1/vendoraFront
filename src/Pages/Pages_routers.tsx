import React from "react";
import { Route } from "react-router-dom";
import { renderHomeRoutes } from "./Home/Home_router";
import { renderLoginRoutes } from "./Login/Login_router";

export function renderPagesRoutes() {
  return (
    <>
      {renderHomeRoutes()}
      {renderLoginRoutes()}
      <Route
        path="*"
        element={<div className="p-8 text-center">Page not found</div>}
      />
    </>
  );
}
