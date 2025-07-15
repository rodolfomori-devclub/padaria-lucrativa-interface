import { createBoleto } from "./create"
import { deleteBoleto } from "./delete"
import { getAllBoletos } from "./getAll"
import { getBoletoById } from "./getById"
import { payBoleto } from "./pay"
import { updateBoleto } from "./update"

export const boletoService = {
    getAll: getAllBoletos,
    create: createBoleto,
    getById: getBoletoById,
    update: updateBoleto,
    delete: deleteBoleto,
    pay: payBoleto,
} 