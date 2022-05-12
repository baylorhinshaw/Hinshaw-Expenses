const { User, Expense } = require('../models');

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
      .populate('expenses')
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
      .catch((err) => {
        console.log(err)
        return res.status(500).send(err)
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
  // Delete a User and remove expenses
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((User) => {
        if(!User) return res.status(404).json({ message: 'No User exists' })
          Expense.deleteMany(
            { user: req.params.userId }
          )
          .then((response) => (console.log(response)))
      })
      .then((User) =>
        !User
          ? res.status(404).json({
            message: 'User deleted',
          })
          : res.json({ message: 'user successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};