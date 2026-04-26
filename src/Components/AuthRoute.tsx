import { useAppSelector } from "@/store/reduxHooks";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
export default AuthRoute;