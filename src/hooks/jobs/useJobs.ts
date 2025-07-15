import { useQuery } from '@tanstack/react-query';
import { jobService } from '~/services/jobs';
import type { Job } from '~/types/job';

const JOBS_QUERY_KEY = ['jobs'];

export const useJobs = () => {
    const {
        data: jobs = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: JOBS_QUERY_KEY,
        queryFn: async (): Promise<Job[]> => {
            const response = await jobService.getAll()
            return response
        },
    })

    return {
        jobs,
        isLoading,
        error,
    }
} 