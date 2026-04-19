import React from "react";
import { Route, Routes } from "react-router-dom";
const LoginLayout = React.lazy(() => import("./index"));
export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />} />
    </Routes>
  );
}
