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