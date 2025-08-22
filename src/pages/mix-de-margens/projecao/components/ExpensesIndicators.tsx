import { FinancialIndicatorCard } from "~/pages/dashboard/components/FinancialIndicatorCard";
import type { ExpensesIndicatorsProps } from "~/types/mix-margens";

export function ExpensesIndicators({
  expensesData,
  isLoading = false,
}: ExpensesIndicatorsProps) {
  const indicators = [
    {
      label: "Despesas Fixas (Previsão)",
      data: expensesData.forecastFixedExpenses,
      color: "text-blue-600",
      isTotal: false,
    },
    {
      label: "Despesas Não Fixas (Previsão)",
      data: expensesData.forecastNonFixedExpenses,
      color: "text-blue-600",
      isTotal: false,
    },
    {
      label: "Despesas com Funcionários (Previsão)",
      data: expensesData.forecastEmployeeExpenses,
      color: "text-blue-600",
      isTotal: false,
    },
    {
      label: "Valor de Quebra",
      data: expensesData.breakingValue,
      color: "text-orange-600",
      isTotal: false,
    },
    {
      label: "Valor de Embalagem",
      data: expensesData.packagingValue,
      color: "text-purple-600",
      isTotal: false,
    },
    {
      label: "Impostos",
      data: expensesData.impostos,
      color: "text-red-600",
      isTotal: false,
    },
    {
      label: "Controle de Perdas",
      data: expensesData.lossControls,
      color: "text-yellow-600",
      isTotal: false,
    },
    {
      label: "Total de Despesas (Previsão)",
      data: expensesData.totalExpenses,
      color: "text-gray-900",
      isTotal: true,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Indicadores de Despesas
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Valores e percentuais de despesas calculados com base na previsão mensal
        de vendas
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicators.map((indicator) => (
          <FinancialIndicatorCard
            key={indicator.label}
            label={indicator.label}
            value={indicator.data.value}
            percentage={indicator.data.percentage}
            color={indicator.color}
            isTotal={indicator.isTotal}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
