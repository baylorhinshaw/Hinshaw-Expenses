const { Saving, User } = require("../models");

module.exports = {
  // Get all saving
  getSavings(req, res) {
    Saving.find()
      .then((savings) => res.json(savings))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single saving
  getSingleSaving(req, res) {
    Saving.findOne({ _id: req.params.savingId })
      .select("-__v")
      .then((saving) =>
        !saving
          ? res.status(404).json({ message: "No saving with that ID" })
          : res.json(fixedExpense)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a saving
  createSaving(req, res) {
    Saving.create(req.body)
      .then((saving) => res.json(saving))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a single saving
  removeSaving(req, res) {
    Saving.findOneAndDelete({ _id: req.params.savingId })
      .then((saving) =>
        !saving
          ? res.status(404).json({ message: "No saving with that ID" })
          : User.deleteMany({ _id: { $in: saving.users } })
      )
      .then(() => res.json({ message: "saving and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a saving
  updateSaving(req, res) {
    Saving.findOneAndUpdate(
      { _id: req.params.savingId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((saving) =>
        !saving
          ? res.status(404).json({ message: "No saving with this id!" })
          : res.json(saving)
      )
      .catch((err) => res.status(500).json(err));
  },
};