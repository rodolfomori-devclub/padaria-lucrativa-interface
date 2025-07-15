/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { EmployeeExpenseFilters } from '~/types/employee-expense'

// Types for filter context
export interface FilterContextValue<T> {
    filters: T
    updateFilters: (updates: Partial<T>) => void
    resetFilters: () => void
    setFilters: (filters: T) => void
}

// Employee expense filters context
const EmployeeExpenseFiltersContext = createContext<FilterContextValue<EmployeeExpenseFilters> | null>(null)

// Employee expense filters provider component
export interface EmployeeExpenseFiltersProviderProps {
    children: React.ReactNode
    initialFilters?: Partial<EmployeeExpenseFilters>
}

export function EmployeeExpenseFiltersProvider({
    children,
    initialFilters = {},
}: EmployeeExpenseFiltersProviderProps) {
    const defaultFilters: EmployeeExpenseFilters = useMemo(() => ({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        ...initialFilters
    }), [initialFilters])

    const [filters, setFiltersState] = useState<EmployeeExpenseFilters>(defaultFilters)

    const updateFilters = useCallback((updates: Partial<EmployeeExpenseFilters>) => {
        setFiltersState(prev => ({ ...prev, ...updates }))
    }, [])

    const resetFilters = useCallback(() => {
        setFiltersState(defaultFilters)
    }, [defaultFilters])

    const setFilters = useCallback((newFilters: EmployeeExpenseFilters) => {
        setFiltersState(newFilters)
    }, [])

    const value: FilterContextValue<EmployeeExpenseFilters> = {
        filters,
        updateFilters,
        resetFilters,
        setFilters
    }

    return (
        <EmployeeExpenseFiltersContext.Provider value={value}>
            {children}
        </EmployeeExpenseFiltersContext.Provider>
    )
}

// Hook to use employee expense filters
export function useEmployeeExpenseFilters() {
    const context = useContext(EmployeeExpenseFiltersContext)

    if (!context) {
        throw new Error('useEmployeeExpenseFilters must be used within an EmployeeExpenseFiltersProvider')
    }

    return context
} 