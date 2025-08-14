import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { PlanType, type CreatePlanData, type Plan } from '~/types/plan'
import { formatCurrency, removeNonNumeric } from '~/utils/formaters'
import { plansTypes } from '~/utils/plans'

const planSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    type: z.nativeEnum(PlanType),
    price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
})

interface PlanDialogContentProps {
    onSubmit: (data: CreatePlanData) => void
    onCancel: () => void
    isLoading: boolean
    initialData?: Plan
}

export function PlanDialogContent({ onSubmit, onCancel, isLoading, initialData }: PlanDialogContentProps) {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CreatePlanData>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            type: initialData?.type || PlanType.BASIC,
            price: initialData?.price || undefined,
        },
    })

    const handleFormSubmit = (data: CreatePlanData) => {
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        placeholder="Nome do plano"
                        {...register('title')}
                        disabled={isLoading}
                    />
                    {errors.title && (
                        <p className="text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>

                {/* <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <select
                        id="type"
                        {...register('type')}
                        disabled={isLoading}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value={PlanType.BASIC}>BASIC</option>
                        <option value={PlanType.PRO}>PRO</option>
                    </select>
                    {errors.type && (
                        <p className="text-sm text-red-600">{errors.type.message}</p>
                    )}
                </div> */}
                <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                        onValueChange={(value) => setValue('type', value as PlanType)}
                        defaultValue={initialData?.type}
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
                    {errors.type && (
                        <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                    id="description"
                    placeholder="Descrição do plano (opcional)"
                    {...register('description')}
                    disabled={isLoading}
                />
                {errors.description && (
                    <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <Controller
                control={control}
                name="price"
                render={({ field }) => {

                    const { onChange, value, ...rest } = field;
                    const formatedValue = formatCurrency(value);
                    return (
                        <div className="space-y-2">
                            <Input
                                id="price"
                                label="Preço"
                                placeholder="0.00"
                                {...rest}
                                value={formatedValue}
                                onChange={(e) => onChange(Number(removeNonNumeric(e.target.value)))}
                                disabled={isLoading}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-600">{errors.price.message}</p>
                            )}
                        </div>
                    )
                }}
            />

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </form>
    )
}
