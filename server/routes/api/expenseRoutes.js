const router = require("express").Router();

const {
  getExpenses,
  getSingleExpense,
  createExpense,
  updateExpense,
  removeExpense
} = require("../../controllers/expenseController.js");

// all Expenses and making one
router.route("/").get(getExpenses);

// getting one Expense, update, or delete
router
  .route("/:expenseId")
  .get(getSingleExpense)
  .put(updateExpense)
  .delete(removeExpense);

// creating variableExpense 
router.route("/:userId/expense").post(createExpense);

module.exports = router;