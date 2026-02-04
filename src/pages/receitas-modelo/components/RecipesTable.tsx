import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { TableEmptyState } from "~/components/Table/EmptyState";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ROUTES } from "~/routes/routes";
import { UNIT_MEASURE_LABELS } from "~/types/input";
import type { Recipe } from "~/types/recipe";
import { calculateUnitCost } from "~/utils/calculators";
import { formatCurrency } from "~/utils/formaters";
import { DeleteRecipeDialog } from "./DeleteRecipeDialog";

interface RecipesTableProps {
  recipes: Recipe[];
  coefficient?: number;
}

export const RecipesTable = ({ recipes, coefficient }: RecipesTableProps) => {
  if (recipes.length === 0) {
    return (
      <TableEmptyState
        title="Nenhuma receita encontrada"
        description='Clique em "Nova Receita" para criar sua primeira receita'
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Rendimento</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Custo Unitário</TableHead>
            <TableHead>Preço de Custo</TableHead>
            <TableHead>Preço de Venda Sugerido</TableHead>
            <TableHead>Preço de Venda Praticado</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => {
            const unitCost = calculateUnitCost(recipe.totalCost, recipe.yield);

            return (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.name}</TableCell>
                <TableCell>{recipe.yield}</TableCell>
                <TableCell>{UNIT_MEASURE_LABELS[recipe.unitMeasure]}</TableCell>
                <TableCell>{formatCurrency(unitCost)}</TableCell>
                <TableCell>{formatCurrency(recipe.totalCost)}</TableCell>
                <TableCell>
                  {formatCurrency(unitCost * (coefficient || 4))}
                </TableCell>
                <TableCell>{formatCurrency(recipe.salePrice)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`${ROUTES.RECEITAS_MODELO_EDITAR}/${recipe.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Editar
                      </Button>
                    </Link>
                    <DeleteRecipeDialog recipe={recipe} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
