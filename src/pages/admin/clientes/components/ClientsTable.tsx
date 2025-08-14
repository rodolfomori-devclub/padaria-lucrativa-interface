import { Copy } from 'lucide-react'
import { TableEmptyState } from '~/components/Table/EmptyState'
import { TableSkeleton } from '~/components/Table/Skeleton'
import { Button } from '~/components/ui'
import { Badge } from '~/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'
import { cn } from '~/lib/utils'
import { PlanType } from '~/types/plan'
import type { User } from '~/types/user'
import { handleCopy } from '~/utils/copy'
import { formatDateDDMMYYYY } from '~/utils/formaters'
import { plansTypes } from '~/utils/plans'
import { DeleteClientDialog, EditClientDialog } from '.'

interface ClientsTableProps {
    clients: User[]
    isLoading?: boolean
}

export function ClientsTable({ clients, isLoading }: ClientsTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (clients.length === 0) {
        return <TableEmptyState title="Nenhum cliente cadastrado" description="Comece cadastrando o primeiro cliente clicando no botão 'Novo Cliente'." />
    }

    const handlePlanLabel = (type?: PlanType) => {
        if (!type) return 'N/A'
        const label = plansTypes.find(plan => plan.value === type)?.label
        return label || 'N/A'
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                        <TableHead>Data de Expiração</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell className="flex items-center">
                                {client.email}
                                <Button variant="ghost" size="sm" className="p-1 ml-2" onClick={() => handleCopy({ text: client.email, message: "Email copiado com sucesso" })}>
                                    <Copy className="size-4 text-gray-500" />
                                </Button>
                            </TableCell>
                            <TableCell>{client.phone}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={cn("text-xs",
                                        client.plan?.type === PlanType.PRO && "bg-green-800/80 text-white",
                                        client.plan?.type === PlanType.BASIC && "bg-blue-800/80 text-white"
                                    )}
                                >
                                    {handlePlanLabel(client.plan?.type)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {formatDateDDMMYYYY(client.createdAt)}
                            </TableCell>
                            <TableCell>
                                {client.plan?.expiresAt ? formatDateDDMMYYYY(client.plan.expiresAt) : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <EditClientDialog client={client} />
                                    <DeleteClientDialog client={client} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 