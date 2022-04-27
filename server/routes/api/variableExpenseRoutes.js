const router = require("express").Router();

const {
  getVariableExpenses,
  getSingleVariableExpense,
  createVariableExpense,
  removeVariableExpense,
  updateVariableExpense
} = require("../../controllers/variableExpenseController.js");

// all variableExpenses and making one
router.route("/").get(getVariableExpenses).post(createVariableExpense);

// getting one thought, update, or delete
router
  .route("/:variableExpenseId")
  .get(getSingleVariableExpense)
  .put(updateVariableExpense)
  .delete(removeVariableExpense);

// creating variableExpense 
router.route("/:userId/variableExpenses").post(createVariableExpense);

// removing a variableExpense
router.route("/:userId/variableExpenses/:variableExpenseId").delete(removeVariableExpense);

module.exports = router;