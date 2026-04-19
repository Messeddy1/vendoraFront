import { Outlet } from "react-router-dom";
import { Navbar } from "./src/Components/NavBar";

export default function App() {
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
