const { Schema, model } = require('mongoose');

const { Schema } = mongoose;

const expensesSchema = new Schema({
  monthlyIncome: {
    type: Number
  },
  fixedExpenses: {
    type: Number
  },
  varibleExpenses: {
    type: Number
  },
  savings: {
    type: Number,
  },
  leftoverIncome: {
    type: Number,
  },
  // put other schemas
},
{
  toJSON: {
    virtuals: true
},
});

module.exports = expensesSchema;