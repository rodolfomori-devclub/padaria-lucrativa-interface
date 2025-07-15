import { LossControlFiltersProvider, useLossControlFilters } from '~/hooks/filters/loss-control-filters'
import { useLossControls } from '~/hooks/loss-control/useLossControls'
import { Filters, LossControlTable, NewLossControlDialog } from './components'

function ControlePerdasContent() {
    const { filters } = useLossControlFilters()
    const { lossControls, isLoading } = useLossControls(filters)

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

            <LossControlTable
                lossControls={lossControls}
                isLoading={isLoading}
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