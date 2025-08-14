import type { PaginationMeta } from './pagination'
import type { PlanType } from './plan'
import type { User } from './user'

export interface CreateClientData {
    name: string
    email: string
    phone: string
    password: string
    planType: PlanType
    expiresAt: string
}

export interface UpdateClientData {
    name?: string
    email?: string
    phone?: string
}

export interface ClientFilters {
    search?: string
    page?: number
    limit?: number
}

export interface PaginatedClientsResponse {
    data: User[]
    meta: PaginationMeta
}
