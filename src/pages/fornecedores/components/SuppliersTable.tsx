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
import type { Supplier } from '~/types/supplier'
import { DeleteSupplierDialog } from './DeleteSupplierDialog'
import { EditSupplierDialog } from './EditSupplierDialog'

interface SuppliersTableProps {
    suppliers: Supplier[]
    isLoading?: boolean
}

export function SuppliersTable({ suppliers, isLoading }: SuppliersTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (suppliers.length === 0) {
        return <TableEmptyState title="Nenhum fornecedor cadastrado" description="Comece cadastrando o primeiro fornecedor clicando no botão 'Novo Fornecedor'." />
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CNPJ/CPF</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell className="font-medium">{supplier.name}</TableCell>
                            <TableCell>{supplier.cnpj}</TableCell>
                            <TableCell>
                                {new Date(supplier.createdAt).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <EditSupplierDialog supplier={supplier} />
                                    <DeleteSupplierDialog supplier={supplier} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 