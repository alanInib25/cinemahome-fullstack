import { useEffect } from "react";
//react router dom
import { Outlet, Navigate } from "react-router-dom";
//context
import { useAuth } from "../../context/AuthContext";

function ProtectedRoutes() {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/auth/signin" replace />;
  return <Outlet />;
}

export default ProtectedRoutes;
