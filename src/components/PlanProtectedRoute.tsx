import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";
import { ROUTES } from "~/routes/routes";
import { PlanType } from "~/types/plan";
import { hasProAccess, shouldShowFeature } from "~/utils/plans";

interface PlanProtectedRouteProps {
    children: ReactNode;
    requiredPlan: PlanType;
    fallbackRoute?: string;
}

export function PlanProtectedRoute({
    children,
    requiredPlan,
    fallbackRoute = ROUTES.DASHBOARD
}: PlanProtectedRouteProps) {
    const { user } = useAuth();
    console.log({ user, canView: shouldShowFeature(user, requiredPlan) });
    if (!hasProAccess(user)) {
        return <Navigate to={fallbackRoute} replace />;
    }

    return <>{children}</>;
}