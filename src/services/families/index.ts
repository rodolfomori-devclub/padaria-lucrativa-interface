import { createFamily } from "./create";
import { deleteFamily } from "./delete";
import { getAllFamilies } from "./getAll";
import { getFamilyById } from "./getById";
import { updateFamily } from "./update";

export const familyService = {
  getAll: getAllFamilies,
  create: createFamily,
  getById: getFamilyById,
  update: updateFamily,
  delete: deleteFamily,
};
