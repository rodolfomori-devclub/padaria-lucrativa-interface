export type RecurrencePattern = 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL'

export interface Expense {
    id: string
    name: string
    value: number
    isGovFee?: boolean
    day: Date
    isFixed: boolean
    isActive: boolean
    recurringTemplateId?: string
    recurrencePattern?: RecurrencePattern
    recurringStartDate?: Date
    recurringDayOfMonth?: number
    createdAt: Date
    updatedAt: Date
}

export interface CreateExpenseData {
    name: string
    value: number
    isGovFee?: boolean
    day?: string
    isFixed: boolean
    isRecurring?: boolean
    recurrencePattern?: RecurrencePattern
    recurringStartDate?: string
    recurringDayOfMonth?: number
}

export interface UpdateExpenseData {
    name?: string
    value?: number
    isGovFee?: boolean
    isRecurring?: boolean
    recurrencePattern?: RecurrencePattern
    recurringStartDate?: string
    recurringDayOfMonth?: number
}

import type { BaseDateFilters } from './filters'
import type { PaginationMeta } from './pagination'

export interface ExpenseFilters extends BaseDateFilters {
    isFixed: boolean
    page?: number
    limit?: number
}

export interface PaginatedExpenseResponse {
    data: Expense[]
    meta: PaginationMeta
}