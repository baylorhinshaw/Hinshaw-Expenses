const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['fixed','variable','saving']
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1,
  },
  cost: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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
  
const Expense = model("expense", expenseSchema);
  
module.exports = Expense;