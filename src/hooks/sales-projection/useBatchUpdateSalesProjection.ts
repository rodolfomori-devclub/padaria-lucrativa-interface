import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { SalesProjectionFormData } from "~/schema/sales-projection";
import { salesProjectionService } from "~/services/sales-projection";

export const useBatchUpdateSalesProjection = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: SalesProjectionFormData) =>
            salesProjectionService.batchUpdate(data),
        onSuccess: () => {
            // Invalidate sales and purchases queries to refetch data
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            queryClient.invalidateQueries({ queryKey: ["purchases"] });
            toast.success("Valores atualizados com sucesso");
        },
        onError: (error) => {
            console.error("Batch update failed:", error);
        },
    });

    return {
        batchUpdate: mutation.mutate,
        batchUpdateAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        data: mutation.data,
    };
}; 