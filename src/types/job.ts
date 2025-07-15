export interface Job {
    id: string
    name: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateJobData {
    name: string
}

export type UpdateJobData = CreateJobData