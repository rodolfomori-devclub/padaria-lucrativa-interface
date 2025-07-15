import { useExpenses } from '~/hooks/expenses/useExpenses'
import { ExpenseFiltersProvider, useExpenseFilters } from '~/hooks/filters'
import { ExpensesTable, Filters, NewExpenseDialog } from './components'

function DespesasVariaveisContent() {
    const { filters } = useExpenseFilters()
    const { expenses, isLoading } = useExpenses(filters)

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Despesas Variáveis</h1>
                        <p className="text-gray-600 mt-2">Gerencie as despesas variáveis da padaria</p>
                    </div>
                    <NewExpenseDialog isFixed={false} />
                </div>
            </div>

            <Filters />

            <ExpensesTable
                expenses={expenses}
                isLoading={isLoading}
                isFixed={false}
            />
        </div>
    )
}

export function DespesasVariaveisPage() {
    return (
        <ExpenseFiltersProvider isFixed={false}>
            <DespesasVariaveisContent />
        </ExpenseFiltersProvider>
    )
} 