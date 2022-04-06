import mongoose from 'mongoose';
const { Schema } = mongoose;

const variableExpensesSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    variableExpenseName: {
        type: String
    },
    variableExpenseCost: {
        type: Number
    }
});

module.exports = variableExpensesSchema;