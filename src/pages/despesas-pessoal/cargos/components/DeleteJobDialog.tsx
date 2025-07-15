import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { useDeleteJobMutation } from '~/hooks/jobs/useDeleteJobMutation'
import type { Job } from '~/types/job'

interface DeleteJobDialogProps {
    job: Job
}

export function DeleteJobDialog({ job }: DeleteJobDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteJob, isPending: isDeleting } = useDeleteJobMutation()

    const handleDelete = async () => {
        await deleteJob(job.id)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-destructive">
                    <Trash2 className="size-4" />
                    Excluir
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Cargo</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir o cargo "{job.name}"?
                        Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 