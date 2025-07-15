import { createPurchase } from "./create";
import { deletePurchase } from "./delete";
import { getAllPurchases } from "./getAll";
import { getPurchaseById } from "./getById";
import { updatePurchase } from "./update";

export const purchaseService = {
  create: createPurchase,
  getAll: getAllPurchases,
  getById: getPurchaseById,
  update: updatePurchase,
  delete: deletePurchase,
};
