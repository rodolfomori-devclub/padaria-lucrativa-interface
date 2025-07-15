import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { jobService } from "~/services/jobs";
import type { Job } from "~/types/job";
import { JOBS_QUERY_KEY } from "./useCreateJobMutation";

export function useDeleteJobMutation() {
    const { mutateAsync: deleteJob, isPending } = useMutation({
        mutationFn: (id: string) => jobService.delete(id),
        onMutate: async (id) => {
            const previousJobs = queryClient.getQueryData<Job[]>(JOBS_QUERY_KEY);

            queryClient.setQueryData<Job[]>(JOBS_QUERY_KEY, (old) =>
                old?.filter(job => job.id !== id) ?? []
            );

            return { previousJobs };
        },
        onSuccess: () => {
            toast.success('Cargo excluído com sucesso');
        },
        onError: (_error, _variables, context) => {
            if (context?.previousJobs) {
                queryClient.setQueryData(JOBS_QUERY_KEY, context.previousJobs);
            }
            toast.error('Erro ao excluir cargo');
        }
    });

    return { deleteJob, isPending };
} 