import { BaseFilters } from "~/components/ui"
import { useExpenseFilters } from "~/hooks/filters"

export function Filters() {
    const { filters, updateFilters } = useExpenseFilters()

    return (
        <BaseFilters
            filters={filters}
            onFiltersChange={updateFilters}
        />
    )
} 