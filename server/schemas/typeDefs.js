const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        monthlyIncome: Int
        fixedExpenses: [FixedExpenses]
        varibleExpenses: [VariableExpenses]
        savings: [Savings]
    }

    type FixedExpenses {
        _id: Int
        fixedExpenseName: String
        fixedExpenseCost: Int
    }

    type VariableExpenses {
        _id: Int
        variableExpenseName: String
        variableExpenseCost: Int
    }

    type Savings {
        _id: Int
        savingName: String
        savingCost: Int
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        user: User
    }

    type Mutation {
        addUser(firstname: String!, lastname: String!, email: String!, password: String!, monthlyIncome: Int ): Auth
        login(email: String!, password: String!): Auth
        saveFixedExpenses(_id: Int, fixedExpenseName: String, fixedExpenseCost: Int): User
        removeFixedExpenses(_id: Int): User
        saveVaribleExpeneses(_id: Int, variableExpenseName: String, variableExpenseCost: Int): User
        removeVaribleExpenses(_id: Int): User
        saveSavings(_id: Int, savingName: String, savingCost: Int): User
        removeSavings(_id: Int): User
        changePassword(password: String!): Auth
    }
`;

module.exports = typeDefs;
