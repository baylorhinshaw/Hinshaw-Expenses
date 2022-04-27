const { User, VariableExpense, FixedExpense, Saving } = require('../models');

// Aggregate function for total users
const userCount = async () =>
  User.aggregate()
    .count("userTotal")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .then(async (Users) => {
        const userObj = {
          Users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json({
            User,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User and remove
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : VariableExpense.findOneAndUpdate(
            { Users: req.params.UserId },
            { $pull: { Users: req.params.UserId } },
            { new: true }
          )
      )
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : FixedExpense.findOneAndUpdate(
            { Users: req.params.UserId },
            { $pull: { Users: req.params.UserId } },
            { new: true }
          )
      )
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : Saving.findOneAndUpdate(
            { Users: req.params.UserId },
            { $pull: { Users: req.params.UserId } },
            { new: true }
          )
      )
      .then((variableExpense, fixedExpense, saving) =>
        !variableExpense, fixedExpense, saving
          ? res.status(404).json({
            message: 'User deleted, but no variableExpense, fixedExpense, and saving found',
          })
          : res.json({ message: 'user successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Add a fixedExpense to a user
  addFixedExpense(req, res) {
    console.log('You are adding a fixedExpense');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { fixedExpense: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove fixedExpense from a user
  removeFixedExpense(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { fixedExpense: { fixedExpenseId: req.params.fixedExpenseId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a variableExpense to a user
  addVariableExpense(req, res) {
    console.log('You are adding a variableExpense');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { variableExpense: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove variableExpense from a user
  removeVariableExpense(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { variableExpense: { variableExpenseId: req.params.variableExpenseId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a saving to a user
  addSaving(req, res) {
    console.log('You are adding a saving');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { saving: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove saving from a user
  removeSaving(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { saving: { savingId: req.params.savingId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};