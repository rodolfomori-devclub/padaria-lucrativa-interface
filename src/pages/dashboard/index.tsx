import { useState } from "react";
import { useDashboardData } from "~/hooks/dashboard/useDashboardData";
import type { DashboardFilters } from "~/types/dashboard";
import { DashboardFilters as DashboardFiltersComponent } from "./components/DashboardFilters";
import { FinancialIndicators } from "./components/FinancialIndicators";
import { NetResultIndicator } from "./components/NetResultIndicator";
import { PurchasesIndicators } from "./components/PurchasesIndicators";
import { SalesIndicators } from "./components/SalesIndicators";
import { CMVIndicatorCard } from "./components/CMVIndicatorCard";

export function DashboardPage() {
  // Dashboard filters state
  const [filters, setFilters] = useState<DashboardFilters>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  // Fetch dashboard data
  const { dashboardData, isLoading, error } = useDashboardData(filters);

  const handleFiltersChange = (newFilters: Partial<DashboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base">Resultado Previsto</h1>
        <p className="text-gray-600 mt-2">
          Visão geral do desempenho da padaria
        </p>
      </div>

      <DashboardFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      {!!error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <h3 className="text-red-800 font-medium">Erro ao carregar dados</h3>
          <p className="text-red-600 text-sm mt-1">
            Não foi possível carregar os dados do dashboard. Tente novamente.
          </p>
        </div>
      )}

      {dashboardData ? (
        <>
          <div className="space-y-4 mb-5">
            <SalesIndicators
              salesData={dashboardData.salesIndicators}
              isLoading={isLoading}
            />
            <PurchasesIndicators
              purchasesData={dashboardData.purchasesIndicators}
              isLoading={isLoading}
            />
          </div>

          <FinancialIndicators
            financialData={dashboardData.financialIndicators}
            isLoading={isLoading}
          />

          <CMVIndicatorCard
            cmvData={dashboardData.financialIndicators.cmv}
            isLoading={isLoading}
          />

          <NetResultIndicator
            netResult={dashboardData.netResult}
            isLoading={isLoading}
          />
        </>
      ) : (
        !error && (
          <>
            <SalesIndicators
              salesData={{
                dailyAverage: 0,
                monthlyForecast: 0,
                actualSales: 0,
                salesDays: 0,
              }}
              isLoading={true}
            />
            <FinancialIndicators
              financialData={{
                fixedExpenses: { value: 0, percentage: 0 },
                variableExpenses: { value: 0, percentage: 0 },
                personnelExpenses: { value: 0, percentage: 0 },
                monthlyPurchases: { value: 0, percentage: 0 },
                cardCosts: { value: 0, percentage: 0 },
                total: { value: 0, percentage: 0 },
              }}
              isLoading={true}
            />
            <NetResultIndicator
              netResult={{
                value: 0,
                margin: 0,
              }}
              isLoading={true}
            />
          </>
        )
      )}
    </div>
  );
}
