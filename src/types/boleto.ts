import type { BaseDateFilters } from './filters'
import type { Supplier } from './supplier'

export interface Boleto {
    id: string
    supplierId: string
    supplier: Supplier
    value: number
    dueDate: string
    observations?: string
    paid: boolean
    paymentDate?: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateBoletoData {
    supplierId: string
    value: number
    dueDate: string
    observations?: string
}

export interface UpdateBoletoData {
    supplierId?: string
    value?: number
    dueDate?: string
    observations?: string
    paid?: boolean
    paymentDate?: string
}

export interface BoletoFilters extends BaseDateFilters {
    supplierId?: string
    paid?: boolean
} 