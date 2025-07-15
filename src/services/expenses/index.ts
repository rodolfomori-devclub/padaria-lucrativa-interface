import { createExpense } from "./create"
import { deleteExpense } from "./delete"
import { getAllExpenses } from "./getAll"
import { getExpenseById } from "./getById"
import { updateExpense } from "./update"

export const expenseService = {
    getAll: getAllExpenses,
    create: createExpense,
    getById: getExpenseById,
    update: updateExpense,
    delete: deleteExpense,
} 