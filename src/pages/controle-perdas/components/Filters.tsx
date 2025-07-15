import { useEffect, useState } from "react"
import { BaseFilters, Input, Label } from "~/components/ui"
import { useLossControlFilters } from "~/hooks/filters/loss-control-filters"
import { useDebounce } from "~/hooks/useDebounce"

export function Filters() {
    const { filters, updateFilters } = useLossControlFilters()
    const [productName, setProductName] = useState(filters.search || '')
    const debouncedProductName = useDebounce({ value: productName, delay: 500 })

    useEffect(() => {
        updateFilters({ search: debouncedProductName || undefined })
    }, [debouncedProductName, updateFilters])

    return (
        <div className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <BaseFilters
                className="bg-transparent border-none shadow-none p-0"
                filters={filters}
                onFiltersChange={updateFilters}
            />

            <div className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-2">
                    <Label>
                        Buscar por Produto
                    </Label>
                    <Input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Digite o nome do produto"
                    />
                </div>
            </div>
        </div>
    )
} 