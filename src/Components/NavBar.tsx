import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { logout } from "../Pages/Auth/cors/_request";

export const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-muted-foreground hover:text-primary transition";

  return (
    <nav className="w-full bg-background text-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight">
            MultiVendor Market
          </h1>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-primary">
            Ecommerce
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Marketplace
          </NavLink>
          <NavLink to="/subpage" className={linkClass}>
            Vendor Portal
          </NavLink>
          {user ? (
            <button
              className="text-muted-foreground hover:text-primary transition"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/auth/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>

        {user ? (
          <p className="w-full text-sm text-muted-foreground sm:w-auto">
            Signed in as <span className="text-primary">{user.name}</span> •{" "}
            {user.role || "customer"}
          </p>
        ) : null}
      </div>
    </nav>
  );
};
