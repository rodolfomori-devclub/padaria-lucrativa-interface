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
import type { EmployeeExpense } from '~/types/employee-expense'
import { formatCurrency, formatMonthYear } from '~/utils/formaters'
import { DeleteEmployeeExpenseDialog } from './DeleteEmployeeExpenseDialog'
import { EditEmployeeExpenseDialog } from './EditEmployeeExpenseDialog'

interface EmployeeExpensesTableProps {
    employeeExpenses: EmployeeExpense[]
    isLoading?: boolean
}

export function EmployeeExpensesTable({ employeeExpenses, isLoading }: EmployeeExpensesTableProps) {

    if (isLoading) {
        return <TableSkeleton />
    }

    if (employeeExpenses.length === 0) {
        return (
            <TableEmptyState
                title="Nenhuma despesa com pessoal cadastrada"
                description="Comece cadastrando a primeira despesa com pessoal clicando no botão 'Nova Despesa'."
            />
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Salário Base</TableHead>
                        <TableHead>Horas Extras</TableHead>
                        <TableHead>Salário Bruto</TableHead>
                        <TableHead>Benefícios</TableHead>
                        <TableHead>Salário Líquido</TableHead>
                        <TableHead>Data de Criação</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employeeExpenses.map((expense) => {
                        const benefits = (expense.transport || 0) + (expense.meal || 0) + expense.fgts
                        return (
                            <TableRow key={expense.id}>
                                <TableCell className="font-medium">{expense.name}</TableCell>
                                <TableCell>{expense.job?.name || 'N/A'}</TableCell>
                                <TableCell>{formatCurrency(expense.baseSalary)}</TableCell>
                                <TableCell>{formatCurrency(expense.extraHours)}</TableCell>
                                <TableCell>{formatCurrency(expense.grossSalary)}</TableCell>
                                <TableCell>{formatCurrency(benefits)}</TableCell>
                                <TableCell className="font-semibold">{formatCurrency(expense.netSalary)}</TableCell>
                                <TableCell>{formatMonthYear(expense.createdAt)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <EditEmployeeExpenseDialog employeeExpense={expense} />
                                        <DeleteEmployeeExpenseDialog employeeExpense={expense} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
} 