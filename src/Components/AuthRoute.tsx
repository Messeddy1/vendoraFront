import { useAppSelector } from "@/store/reduxHooks";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // User not logged in, render auth content (login/register)
  return <>{children}</>;
}

export default AuthRoute;
