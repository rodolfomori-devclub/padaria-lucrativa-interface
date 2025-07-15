import { useJobs } from '~/hooks/jobs/useJobs'
import { JobsTable, NewJobDialog } from './components'

export function CargosPage() {
    const { jobs, isLoading } = useJobs()

    return (
        <div className="p-8 mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Cargos</h1>
                        <p className="text-gray-600 mt-2">Gerencie os cargos da padaria</p>
                    </div>
                    <NewJobDialog />
                </div>
            </div>

            <JobsTable
                jobs={jobs}
                isLoading={isLoading}
            />
        </div>
    )
} 