import { useSuppliers } from '~/hooks/suppliers/useSuppliers'
import { NewSupplierDialog, SuppliersTable } from './components'

export function FornecedoresPage() {
    const { suppliers, isLoading } = useSuppliers()

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
                        <p className="text-gray-600 mt-2">Gerencie os fornecedores da padaria</p>
                    </div>
                    <NewSupplierDialog />
                </div>
            </div>

            <SuppliersTable
                suppliers={suppliers}
                isLoading={isLoading}
            />
        </div>
    )
}
