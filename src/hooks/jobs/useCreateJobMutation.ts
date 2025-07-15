import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { jobService } from "~/services/jobs";
import type { CreateJobData, Job } from "~/types/job";

export const JOBS_QUERY_KEY = ['jobs'];

export function useCreateJobMutation() {
    const { mutateAsync: createJob, isPending } = useMutation({
        mutationFn: (data: CreateJobData) => jobService.create(data),
        onMutate: (variables) => {
            const tempJobId = Math.random().toString();

            const previousJobs = queryClient.getQueryData<Job[]>(JOBS_QUERY_KEY)

            queryClient.setQueryData(JOBS_QUERY_KEY, (old: Job[]) => [...old, {
                ...variables,
                id: tempJobId,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }])

            return { previousJobs, tempJobId }
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData(JOBS_QUERY_KEY, (old: Job[]) =>
                old.map(job => job.id === context?.tempJobId ? data : job)
            )
            toast.success('Cargo criado com sucesso')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(JOBS_QUERY_KEY, context?.previousJobs)
            toast.error('Erro ao criar cargo')
        }
    })

    return { createJob, isPending }
} 