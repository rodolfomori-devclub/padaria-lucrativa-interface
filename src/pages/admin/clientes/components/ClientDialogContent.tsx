import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, Loading } from '~/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { createClientSchema, updateClientSchema, type CreateClientFormData, type UpdateClientFormData } from '~/schema/client'
import type { CreateClientData, UpdateClientData } from '~/types/client'
import type { PlanType } from '~/types/plan'
import type { User } from '~/types/user'
import { formatDateForInput, formatPhone } from '~/utils/formaters'
import { plansTypes } from '~/utils/plans'

interface ClientDialogContentProps {
    onSubmit: (data: CreateClientData | UpdateClientData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    client?: User
}

export function ClientDialogContent({
    onSubmit,
    onCancel,
    isLoading,
    client,
}: ClientDialogContentProps) {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateClientFormData | UpdateClientFormData>({
        resolver: zodResolver(client ? updateClientSchema : createClientSchema),
        defaultValues: client
            ? {
                name: client.name,
                email: client.email,
                phone: client.phone,
                planType: client.plan?.type,
                expiresAt: formatDateForInput(client.plan?.expiresAt),
            }
            : undefined,
    })

    const handleFormSubmit = async (data: CreateClientFormData | UpdateClientFormData) => {
        await onSubmit(data)
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
                id="name"
                label="Nome *"
                placeholder="Nome completo do cliente"
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

            <div>
                <Label htmlFor="type">Tipo de Plano *</Label>
                <Select
                    onValueChange={(value) => setValue('planType', value as PlanType)}
                    defaultValue={client?.plan?.type}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        {plansTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.planType && (
                    <p className="text-sm text-red-600 mt-1">{errors.planType.message}</p>
                )}
            </div>


            <Input
                id="expiresAt"
                label="Data de Expiração do Acesso *"
                type="date"
                {...register('expiresAt')}
                className={errors.expiresAt ? 'border-red-500' : ''}
            />
            {errors.expiresAt && (
                <p className="mt-1 text-sm text-red-600">{errors.expiresAt.message}</p>
            )}


            {!client && (
                <div className="space-y-2">
                    <Input
                        id="password"
                        label="Senha *"
                        type="text"
                        placeholder="Senha do cliente"
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
                    {client ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </form>
    )
}
