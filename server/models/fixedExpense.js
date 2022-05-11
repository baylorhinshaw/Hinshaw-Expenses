const { Schema, model } = require("mongoose");

const fixedExpenseSchema = new Schema({
  fixedExpenseName: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1,
  },
  fixedExpenseCost: {
    type: Number,
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
  
const FixedExpense = model("fixedExpense", fixedExpenseSchema);
  
module.exports = FixedExpense;