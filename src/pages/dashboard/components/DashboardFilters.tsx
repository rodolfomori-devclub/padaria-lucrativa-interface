import { BaseFilters } from "~/components/ui/base-filters";
import type { DashboardFiltersProps } from "~/types/dashboard";

export function DashboardFilters({ filters, onFiltersChange }: DashboardFiltersProps) {
    return (
        <BaseFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            className="mb-8"
        />
    );
} 