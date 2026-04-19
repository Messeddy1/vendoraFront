import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../../App";
const PagesRoutes = React.lazy(() => import("../Pages/PagesRoutes"));
export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/*"  element={<PagesRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
