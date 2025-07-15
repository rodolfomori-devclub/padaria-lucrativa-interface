/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { SalesProjectionFilters } from "~/types/sales-projection";

// Types for filter context
export interface FilterContextValue<T> {
  filters: T;
  updateFilters: (updates: Partial<T>) => void;
  resetFilters: () => void;
  setFilters: (filters: T) => void;
}

// Sales Projection filters context
const SalesProjectionFiltersContext =
  createContext<FilterContextValue<SalesProjectionFilters> | null>(null);

// Sales Projection filters provider component
export interface SalesProjectionFiltersProviderProps {
  children: React.ReactNode;
  initialFilters?: Partial<SalesProjectionFilters>;
}

export function SalesProjectionFiltersProvider({
  children,
  initialFilters = {},
}: SalesProjectionFiltersProviderProps) {
  const defaultFilters: SalesProjectionFilters = useMemo(
    () => ({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      ...initialFilters,
    }),
    [initialFilters]
  );

  const [filters, setFiltersState] =
    useState<SalesProjectionFilters>(defaultFilters);

  const updateFilters = useCallback(
    (updates: Partial<SalesProjectionFilters>) => {
      setFiltersState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, [defaultFilters]);

  const setFilters = useCallback((newFilters: SalesProjectionFilters) => {
    setFiltersState(newFilters);
  }, []);

  const value: FilterContextValue<SalesProjectionFilters> = {
    filters,
    updateFilters,
    resetFilters,
    setFilters,
  };

  return (
    <SalesProjectionFiltersContext.Provider value={value}>
      {children}
    </SalesProjectionFiltersContext.Provider>
  );
}

// Hook to use sales projection filters
export function useSalesProjectionFilters() {
  const context = useContext(SalesProjectionFiltersContext);

  if (!context) {
    throw new Error(
      "useSalesProjectionFilters must be used within a SalesProjectionFiltersProvider"
    );
  }

  return context;
}
