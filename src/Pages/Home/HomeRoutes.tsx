import React from "react";
import { Route, Routes } from "react-router-dom";
const HomeLayout = React.lazy(() => import("./HomeLayout"));
const SubPage = React.lazy(() => import("./SubPage"));
export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<HomeLayout />}>
        <Route path="subpage" element={<SubPage />} />
      </Route>
    </Routes>
  );
}
