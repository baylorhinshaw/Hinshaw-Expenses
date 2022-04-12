const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const savingSchema = new Schema({
    savingName: {
        type: String
    },
    savingCost: {
        type: Number
    }
});

const Saving = model('Savings', savingSchema);
  
module.exports = Saving;