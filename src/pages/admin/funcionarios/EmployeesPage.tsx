import { Search } from 'lucide-react'
import { useState } from 'react'
import { Pagination } from '~/components/Pagination'
import { Input } from '~/components/ui/input'
import { useEmployees } from '~/hooks/admin/funcionarios/useEmployees'
import { useDebounce } from '~/hooks/useDebounce'
import type { ClientFilters } from '~/types/client'
import { CreateEmployeeDialog } from './components/CreateEmployeeDialog'
import { EmployeesTable } from './components/EmployeesTable'

export function EmployeesPage() {
    const [filters, setFilters] = useState<ClientFilters>({
        page: 1,
        limit: 15,
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

    const { employees, meta, isLoading, error } = useEmployees(queryFilters)

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
                <p className="text-red-600">Erro ao carregar funcionários. Tente novamente.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Funcionários</h1>
                    <p className="text-gray-600">Gerencie os funcionários do sistema</p>
                </div>
                <CreateEmployeeDialog />
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Buscar funcionários..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <EmployeesTable employees={employees} isLoading={isLoading} />

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                    <Pagination meta={meta} onPageChange={handlePageChange} />
                )}
            </div>
        </div>
    )
}