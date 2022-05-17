const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    expenses:[
        {
            type: Schema.Types.ObjectId,
            ref: 'expense',
        }
    ]
});

const User = model('user', userSchema);

module.exports = User;