import { BaseFilters } from "~/components/ui"
import { useEmployeeExpenses } from "~/hooks/employee-expenses/useEmployeeExpenses"
import { useEmployeeExpenseFilters } from "~/hooks/filters/employee-expense-filters"

export function Filters() {
    const { filters, updateFilters } = useEmployeeExpenseFilters()
    const { total } = useEmployeeExpenses(filters)

    return (
        <BaseFilters
            filters={filters}
            onFiltersChange={updateFilters}
            total={total}
        />
    )
} 