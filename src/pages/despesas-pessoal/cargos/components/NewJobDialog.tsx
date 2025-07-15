import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { useCreateJobMutation } from '~/hooks/jobs/useCreateJobMutation'
import type { CreateJobData } from '~/types/job'
import { JobDialogContent } from './JobDialogContent'

export function NewJobDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createJob, isPending: isCreating } = useCreateJobMutation()

    const handleSubmit = async (data: CreateJobData) => {
        await createJob(data)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Cargo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Cargo</DialogTitle>
                </DialogHeader>
                <JobDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
} 