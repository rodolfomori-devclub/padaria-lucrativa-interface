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
import type { Input } from '~/types/input'
import { UNIT_MEASURE_LABELS } from '~/types/input'
import { formatCurrency, formatNumber } from '~/utils/formaters'
import { DeleteInputDialog } from './DeleteInputDialog'
import { EditInputDialog } from './EditInputDialog'

interface InputsTableProps {
    inputs: Input[]
    isLoading?: boolean
}

export function InputsTable({ inputs, isLoading }: InputsTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (inputs.length === 0) {
        return <TableEmptyState title="Nenhum insumo cadastrado" description="Comece cadastrando o primeiro insumo clicando no botão 'Novo Insumo'." />
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead>Fator de Conversão</TableHead>
                        <TableHead>Custo Unitário</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inputs.map((input) => (
                        <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell>{formatCurrency(input.price)}</TableCell>
                            <TableCell>{formatNumber(input.packagingQuantity)}</TableCell>
                            <TableCell>{UNIT_MEASURE_LABELS[input.unitMeasure]}</TableCell>
                            <TableCell>{formatNumber(input.conversionFactor)}</TableCell>
                            <TableCell className="font-medium">{formatCurrency(input.unitCost)}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <EditInputDialog input={input} />
                                    <DeleteInputDialog input={input} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 