/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { LossControlFilters } from '~/types/loss-control'

// Types for filter context
export interface FilterContextValue<T> {
    filters: T
    updateFilters: (updates: Partial<T>) => void
    resetFilters: () => void
    setFilters: (filters: T) => void
}

// Loss Control filters context
const LossControlFiltersContext = createContext<FilterContextValue<LossControlFilters> | null>(null)

// Loss Control filters provider component
export interface LossControlFiltersProviderProps {
    children: React.ReactNode
    initialFilters?: Partial<LossControlFilters>
}

export function LossControlFiltersProvider({
    children,
    initialFilters = {},
}: LossControlFiltersProviderProps) {
    const defaultFilters: LossControlFilters = useMemo(() => ({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        ...initialFilters
    }), [initialFilters])

    const [filters, setFiltersState] = useState<LossControlFilters>(defaultFilters)

    const updateFilters = useCallback((updates: Partial<LossControlFilters>) => {
        setFiltersState(prev => ({ ...prev, ...updates }))
    }, [])

    const resetFilters = useCallback(() => {
        setFiltersState(defaultFilters)
    }, [defaultFilters])

    const setFilters = useCallback((newFilters: LossControlFilters) => {
        setFiltersState(newFilters)
    }, [])

    const value: FilterContextValue<LossControlFilters> = {
        filters,
        updateFilters,
        resetFilters,
        setFilters
    }

    return (
        <LossControlFiltersContext.Provider value={value}>
            {children}
        </LossControlFiltersContext.Provider>
    )
}

// Hook to use loss control filters
export function useLossControlFilters() {
    const context = useContext(LossControlFiltersContext)

    if (!context) {
        throw new Error('useLossControlFilters must be used within a LossControlFiltersProvider')
    }

    return context
} 