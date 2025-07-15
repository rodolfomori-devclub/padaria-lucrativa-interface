interface TableEmptyStateProps {
    title: string
    description: string
}

export function TableEmptyState({ title, description }: TableEmptyStateProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5m-5 0H6" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{title || 'Nenhum dado encontrado'}</h3>
                <p className="text-gray-500">
                    {description || 'Comece cadastrando o primeiro item clicando no botão de criação.'}
                </p>
            </div>
        </div>
    )
}