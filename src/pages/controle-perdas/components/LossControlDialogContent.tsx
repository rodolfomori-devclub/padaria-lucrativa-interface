import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { RecipesSelect } from '~/components/RecipesSelect'
import { Button, Input, Loading } from '~/components/ui'
import { Textarea } from '~/components/ui/textarea'
import { useRecipes } from '~/hooks/recipes/useRecipes'
import { lossControlSchema, type LossControlFormData } from '~/schema/loss-control'
import type { CreateLossControlData, LossControl } from '~/types/loss-control'
import { formatCurrency, formatDateForInput } from '~/utils/formaters'

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
    const { recipes } = useRecipes()
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
                recipeId: lossControl.recipeId,
                quantity: lossControl.quantity || undefined,
                totalValue: formatCurrency(lossControl.totalValue) || '',
                day: formatDateForInput(lossControl.day),
                observations: lossControl.observations || '',
            }
            : {},
    })

    const chosenRecipe = useMemo(() => recipes.find(recipe => recipe.id === watch('recipeId')), [recipes, watch])
    const quantity = watch('quantity')
    const totalValue = useMemo(() => {
        if (!chosenRecipe || !quantity || quantity === 0) return 0;
        return chosenRecipe.salePrice * quantity;
    }, [chosenRecipe, quantity]);

    // Calculate total value automatically
    useEffect(() => {
        if (quantity && chosenRecipe) {
            const calculatedTotal = quantity * (chosenRecipe?.salePrice || 0)
            setValue('totalValue', formatCurrency(calculatedTotal))
        }
    }, [quantity, setValue, chosenRecipe])

    const handleFormSubmit = async (data: LossControlFormData) => {
        await onSubmit({
            ...data,
            productName: chosenRecipe?.name || '',
            unitPrice: chosenRecipe?.salePrice || 0,
            recipeId: chosenRecipe?.id || '',
            day: new Date(data.day).toISOString(),
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                <RecipesSelect
                    value={watch('recipeId')}
                    label="Nome do Produto *"
                    onChange={(value) => setValue('recipeId', value.id)}
                />
            </div>

            <div className="space-y-2">
                <Input
                    id="quantity"
                    label="Quantidade *"
                    type="number"
                    placeholder="0,00"
                    disabled={!chosenRecipe}
                    {...register('quantity', { valueAsNumber: true })}
                    className={errors.quantity ? 'border-red-500' : ''}
                />
                {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Input
                    id="day"
                    label="Dia *"
                    type="date"
                    {...register('day')}
                    className={errors.day ? 'border-red-500' : ''}
                />
                {errors.day && (
                    <p className="mt-1 text-sm text-red-600">{errors.day.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Input
                    id="totalValue"
                    label="Valor Total (R$) *"
                    placeholder="0,00"
                    value={watch('totalValue') || formatCurrency(totalValue)}
                    className={`${errors.totalValue ? 'border-red-500' : ''} bg-gray-50`}
                    readOnly
                />
                <p className="text-xs text-gray-500">Calculado automaticamente (Preço de Venda Praticado × Quantidade)</p>
            </div>

            <div className="space-y-2">
                <Textarea
                    id="observations"
                    label="Observações"
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