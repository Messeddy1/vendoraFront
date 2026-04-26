import { Outlet } from "react-router-dom";
import { Navbar } from "./src/Components/NavBar";
export default function App() {




  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 shadow-sm bg-background/95 backdrop-blur-md border-b">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
