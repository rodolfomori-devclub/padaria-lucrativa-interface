import { Calculator, DollarSign, Target, TrendingUp } from "lucide-react";
import { IndicatorCard } from "~/pages/dashboard/components/IndicatorCard";
import type { ProfitsIndicatorsProps } from "~/types/mix-margens";
import { formatCurrency, formatPercentage } from "~/utils/formaters";

export function ProfitsIndicators({
  profitsData,
  isLoading = false,
}: ProfitsIndicatorsProps) {
  const realNetProfitColor =
    profitsData.realNetProfit.percentage >= 20
      ? "text-green-600"
      : profitsData.realNetProfit.percentage === 0
      ? "text-gray-600"
      : "text-red-600";

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Previsões de Vendas e Lucros
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Valores de vendas e lucros baseados na contribuição das famílias e
        análise financeira
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IndicatorCard
          title="Previsão de Vendas Bruta"
          value={formatCurrency(profitsData.forecastSales)}
          subtitle={`${formatPercentage(
            profitsData.forecastSales
          )}% da previsão de vendas`}
          icon={DollarSign}
          isLoading={isLoading}
          isMixMargens
        />
        <IndicatorCard
          title="Previsão de Lucro Bruto"
          value={formatCurrency(profitsData.profitForecast.value)}
          subtitle={`${formatPercentage(
            profitsData.forecastSales > 0
              ? profitsData.profitForecast.percentage
              : 0
          )}% da previsão de vendas`}
          icon={TrendingUp}
          isLoading={isLoading}
          isMixMargens
        />
        <IndicatorCard
          title="Lucro Líquido Real"
          value={formatCurrency(profitsData.realNetProfit.value)}
          subtitle={`${formatPercentage(
            profitsData.forecastSales > 0
              ? profitsData.realNetProfit.percentage
              : 0
          )}% da previsão de vendas`}
          color={realNetProfitColor}
          icon={Target}
          isLoading={isLoading}
          isMixMargens
        />
        <IndicatorCard
          title="Previsão de Lucro Líquido"
          value={formatCurrency(profitsData.forecastNetProfit.value)}
          subtitle={`${profitsData.forecastNetProfit.percentage}% da previsão de vendas`}
          color="text-purple-600"
          icon={Calculator}
          isLoading={isLoading}
          isMixMargens
        />
      </div>
    </div>
  );
}
