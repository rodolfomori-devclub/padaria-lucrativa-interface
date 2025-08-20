import { z } from "zod"

export const expenseSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    value: z.number({ invalid_type_error: 'Valor deve ser um número' }).min(0.01, 'Valor deve ser maior que zero'),
    isGovFee: z.boolean().optional(),
})

export type ExpenseFormData = z.infer<typeof expenseSchema> 