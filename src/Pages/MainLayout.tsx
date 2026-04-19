import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/NavBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-600 text-amber-50">
      <Navbar />
      <Outlet />    </div>
  );
}
