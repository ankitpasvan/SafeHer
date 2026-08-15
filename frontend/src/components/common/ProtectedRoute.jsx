import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader full label="Checking your session..." />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
