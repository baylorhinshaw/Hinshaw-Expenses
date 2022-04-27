const router = require("express").Router();

const {
  getFixedExpenses,
  getSingleFixedExpense,
  createFixedExpense,
  removeFixedExpense,
  updateFixedExpense
} = require("../../controllers/fixedExpenseController.js");

// all fixedExpenses and making one
router.route("/").get(getFixedExpenses).post(createFixedExpense);

// getting one fixedExpense, update, or delete
router
  .route("/:fixedExpenseId")
  .get(getSingleFixedExpense)
  .put(updateFixedExpense)
  .delete(removeFixedExpense);

// creating variableExpense 
router.route("/:userId/fixedExpenses").post(createFixedExpense);

// removing a variableExpense
router.route("/:userId/fixedExpenses/:fixedExpenseId").delete(removeFixedExpense);

module.exports = router;