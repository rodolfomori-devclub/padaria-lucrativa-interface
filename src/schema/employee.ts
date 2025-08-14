import { z } from 'zod'

export const createEmployeeSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido').transform(email => email.toLowerCase()),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const employeeFiltersSchema = z.object({
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
})

export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>
export type EmployeeFiltersFormData = z.infer<typeof employeeFiltersSchema>
