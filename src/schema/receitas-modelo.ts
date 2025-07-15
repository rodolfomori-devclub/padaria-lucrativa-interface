import { z } from 'zod'
import { UnitMeasure } from '~/types/input'

const recipeInputSchema = z.object({
    inputId: z.string().min(1, 'Insumo é obrigatório'),
    quantity: z.number().min(0.001, 'Quantidade deve ser maior que zero'),
})

export const recipeFormSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    yield: z.number().min(0.001, 'Rendimento deve ser maior que zero'),
    unitMeasure: z.nativeEnum(UnitMeasure, { required_error: 'Unidade de medida é obrigatória' }),
    inputs: z.array(recipeInputSchema).min(1, 'Deve ter pelo menos um ingrediente'),
})

export type RecipeFormData = z.infer<typeof recipeFormSchema>
export type RecipeInputFormData = z.infer<typeof recipeInputSchema>