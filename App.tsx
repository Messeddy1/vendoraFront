import { Outlet } from "react-router-dom";
import { Navbar } from "./src/Components/NavBar";
import { useAppDispatch } from "./src/store/reduxHooks";
import { useEffect } from "react";
import { getUserInfo } from "./src/Pages/Auth/cors/_request";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-blue-800">
      {/* Navbar */}
      <header className="shadow-md">
        <Navbar />
      </header>

      {/* Content */}
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
