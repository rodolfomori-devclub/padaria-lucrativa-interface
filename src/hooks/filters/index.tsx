/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ExpenseFilters } from '~/types/expense'

// Types for filter context
export interface FilterContextValue<T> {
    filters: T
    updateFilters: (updates: Partial<T>) => void
    resetFilters: () => void
    setFilters: (filters: T) => void
}

// Expense filters context
const ExpenseFiltersContext = createContext<FilterContextValue<ExpenseFilters> | null>(null)

// Expense filters provider component
export interface ExpenseFiltersProviderProps {
    children: React.ReactNode
    initialFilters?: Partial<ExpenseFilters>
    isFixed: boolean // Required to determine if it's fixed or variable expenses
}

export function ExpenseFiltersProvider({
    children,
    initialFilters = {},
    isFixed
}: ExpenseFiltersProviderProps) {
    console.log({ isFixed })
    const defaultFilters: ExpenseFilters = useMemo(() => ({
        isFixed,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        ...initialFilters
    }), [isFixed, initialFilters])
    console.log({ defaultFilters })

    const [filters, setFiltersState] = useState<ExpenseFilters>(defaultFilters)

    const updateFilters = useCallback((updates: Partial<ExpenseFilters>) => {
        setFiltersState(prev => ({ ...prev, ...updates }))
    }, [])

    const resetFilters = useCallback(() => {
        setFiltersState(defaultFilters)
    }, [defaultFilters])

    const setFilters = useCallback((newFilters: ExpenseFilters) => {
        setFiltersState(newFilters)
    }, [])

    const value: FilterContextValue<ExpenseFilters> = {
        filters,
        updateFilters,
        resetFilters,
        setFilters
    }

    return (
        <ExpenseFiltersContext.Provider value={value}>
            {children}
        </ExpenseFiltersContext.Provider>
    )
}

// Hook to use expense filters
export function useExpenseFilters() {
    const context = useContext(ExpenseFiltersContext)

    if (!context) {
        throw new Error('useExpenseFilters must be used within an ExpenseFiltersProvider')
    }

    return context
}