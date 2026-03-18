import { Pagination } from '~/components/Pagination'
import { useEmployeeExpenses } from '~/hooks/employee-expenses/useEmployeeExpenses'
import { EmployeeExpenseFiltersProvider, useEmployeeExpenseFilters } from '~/hooks/filters/employee-expense-filters'
import { EmployeeExpensesTable, Filters, NewEmployeeExpenseDialog } from './components'

function DespesasPessoalContent() {
    const { filters, updateFilters } = useEmployeeExpenseFilters()
    const { employeeExpenses, meta, isLoading } = useEmployeeExpenses({
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
                        <h1 className="text-3xl font-bold text-gray-900">Despesas com Pessoal</h1>
                        <p className="text-gray-600 mt-2">Gerencie as despesas com funcionários da padaria</p>
                    </div>
                    <NewEmployeeExpenseDialog />
                </div>
            </div>

            <Filters />

            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <EmployeeExpensesTable
                    employeeExpenses={employeeExpenses}
                    isLoading={isLoading}
                />
                {meta && meta.totalPages > 1 && (
                    <Pagination meta={meta} onPageChange={handlePageChange} />
                )}
            </div>
        </div>
    )
}

export function DespesasPessoalPage() {
    return (
        <EmployeeExpenseFiltersProvider>
            <DespesasPessoalContent />
        </EmployeeExpenseFiltersProvider>
    )
} 