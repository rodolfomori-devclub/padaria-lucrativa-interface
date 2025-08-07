import type { BaseDateFilters } from './filters'

export interface LossControl {
    id: string
    recipeId: string
    productName: string
    unitPrice: number
    quantity: number
    totalValue: number
    day: string
    observations?: string
    ownerId?: string
    createdAt: Date
}

export interface CreateLossControlData {
    productName: string
    recipeId: string
    unitPrice: number
    quantity: number
    totalValue: string
    day: string
    observations?: string
}

export interface UpdateLossControlData {
    productName?: string
    recipeId?: string
    unitPrice?: number
    quantity?: number
    totalValue?: number
    day?: string
    observations?: string
}

export interface LossControlFilters extends BaseDateFilters {
    search?: string
} 