import mongoose from 'mongoose';
const { Schema, model } = mongoose

import bcrypt from 'bcrypt';

import expensesSchema from './Expenses';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  expenses: [expensesSchema]
},
  // need this to use Virtual
{
  toJSON: {
    virtuals: true
},
});

// need to change some code below 
// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate('password')
  
    if (update.password) {
      const saltRounds = 10;
      update.password = await bcrypt.hash(update.password, saltRounds);
    }
  
    next();
  });
  
  // custom method to compare and validate password for logging in
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  // when we query a user, we'll also get another field called `animeCount` with the number of saved animes we have
  userSchema.virtual('animeCount').get(function () {
    return this.savedAnimes.length;
  });
  
  const User = model('User', userSchema);
  
  module.exports = User;
  