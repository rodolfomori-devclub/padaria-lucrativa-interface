import { PlanType } from "~/types/plan";
import { UserRole, type User } from "~/types/user";

export function getUserPlan(user: User | null): PlanType | null {
    if (!user || user.role !== UserRole.CLIENT) {
        return null;
    }
    return user.plan?.type || PlanType.BASIC;
}

export function hasProAccess(user: User | null): boolean {
    const plan = getUserPlan(user);
    return plan === PlanType.PRO;
}

export function isPlanActive(user: User | null): boolean {
    if (!user?.plan) return false;

    const expiryDate = new Date(user.plan.expiresAt);
    const now = new Date();
    return user.plan.isActive && expiryDate > now;
}

export function shouldShowFeature(user: User | null, requiredPlan: PlanType): boolean {
    // ADMIN and EMPLOYEE see everything
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.EMPLOYEE) {
        return true;
    }

    // CLIENT users need active plan
    if (!isPlanActive(user)) return false;

    const userPlan = getUserPlan(user);
    if (requiredPlan === PlanType.BASIC) {
        return userPlan === PlanType.BASIC || userPlan === PlanType.PRO;
    }

    return userPlan === PlanType.PRO;
}
