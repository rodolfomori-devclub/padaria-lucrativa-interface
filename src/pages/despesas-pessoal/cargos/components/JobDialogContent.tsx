import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { jobSchema, type JobFormData } from '~/schema/jobs'
import type { CreateJobData, Job, UpdateJobData } from '~/types/job'

interface JobDialogContentProps {
    onSubmit: (data: CreateJobData | UpdateJobData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
    initialData?: Job
}

export function JobDialogContent({ onSubmit, onCancel, isLoading, initialData }: JobDialogContentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            name: initialData?.name || '',
        },
    })

    const handleFormSubmit = async (data: JobFormData) => {
        await onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Nome do Cargo</Label>
                <Input
                    id="name"
                    placeholder="Ex: Padeiro, Confeiteiro, Atendente..."
                    {...register('name')}
                />
                {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                )}
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