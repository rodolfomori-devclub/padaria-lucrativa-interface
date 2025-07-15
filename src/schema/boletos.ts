import { z } from "zod"

export const boletoSchema = z.object({
    supplierId: z.string().min(1, 'Fornecedor é obrigatório'),
    value: z.number().min(0.01, 'Valor deve ser maior que zero'),
    dueDate: z.string().min(1, 'Data de vencimento é obrigatória'),
    observations: z.string().max(500, 'Observações deve ter no máximo 500 caracteres').optional(),
})

export const updateBoletoSchema = boletoSchema.extend({
    isPayed: z.boolean().optional(),
    paymentDate: z.string().optional(),
})

export type BoletoFormData = z.infer<typeof boletoSchema>
export type UpdateBoletoFormData = z.infer<typeof updateBoletoSchema> 