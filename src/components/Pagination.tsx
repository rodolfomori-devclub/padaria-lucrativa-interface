import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { PaginationMeta } from '~/types/pagination'

interface PaginationProps {
    meta: PaginationMeta
    onPageChange: (page: number) => void
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
    const { page, totalPages, hasNext, hasPrev, total } = meta

    if (totalPages <= 1) {
        return null
    }

    const getPageNumbers = () => {
        const pages: number[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const start = Math.max(1, page - 2)
            const end = Math.min(totalPages, start + maxVisiblePages - 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
        }

        return pages
    }

    return (
        <div className="flex items-center justify-between bg-white border-t border-gray-200 p-2 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Button
                    variant="outline"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrev}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium"
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                    className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium"
                >
                    Próximo
                </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando{' '}
                        <span className="font-medium">{(page - 1) * meta.limit + 1}</span>
                        {' '}-{' '}
                        <span className="font-medium">
                            {Math.min(page * meta.limit, total)}
                        </span>
                        {' '}de{' '}
                        <span className="font-medium">{total}</span>
                        {' '}resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Button
                            variant="outline"
                            onClick={() => onPageChange(page - 1)}
                            disabled={!hasPrev}
                            className="relative inline-flex items-center rounded-l-md p-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeft className="size-4" aria-hidden="true" />
                        </Button>

                        {getPageNumbers().map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                variant={pageNumber === page ? "default" : "outline"}
                                onClick={() => onPageChange(pageNumber)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${pageNumber === page
                                    ? 'bg-primary text-white'
                                    : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {pageNumber}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            onClick={() => onPageChange(page + 1)}
                            disabled={!hasNext}
                            className="relative inline-flex items-center rounded-r-md p-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Próximo</span>
                            <ChevronRight className="size-4" aria-hidden="true" />
                        </Button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
