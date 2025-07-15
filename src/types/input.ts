export enum UnitMeasure {
    QUILO = 'QUILO',
    GRAMA = 'GRAMA',
    LITRO = 'LITRO',
    MILILITRO = 'MILILITRO',
    UNIDADE = 'UNIDADE',
    PECA = 'PECA',
}

export interface Input {
    id: string
    name: string
    price: number
    packagingQuantity: number
    unitMeasure: UnitMeasure
    conversionFactor: number
    unitCost: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateInputData {
    name: string
    price: number
    packagingQuantity: number
    unitMeasure: UnitMeasure
    conversionFactor: number
}

export interface UpdateInputData {
    name?: string
    price?: number
    packagingQuantity?: number
    unitMeasure?: UnitMeasure
    conversionFactor?: number
}

export const UNIT_MEASURE_LABELS: Record<UnitMeasure, string> = {
    [UnitMeasure.QUILO]: 'Quilograma (kg)',
    [UnitMeasure.GRAMA]: 'Grama (g)',
    [UnitMeasure.LITRO]: 'Litro (L)',
    [UnitMeasure.MILILITRO]: 'Mililitro (mL)',
    [UnitMeasure.UNIDADE]: 'Unidade',
    [UnitMeasure.PECA]: 'Peça',
}