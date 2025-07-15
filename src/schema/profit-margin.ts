import { z } from "zod"

export const profitMarginSchema = z.object({
    cardPercentage: z.number().min(0, 'Percentual de vendas no cartão deve ser maior ou igual a zero').max(100, 'Percentual não pode ser maior que 100%'),
    lossPercentage: z.number().min(0, 'Percentual de perdas deve ser maior ou igual a zero').max(100, 'Percentual não pode ser maior que 100%'),
    cardTaxPercentage: z.number().min(0, 'Percentual de taxa do cartão deve ser maior ou igual a zero').max(100, 'Percentual não pode ser maior que 100%'),
    breakagePercentage: z.number().min(0, 'Percentual de quebra deve ser maior ou igual a zero').max(100, 'Percentual não pode ser maior que 100%'),
    packagingPercentage: z.number().min(0, 'Percentual de embalagens deve ser maior ou igual a zero').max(100, 'Percentual não pode ser maior que 100%'),
})

export type ProfitMarginFormData = z.infer<typeof profitMarginSchema> 