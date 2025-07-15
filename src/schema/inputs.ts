import { z } from "zod"
import { UnitMeasure } from "~/types/input"

export const inputSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    price: z.number().min(0.01, 'Preço deve ser maior que zero'),
    packagingQuantity: z.number().min(0.001, 'Quantidade deve ser maior que zero'),
    unitMeasure: z.nativeEnum(UnitMeasure, { errorMap: () => ({ message: 'Selecione uma unidade de medida' }) }),
    conversionFactor: z.number().min(0.000001, 'Fator de conversão deve ser maior que zero'),
})

export type InputFormData = z.infer<typeof inputSchema>