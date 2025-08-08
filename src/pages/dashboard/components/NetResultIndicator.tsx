import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { NetResultIndicatorProps } from "~/types/dashboard";
import { getNetResultStatus, getResultColor } from "~/utils/dashboardCalculators";
import { formatCurrency } from "~/utils/formaters";
import { IndicatorCard } from "./IndicatorCard";

export function NetResultIndicator({ netResult, isLoading = false }: NetResultIndicatorProps) {
    const getIcon = (value: number) => {
        if (value > 0) return TrendingUp;
        if (value < 0) return TrendingDown;
        return Minus;
    };

    const getStatusColor = (value: number) => {
        if (value > 0) return "text-green-600";
        if (value < 0) return "text-red-600";
        return "text-gray-600";
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resultado Projetado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IndicatorCard
                    title="Resultado Previsto"
                    value={formatCurrency(netResult.value)}
                    subtitle={getNetResultStatus(netResult.value, netResult.margin)}
                    color={getResultColor(netResult.value)}
                    icon={getIcon(netResult.value)}
                    isLoading={isLoading}
                />
                <IndicatorCard
                    title="Margem de Lucro"
                    value={`${netResult.margin.toFixed(1)}%`}
                    subtitle={
                        netResult.value > 0
                            ? "Margem positiva"
                            : netResult.value < 0
                                ? "Resultado negativo"
                                : "Ponto de equilíbrio"
                    }
                    color={getStatusColor(netResult.value)}
                    icon={getIcon(netResult.value)}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
} 