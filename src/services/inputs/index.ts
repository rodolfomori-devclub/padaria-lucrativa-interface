import { createInput } from "./create"
import { deleteInput } from "./delete"
import { getAllInputs } from "./getAll"
import { getInputById } from "./getById"
import { updateInput } from "./update"

export const inputService = {
    getAll: getAllInputs,
    create: createInput,
    getById: getInputById,
    update: updateInput,
    delete: deleteInput,
} 