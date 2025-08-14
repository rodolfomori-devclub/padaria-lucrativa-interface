import { Search } from 'lucide-react'
import { useState } from 'react'
import { Pagination } from '~/components/Pagination'
import { Input } from '~/components/ui/input'
import { useClients } from '~/hooks/admin/clientes'
import { useDebounce } from '~/hooks/useDebounce'
import type { ClientFilters } from '~/types/client'
import { ClientsTable, CreateClientDialog } from './components'

export function ClientsPage() {
    const [filters, setFilters] = useState<ClientFilters>({
        page: 1,
        limit: 10,
        search: '',
    })

    const debouncedSearch = useDebounce({
        value: filters.search || '',
    })

    // Use debounced search in the actual query
    const queryFilters = {
        ...filters,
        search: debouncedSearch || undefined,
    }

    const { clients, meta, isLoading, error } = useClients(queryFilters)

    const handleSearchChange = (value: string) => {
        setFilters(prev => ({
            ...prev,
            search: value,
            page: 1, // Reset to first page when searching
        }))
    }

    const handlePageChange = (page: number) => {
        setFilters(prev => ({
            ...prev,
            page,
        }))
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-600">Erro ao carregar clientes. Tente novamente.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
                    <p className="text-gray-600">Gerencie os clientes do sistema</p>
                </div>
                <CreateClientDialog />
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Buscar clientes..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <ClientsTable clients={clients} isLoading={isLoading} />

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                    <Pagination meta={meta} onPageChange={handlePageChange} />
                )}
            </div>
        </div>
    )
}