import { useInputs } from '~/hooks/inputs/useInputs'
import { InputsTable, NewInputDialog } from './components'

export function InputsPage() {
    const { inputs, isLoading } = useInputs()

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Insumos</h1>
                        <p className="text-gray-600 mt-2">Gerencie os insumos da padaria</p>
                    </div>
                    <NewInputDialog />
                </div>
            </div>

            <InputsTable
                inputs={inputs}
                isLoading={isLoading}
            />
        </div>
    )
}