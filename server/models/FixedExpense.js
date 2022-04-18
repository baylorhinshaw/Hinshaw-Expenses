const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const fixedExpenseSchema = new Schema({
  fixedExpenseName: {
    type: String,
    required: 'You need to leave a name!',
    minlength: 1,
    maxlength: 280
  },
  fixedExpenseCost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const FixedExpense = model('FixedExpense', fixedExpenseSchema);

module.exports = FixedExpense;
