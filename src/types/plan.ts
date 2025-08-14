export enum PlanType {
    BASIC = 'BASIC',
    PRO = 'PRO',
}

export interface Plan {
    id: string;
    type: PlanType;
    title: string;
    description?: string;
    price: number;
    isActive: boolean;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
    usersCount: number;
}

export interface CreatePlanData {
    title: string;
    description?: string;
    type: PlanType;
    price: number;
}

export interface UpdatePlanData {
    title?: string;
    description?: string;
    type?: PlanType;
    price?: number;
}