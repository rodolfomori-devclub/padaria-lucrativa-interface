export interface EmployeeExpense {
    id: string
    name: string
    jobId: string
    job?: Pick<Job, 'name'>
    day: Date
    baseSalary: number
    extraHours?: number
    grossSalary: number
    fgts: number
    inss: number
    transport?: number
    meal?: number
    netSalary: number
    isActive: boolean
    recurringTemplateId?: string
    recurringDayOfMonth?: number
    recurringStartDate?: Date
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
    fgts?: number
    inss?: number
    transport?: number
    meal?: number
    netSalary: number
    isRecurring?: boolean
    recurringStartDate?: string
    recurringDayOfMonth?: number
}

export interface UpdateEmployeeExpenseData {
    name?: string
    jobId?: string
    baseSalary?: number
    extraHours?: number
    grossSalary?: number
    transport?: number
    meal?: number
    netSalary?: number
    isRecurring?: boolean
    recurringDayOfMonth?: number
    recurringStartDate?: string
    admissionDate?: string
}

import type { BaseDateFilters } from './filters'
import type { Job } from './job'
import type { PaginationMeta } from './pagination'

export interface EmployeeExpenseFilters extends BaseDateFilters {
    jobId?: string
    page?: number
    limit?: number
}

export interface PaginatedEmployeeExpenseResponse {
    data: EmployeeExpense[]
    meta: PaginationMeta
}