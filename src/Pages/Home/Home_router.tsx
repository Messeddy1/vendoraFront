import React from "react";
import { Route } from "react-router-dom";
const HomePage = React.lazy(() => import("./index"));

export function renderHomeRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
    </>
  );
}
