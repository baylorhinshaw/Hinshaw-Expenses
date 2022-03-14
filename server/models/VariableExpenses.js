import mongoose from 'mongoose';
const { Schema } = mongoose

const variableExpensesSchema = new Schema({
    variableExpenseName: {
        type: String
    },
    variableExpenseCost: {
        type: Number
    }
});

module.exports = variableExpensesSchema;