import { createSupplier } from "./create"
import { deleteSupplier } from "./delete"
import { getAllSuppliers } from "./getAll"
import { getSupplierById } from "./getById"
import { updateSupplier } from "./update"

export const supplierService = {
    getAll: getAllSuppliers,
    create: createSupplier,
    getById: getSupplierById,
    update: updateSupplier,
    delete: deleteSupplier,
} 