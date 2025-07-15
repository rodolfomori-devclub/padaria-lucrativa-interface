export interface EmployeeExpense {
    id: string
    name: string
    jobId: string
    job?: Pick<Job, 'name'>
    day: Date
    baseSalary: number
    extraHours: number
    grossSalary: number
    benefits: number
    netSalary: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateEmployeeExpenseData {
    name: string
    jobId: string
    day: string
    baseSalary: number
    extraHours: number
    grossSalary: number
    benefits: number
    netSalary: number
}

export interface UpdateEmployeeExpenseData {
    name?: string
    jobId?: string
    baseSalary?: number
    extraHours?: number
    grossSalary?: number
    benefits?: number
    netSalary?: number
}

import type { BaseDateFilters } from './filters'
import type { Job } from './job'

export interface EmployeeExpenseFilters extends BaseDateFilters {
    jobId?: string
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