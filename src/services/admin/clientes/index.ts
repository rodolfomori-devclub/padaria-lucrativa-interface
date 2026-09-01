import { createClient } from "./create"
import { deleteClient } from "./delete"
import { getAllClients } from "./getAll"
import { getClientById } from "./getById"
import { resendClientAccess } from "./resendAccess"
import { updateClient } from "./update"

export const clientService = {
    getAll: getAllClients,
    create: createClient,
    getById: getClientById,
    update: updateClient,
    delete: deleteClient,
    resendAccess: resendClientAccess,
}
