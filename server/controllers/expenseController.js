const { Expense, User } = require("../models");

module.exports = {
  // Get all Expense
  getExpenses(req, res) {
    Expense.find()
      .then((expenses) => res.json(expenses))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single Expense
  getSingleExpense(req, res) {
    Expense.findOne({ _id: req.params.expenseId })
      .select("-__v")
      .then((Expense) =>
        !Expense
          ? res.status(404).json({ message: "No Expense with that ID" })
          : res.json(Expense)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a fixedExpense to a user
  createExpense(req, res) {
    console.log('You are adding a Expense');
    console.log(req.params);
    Expense.create({ ...req.body, user: req.params.userId })
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
  },
  // Update a Expense
  updateExpense(req, res) {
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
  },
  // Delete a single Expense
  removeExpense(req, res) {
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
  }
};