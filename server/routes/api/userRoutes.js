const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} = require("../../controllers/userController");

// getting all users and then creating one
router.route("/")
  .get(getUsers)
  .post(createUser);

// getting one user, update, deleting
router.route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;