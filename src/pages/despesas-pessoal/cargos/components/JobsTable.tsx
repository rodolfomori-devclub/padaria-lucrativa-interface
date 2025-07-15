import { TableEmptyState } from '~/components/Table/EmptyState'
import { TableSkeleton } from '~/components/Table/Skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'
import type { Job } from '~/types/job'
import { formatMonthYear } from '~/utils/formaters'
import { DeleteJobDialog } from './DeleteJobDialog'
import { EditJobDialog } from './EditJobDialog'

interface JobsTableProps {
    jobs: Job[]
    isLoading?: boolean
}

export function JobsTable({ jobs, isLoading }: JobsTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (jobs.length === 0) {
        return (
            <TableEmptyState
                title="Nenhum cargo cadastrado"
                description="Comece cadastrando o primeiro cargo clicando no botão 'Novo Cargo'."
            />
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Data de Criação</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.name}</TableCell>
                            <TableCell>{formatMonthYear(job.createdAt)}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-center gap-2">
                                    <EditJobDialog job={job} />
                                    <DeleteJobDialog job={job} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 