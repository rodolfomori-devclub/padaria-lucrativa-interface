import { createJob } from "./create"
import { deleteJob } from "./delete"
import { getAllJobs } from "./getAll"
import { getJobById } from "./getById"
import { updateJob } from "./update"

export const jobService = {
    getAll: getAllJobs,
    create: createJob,
    getById: getJobById,
    update: updateJob,
    delete: deleteJob,
} 