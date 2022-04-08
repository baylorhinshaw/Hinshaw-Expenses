const mongoose = require('mongoose');
const { Schema } = mongoose;

const savingsSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    savingName: {
        type: String
    },
    savingCost: {
        type: Number
    }
});

module.exports = savingsSchema;