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

export const MONTH_LABELS: Record<number, string> = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
} 