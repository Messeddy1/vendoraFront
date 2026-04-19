import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";

const HomeLayout: React.FC = () => {
    const { user } = useAppSelector((state) => state.login);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-600 text-amber-50">
      <div>
        <h1 className="text-3xl font-bold underline mb-4">Home Layout {user.name ? <span className="text-amber-400">Hello {user.name}</span> : <span className="text-amber-400">Hello Guest</span>} You Role is {user.role || "Not specified"}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
