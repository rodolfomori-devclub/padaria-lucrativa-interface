import type { CMVIndicator } from "~/types/dashboard";

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
  cmv: CMVIndicator;
}

export interface NetResult {
  value: number;
  margin: number;
}

export interface DashboardData {
  salesIndicators: SalesIndicators;
  purchasesIndicators: PurchasesIndicators;
  financialIndicators: FinancialIndicators;
  netResult: NetResult;
}

// Color calculations for financial indicators
export const getIndicatorColor = (percentage: number): string => {
  if (percentage > 80) return "text-red-600";
  if (percentage > 60) return "text-orange-600";
  if (percentage > 40) return "text-yellow-600";
  return "text-green-600";
};

export const getResultColor = (value: number): string => {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-600";
};

// Format percentage with proper styling
export const formatPercentage = (percentage: number): string => {
  if (!percentage) return "0%";
  return `${percentage.toFixed(1)}%`;
};

// Calculate daily average if needed on frontend
export const calculateDailyAverage = (
  totalSales: number,
  salesDays: number
): number => {
  return salesDays > 0 ? totalSales / salesDays : 0;
};

// Calculate monthly forecast
export const calculateMonthlyForecast = (
  totalSales: number,
  salesDays: number,
  daysInMonth: number
): number => {
  if (salesDays === 0) return 0;

  // If we have all days data, return actual total
  if (salesDays === daysInMonth) {
    return totalSales;
  }

  // Otherwise, project based on average
  const dailyAverage = totalSales / salesDays;
  return dailyAverage * daysInMonth;
};

// Helper to get days in month
export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

// Get status text for sales indicators
export const getSalesStatus = (
  salesDays: number,
  daysInMonth: number
): string => {
  if (salesDays === 0) return "Nenhuma venda registrada";
  if (salesDays === daysInMonth) return "Dados completos do mês";
  return `Baseado em ${salesDays} de ${daysInMonth} dias`;
};

// Get net result status
export const getNetResultStatus = (value: number, margin: number): string => {
  if (value > 0) {
    return `Lucro de ${margin.toFixed(1)}%`;
  } else if (value < 0) {
    return `Prejuízo de ${Math.abs(margin).toFixed(1)}%`;
  }
  return "Ponto de equilíbrio";
};

// Financial indicator priority for layout
export const getIndicatorPriority = (label: string): number => {
  const priorities: Record<string, number> = {
    "Despesas Fixas": 1,
    "Despesas Variáveis": 2,
    "Despesas com Pessoal": 3,
    "Compra do Mês": 4,
    "Custos com Cartão": 5,
    Total: 6,
  };
  return priorities[label] || 999;
};
