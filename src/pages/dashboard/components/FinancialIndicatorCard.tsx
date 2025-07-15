import { cn } from "~/lib/utils";
import type { FinancialIndicatorCardProps } from "~/types/dashboard";
import { formatPercentage, getIndicatorColor } from "~/utils/dashboardCalculators";
import { formatCurrency } from "~/utils/formaters";

export function FinancialIndicatorCard({
    label,
    value,
    percentage,
    color,
    isTotal = false,
    isLoading = false,
}: FinancialIndicatorCardProps) {
    if (isLoading) {
        return (
            <div className={cn(
                "bg-white rounded-lg shadow-sm border p-4 animate-pulse",
                isTotal ? "border-gray-300 shadow-md" : "border-gray-200"
            )}>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-20 bg-gray-200 rounded mb-1" />
                <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>
        );
    }

    const percentageColor = color || getIndicatorColor(percentage);

    return (
        <div className={cn(
            "bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow",
            isTotal ? "border-gray-300 shadow-md bg-gray-50" : "border-gray-200"
        )}>
            <h4 className={cn(
                "text-sm font-medium mb-2",
                isTotal ? "text-gray-800 font-semibold" : "text-gray-600"
            )}>
                {label}
            </h4>
            <div className="flex items-center justify-between">
                <p className={cn(
                    "text-lg font-bold mb-1",
                    isTotal ? "text-gray-900" : percentageColor
                )}>
                    {formatCurrency(value)}
                </p>
                <p className={cn(
                    "text-lg font-medium",
                    percentageColor
                )}>
                    {formatPercentage(percentage)}
                </p>
            </div>
        </div>
    );
} 