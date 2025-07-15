import { useEmployeeExpenses } from '~/hooks/employee-expenses/useEmployeeExpenses'
import { EmployeeExpenseFiltersProvider, useEmployeeExpenseFilters } from '~/hooks/filters/employee-expense-filters'
import { EmployeeExpensesTable, Filters, NewEmployeeExpenseDialog } from './components'

function DespesasPessoalContent() {
    const { filters } = useEmployeeExpenseFilters()
    const { employeeExpenses, isLoading } = useEmployeeExpenses(filters)

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

            <EmployeeExpensesTable
                employeeExpenses={employeeExpenses}
                isLoading={isLoading}
            />
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