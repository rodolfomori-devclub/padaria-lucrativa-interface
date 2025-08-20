import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Label, Switch } from '~/components/ui'
import { Button } from '~/components/ui/button'
import { DialogFooter } from '~/components/ui/dialog'
import { Input as UIInput } from '~/components/ui/input'
import { useExpenseFilters } from '~/hooks/filters'
import { expenseSchema, type ExpenseFormData } from '~/schema/expenses'
import type { CreateExpenseData, Expense } from '~/types/expense'
import { formatCurrency, removeNonNumeric } from '~/utils/formaters'

interface ExpenseDialogContentProps {
    expense?: Expense
    onSubmit: (data: CreateExpenseData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    isFixed: boolean
}

export function ExpenseDialogContent({ expense, onSubmit, onCancel, isLoading, isFixed }: ExpenseDialogContentProps) {
    const isEditing = !!expense
    const { filters } = useExpenseFilters()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: expense?.name ?? '',
            value: expense?.value ?? undefined,
            isGovFee: expense?.isGovFee ?? false,
        },
    })

    const handleFormSubmit = async (data: ExpenseFormData) => {
        const day = new Date(filters.month ?? 0, filters.year ?? 0).toISOString()
        const isGovFee = data.isGovFee
        await onSubmit({
            ...data,
            name: isGovFee ? 'Simples Nacional' : data.name,
            isFixed,
            ...(!expense && { day }),
            isGovFee
        })
    }

    const typeText = isFixed ? 'fixa' : 'variável'

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <UIInput
                    label="Nome da Despesa *"
                    id="name"
                    type="text"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                    placeholder={`Digite o nome da despesa ${typeText}`}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <Controller
                control={control}
                name="isGovFee"
                render={({ field }) => {
                    const { onChange, value, ...rest } = field
                    return (
                        <div className="flex items-center gap-2 my-6">
                            <Switch
                                id="isGovFee"
                                {...rest}
                                checked={value}
                                onCheckedChange={onChange}
                            />
                            <Label htmlFor="isGovFee">Simples Nacional</Label>
                        </div>
                    )
                }}
            />

            <Controller
                control={control}
                name="value"
                render={({ field }) => {
                    const { onChange, value, ...rest } = field
                    const formattedValue = formatCurrency(value)
                    return (
                        <UIInput
                            label="Valor (R$) *"
                            id="value"
                            placeholder="0,00"
                            className={errors.value ? 'border-red-500' : ''}
                            {...rest}
                            value={formattedValue}
                            onChange={(e) => onChange(Number(removeNonNumeric(e.target.value)))}
                        />
                    )
                }}
            />
            {errors.value && (
                <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
            )}

            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
                </Button>
            </DialogFooter>
        </form>
    )
} 