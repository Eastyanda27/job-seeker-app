import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, redirectTo = "/login", children }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallback = user.role === "COMPANY" ? "/company/jobs" : "/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;

