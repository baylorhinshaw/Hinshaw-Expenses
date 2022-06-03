const router = require("express").Router();
const {protect} = require('../../utils/auth');

const {
  getExpenses,
  getSingleExpense,
  createExpense,
  updateExpense,
  removeExpense
} = require("../../controllers/expenseController.js");

// all Expenses and making one
router.route("/")
  .get(protect, getExpenses)
  .post(protect, createExpense);

// getting one Expense, update, or delete
router
  .route("/:expenseId")
  .get(protect, getSingleExpense)
  .put(protect, updateExpense)
  .delete(protect, removeExpense);

module.exports = router;