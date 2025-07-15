import { z } from "zod"

export const employeeExpenseSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    jobId: z.string().min(1, 'Cargo é obrigatório'),
    baseSalary: z.number().min(0, 'Salário base deve ser maior ou igual a zero'),
    extraHours: z.number().min(0, 'Horas extras deve ser maior ou igual a zero'),
    grossSalary: z.number().min(0, 'Salário bruto deve ser maior ou igual a zero'),
    benefits: z.number().min(0, 'Benefícios deve ser maior ou igual a zero'),
})

export type EmployeeExpenseFormData = z.infer<typeof employeeExpenseSchema> 