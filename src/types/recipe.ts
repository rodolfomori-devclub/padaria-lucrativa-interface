import { UnitMeasure } from './input'

export interface RecipeInput {
    inputId: string
    quantity: number
}

export interface Recipe {
    id: string
    name: string
    yield: number
    unitMeasure: UnitMeasure
    totalCost: number
    inputs: RecipeInput[]
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateRecipeData {
    name: string
    yield: number
    unitMeasure: UnitMeasure
}

export interface UpdateRecipeData {
    name?: string
    yield?: number
    unitMeasure?: UnitMeasure
    inputs?: Array<{
        inputId: string
        quantity: number
    }>
}

export interface AddRecipeInputData {
    insumoId: string
    quantidade: number
} 