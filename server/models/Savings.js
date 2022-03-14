import mongoose from 'mongoose';
const { Schema } = mongoose

const savingsSchema = new Schema({
    savingName: {
        type: String
    },
    savingCost: {
        type: Number
    }
});

module.exports = savingsSchema;