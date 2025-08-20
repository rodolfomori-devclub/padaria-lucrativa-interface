import type { FinancialIndicatorsProps } from "~/types/dashboard";
import { FinancialIndicatorCard } from "./FinancialIndicatorCard";

export function FinancialIndicators({
  financialData,
  isLoading = false,
}: FinancialIndicatorsProps) {
  const indicators = [
    {
      label: "Despesas Fixas",
      data: financialData.fixedExpenses,
      color: "text-blue-600",
      isTotal: false,
    },
    {
      label: "Despesas Variáveis",
      data: financialData.variableExpenses,
      color: "text-blue-600",
      isTotal: false,
    },
    {
      label: "Despesas com Pessoal",
      data: financialData.personnelExpenses,
      color: "text-blue-600",
      isTotal: false,
    },
    {
      label: "Compra Acumulada do Mês",
      data: financialData.monthlyPurchases,
      color: "text-purple-600",
      isTotal: false,
    },
    {
      label: "Custos com Cartão",
      data: financialData.cardCosts,
      color: "text-indigo-600",
      isTotal: false,
    },
    {
      label: "Total",
      data: financialData.total,
      color: "text-gray-900",
      isTotal: true,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Indicadores Financeiros
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Valores e percentuais calculados com base na previsão mensal
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicators.map((indicator) => {
          const isCMV = indicator.label === "Compra Acumulada do Mês";
          const isAboveAverage = isCMV && indicator.data.percentage > 40;

          return (
            <FinancialIndicatorCard
              key={indicator.label}
              label={indicator.label}
              value={indicator.data.value}
              percentage={indicator.data.percentage}
              color={isAboveAverage ? "text-red-600" : indicator.color}
              isTotal={indicator.isTotal}
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
