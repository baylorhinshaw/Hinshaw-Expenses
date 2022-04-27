const { FixedExpense, User } = require("../models");

module.exports = {
  // Get all fixedExpense
  getFixedExpenses(req, res) {
    FixedExpense.find()
      .then((fixedExpenses) => res.json(fixedExpenses))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single fixedExpense
  getSingleFixedExpense(req, res) {
    FixedExpense.findOne({ _id: req.params.fixedExpenseId })
      .select("-__v")
      .then((fixedExpense) =>
        !fixedExpense
          ? res.status(404).json({ message: "No fixedExpense with that ID" })
          : res.json(fixedExpense)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a fixedExpense
  createFixedExpense(req, res) {
    FixedExpense.create(req.body)
      .then((fixedExpense) => res.json(fixedExpense))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a single fixedExpense
  removeFixedExpense(req, res) {
    FixedExpense.findOneAndDelete({ _id: req.params.fixedExpenseId })
      .then((fixedExpense) =>
        !fixedExpense
          ? res.status(404).json({ message: "No fixedExpense with that ID" })
          : User.deleteMany({ _id: { $in: fixedExpense.users } })
      )
      .then(() => res.json({ message: "fixedExpense and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a fixedExpense
  updateFixedExpense(req, res) {
    FixedExpense.findOneAndUpdate(
      { _id: req.params.fixedExpenseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((fixedExpense) =>
        !fixedExpense
          ? res.status(404).json({ message: "No fixedExpense with this id!" })
          : res.json(fixedExpense)
      )
      .catch((err) => res.status(500).json(err));
  },
};