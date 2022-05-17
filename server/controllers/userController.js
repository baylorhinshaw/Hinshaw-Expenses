const { User, Expense } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// Aggregate function for total users
const userCount = async () =>
  User.aggregate()
    .count("userTotal")
    .then((numberOfUsers) => numberOfUsers);

// Get all Users
const getUsers = (req, res) => {
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
};

// Get single user 
const getSingleUser = (req, res) => {
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
};

// Create a new User
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  res.json({ message: 'Login User' })
});

// update a user
const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  };
  
// Delete a User and remove expenses
const deleteUser = (req, res) => {
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
};

// Me after logged in, using id from auth 
const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    username,
    email,
  })
});

// generateToken JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser
};