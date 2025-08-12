import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";
import { ROUTES } from "~/routes/routes";
import { PlanType } from "~/types/plan";
import { shouldShowFeature } from "~/utils/plans";

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

    if (!shouldShowFeature(user, requiredPlan)) {
        return <Navigate to={fallbackRoute} replace />;
    }

    return <>{children}</>;
}