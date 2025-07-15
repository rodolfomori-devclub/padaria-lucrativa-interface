import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, Loading } from '~/components/ui'
import { Textarea } from '~/components/ui/textarea'
import { lossControlSchema, type LossControlFormData } from '~/schema/loss-control'
import type { CreateLossControlData, LossControl } from '~/types/loss-control'

interface LossControlDialogContentProps {
    onSubmit: (data: CreateLossControlData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    lossControl?: LossControl
}

export function LossControlDialogContent({
    onSubmit,
    onCancel,
    isLoading,
    lossControl,
}: LossControlDialogContentProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<LossControlFormData>({
        resolver: zodResolver(lossControlSchema),
        defaultValues: lossControl
            ? {
                productName: lossControl.productName,
                unitPrice: lossControl.unitPrice,
                quantity: lossControl.quantity,
                totalValue: lossControl.totalValue,
                day: lossControl.day,
                observations: lossControl.observations || '',
            }
            : {
                unitPrice: 0,
                quantity: 0,
                totalValue: 0,
            },
    })

    const unitPrice = watch('unitPrice')
    const quantity = watch('quantity')

    // Calculate total value automatically
    useEffect(() => {
        if (unitPrice && quantity && unitPrice > 0 && quantity > 0) {
            const calculatedTotal = unitPrice * quantity
            setValue('totalValue', Number(calculatedTotal.toFixed(2)))
        }
    }, [unitPrice, quantity, setValue])

    const handleFormSubmit = async (data: LossControlFormData) => {
        await onSubmit({
            ...data,
            day: new Date(data.day).toISOString(),
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="productName">Nome do Produto *</Label>
                <Input
                    id="productName"
                    placeholder="Digite o nome do produto"
                    {...register('productName')}
                    className={errors.productName ? 'border-red-500' : ''}
                />
                {errors.productName && (
                    <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="unitPrice">Preço Unitário (R$) *</Label>
                    <Input
                        id="unitPrice"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0,00"
                        {...register('unitPrice', { valueAsNumber: true })}
                        className={errors.unitPrice ? 'border-red-500' : ''}
                    />
                    {errors.unitPrice && (
                        <p className="mt-1 text-sm text-red-600">{errors.unitPrice.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade *</Label>
                    <Input
                        id="quantity"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0,00"
                        {...register('quantity', { valueAsNumber: true })}
                        className={errors.quantity ? 'border-red-500' : ''}
                    />
                    {errors.quantity && (
                        <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="day">Dia *</Label>
                <Input
                    id="day"
                    type="date"
                    {...register('day')}
                    className={errors.day ? 'border-red-500' : ''}
                />
                {errors.day && (
                    <p className="mt-1 text-sm text-red-600">{errors.day.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="totalValue">Valor Total (R$) *</Label>
                <Input
                    id="totalValue"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0,00"
                    {...register('totalValue', { valueAsNumber: true })}
                    className={`${errors.totalValue ? 'border-red-500' : ''} bg-gray-50`}
                    readOnly
                />
                {errors.totalValue && (
                    <p className="mt-1 text-sm text-red-600">{errors.totalValue.message}</p>
                )}
                <p className="text-xs text-gray-500">Calculado automaticamente (Preço × Quantidade)</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                    id="observations"
                    rows={3}
                    placeholder="Observações sobre a perda"
                    {...register('observations')}
                    className={`${errors.observations ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.observations && (
                    <p className="mt-1 text-sm text-red-600">{errors.observations.message}</p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loading className="w-4 h-4 mr-2" />}
                    {lossControl ? 'Atualizar' : 'Registrar'}
                </Button>
            </div>
        </form>
    )
} 