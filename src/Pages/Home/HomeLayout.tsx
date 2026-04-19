import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-600 text-amber-50">
      <div>
        <h1 className="text-3xl font-bold underline mb-4">Home Layout</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
