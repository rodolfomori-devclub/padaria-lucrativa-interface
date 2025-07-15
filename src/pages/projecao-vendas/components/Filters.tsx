import { BaseFilters } from "~/components/ui/base-filters";
import { useSalesProjectionFilters } from "~/hooks/filters/sales-projection-filters";
import { useSalesProjection } from "~/hooks/sales-projection/useSalesProjection";

export function Filters() {
  const { filters, updateFilters } = useSalesProjectionFilters();
  const { total, totalPurchase } = useSalesProjection(filters);

  return <BaseFilters filters={filters} onFiltersChange={updateFilters} total={total} totalPurchase={totalPurchase} />;
}
