import type { BaseDateFilters } from "./filters";

export type MixMargensFilters = BaseDateFilters;

export interface MixMargensIndicator {
  value: number;
  percentage: number;
}

export interface MixMargensData {
  forecastSales: number;
  forecastFixedExpenses: MixMargensIndicator;
  forecastNonFixedExpenses: MixMargensIndicator;
  forecastEmployeeExpenses: MixMargensIndicator;
  breakingValue: MixMargensIndicator;
  packagingValue: MixMargensIndicator;
  impostos: MixMargensIndicator;
  lossControls: MixMargensIndicator;
  totalExpenses: MixMargensIndicator;
  profitForecast: MixMargensIndicator;
  realNetProfit: MixMargensIndicator;
  forecastNetProfit: MixMargensIndicator;
}

// Component props interfaces
export interface ExpensesIndicatorsProps {
  expensesData: {
    forecastFixedExpenses: MixMargensIndicator;
    forecastNonFixedExpenses: MixMargensIndicator;
    forecastEmployeeExpenses: MixMargensIndicator;
    breakingValue: MixMargensIndicator;
    packagingValue: MixMargensIndicator;
    impostos: MixMargensIndicator;
    lossControls: MixMargensIndicator;
    totalExpenses: MixMargensIndicator;
  };
  isLoading?: boolean;
}

export interface ProfitsIndicatorsProps {
  profitsData: {
    forecastSales: number;
    profitForecast: MixMargensIndicator;
    realNetProfit: MixMargensIndicator;
    forecastNetProfit: MixMargensIndicator;
  };
  isLoading?: boolean;
}

export interface MixMargensFiltersProps {
  filters: MixMargensFilters;
  onFiltersChange: (filters: Partial<MixMargensFilters>) => void;
}
