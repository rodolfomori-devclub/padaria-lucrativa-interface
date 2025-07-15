export interface Expense {
    id: string
    name: string
    value: number
    day: Date
    isFixed: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateExpenseData {
    name: string
    value: number
    day: string
    isFixed: boolean
}

export interface UpdateExpenseData {
    name?: string
    value?: number
}

import type { BaseDateFilters } from './filters'

export interface ExpenseFilters extends BaseDateFilters {
    isFixed: boolean
}