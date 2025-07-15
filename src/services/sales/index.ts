import { createSale } from "./create";
import { deleteSale } from "./delete";
import { getAllSales } from "./getAll";
import { getSaleById } from "./getById";
import { updateSale } from "./update";

export const saleService = {
  create: createSale,
  getAll: getAllSales,
  getById: getSaleById,
  update: updateSale,
  delete: deleteSale,
};
