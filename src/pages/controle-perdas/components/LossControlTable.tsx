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
import type { LossControl } from '~/types/loss-control'
import { formatCurrency, formatNumber } from '~/utils/formaters'
import { DeleteLossControlDialog } from './DeleteLossControlDialog'
import { EditLossControlDialog } from './EditLossControlDialog'

interface LossControlTableProps {
    lossControls: LossControl[]
    isLoading?: boolean
}

export function LossControlTable({ lossControls, isLoading }: LossControlTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (lossControls.length === 0) {
        return <TableEmptyState title="Nenhuma perda registrada" description="Comece registrando a primeira perda clicando no botão 'Nova Perda'." />
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço Unitário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lossControls.map((lossControl) => (
                        <TableRow key={lossControl.id}>
                            <TableCell className="font-medium">{lossControl.productName}</TableCell>
                            <TableCell>{formatCurrency(lossControl.unitPrice)}</TableCell>
                            <TableCell>{formatNumber(lossControl.quantity)}</TableCell>
                            <TableCell className="font-medium">{formatCurrency(lossControl.totalValue)}</TableCell>
                            <TableCell>
                                {new Date(lossControl.day).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="max-w-60 truncate" title={lossControl.observations || '-'}>
                                {lossControl.observations || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <EditLossControlDialog lossControl={lossControl} />
                                    <DeleteLossControlDialog lossControl={lossControl} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 