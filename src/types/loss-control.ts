import type { BaseDateFilters } from './filters'

export interface LossControl {
    id: string
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
    unitPrice: number
    quantity: number
    totalValue: number
    day: string
    observations?: string
}

export interface UpdateLossControlData {
    productName?: string
    unitPrice?: number
    quantity?: number
    totalValue?: number
    day?: string
    observations?: string
}

export interface LossControlFilters extends BaseDateFilters {
    search?: string
} 