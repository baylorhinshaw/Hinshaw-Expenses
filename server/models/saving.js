const { Schema, model } = require("mongoose");

const savingSchema = new Schema({
  savingName: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1,
  },
  savingCost: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: date => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`
    }
  },
});
  
const Saving = model("saving", savingSchema);
  
module.exports = Saving;