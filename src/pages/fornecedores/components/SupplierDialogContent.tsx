import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, Loading } from '~/components/ui'
import { useDocumentInput } from '~/hooks/useDocumentInput'
import { supplierSchema, type SupplierFormData } from '~/schema/suppliers'
import type { CreateSupplierData, Supplier } from '~/types/supplier'

interface SupplierDialogContentProps {
    onSubmit: (data: CreateSupplierData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    supplier?: Supplier
}

export function SupplierDialogContent({
    onSubmit,
    onCancel,
    isLoading,
    supplier,
}: SupplierDialogContentProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SupplierFormData>({
        resolver: zodResolver(supplierSchema),
        defaultValues: supplier
            ? {
                name: supplier.name,
                cnpj: supplier.cnpj,
            }
            : undefined,
    })

    const handleFormSubmit = async (data: SupplierFormData) => {
        await onSubmit(data)
    }

    const cnpj = watch('cnpj')

    // Use the document input hook for better formatting
    const documentInput = useDocumentInput({
        value: cnpj || '',
        onChange: (value) => setValue('cnpj', value),
    })

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                    id="name"
                    placeholder="Nome da empresa fornecedora"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ/CPF *</Label>
                <Input
                    id="cnpj"
                    placeholder="00.000.000/0001-00"
                    value={documentInput.value}
                    onChange={documentInput.onChange}
                    maxLength={documentInput.maxLength}
                    className={errors.cnpj ? 'border-red-500' : ''}
                />
                {errors.cnpj && (
                    <p className="mt-1 text-sm text-red-600">{errors.cnpj.message}</p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loading className="w-4 h-4 mr-2" />}
                    {supplier ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </form>
    )
} 