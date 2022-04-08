const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('expenses');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('expenses');
            }
            throw new AuthenticationError('You need to be logged in!')
        },
    },
    Mutation: {
        addUser: async (parent, { firstname, lastname, email, password, monthlyIncome }) => {
            const user = await User.create({ firstname, lastname, email, password, monthlyIncome });
            const token = signToken(user);
      
            return {token, user}
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        saveFixedExpenses: async (parent, args, context ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { fixedExpenses: args }},
                    { new: true, runValidators: true }
                );
            }
        },
        removeFixedExpenses: async (parent, {_id}, context ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { fixedExpenses: { _id: _id }}},
                    { new: true }
                );
            }
        },
        saveVaribleExpenses: async (parent, args, context ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {variableExpenses: args }},
                    { new: true, runValidators: true }
                    );
                }
            },
        removeVaribleExpenses: async (parent, {_id}, context ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { varibleExpenses: { _id: _id }}},
                    { new: true }
                );
            }
        },
        saveSavings: async (parent, args, context ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {savings: args }},
                    { new: true, runValidators: true }
                );
            }
        },
        removeSavings: async (parent, {_id}, context ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savings: { _id: _id }}},
                    { new: true }
                );
            }
        },
        changePassword: async (parent, {password}, context ) => {
            if(context.user) {
              return await User.findOneAndUpdate(
                { _id: context.user._id },
                { password: password },
                { new: true }
                );
            }
        },
    }
}

module.exports = resolvers;