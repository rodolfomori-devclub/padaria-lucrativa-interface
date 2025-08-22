import { useState } from "react";
import { BaseFilters } from "~/components/ui/base-filters";
import { useMixMargensData } from "~/hooks/mix-margens/useMixMargensData";
import type { MixMargensFilters } from "~/types/mix-margens";
import { ExpensesIndicators } from "./components/ExpensesIndicators";
import { ProfitsIndicators } from "./components/ProfitsIndicators";

export function MixDeMargensProjeção() {
  // Mix margens filters state
  const [filters, setFilters] = useState<MixMargensFilters>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  // Fetch mix margens data
  const { mixMargensData, isLoading, error, dataUpdatedAt } =
    useMixMargensData(filters);

  const handleFiltersChange = (newFilters: Partial<MixMargensFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mix de Margens - Projeção
            </h1>
            <p className="text-gray-600 mt-2">
              Análise detalhada de despesas e previsões de lucro
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-gray-600">
              Última atualização: {dataUpdatedAt?.toString()}
            </p>
          </div>
        </div>
      </div>

      <BaseFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        className="mb-8"
      />

      {!!error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <h3 className="text-red-800 font-medium">Erro ao carregar dados</h3>
          <p className="text-red-600 text-sm mt-1">
            Não foi possível carregar os dados de mix de margens. Tente
            novamente.
          </p>
        </div>
      )}

      {mixMargensData ? (
        <>
          <ExpensesIndicators
            expensesData={{
              forecastFixedExpenses: mixMargensData.forecastFixedExpenses,
              forecastNonFixedExpenses: mixMargensData.forecastNonFixedExpenses,
              forecastEmployeeExpenses: mixMargensData.forecastEmployeeExpenses,
              breakingValue: mixMargensData.breakingValue,
              packagingValue: mixMargensData.packagingValue,
              impostos: mixMargensData.impostos,
              lossControls: mixMargensData.lossControls,
              totalExpenses: mixMargensData.totalExpenses,
            }}
            isLoading={isLoading}
          />

          <ProfitsIndicators
            profitsData={{
              forecastSales: mixMargensData.forecastSales,
              profitForecast: mixMargensData.profitForecast,
              realNetProfit: mixMargensData.realNetProfit,
              forecastNetProfit: mixMargensData.forecastNetProfit,
            }}
            isLoading={isLoading}
          />
        </>
      ) : (
        !error && (
          <>
            <ExpensesIndicators
              expensesData={{
                forecastFixedExpenses: { value: 0, percentage: 0 },
                forecastNonFixedExpenses: { value: 0, percentage: 0 },
                forecastEmployeeExpenses: { value: 0, percentage: 0 },
                breakingValue: { value: 0, percentage: 0 },
                packagingValue: { value: 0, percentage: 0 },
                impostos: { value: 0, percentage: 0 },
                lossControls: { value: 0, percentage: 0 },
                totalExpenses: { value: 0, percentage: 0 },
              }}
              isLoading={true}
            />
            <ProfitsIndicators
              profitsData={{
                forecastSales: 0,
                profitForecast: { value: 0, percentage: 0 },
                realNetProfit: { value: 0, percentage: 0 },
                forecastNetProfit: { value: 0, percentage: 0 },
              }}
              isLoading={true}
            />
          </>
        )
      )}
    </div>
  );
}
