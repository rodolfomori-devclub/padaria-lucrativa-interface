import { useExpenses } from '~/hooks/expenses/useExpenses'
import { ExpenseFiltersProvider, useExpenseFilters } from '~/hooks/filters'
import { ExpensesTable, Filters, NewExpenseDialog } from './components'

function DespesasFixasContent() {
    const { filters } = useExpenseFilters()
    const { expenses, isLoading } = useExpenses(filters)

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Despesas Fixas</h1>
                        <p className="text-gray-600 mt-2">Gerencie as despesas fixas da padaria</p>
                    </div>
                    <NewExpenseDialog isFixed={true} />
                </div>
            </div>

            <Filters />

            <ExpensesTable
                expenses={expenses}
                isLoading={isLoading}
                isFixed={true}
            />
        </div>
    )
}

export function DespesasFixasPage() {
    return (
        <ExpenseFiltersProvider isFixed={true}>
            <DespesasFixasContent />
        </ExpenseFiltersProvider>
    )
} 