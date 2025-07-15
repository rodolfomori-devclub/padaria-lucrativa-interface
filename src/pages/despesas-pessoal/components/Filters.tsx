import { BaseFilters } from "~/components/ui"
import { useEmployeeExpenseFilters } from "~/hooks/filters/employee-expense-filters"

export function Filters() {
    const { filters, updateFilters } = useEmployeeExpenseFilters()

    return (
        <BaseFilters
            filters={filters}
            onFiltersChange={updateFilters}
        />
    )
} 