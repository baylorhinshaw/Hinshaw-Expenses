const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const fixedExpenseSchema = new Schema({
    fixedExpenseName: {
        type: String
    },
    fixedExpenseCost: {
        type: Number
    }
});

const FixedExpense = model('FixedExpenses', fixedExpenseSchema);
  
module.exports = FixedExpense;