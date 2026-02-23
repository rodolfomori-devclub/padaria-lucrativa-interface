import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Label, Loading, Switch } from '~/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { useSuppliers } from '~/hooks/suppliers/useSuppliers'
import { boletoSchema, type BoletoFormData } from '~/schema/boletos'
import type { Boleto, CreateBoletoData } from '~/types/boleto'
import { formatCurrency, formatDateForInput, removeNonNumeric } from '~/utils/formaters'

interface BoletoDialogContentProps {
    onSubmit: (data: CreateBoletoData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    boleto?: Boleto
}

export function BoletoDialogContent({
    onSubmit,
    onCancel,
    isLoading,
    boleto,
}: BoletoDialogContentProps) {
    const { allSuppliers } = useSuppliers()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<BoletoFormData>({
        resolver: zodResolver(boletoSchema),
        defaultValues: boleto
            ? {
                supplierId: boleto.supplierId,
                value: boleto.value || 0,
                dueDate: formatDateForInput(boleto.dueDate),
                observations: boleto.observations || '',
            }
            : {
                isRecurring: false,
                recurrencePattern: undefined,
                recurringStartDate: undefined,
                recurringDayOfMonth: undefined,
            },
    })

    const isRecurring = watch('isRecurring')
    const isEditing = !!boleto

    const handleFormSubmit = async (data: BoletoFormData) => {
        await onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Controller
                    control={control}
                    name="supplierId"
                    render={({ field }) => (
                        <div className="space-y-2">
                            <Label htmlFor="supplierId">
                                Fornecedor
                            </Label>
                            <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um fornecedor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allSuppliers.map((supplier) => (
                                        <SelectItem key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.supplierId && (
                                <p className="mt-1 text-sm text-red-600">{errors.supplierId.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <Controller
                control={control}
                name="value"
                render={({ field }) => {
                    const { onChange, value, ...fieldProps } = field
                    const formattedValue = formatCurrency(value)

                    return (
                        <div className="space-y-2">
                            <Input
                                id="value"
                                label="Valor (R$) *"
                                placeholder="0,00"
                                {...fieldProps}
                                value={formattedValue}
                                onChange={(e) => onChange(Number(removeNonNumeric(e.target.value)))}
                                className={errors.value ? 'border-red-500' : ''}
                            />
                            {errors.value && (
                                <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
                            )}
                        </div>
                    )
                }}
            />

            <div className="space-y-2">
                <Input
                    id="dueDate"
                    label="Data de Vencimento *"
                    type="date"
                    {...register('dueDate')}
                    className={errors.dueDate ? 'border-red-500' : ''}
                />
                {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                    id="observations"
                    rows={3}
                    placeholder="Observações sobre o boleto"
                    {...register('observations')}
                    className={`w-full rounded-md border ${errors.observations ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.observations && (
                    <p className="mt-1 text-sm text-red-600">{errors.observations.message}</p>
                )}
            </div>

            {!isEditing && (
                <>
                    <Controller
                        control={control}
                        name="isRecurring"
                        render={({ field }) => {
                            const { onChange, value, ...rest } = field;
                            return (
                                <div className="flex items-center gap-2 my-4">
                                    <Switch
                                        id="isRecurring"
                                        {...rest}
                                        checked={value}
                                        onCheckedChange={onChange}
                                    />
                                    <Label htmlFor="isRecurring">Tornar recorrente</Label>
                                </div>
                            );
                        }}
                    />

                    {isRecurring && (
                        <div className="space-y-4 border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-700">Configuração de Recorrência</h4>
                            
                            <Controller
                                control={control}
                                name="recurrencePattern"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="recurrencePattern">Frequência *</Label>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={errors.recurrencePattern ? "border-red-500" : ""}>
                                                <SelectValue placeholder="Selecione a frequência" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MONTHLY">Mensal</SelectItem>
                                                <SelectItem value="QUARTERLY">Trimestral (a cada 3 meses)</SelectItem>
                                                <SelectItem value="SEMIANNUAL">Semestral (a cada 6 meses)</SelectItem>
                                                <SelectItem value="ANNUAL">Anual</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.recurrencePattern && (
                                            <p className="mt-1 text-sm text-red-600">{errors.recurrencePattern.message}</p>
                                        )}
                                    </div>
                                )}
                            />

                            <div className="space-y-2">
                                <Input
                                    label="Data de Início *"
                                    id="recurringStartDate"
                                    type="date"
                                    {...register("recurringStartDate")}
                                    className={errors.recurringStartDate ? "border-red-500" : ""}
                                />
                                {errors.recurringStartDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.recurringStartDate.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Input
                                    label="Dia do Mês para Vencimento (1-31) *"
                                    id="recurringDayOfMonth"
                                    type="number"
                                    min="1"
                                    max="31"
                                    {...register("recurringDayOfMonth", { valueAsNumber: true })}
                                    className={errors.recurringDayOfMonth ? "border-red-500" : ""}
                                    placeholder="Ex: 10"
                                />
                                {errors.recurringDayOfMonth && (
                                    <p className="mt-1 text-sm text-red-600">{errors.recurringDayOfMonth.message}</p>
                                )}
                                <p className="text-xs text-gray-500">
                                    Dia do mês em que o boleto será gerado automaticamente
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loading className="w-4 h-4 mr-2" />}
                    {boleto ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </form>
    )
} 