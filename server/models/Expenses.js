import mongoose from 'mongoose';
const { Schema } = mongoose

import fixedExpensesSchema from './FixedExpenses';
import varibleExpensesSchema from './VariableExpenses';
import savingsSchema from './Savings';

const expensesSchema = new Schema({
  monthlyIncome: {
    type: Number
  },
  leftoverIncome: {
    type: Number
  },
  fixedExpenses: [fixedExpensesSchema],
  varibleExpenses: [varibleExpensesSchema],
  savings: [savingsSchema]
},
{
  toJSON: {
    virtuals: true
},
});

module.exports = expensesSchema;