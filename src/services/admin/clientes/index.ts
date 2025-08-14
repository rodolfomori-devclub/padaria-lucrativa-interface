import { createClient } from "./create"
import { deleteClient } from "./delete"
import { getAllClients } from "./getAll"
import { getClientById } from "./getById"
import { updateClient } from "./update"

export const clientService = {
    getAll: getAllClients,
    create: createClient,
    getById: getClientById,
    update: updateClient,
    delete: deleteClient,
}
