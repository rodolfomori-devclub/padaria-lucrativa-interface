import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";
import { ROUTES } from "~/routes/routes";
import { hasProAccess } from "~/utils/plans";

interface PlanProtectedRouteProps {
  children: ReactNode;
  fallbackRoute?: string;
}

export function PlanProtectedRoute({
  children,
  fallbackRoute = ROUTES.DASHBOARD,
}: PlanProtectedRouteProps) {
  const { user } = useAuth();
  if (!hasProAccess(user)) {
    return <Navigate to={fallbackRoute} replace />;
  }

  return <>{children}</>;
}
