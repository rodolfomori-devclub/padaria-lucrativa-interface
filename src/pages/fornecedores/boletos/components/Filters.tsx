import { BaseFilters, Label } from "~/components/ui"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select"
import { useBoletos } from "~/hooks/boletos/useBoletos"
import { useBoletoFilters } from "~/hooks/filters/boleto-filters"
import { useSuppliers } from "~/hooks/suppliers/useSuppliers"

export function Filters() {
    const { filters, updateFilters } = useBoletoFilters()
    const { allSuppliers } = useSuppliers()
    const { total } = useBoletos(filters)

    return (
        <div className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <BaseFilters
                className="bg-transparent border-none shadow-none p-0"
                filters={filters}
                onFiltersChange={updateFilters}
                total={total}
            />

            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <Label htmlFor="supplierId">
                        Fornecedor
                    </Label>
                    <Select
                        value={filters.supplierId || 'all'}
                        onValueChange={(value) => updateFilters({ supplierId: value === 'all' ? undefined : value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todos os fornecedores" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os fornecedores</SelectItem>
                            {allSuppliers.map((supplier) => (
                                <SelectItem key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1">
                    <Label htmlFor="isPayed">
                        Status de Pagamento
                    </Label>
                    <Select
                        value={filters.paid === undefined ? 'all' : filters.paid.toString()}
                        onValueChange={(value) => {
                            updateFilters({
                                paid: value === 'all' ? undefined : value === 'true'
                            })
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="false">Pendentes</SelectItem>
                            <SelectItem value="true">Pagos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
} 