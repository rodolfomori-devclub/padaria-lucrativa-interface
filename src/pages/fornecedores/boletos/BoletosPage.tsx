import { Pagination } from '~/components/Pagination'
import { useBoletos } from '~/hooks/boletos/useBoletos'
import { BoletoFiltersProvider, useBoletoFilters } from '~/hooks/filters/boleto-filters'
import { BoletosTable, Filters, NewBoletoDialog } from './components'

function BoletosContent() {
    const { filters, updateFilters } = useBoletoFilters()
    const { boletos, isLoading, meta } = useBoletos({
        ...filters,
        page: filters.page || 1,
        limit: filters.limit || 15,
    })

    const handlePageChange = (page: number) => {
        updateFilters({ page })
    }

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

            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <BoletosTable
                    boletos={boletos}
                    isLoading={isLoading}
                />
                {meta && meta.totalPages > 1 && (
                    <Pagination meta={meta} onPageChange={handlePageChange} />
                )}
            </div>
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
