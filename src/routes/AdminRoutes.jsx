import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}
