import { useCallback } from "react"
import { cn } from "~/lib/utils"
import type { BaseDateFilters, FilterUpdateFunction } from "~/types/filters"
import { MonthYearPicker } from "./date-picker"

interface BaseFiltersProps<T extends BaseDateFilters> {
    filters: T
    className?: string
    onFiltersChange: FilterUpdateFunction<T>
}

export function BaseFilters<T extends BaseDateFilters>({
    filters,
    className,
    onFiltersChange
}: BaseFiltersProps<T>) {
    // Removed filter type state since we only use month filter now
    // const [filterType, setFilterType] = useState<'month' | 'range'>('month')

    const handleMonthYearChange = useCallback((monthYear: { month: number; year: number }) => {
        onFiltersChange({
            month: monthYear.month,
            year: monthYear.year,
            // Clear date range when switching to month mode
            fromDate: undefined,
            toDate: undefined
        } as Partial<T>)
    }, [onFiltersChange])

    // Commented out date range functionality for future use
    // const handleDateRangeChange = useCallback((from?: Date, to?: Date) => {
    //     onFiltersChange({
    //         fromDate: from,
    //         toDate: to,
    //         // Clear month/year when switching to range mode
    //         month: undefined,
    //         year: undefined
    //     } as Partial<T>)
    // }, [onFiltersChange])

    // const clearDateRange = useCallback(() => {
    //     onFiltersChange({
    //         fromDate: undefined,
    //         toDate: undefined
    //     } as Partial<T>)
    // }, [onFiltersChange])

    // const handleFilterTypeChange = useCallback((type: 'month' | 'range') => {
    //     setFilterType(type)

    //     // Clear conflicting filters when switching modes
    //     if (type === 'month') {
    //         onFiltersChange({
    //             fromDate: undefined,
    //             toDate: undefined
    //         } as Partial<T>)
    //     } else {
    //         onFiltersChange({
    //             month: undefined,
    //             year: undefined
    //         } as Partial<T>)
    //     }
    // }, [onFiltersChange])

    return (
        <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 flex gap-4", className)}>
            <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
                {/* Commented out filter type toggle buttons for future use */}
                {/* <div className="flex gap-2">
                    <Button
                        variant={filterType === 'month' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilterTypeChange('month')}
                    >
                        Por Mês
                    </Button>
                    <Button
                        variant={filterType === 'range' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilterTypeChange('range')}
                    >
                        Por Período
                    </Button>
                </div> */}
            </div>

            {/* Only month filter is now active */}
            <div className="flex items-center gap-4">
                <MonthYearPicker
                    value={{
                        month: filters.month || new Date().getMonth() + 1,
                        year: filters.year || new Date().getFullYear()
                    }}
                    onChange={handleMonthYearChange}
                />
            </div>

            {/* Commented out date range functionality for future use */}
            {/* {filterType === 'range' && (
                <div className="flex items-center gap-4">
                    <DateRangePicker
                        from={filters.fromDate}
                        to={filters.toDate}
                        onChange={handleDateRangeChange}
                        placeholder="Selecione o período"
                    />
                    {(filters.fromDate || filters.toDate) && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearDateRange}
                        >
                            Limpar
                        </Button>
                    )}
                </div>
            )} */}
        </div>
    )
} 