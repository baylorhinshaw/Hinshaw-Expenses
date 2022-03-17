import { User } from '../models';
import { signToken } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('expenses');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('expenses');
            }
            throw new AuthenticationError('You need to b e logged in!')
        },
    },
    Mutation: {
        addUser: async (parent, { firstname, lastname, email, password }) => {
            const user = await User.create({ firstname, lastname, email, password });
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