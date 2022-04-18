const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    fixedExpenses: [FixedExpense]!
  }

  type FixedExpense {
    _id: ID
    fixedExpenseName: String
    fixedExpenseCost: Number
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    fixedExpenses(username: String): [FixedExpense]
    fixedExpense(fixedExpenseId: ID!): FixedExpense
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFixedExpense(fixedExpenseName: String!, fixedExpenseCost: Number!): FixedExpense  
    removeFixedExpense(fixedExpenseId: ID!): FixedExpense
  }
`;

module.exports = typeDefs;
