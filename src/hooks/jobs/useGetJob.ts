import { useQuery } from '@tanstack/react-query'
import { jobService } from '~/services/jobs'
import type { Job } from '~/types/job'
import { JOBS_QUERY_KEY } from './useCreateJobMutation'

export const useGetJob = (id: string) => {
    const {
        data: job,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...JOBS_QUERY_KEY, id],
        queryFn: async (): Promise<Job> => {
            const response = await jobService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        job,
        isLoading,
        error,
    }
} 