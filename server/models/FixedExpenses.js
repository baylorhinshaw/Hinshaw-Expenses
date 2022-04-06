import mongoose from 'mongoose';
const { Schema } = mongoose;

const fixedExpensesSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    fixedExpenseName: {
        type: String
    },
    fixedExpenseCost: {
        type: Number
    }
});

module.exports = fixedExpensesSchema;