import mongoose from 'mongoose';
const { Schema } = mongoose

const fixedExpensesSchema = new Schema({
    fixedExpenseName: {
        type: String
    },
    fixedExpenseCost: {
        type: Number
    }
});

module.exports = fixedExpensesSchema;