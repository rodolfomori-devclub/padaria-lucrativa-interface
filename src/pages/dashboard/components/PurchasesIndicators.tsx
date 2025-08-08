import { DollarSign, TrendingUp } from "lucide-react";
import type { PurchasesIndicatorsProps } from "~/types/dashboard";
import { getDaysInMonth, getSalesStatus } from "~/utils/dashboardCalculators";
import { formatCurrency } from "~/utils/formaters";
import { IndicatorCard } from "./IndicatorCard";

export function PurchasesIndicators({ purchasesData, isLoading = false }: PurchasesIndicatorsProps) {
    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IndicatorCard
                title="Média de Compras Diária"
                value={formatCurrency(purchasesData.dailyAverage)}
                subtitle={getSalesStatus(purchasesData.purchasesDays, daysInMonth)}
                icon={DollarSign}
                isLoading={isLoading}
            />
            <IndicatorCard
                title="Previsão de Compras Mensal"
                value={formatCurrency(purchasesData.monthlyForecast)}
                subtitle={
                    purchasesData.purchasesDays === daysInMonth
                        ? "Total real do mês"
                        : "Projeção baseada na média"
                }
                color="text-orange-400"
                icon={TrendingUp}
                isLoading={isLoading}
            />
        </div>
    );
} 