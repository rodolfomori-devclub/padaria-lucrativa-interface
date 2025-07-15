import { createEmployeeExpense } from "./create"
import { deleteEmployeeExpense } from "./delete"
import { getAllEmployeeExpenses } from "./getAll"
import { getEmployeeExpenseById } from "./getById"
import { updateEmployeeExpense } from "./update"

export const employeeExpenseService = {
    getAll: getAllEmployeeExpenses,
    create: createEmployeeExpense,
    getById: getEmployeeExpenseById,
    update: updateEmployeeExpense,
    delete: deleteEmployeeExpense,
} 