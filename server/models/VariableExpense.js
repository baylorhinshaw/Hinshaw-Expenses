const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const variableExpenseSchema = new Schema({
    variableExpenseName: {
        type: String
    },
    variableExpenseCost: {
        type: Number
    }
});

const VariableExpense = model('VariableExpenses', variableExpenseSchema);
  
module.exports = VariableExpense;