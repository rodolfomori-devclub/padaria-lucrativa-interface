import type { BaseDateFilters } from "./filters";

export type DashboardFilters = BaseDateFilters;

export interface FinancialIndicator {
    value: number;
    percentage: number;
}

export interface SalesIndicators {
    dailyAverage: number;
    monthlyForecast: number;
    actualSales: number;
    salesDays: number;
}

export interface PurchasesIndicators {
    dailyAverage: number;
    monthlyForecast: number;
    actualPurchases: number;
    purchasesDays: number;
}

export interface FinancialIndicators {
    fixedExpenses: FinancialIndicator;
    variableExpenses: FinancialIndicator;
    personnelExpenses: FinancialIndicator;
    monthlyPurchases: FinancialIndicator;
    cardCosts: FinancialIndicator;
    total: FinancialIndicator;
}

export interface NetResult {
    value: number;
    margin: number;
}

export interface DashboardData {
    salesIndicators: SalesIndicators;
    financialIndicators: FinancialIndicators;
    netResult: NetResult;
}

// Component props interfaces
export interface IndicatorCardProps {
    title: string;
    value: string;
    subtitle?: string;
    color?: string;
    isLoading?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface FinancialIndicatorCardProps {
    label: string;
    value: number;
    percentage: number;
    color?: string;
    isTotal?: boolean;
    isLoading?: boolean;
}

export interface SalesIndicatorsProps {
    salesData: SalesIndicators;
    isLoading?: boolean;
}

export interface PurchasesIndicatorsProps {
    purchasesData: PurchasesIndicators;
    isLoading?: boolean;
}

export interface FinancialIndicatorsProps {
    financialData: FinancialIndicators;
    isLoading?: boolean;
}

export interface NetResultIndicatorProps {
    netResult: NetResult;
    isLoading?: boolean;
}

export interface DashboardFiltersProps {
    filters: DashboardFilters;
    onFiltersChange: (filters: Partial<DashboardFilters>) => void;
} 