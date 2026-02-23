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
}

import type { BaseDateFilters } from './filters'

export interface ExpenseFilters extends BaseDateFilters {
    isFixed: boolean
}