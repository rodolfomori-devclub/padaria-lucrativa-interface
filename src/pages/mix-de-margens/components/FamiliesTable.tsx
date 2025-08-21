import { TableEmptyState } from "~/components/Table/EmptyState";
import { TableSkeleton } from "~/components/Table/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Family } from "~/types/family";
import { formatPercentage } from "~/utils/formaters";
import { DeleteFamilyDialog } from "./DeleteFamilyDialog";
import { EditFamilyDialog } from "./EditFamilyDialog";

interface FamiliesTableProps {
  families: Family[];
  isLoading?: boolean;
}

export const FamiliesTable = ({ families, isLoading }: FamiliesTableProps) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (families.length === 0) {
    return (
      <TableEmptyState
        title="Nenhuma família encontrada"
        description='Clique em "Nova Família" para criar sua primeira família'
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Participação no Lucro</TableHead>
            <TableHead>Margem de Lucro</TableHead>
            <TableHead>Coeficiente</TableHead>
            <TableHead>Contribuição</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {families.map((family) => (
            <TableRow key={family.id}>
              <TableCell className="font-medium">{family.name}</TableCell>
              <TableCell>
                {formatPercentage(family.profitParticipation)}%
              </TableCell>
              <TableCell className="font-medium">
                {formatPercentage(family.profitMargin)}%
              </TableCell>
              <TableCell>{family.coefficient.toFixed(2)}x</TableCell>
              <TableCell className="font-medium">
                {formatPercentage(family.contribution)}%
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-center gap-2">
                  <EditFamilyDialog family={family} />
                  <DeleteFamilyDialog family={family} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
