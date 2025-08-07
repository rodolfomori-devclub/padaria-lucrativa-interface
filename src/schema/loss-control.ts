import { z } from "zod"

export const lossControlSchema = z.object({
    recipeId: z.string().min(1, 'Receita é obrigatória'),
    quantity: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
    totalValue: z.string().min(1, 'Valor total deve ser maior que zero'),
    day: z.string().min(1, 'Dia é obrigatório'),
    observations: z.string().max(500, 'Observações deve ter no máximo 500 caracteres').optional(),
})

export const updateLossControlSchema = lossControlSchema.partial()

export type LossControlFormData = z.infer<typeof lossControlSchema>
export type UpdateLossControlFormData = z.infer<typeof updateLossControlSchema> 