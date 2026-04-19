import { Link } from "react-router-dom";

 export const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">MyApp</h1>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/home" 
            className="hover:text-amber-400 transition"
          >
            Home
          </Link>
          <Link 
            to="/home/subpage" 
            className="hover:text-amber-400 transition"
          >
            Sub Page
          </Link>
          <Link 
            to="/login" 
            className="hover:text-amber-400 transition"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}