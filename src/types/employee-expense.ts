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
}

import type { BaseDateFilters } from './filters'
import type { Job } from './job'

export interface EmployeeExpenseFilters extends BaseDateFilters {
    jobId?: string
}