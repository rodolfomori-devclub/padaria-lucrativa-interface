import { useAuth } from "~/contexts/AuthContext"

export function ProfilePage() {
    const { user } = useAuth()

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base">Perfil do Usuário</h1>
                <p className="text-gray-600 mt-2">Visualize e gerencie suas informações pessoais</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {user ? (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 bg-highlight rounded-full flex items-center justify-center">
                                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-base">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                                    <div className="p-3 bg-gray-50 rounded-md border">
                                        <p className="text-gray-900">{user.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                                    <div className="p-3 bg-gray-50 rounded-md border">
                                        <p className="text-gray-900">{user.email}</p>
                                    </div>
                                </div>

                                {user.phone && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            <p className="text-gray-900">{user.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Erro ao carregar informações do usuário.</p>
                    </div>
                )}
            </div>
        </div>
    )
} 