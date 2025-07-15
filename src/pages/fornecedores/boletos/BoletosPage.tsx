import { useBoletos } from '~/hooks/boletos/useBoletos'
import { BoletoFiltersProvider, useBoletoFilters } from '~/hooks/filters/boleto-filters'
import { BoletosTable, Filters, NewBoletoDialog } from './components'

function BoletosContent() {
    const { filters } = useBoletoFilters()
    const { boletos, isLoading } = useBoletos(filters)

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Boletos</h1>
                        <p className="text-gray-600 mt-2">Gerencie os boletos dos fornecedores</p>
                    </div>
                    <NewBoletoDialog />
                </div>
            </div>

            <Filters />

            <BoletosTable
                boletos={boletos}
                isLoading={isLoading}
            />
        </div>
    )
}

export function BoletosPage() {
    return (
        <BoletoFiltersProvider>
            <BoletosContent />
        </BoletoFiltersProvider>
    )
}
