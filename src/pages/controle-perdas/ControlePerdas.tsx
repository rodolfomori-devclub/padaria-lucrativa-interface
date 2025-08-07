import { useMemo, useState } from 'react'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { LossControlFiltersProvider, useLossControlFilters } from '~/hooks/filters/loss-control-filters'
import { useLossControls } from '~/hooks/loss-control/useLossControls'
import type { LossControl } from '~/types/loss-control'
import { Filters, LossControlTable, NewLossControlDialog } from './components'

function ControlePerdasContent() {
    const { filters } = useLossControlFilters()
    const { lossControls, isLoading } = useLossControls(filters)
    const [isGrouped, setIsGrouped] = useState(false)

    const groupedByRecipe = useMemo(() => {
        return Object.values(lossControls.reduce((acc, lossControl) => {
            const recipe = lossControl.recipeId
            if (!acc[recipe]) {
                acc[recipe] = {
                    ...lossControl,
                    quantity: lossControl.quantity,
                    totalValue: lossControl.totalValue
                }
            } else {
                acc[recipe] = {
                    ...lossControl,
                    quantity: acc[recipe].quantity + lossControl.quantity,
                    totalValue: acc[recipe].totalValue + lossControl.totalValue
                }
            }
            return acc
        }, {} as Record<string, LossControl>))
    }, [lossControls])

    const displayLossControls = isGrouped ? groupedByRecipe : lossControls

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Controle de Perdas</h1>
                        <p className="text-gray-600 mt-2">Registre e acompanhe as perdas de produtos</p>
                    </div>
                    <NewLossControlDialog />
                </div>
            </div>

            <Filters />

            <div className="mb-4 flex items-center space-x-2">
                <Switch
                    id="group-mode"
                    checked={isGrouped}
                    onCheckedChange={setIsGrouped}
                />
                <Label htmlFor="group-mode" className="text-sm font-medium text-gray-700">
                    Agrupar por receita
                </Label>
                {isGrouped && (
                    <span className="text-xs text-gray-500 ml-2">
                        (Edição e exclusão desabilitadas no modo agrupado)
                    </span>
                )}
            </div>

            <LossControlTable
                lossControls={displayLossControls}
                isLoading={isLoading}
                isGrouped={isGrouped}
            />
        </div>
    )
}

export function ControlePerdasPage() {
    return (
        <LossControlFiltersProvider>
            <ControlePerdasContent />
        </LossControlFiltersProvider>
    )
} 