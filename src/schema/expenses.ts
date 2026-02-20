import { z } from "zod"

export const RecurrencePatternEnum = z.enum(['MONTHLY', 'QUARTERLY', 'SEMIANNUAL', 'ANNUAL'])

export const expenseSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    value: z.number({ invalid_type_error: 'Valor deve ser um número' }).min(0.01, 'Valor deve ser maior que zero'),
    isGovFee: z.boolean().optional(),
    isRecurring: z.boolean().optional(),
    recurrencePattern: RecurrencePatternEnum.optional(),
    recurringStartDate: z.string().optional(),
    recurringDayOfMonth: z.number().min(1).max(31).optional(),
}).refine((data) => {
    if (data.isRecurring) {
        return !!data.recurrencePattern && !!data.recurringStartDate && !!data.recurringDayOfMonth
    }
    return true
}, {
    message: 'Todos os campos de recorrência são obrigatórios quando "Tornar recorrente" está ativado',
    path: ['isRecurring'],
})

export type ExpenseFormData = z.infer<typeof expenseSchema> 