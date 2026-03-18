// Base interface for common date-based filtering
export interface BaseDateFilters {
  month?: number;
  year?: number;
  fromDate?: Date;
  toDate?: Date;
  page?: number;
  limit?: number;
}

// Generic filter update function type
export type FilterUpdateFunction<T> = (updates: Partial<T>) => void;
