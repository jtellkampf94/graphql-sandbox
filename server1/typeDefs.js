const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
    age: Int!
    gender: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type UserResponse {
    errors: [Error]
    user: User
  }

  type BooleanResponse {
    success: Boolean!
    errors: [Error]
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
    age: Int!
    gender: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    user(id: String!): User!
    # users: [User]
  }

  type Mutation {
    register(user: UserInput!): UserResponse!
    #   login(user: LoginInput!): BooleanResponse!
    #   updateUser(id: String!, user: UserInput!): UserResponse!
    #   deleteUser(id: String!): BooleanResponse!
  }
`;

module.exports = typeDefs;
