import { useQuery } from "@tanstack/react-query";
import { dashboardService, type DashboardFilters } from "~/services/dashboard";
import type { DashboardData } from "~/utils/dashboardCalculators";

export const DASHBOARD_QUERY_KEY = ["dashboard"];

export const useDashboardData = (filters?: DashboardFilters) => {
    const queryKey = filters ? [DASHBOARD_QUERY_KEY[0], filters] : DASHBOARD_QUERY_KEY;

    const {
        data: dashboardData,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<DashboardData> => {
            const response = await dashboardService.getData(filters);
            return response;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: (failureCount, error: unknown) => {
            // Don't retry on authentication errors
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response: { status: number } };
                if (axiosError.response?.status === 401) return false;
            }
            return failureCount < 3;
        },
    });

    return {
        dashboardData,
        isLoading,
        error,
        refetch,
    };
}; 