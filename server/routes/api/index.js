const router = require("express").Router();
const userRoutes = require("./userRoutes");
const variableExpenseRoutes = require("./variableExpenseRoutes");
const fixedExpenseRoutes = require("./fixedExpenseRoutes");
const savingRoutes = require("./savingRoutes");

router.use("/users", userRoutes);
router.use("/variableExpenses", variableExpenseRoutes);
router.use("/fixedExpenses", fixedExpenseRoutes);
router.use("/savings", savingRoutes);

module.exports = router;