import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { jobService } from "~/services/jobs";
import type { Job, UpdateJobData } from "~/types/job";
import { JOBS_QUERY_KEY } from "./useCreateJobMutation";

interface UpdateJobVariables {
    id: string;
    data: UpdateJobData;
}

export function useUpdateJobMutation() {
    const { mutateAsync: updateJob, isPending } = useMutation({
        mutationFn: async ({ id, data }: UpdateJobVariables) => {
            return await jobService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousJobs = queryClient.getQueryData<Job[]>(JOBS_QUERY_KEY);
            const previousJob = queryClient.getQueryData<Job>([...JOBS_QUERY_KEY, variables.id]);

            // Optimistically update jobs list
            if (previousJobs) {
                queryClient.setQueryData<Job[]>(JOBS_QUERY_KEY, (old) =>
                    old?.map(job =>
                        job.id === variables.id
                            ? { ...job, ...variables.data, updatedAt: new Date() }
                            : job
                    ) ?? []
                );
            }

            // Optimistically update single job if it exists in cache
            if (previousJob) {
                queryClient.setQueryData<Job>([...JOBS_QUERY_KEY, variables.id], {
                    ...previousJob,
                    ...variables.data,
                    updatedAt: new Date()
                });
            }

            return { previousJobs, previousJob };
        },
        onSuccess: (data, variables) => {
            // Update both the list and individual job cache with real data
            queryClient.setQueryData<Job[]>(JOBS_QUERY_KEY, (old) =>
                old?.map(job => job.id === variables.id ? data : job) ?? []
            );

            queryClient.setQueryData<Job>([...JOBS_QUERY_KEY, variables.id], data);

            toast.success('Cargo atualizado com sucesso');
        },
        onError: (_error, variables, context) => {
            // Rollback optimistic updates
            if (context?.previousJobs) {
                queryClient.setQueryData(JOBS_QUERY_KEY, context.previousJobs);
            }
            if (context?.previousJob) {
                queryClient.setQueryData([...JOBS_QUERY_KEY, variables.id], context.previousJob);
            }

            toast.error('Erro ao atualizar cargo');
        }
    });

    return { updateJob, isPending };
} 