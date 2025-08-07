import { useFormContext } from 'react-hook-form'
import { useInputs } from '~/hooks/inputs/useInputs'
import type { RecipeFormData } from '~/schema/receitas-modelo'
import { calculateUnitCost } from '~/utils/calculators'
import { formatCurrency } from '~/utils/formaters'

export const RecipeCostPreview = () => {
    const { inputs } = useInputs()
    const { watch } = useFormContext<RecipeFormData>()

    const watchedValues = watch()

    // Calculate totals for preview
    const calculateTotals = () => {
        let totalCost = 0

        watchedValues.inputs?.forEach(ingredient => {
            const input = inputs.find(i => i.id === ingredient.inputId)
            if (input) {
                const cost = (input.unitCost * ingredient.quantity)
                totalCost += cost
            }
        })

        const unitCost = calculateUnitCost(totalCost, watchedValues.yield || 1)

        return { totalCost, unitCost }
    }

    const { totalCost, unitCost } = calculateTotals()

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Cálculos</h2>

            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                    <span className="text-gray-600">Custo Total:</span>
                    <span className="font-medium text-2xl">{formatCurrency(totalCost)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Custo Unitário:</span>
                    <span className="font-medium text-2xl">{formatCurrency(unitCost)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-700 font-medium">Preço de venda praticado:</span>
                    <span className="font-medium text-2xl">{formatCurrency(watchedValues.salePrice)}</span>
                </div>
                <div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Preço Sugerido de Venda:</span>
                        <span className="font-semibold text-2xl text-green-600">
                            {formatCurrency(unitCost * 4)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        * Preço sugerido = Custo unitário × 4
                    </p>
                </div>

            </div>
        </div>
    )
} 