import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { clearUser } from "../Pages/Login/LoginSlice";

export const Navbar = () => {
  const { user } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-amber-400 font-semibold"
      : "hover:text-amber-400 transition";

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-xl font-bold">MyApp</h1>

        <div className="flex items-center gap-6">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/home/subpage" className={linkClass}>
            Sub Page
          </NavLink>

          {user.name ? (
            <button
              className="hover:text-amber-400 transition"
              onClick={() => dispatch(clearUser())}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};