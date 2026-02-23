import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { boletoService } from "~/services/boletos";
import { BOLETOS_QUERY_KEY } from "./useCreateBoletoMutation";

interface DeleteBillResponse {
  deletedCount: number;
  templateDeactivated: boolean;
}

export const useDeleteBoletoMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<DeleteBillResponse, AxiosError, string>({
    mutationFn: (id: string) => boletoService.delete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: BOLETOS_QUERY_KEY });

      if (data.deletedCount > 1) {
        toast.success(
          `Boleto excluído com sucesso (${data.deletedCount} ocorrências futuras excluídas)`,
        );
      } else {
        toast.success("Boleto excluído com sucesso!");
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          (error.response?.data as { message: string }).message ||
            "Erro ao excluir boleto",
        );
      } else {
        toast.error("Erro ao excluir boleto");
      }
    },
  });

  return {
    deleteBoleto: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
