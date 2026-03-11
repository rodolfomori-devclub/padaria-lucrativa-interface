import { SalesProjectionFiltersProvider } from "~/hooks/filters/sales-projection-filters";
import { Filters, SalesProjectionTable } from "./components";
import { TutorialButton } from "~/components/TutorialButton";

export function ProjecaoVendasPage() {
  return (
    <SalesProjectionFiltersProvider>
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Projeção de Vendas
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie suas projeções de vendas e compras por período
            </p>
          </div>
          <TutorialButton
            videoUrl="https://drive.google.com/file/d/15YS_cF8ciC3EE75qaSLGNkYxqfpVMoGx/view?usp=sharing"
            title="Tutorial - Projeção de Vendas"
            description="Aprenda a gerenciar as projeções de vendas da sua padaria."
          />
        </div>

        {/* Filters */}
        <Filters />

        {/* Sales Projection Table */}
        <SalesProjectionTable />
      </div>
    </SalesProjectionFiltersProvider>
  );
}
