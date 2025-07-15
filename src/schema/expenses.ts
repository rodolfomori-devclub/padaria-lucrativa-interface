import { z } from "zod"

export const expenseSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    value: z.number().min(0.01, 'Valor deve ser maior que zero'),
})

export type ExpenseFormData = z.infer<typeof expenseSchema> 