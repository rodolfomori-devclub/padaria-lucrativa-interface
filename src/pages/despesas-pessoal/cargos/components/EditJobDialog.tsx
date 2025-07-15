import { Edit } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { useUpdateJobMutation } from '~/hooks/jobs/useUpdateJobMutation'
import type { Job, UpdateJobData } from '~/types/job'
import { JobDialogContent } from './JobDialogContent'

interface EditJobDialogProps {
    job: Job
}

export function EditJobDialog({ job }: EditJobDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateJob, isPending: isUpdating } = useUpdateJobMutation()

    const handleSubmit = async (data: UpdateJobData) => {
        await updateJob({ id: job.id, data })
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                    <Edit className="size-4" />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Cargo</DialogTitle>
                </DialogHeader>
                <JobDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                    initialData={job}
                />
            </DialogContent>
        </Dialog>
    )
} 