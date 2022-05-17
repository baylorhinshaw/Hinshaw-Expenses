const { Expense, User } = require("../models");
const asyncHandler = require("express-async-handler");

// Get all Expense
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })

  res.status(200).json(expenses)
});

// Get a single Expense
const getSingleExpense = (req, res) => {
  Expense.findOne({ _id: req.params.expenseId })
    .select("-__v")
    .then((Expense) =>
      !Expense
        ? res.status(404).json({ message: "No Expense with that ID" })
        : res.json(Expense)
    )
    .catch((err) => res.status(500).json(err));
};
  
// Add a fixedExpense to a user
const createExpense = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user.id)

  // // Check for user
  // if(!user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }
  // // make sure the logged in user matches the goal user
  // if(expense.user.toString() !== user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }
  Expense.create({ ...req.body, user: req.user.id })
    .then((expense) => {
      console.log(expense);
      User.findOneAndUpdate(
        { _id: expense.user },
        { $push: { expenses: expense._id } },
        { runValidators: true, new: true }
      )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
    })
    .catch((err) => res.status(500).json(err));
});

// Update a Expense
const updateExpense = (req, res) => {
  Expense.findOneAndUpdate(
    { _id: req.params.expenseId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
  .then((Expense) =>
    !Expense
      ? res.status(404).json({ message: "No Expense with this id!" })
      : res.json(Expense)
  )
  .catch((err) => res.status(500).json(err));
};

// Delete a single Expense
const removeExpense = (req, res) => {
  Expense.findOneAndDelete({ _id: req.params.expenseId })
  .then((expense) => {
    if(!expense) return res.status(404).json({ message: 'expense doesnt exist '})
      User.findOneAndUpdate(
        { _id: expense.user },
        { $pull: { expenses: expense._id } },
        { runValidators: true, new: true }
      )
    .then((response) => (console.log(response)))
  })
  .then((expense) =>
    !expense
      ? res.status(404).json({
        message: 'Expense deleted',
      })
    : res.json({ message: 'expense successfully deleted' })
  )
  .catch((err) => res.status(500).json(err));
};

module.exports = {
  getExpenses,
  getSingleExpense,
  createExpense,
  updateExpense,
  removeExpense
};