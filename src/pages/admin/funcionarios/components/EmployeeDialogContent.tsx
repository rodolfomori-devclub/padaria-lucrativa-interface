import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, Loading } from '~/components/ui'
import { createEmployeeSchema, type CreateEmployeeFormData } from '~/schema/employee'
import type { User } from '~/types/user'
import { formatPhone } from '~/utils/formaters'

interface EmployeeDialogContentProps {
    onSubmit: (data: CreateEmployeeFormData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    employee?: User
}

export function EmployeeDialogContent({
    onSubmit,
    onCancel,
    isLoading,
    employee,
}: EmployeeDialogContentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateEmployeeFormData>({
        resolver: zodResolver(createEmployeeSchema),
        defaultValues: employee
            ? {
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
            }
            : undefined,
    })

    const handleFormSubmit = async (data: CreateEmployeeFormData) => {
        await onSubmit(data)
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
                id="name"
                label="Nome *"
                placeholder="Nome completo do funcionário"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}

            <Input
                id="email"
                label="Email *"
                type="email"
                placeholder="email@exemplo.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}

            <Input
                id="phone"
                label="Telefone *"
                placeholder="(11) 99999-9999"
                {...register('phone', {
                    onChange: (e) => {
                        e.target.value = formatPhone(e.target.value)
                    }
                })}
                className={errors.phone ? 'border-red-500' : ''}
                maxLength={15}
            />
            {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}


            {!employee && (
                <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                        id="password"
                        type="text"
                        placeholder="Senha do funcionário"
                        {...register('password')}
                        className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loading className="w-4 h-4 mr-2" />}
                    {employee ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </form>
    )
}
