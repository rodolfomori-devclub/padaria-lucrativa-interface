import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { clientService } from "~/services/admin/clientes";

/**
 * Reenvia o e-mail com o link de definicao de senha para um cliente que ja
 * existe na base. Usado para destravar quem comprou e nao recebeu o link.
 */
export function useResendClientAccessMutation() {
    const { mutateAsync: resendAccess, isPending } = useMutation({
        mutationFn: (idOrEmail: string) => clientService.resendAccess(idOrEmail),
        onSuccess: (data) => {
            toast.success(`Link de acesso reenviado para ${data.email}`);
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { message: string })?.message || 'Erro ao reenviar o link de acesso');
        }
    });

    return { resendAccess, isPending };
}
