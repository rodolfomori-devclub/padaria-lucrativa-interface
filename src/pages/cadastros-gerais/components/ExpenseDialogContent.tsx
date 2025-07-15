import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { DialogFooter } from '~/components/ui/dialog'
import { Input as UIInput } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useExpenseFilters } from '~/hooks/filters'
import { expenseSchema, type ExpenseFormData } from '~/schema/expenses'
import type { CreateExpenseData, Expense } from '~/types/expense'

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
        formState: { errors },
        reset,
    } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: '',
            value: 0,
        },
    })

    // Reset form when expense changes
    useEffect(() => {
        if (expense) {
            reset({
                name: expense.name,
                value: expense.value,
            })
        } else {
            reset({
                name: '',
                value: 0,
            })
        }
    }, [expense, reset])

    const handleFormSubmit = async (data: ExpenseFormData) => {
        const day = new Date(filters.month ?? 0, filters.year ?? 0).toISOString()
        await onSubmit({ ...data, isFixed, day })
    }

    const typeText = isFixed ? 'fixa' : 'variável'

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Nome da Despesa *</Label>
                <UIInput
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

            <div>
                <Label htmlFor="value">Valor (R$) *</Label>
                <UIInput
                    id="value"
                    type="number"
                    step="0.01"
                    min="0.01"
                    {...register('value', { valueAsNumber: true })}
                    className={errors.value ? 'border-red-500' : ''}
                    placeholder="0,00"
                />
                {errors.value && (
                    <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
                )}
            </div>

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