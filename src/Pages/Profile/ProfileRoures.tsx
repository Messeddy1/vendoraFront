import React from "react";
import { Route, Routes } from "react-router-dom";
const ProfilePage = React.lazy(() => import("./profile"));
export default function ProfileRoutes() {
  return (
    <Routes>
      <Route index element={< ProfilePage/>}/>
    </Routes>
  );
}