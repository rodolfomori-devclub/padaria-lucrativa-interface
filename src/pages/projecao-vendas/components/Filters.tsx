import { BaseFilters } from "~/components/ui/base-filters";
import { useSalesProjectionFilters } from "~/hooks/filters/sales-projection-filters";

export function Filters() {
  const { filters, updateFilters } = useSalesProjectionFilters();

  return <BaseFilters filters={filters} onFiltersChange={updateFilters} />;
}
