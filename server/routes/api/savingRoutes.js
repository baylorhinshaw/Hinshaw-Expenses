const router = require("express").Router();

const {
  getSavings,
  getSingleSaving,
  createSaving,
  removeSaving,
  updateSaving
} = require("../../controllers/savingController.js");

// all savings and making one
router.route("/").get(getSavings).post(createSaving);

// getting one saving, update, or delete
router
  .route("/:savingId")
  .get(getSingleSaving)
  .put(updateSaving)
  .delete(removeSaving);

// creating saving
router.route("/:userId/savings").post(createSaving);

// removing a saving
router.route("/:userId/savings/:savingId").delete(removeSaving);

module.exports = router;