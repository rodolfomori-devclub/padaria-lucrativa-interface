import { PROJECAO_VENDAS_VIDEOS } from "~/constants/tutorialVideos";
import { SalesProjectionFiltersProvider } from "~/hooks/filters/sales-projection-filters";
import { Filters, SalesProjectionTable } from "./components";
import { TutorialButton } from "~/components/TutorialButton";

const [tutorial] = PROJECAO_VENDAS_VIDEOS;

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
            videoUrl={tutorial.videoUrl}
            title={tutorial.title}
            description={tutorial.description}
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
