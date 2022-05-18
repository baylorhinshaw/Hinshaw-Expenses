const router = require("express").Router();
const {protect} = require('../../utils/auth');

const {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser
} = require("../../controllers/userController");

// getting all users and then creating one
router.route("/")
  .get(getUsers)
  .post(createUser);

// login user
router.route("/login").post(loginUser);

// me 
router.route("/me").get(protect, getMe)

// getting one user, update, deleting
router.route("/:userId")
  .get(protect, getSingleUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;