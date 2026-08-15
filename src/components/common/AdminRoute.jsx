import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Loader from "./Loader";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader full label="Checking access..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
