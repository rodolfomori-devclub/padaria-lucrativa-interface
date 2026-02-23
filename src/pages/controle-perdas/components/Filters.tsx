import { useEffect, useState } from "react";
import { BaseFilters, Input, Label } from "~/components/ui";
import { useLossControlFilters } from "~/hooks/filters/loss-control-filters";
import { useLossControls } from "~/hooks/loss-control/useLossControls";
import { useSales } from "~/hooks/sales/useSales";
import { useDebounce } from "~/hooks/useDebounce";

export function Filters() {
  const { filters, updateFilters } = useLossControlFilters();
  const [productName, setProductName] = useState(filters.search || "");
  const debouncedProductName = useDebounce({ value: productName, delay: 500 });
  const { total: totalInCents } = useLossControls(filters);
  const { sales } = useSales(filters);
  const totalSales = sales.reduce((acc, sale) => acc + sale.value, 0) || 0;
  const total = totalInCents ? totalInCents / 100 : 0;
  const percentualDePerdas =
    total && totalSales ? Math.round((total / totalSales) * 100) : 0;

  useEffect(() => {
    updateFilters({ search: debouncedProductName || undefined });
  }, [debouncedProductName, updateFilters]);

  return (
    <div className="relative mb-6 space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <BaseFilters
        className="bg-transparent border-none shadow-none p-0"
        filters={filters}
        onFiltersChange={updateFilters}
        total={total}
      />
      {percentualDePerdas > 0 && (
        <h3 className="absolute top-5 right-4 text-lg font-medium text-gray-800">
          Percentual de Quebra: {percentualDePerdas}%
        </h3>
      )}

      <div className="flex gap-4 items-end">
        <div className="flex-1 flex flex-col gap-2">
          <Label>Buscar por Produto</Label>
          <Input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Digite o nome do produto"
          />
        </div>
      </div>
    </div>
  );
}
