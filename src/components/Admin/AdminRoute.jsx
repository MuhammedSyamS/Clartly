// src/components/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { user, token, isAdmin } = useAuth();

  // 1. If not logged in, go to Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If logged in but NOT an Admin, go to Home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 3. If Admin, allow access
  return <Outlet />;
}