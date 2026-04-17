import React from "react";
import { Route } from "react-router-dom";
const LoginPage = React.lazy(() => import("./index"));

export function renderLoginRoutes() {
  return <Route path="login" element={<LoginPage />} />;
}
