import type { Plan } from "./plan"

export enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT',
}

export type User = {
    id: string
    name: string
    email: string
    role: UserRole
    phone: string
    createdAt: string
    isFirstLogin?: boolean
    plan?: Plan
}