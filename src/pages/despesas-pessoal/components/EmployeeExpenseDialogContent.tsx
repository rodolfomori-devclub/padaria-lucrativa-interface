import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useJobs } from '~/hooks/jobs/useJobs'
import { employeeExpenseSchema, type EmployeeExpenseFormData } from '~/schema/employee-expenses'
import type { CreateEmployeeExpenseData, EmployeeExpense, UpdateEmployeeExpenseData } from '~/types/employee-expense'

interface EmployeeExpenseDialogContentProps {
    onSubmit: (data: CreateEmployeeExpenseData | UpdateEmployeeExpenseData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    initialData?: EmployeeExpense
}

export function EmployeeExpenseDialogContent({
    onSubmit,
    onCancel,
    isLoading,
    initialData
}: EmployeeExpenseDialogContentProps) {
    const { jobs } = useJobs()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EmployeeExpenseFormData>({
        resolver: zodResolver(employeeExpenseSchema),
        defaultValues: {
            name: initialData?.name || '',
            jobId: initialData?.jobId || '',
            baseSalary: initialData?.baseSalary || 0,
            extraHours: initialData?.extraHours || 0,
            grossSalary: initialData?.grossSalary || 0,
            benefits: initialData?.benefits || 0,
        },
    })

    const handleFormSubmit = async (data: EmployeeExpenseFormData) => {
        await onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Nome do Funcionário</Label>
                    <Input
                        id="name"
                        placeholder="Ex: João Silva"
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="jobId">Cargo</Label>
                    <Select
                        onValueChange={(value) => setValue('jobId', value)}
                        defaultValue={initialData?.jobId}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um cargo" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobs.map((job) => (
                                <SelectItem key={job.id} value={job.id}>
                                    {job.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.jobId && (
                        <p className="text-sm text-red-600 mt-1">{errors.jobId.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="baseSalary">Salário Base</Label>
                    <Input
                        id="baseSalary"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register('baseSalary', { valueAsNumber: true })}
                    />
                    {errors.baseSalary && (
                        <p className="text-sm text-red-600 mt-1">{errors.baseSalary.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="extraHours">Horas Extras</Label>
                    <Input
                        id="extraHours"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register('extraHours', { valueAsNumber: true })}
                    />
                    {errors.extraHours && (
                        <p className="text-sm text-red-600 mt-1">{errors.extraHours.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="grossSalary">Salário Bruto</Label>
                    <Input
                        id="grossSalary"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register('grossSalary', { valueAsNumber: true })}
                    />
                    {errors.grossSalary && (
                        <p className="text-sm text-red-600 mt-1">{errors.grossSalary.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="benefits">Benefícios/Descontos</Label>
                    <Input
                        id="benefits"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register('benefits', { valueAsNumber: true })}
                    />
                    {errors.benefits && (
                        <p className="text-sm text-red-600 mt-1">{errors.benefits.message}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </form>
    )
} 