import React from "react";
import { Route } from "react-router-dom";
const HomeLayout = React.lazy(() => import("./HomeLayout"));
const SubPage = React.lazy(() => import("./SubPage"));

export function renderHomeRoutes() {
  return (
    <>
      <Route index element={<HomeLayout />} />
      <Route path="home" element={<HomeLayout />}>
        <Route index element={<HomeLayout />} />
        <Route path="subpage" element={<SubPage />} />
      </Route>
    </>
  );
}
