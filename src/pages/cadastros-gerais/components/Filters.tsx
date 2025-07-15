import { BaseFilters } from "~/components/ui"
import { useExpenses } from "~/hooks/expenses/useExpenses"
import { useExpenseFilters } from "~/hooks/filters"

export function Filters() {
    const { filters, updateFilters } = useExpenseFilters()
    const { total } = useExpenses(filters)

    return (
        <BaseFilters
            filters={filters}
            onFiltersChange={updateFilters}
            total={total}
        />
    )
} 