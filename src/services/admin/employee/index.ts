import { createEmployee } from "./create"
import { deleteEmployee } from "./delete"
import { getAll } from "./getAll"
import { getById } from "./getById"
import { updateEmployee } from "./update"

export const employeeService = {
    getAll: getAll,
    create: createEmployee,
    getById: getById,
    update: updateEmployee,
    delete: deleteEmployee,
}
