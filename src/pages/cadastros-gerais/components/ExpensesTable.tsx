import { Repeat } from "lucide-react";
import { TableEmptyState } from "~/components/Table/EmptyState";
import { TableSkeleton } from "~/components/Table/Skeleton";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Expense } from "~/types/expense";
import { formatCurrency, formatMonthYear } from "~/utils/formaters";
import { DeleteExpenseDialog } from "./DeleteExpenseDialog";
import { EditExpenseDialog } from "./EditExpenseDialog";

interface ExpensesTableProps {
  expenses: Expense[];
  isLoading?: boolean;
  isFixed: boolean;
}

export function ExpensesTable({
  expenses,
  isLoading,
  isFixed,
}: ExpensesTableProps) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (expenses.length === 0) {
    const typeText = isFixed ? "fixas" : "variáveis";
    const buttonText = isFixed ? "Nova Despesa Fixa" : "Nova Despesa Variável";
    return (
      <TableEmptyState
        title={`Nenhuma despesa ${typeText} cadastrada`}
        description={`Comece cadastrando a primeira despesa ${typeText} clicando no botão '${buttonText}'.`}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Mês/Ano</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {expense.recurringTemplateId && (
                    <Repeat
                      className="h-4 w-4 text-blue-500"
                      aria-label="Despesa recorrente"
                    />
                  )}
                  {expense.name}
                </div>
              </TableCell>
              <TableCell>{formatCurrency(expense.value)}</TableCell>
              <TableCell>{formatMonthYear(expense.createdAt)}</TableCell>
              <TableCell>
                {expense.recurringTemplateId ? (
                  <Badge className="bg-blue-500">Recorrente</Badge>
                ) : (
                  <Badge variant="outline">Pontual</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-center gap-2">
                  <EditExpenseDialog expense={expense} />
                  <DeleteExpenseDialog expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
