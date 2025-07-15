import type { BaseDateFilters } from "./filters";

// Sales interfaces
export interface Sale {
  id: string;
  day: string; // Date string format "YYYY-MM-DD"
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSaleData {
  day: string;
  value: number;
}

export interface UpdateSaleData {
  value?: number;
}

// Purchase interfaces
export interface Purchase {
  id: string;
  day: string; // Date string format "YYYY-MM-DD"
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePurchaseData {
  day: string;
  value: number;
}

export interface UpdatePurchaseData {
  value?: number;
}

// Combined daily data for the table
export interface DayProjection {
  day: string; // Date string format "YYYY-MM-DD"
  dayNumber: number; // Day of month (1-31)
  sale?: Sale;
  purchase?: Purchase;
  salesValue: number;
  purchaseValue: number;
}

// Filters - just a type alias since we only need month/year from BaseDateFilters
export type SalesProjectionFilters = BaseDateFilters;

// Form data for the editable table
export interface SalesProjectionFormData {
  projections: Array<{
    day: string;
    salesValue: number;
    purchaseValue: number;
  }>;
}

export const MONTH_LABELS: Record<number, string> = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};
