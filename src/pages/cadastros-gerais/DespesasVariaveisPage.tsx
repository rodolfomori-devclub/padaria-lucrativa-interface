import { Pagination } from "~/components/Pagination";
import { TutorialButton } from "~/components/TutorialButton";
import { DESPESAS_VIDEOS } from "~/constants/tutorialVideos";
import { useExpenses } from "~/hooks/expenses/useExpenses";
import { ExpenseFiltersProvider, useExpenseFilters } from "~/hooks/filters";
import { ExpensesTable, Filters, NewExpenseDialog } from "./components";

const tutorial = DESPESAS_VIDEOS.find((v) => v.id === "despesas-variaveis")!;

function DespesasVariaveisContent() {
  const { filters, updateFilters } = useExpenseFilters();
  const { expenses, meta, isLoading } = useExpenses({
    ...filters,
    page: filters.page || 1,
    limit: filters.limit || 15,
  });

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Despesas Variáveis
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie as despesas variáveis da padaria
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TutorialButton
              videoUrl={tutorial.videoUrl}
              title={tutorial.title}
              description={tutorial.description}
            />
            <NewExpenseDialog isFixed={false} />
          </div>
        </div>
      </div>

      <Filters />

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <ExpensesTable
          expenses={expenses}
          isLoading={isLoading}
          isFixed={false}
        />
        {meta && meta.totalPages > 1 && (
          <Pagination meta={meta} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export function DespesasVariaveisPage() {
  return (
    <ExpenseFiltersProvider isFixed={false}>
      <DespesasVariaveisContent />
    </ExpenseFiltersProvider>
  );
}
