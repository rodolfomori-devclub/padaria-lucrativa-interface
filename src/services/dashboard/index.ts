import { api } from "~/lib/axios";
import type { DashboardData } from "~/utils/dashboardCalculators";

export interface DashboardFilters {
    month?: number;
    year?: number;
}

export const getDashboardData = async (filters?: DashboardFilters): Promise<DashboardData> => {
    const params = new URLSearchParams();

    if (filters) {
        if (filters.month) params.append("month", filters.month.toString());
        if (filters.year) params.append("year", filters.year.toString());
    }

    const { data } = await api.get(`/dashboard?${params.toString()}`);
    return data;
};

export const dashboardService = {
    getData: getDashboardData,
}; 