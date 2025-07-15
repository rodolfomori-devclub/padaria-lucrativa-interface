import { DollarSign, TrendingUp } from "lucide-react";
import type { SalesIndicatorsProps } from "~/types/dashboard";
import { getDaysInMonth, getSalesStatus } from "~/utils/dashboardCalculators";
import { formatCurrency } from "~/utils/formaters";
import { IndicatorCard } from "./IndicatorCard";

export function SalesIndicators({ salesData, isLoading = false }: SalesIndicatorsProps) {
    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Indicadores de Vendas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IndicatorCard
                    title="Média Venda Diária"
                    value={formatCurrency(salesData.dailyAverage)}
                    subtitle={getSalesStatus(salesData.salesDays, daysInMonth)}
                    icon={DollarSign}
                    isLoading={isLoading}
                />
                <IndicatorCard
                    title="Previsão Mensal"
                    value={formatCurrency(salesData.monthlyForecast)}
                    subtitle={
                        salesData.salesDays === daysInMonth
                            ? "Total real do mês"
                            : "Projeção baseada na média"
                    }
                    color="text-highlight"
                    icon={TrendingUp}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
} 