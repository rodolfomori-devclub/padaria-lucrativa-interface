/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { BoletoFilters } from '~/types/boleto'

// Types for filter context
export interface FilterContextValue<T> {
    filters: T
    updateFilters: (updates: Partial<T>) => void
    resetFilters: () => void
    setFilters: (filters: T) => void
}

// Boleto filters context
const BoletoFiltersContext = createContext<FilterContextValue<BoletoFilters> | null>(null)

// Boleto filters provider component
export interface BoletoFiltersProviderProps {
    children: React.ReactNode
    initialFilters?: Partial<BoletoFilters>
}

export function BoletoFiltersProvider({
    children,
    initialFilters = {},
}: BoletoFiltersProviderProps) {
    const defaultFilters: BoletoFilters = useMemo(() => ({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        page: 1,
        limit: 15,
        ...initialFilters
    }), [initialFilters])

    const [filters, setFiltersState] = useState<BoletoFilters>(defaultFilters)

    const updateFilters = useCallback((updates: Partial<BoletoFilters>) => {
        setFiltersState((prev) => {
            if (updates.month !== undefined || updates.year !== undefined) {
                return { ...prev, ...updates, page: 1 }
            }
            return { ...prev, ...updates }
        })
    }, [])

    const resetFilters = useCallback(() => {
        setFiltersState(defaultFilters)
    }, [defaultFilters])

    const setFilters = useCallback((newFilters: BoletoFilters) => {
        setFiltersState(newFilters)
    }, [])

    const value: FilterContextValue<BoletoFilters> = {
        filters,
        updateFilters,
        resetFilters,
        setFilters
    }

    return (
        <BoletoFiltersContext.Provider value={value}>
            {children}
        </BoletoFiltersContext.Provider>
    )
}

// Hook to use boleto filters
export function useBoletoFilters() {
    const context = useContext(BoletoFiltersContext)

    if (!context) {
        throw new Error('useBoletoFilters must be used within a BoletoFiltersProvider')
    }

    return context
} 