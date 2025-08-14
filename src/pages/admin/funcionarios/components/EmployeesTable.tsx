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
import type { User } from '~/types/user'
import { formatDateDDMMYYYY } from '~/utils/formaters'
import { DeleteEmployeeDialog } from './DeleteEmployeeDialog'
import { EditEmployeeDialog } from './EditEmployeeDialog'

interface EmployeesTableProps {
    employees: User[]
    isLoading?: boolean
}

export function EmployeesTable({ employees, isLoading }: EmployeesTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (employees.length === 0) {
        return <TableEmptyState title="Nenhum funcionário cadastrado" description="Comece cadastrando o primeiro funcionário clicando no botão 'Novo Funcionário'." />
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell>
                                {formatDateDDMMYYYY(employee.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-center gap-2">
                                    <EditEmployeeDialog employee={employee} />
                                    <DeleteEmployeeDialog employee={employee} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 