import { api } from "~/lib/axios";
import type { SalesProjectionFormData } from "~/schema/sales-projection";

export interface BatchUpdateResponse {
    salesCreated: number;
    salesUpdated: number;
    purchasesCreated: number;
    purchasesUpdated: number;
    message: string;
}

export const batchUpdateSalesProjection = async (
    data: SalesProjectionFormData
): Promise<BatchUpdateResponse> => {
    const response = await api.patch("/sales-projection/batch", data);
    return response.data;
}; 