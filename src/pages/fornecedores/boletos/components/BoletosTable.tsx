import { Check } from 'lucide-react'
import { TableEmptyState } from '~/components/Table/EmptyState'
import { TableSkeleton } from '~/components/Table/Skeleton'
import { Button } from '~/components/ui'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'
import { usePayBoleto } from '~/hooks/boletos/usePayBoleto'
import type { Boleto } from '~/types/boleto'
import { formatCurrency, formatDateDDMMYYYY } from '~/utils/formaters'
import { DeleteBoletoDialog } from './DeleteBoletoDialog'
import { EditBoletoDialog } from './EditBoletoDialog'

interface BoletosTableProps {
    boletos: Boleto[]
    isLoading?: boolean
}

export function BoletosTable({ boletos, isLoading }: BoletosTableProps) {
    const { mutate: payBoleto } = usePayBoleto()

    if (isLoading) {
        return <TableSkeleton />
    }

    if (boletos.length === 0) {
        return <TableEmptyState title="Nenhum boleto cadastrado" description="Comece cadastrando o primeiro boleto clicando no botão 'Novo Boleto'." />
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data de Pagamento</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {boletos.map((boleto) => (
                        <TableRow key={boleto.id}>
                            <TableCell className="font-medium">{boleto.supplier.name}</TableCell>
                            <TableCell>{formatCurrency(boleto.value)}</TableCell>
                            <TableCell>
                                {formatDateDDMMYYYY(boleto.dueDate)}
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${boleto.paid
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {boleto.paid ? 'Pago' : 'Pendente'}
                                </span>
                            </TableCell>
                            <TableCell>
                                {formatDateDDMMYYYY(boleto.paymentDate)}
                            </TableCell>
                            <TableCell className="max-w-52 truncate" title={boleto.observations || '-'}>
                                {boleto.observations || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {!boleto.paid && (
                                        <Button
                                            variant="outline"
                                            aria-label="Pagar boleto"
                                            title="Pagar boleto"
                                            className="text-green-500 hover:text-green-600 hover:bg-green-50"
                                            size="sm"
                                            onClick={() => payBoleto(boleto.id)}
                                        >
                                            <Check className="size-4" />
                                        </Button>
                                    )}
                                    <EditBoletoDialog boleto={boleto} />
                                    <DeleteBoletoDialog boleto={boleto} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 