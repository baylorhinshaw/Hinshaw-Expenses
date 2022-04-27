const { VariableExpense, User } = require("../models");

module.exports = {
  // Get all variableExpense
  getVariableExpenses(req, res) {
    VariableExpense.find()
      .then((variableExpenses) => res.json(variableExpenses))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single variableExpense
  getSingleVariableExpense(req, res) {
    VariableExpense.findOne({ _id: req.params.variableExpenseId })
      .select("-__v")
      .then((variableExpense) =>
        !variableExpense
          ? res.status(404).json({ message: "No variableExpense with that ID" })
          : res.json(variableExpense)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a variableExpense
  createVariableExpense(req, res) {
    VariableExpense.create(req.body)
      .then((variableExpense) => res.json(variableExpense))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a single variableExpense
  removeVariableExpense(req, res) {
    VariableExpense.findOneAndDelete({ _id: req.params.variableExpenseId })
      .then((variableExpense) =>
        !variableExpense
          ? res.status(404).json({ message: "No variableExpense with that ID" })
          : User.deleteMany({ _id: { $in: variableExpense.users } })
      )
      .then(() => res.json({ message: "variableExpense and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a variableExpense
  updateVariableExpense(req, res) {
    VariableExpense.findOneAndUpdate(
      { _id: req.params.variableExpenseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((variableExpense) =>
        !variableExpense
          ? res.status(404).json({ message: "No variableExpense with this id!" })
          : res.json(variableExpense)
      )
      .catch((err) => res.status(500).json(err));
  },
};