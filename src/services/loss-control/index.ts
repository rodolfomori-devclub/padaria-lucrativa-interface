import { createLossControl } from "./create"
import { deleteLossControl } from "./delete"
import { getAllLossControls } from "./getAll"
import { getLossControlById } from "./getById"
import { updateLossControl } from "./update"

export const lossControlService = {
    getAll: getAllLossControls,
    create: createLossControl,
    getById: getLossControlById,
    update: updateLossControl,
    delete: deleteLossControl,
} 