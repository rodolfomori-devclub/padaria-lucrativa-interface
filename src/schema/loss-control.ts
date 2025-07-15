import { z } from "zod"

export const lossControlSchema = z.object({
    productName: z.string().min(1, 'Nome do produto é obrigatório').max(200, 'Nome do produto deve ter no máximo 200 caracteres'),
    unitPrice: z.number().min(0.01, 'Preço unitário deve ser maior que zero'),
    quantity: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
    totalValue: z.number().min(0.01, 'Valor total deve ser maior que zero'),
    day: z.string().min(1, 'Dia é obrigatório'),
    observations: z.string().max(500, 'Observações deve ter no máximo 500 caracteres').optional(),
})

export const updateLossControlSchema = lossControlSchema.partial()

export type LossControlFormData = z.infer<typeof lossControlSchema>
export type UpdateLossControlFormData = z.infer<typeof updateLossControlSchema> 