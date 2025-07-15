import { useMemo } from "react";
import { usePurchases } from "~/hooks/purchases/usePurchases";
import { useSales } from "~/hooks/sales/useSales";
import type {
  DayProjection,
  SalesProjectionFilters,
} from "~/types/sales-projection";
import { useBatchUpdateSalesProjection } from "./useBatchUpdateSalesProjection";

// Helper function to get days in a month
function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

// Helper function to format date as YYYY-MM-DD
function formatDate(year: number, month: number, day: number): string {
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

// Helper function to convert ISO date string to YYYY-MM-DD format
function formatISODateToYMD(isoDate: string): string {
  return isoDate.split('T')[0];
}

export const useSalesProjection = (filters: SalesProjectionFilters) => {
  const {
    sales,
    isLoading: salesLoading,
    error: salesError,
  } = useSales(filters);
  const {
    purchases,
    isLoading: purchasesLoading,
    error: purchasesError,
  } = usePurchases(filters);

  const {
    batchUpdateAsync,
    isPending: isBatchUpdating,
    error: batchUpdateError,
  } = useBatchUpdateSalesProjection();

  // Generate day projections for the selected month
  const dayProjections = useMemo((): DayProjection[] => {
    if (!filters.month || !filters.year) return [];

    const daysInMonth = getDaysInMonth(filters.month, filters.year);
    const projections: DayProjection[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayString = formatDate(filters.year, filters.month, day);

      // Find existing sale and purchase for this day
      // Convert ISO date strings to YYYY-MM-DD format for comparison
      const sale = sales.find((s) => formatISODateToYMD(s.day) === dayString);
      const purchase = purchases.find((p) => formatISODateToYMD(p.day) === dayString);

      projections.push({
        day: dayString,
        dayNumber: day,
        sale,
        purchase,
        salesValue: sale?.value || 0,
        purchaseValue: purchase?.value || 0,
      });
    }

    return projections;
  }, [sales, purchases, filters.month, filters.year]);

  // Helper function to save all changes in a single batch request
  const batchUpdateProjections = async (projections: Array<{
    day: string;
    salesValue: number;
    purchaseValue: number;
  }>) => {
    try {
      await batchUpdateAsync({ projections });
    } catch (error) {
      console.error("Error updating projections:", error);
      throw error;
    }
  };

  const total = dayProjections.reduce((acc, projection) => acc + projection.salesValue, 0) || null
  const totalPurchase = dayProjections.reduce((acc, projection) => acc + projection.purchaseValue, 0) || null

  return {
    // Data
    dayProjections,

    // Loading states
    isLoading: salesLoading || purchasesLoading,
    isSaving: isBatchUpdating,

    // Errors
    error: salesError || purchasesError || batchUpdateError,

    // Actions
    batchUpdateProjections,

    // Totals
    total,
    totalPurchase,
  };
};
