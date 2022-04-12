const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        monthlyIncome: Int
        fixedExpense: [FixedExpense]!
        varibleExpense: [VariableExpense]!
        saving: [Saving]!
    }

    type FixedExpense {
        _id: ID
        fixedExpenseName: String
        fixedExpenseCost: Int
    }

    type VariableExpense {
        _id: ID
        variableExpenseName: String
        variableExpenseCost: Int
    }

    type Saving {
        _id: ID
        savingName: String
        savingCost: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        fixedExpenses: [FixedExpense]
        fixedExpense(fixedExpenseId: ID!): FixedExpense
        variableExpenses: [VariableExpense]
        variableExpense(variableExpenseId: ID!): VariableExpense
        savings: [Saving]
        saving(savingId: ID!): Saving
    }

    type Mutation {
        addUser(firstname: String!, lastname: String!, email: String!, password: String!, monthlyIncome: Int ): Auth
        login(email: String!, password: String!): Auth
        changePassword(password: String!): Auth
    }
`;

module.exports = typeDefs;
