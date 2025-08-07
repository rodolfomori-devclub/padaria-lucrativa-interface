import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { DialogFooter } from '~/components/ui/dialog'
import { Input as UIInput } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { inputSchema, type InputFormData } from '~/schema/inputs'
import type { CreateInputData, Input } from '~/types/input'
import { UNIT_MEASURE_LABELS, UnitMeasure } from '~/types/input'
import { formatCurrency, removeNonNumeric } from '~/utils/formaters'

interface InputDialogContentProps {
    input?: Input
    onSubmit: (data: CreateInputData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

export function InputDialogContent({ input, onSubmit, onCancel, isLoading }: InputDialogContentProps) {
    const [unitCost, setUnitCost] = useState<number>(0)
    const isEditing = !!input

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<InputFormData>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            name: input?.name || '',
            price: input?.price || 0,
            packagingQuantity: input?.packagingQuantity || 0,
            unitMeasure: input?.unitMeasure || UnitMeasure.UNIDADE,
            conversionFactor: input?.conversionFactor || 1,
        },
    })

    // Watch form values for unit cost calculation
    const watchedPrice = watch('price')
    const watchedPackagingQuantity = watch('packagingQuantity')
    const watchedConversionFactor = watch('conversionFactor')

    // Calculate unit cost whenever relevant fields change
    useEffect(() => {
        if (watchedPrice > 0 && watchedPackagingQuantity > 0 && watchedConversionFactor > 0) {
            const calculatedUnitCost = watchedPrice / (watchedPackagingQuantity * watchedConversionFactor)
            setUnitCost(calculatedUnitCost)
        } else {
            setUnitCost(0)
        }
    }, [watchedPrice, watchedPackagingQuantity, watchedConversionFactor])

    const handleFormSubmit = async (data: InputFormData) => {
        await onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <UIInput
                    id="name"
                    type="text"
                    label="Nome *"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className={errors.name ? 'border-red-500' : ''}
                    placeholder="Digite o nome do insumo"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <Controller
                control={control}
                name="price"
                render={({ field }) => {
                    const { onChange, value, ...fieldProps } = field

                    const formattedValue = formatCurrency(value)

                    return (
                        <>
                            <UIInput
                                id="price"
                                label="Preço (R$) *"
                                {...fieldProps}
                                value={formattedValue}
                                onChange={(e) => onChange(Number(removeNonNumeric(e.target.value)))}
                                className={errors.price ? 'border-red-500' : ''}
                                placeholder="0,00"
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                            )}
                        </>
                    )
                }}
            />

            <div>
                <Label htmlFor="packagingQuantity">Quantidade da Embalagem *</Label>
                <UIInput
                    id="packagingQuantity"
                    type="number"
                    step="0.001"
                    min="0.001"
                    {...register('packagingQuantity', { valueAsNumber: true })}
                    className={errors.packagingQuantity ? 'border-red-500' : ''}
                    placeholder="1,000"
                />
                {errors.packagingQuantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.packagingQuantity.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="unitMeasure">Unidade de Medida *</Label>
                <select
                    id="unitMeasure"
                    {...register('unitMeasure')}
                    className={`w-full rounded-md border ${errors.unitMeasure ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                    {Object.entries(UNIT_MEASURE_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                {errors.unitMeasure && (
                    <p className="mt-1 text-sm text-red-600">{errors.unitMeasure.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="conversionFactor">Fator de Conversão *</Label>
                <UIInput
                    id="conversionFactor"
                    type="number"
                    step="0.000001"
                    min="0.000001"
                    {...register('conversionFactor', { valueAsNumber: true })}
                    className={errors.conversionFactor ? 'border-red-500' : ''}
                    placeholder="1,000000"
                />
                {errors.conversionFactor && (
                    <p className="mt-1 text-sm text-red-600">{errors.conversionFactor.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                    Fator usado para converter a unidade da embalagem para a unidade de receita
                </p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
                <Label className="text-sm font-medium text-gray-700">Custo Unitário (Calculado)</Label>
                <div className="text-lg font-semibold text-gray-900 mt-1">
                    {formatCurrency(unitCost)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Custo por unidade baseado no preço, quantidade e fator de conversão
                </p>
            </div>

            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
                </Button>
            </DialogFooter>
        </form>
    )
} 