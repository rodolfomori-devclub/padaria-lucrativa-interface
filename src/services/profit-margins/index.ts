import { createProfitMargin } from "./create"
import { deleteProfitMargin } from "./delete"
import { getAllProfitMargins } from "./getAll"
import { getProfitMarginById } from "./getById"
import { updateProfitMargin } from "./update"

export const profitMarginService = {
    getAll: getAllProfitMargins,
    create: createProfitMargin,
    getById: getProfitMarginById,
    update: updateProfitMargin,
    delete: deleteProfitMargin,
} 