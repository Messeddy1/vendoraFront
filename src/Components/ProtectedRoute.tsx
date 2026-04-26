import { useAppSelector } from "@/store/reduxHooks";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
}