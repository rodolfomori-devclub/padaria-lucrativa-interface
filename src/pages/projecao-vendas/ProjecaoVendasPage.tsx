import { SalesProjectionFiltersProvider } from "~/hooks/filters/sales-projection-filters";
import { Filters, SalesProjectionTable } from "./components";

export function ProjecaoVendasPage() {
  return (
    <SalesProjectionFiltersProvider>
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Projeção de Vendas
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas projeções de vendas e compras por período
          </p>
        </div>

        {/* Filters */}
        <Filters />

        {/* Sales Projection Table */}
        <SalesProjectionTable />
      </div>
    </SalesProjectionFiltersProvider>
  );
}
