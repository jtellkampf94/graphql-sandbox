const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

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

  type Query {
    user(id: String!): UserResponse
    users: [User]
    
  }

  type Mutation {
    register(id: ID!, name: String!, username: String!, email: String!, password: String!, age: Int!, gender: String!): UserResponse
    login(username: String!, password: String): Boolean!
  }
`;

const resolvers = {
  Query: {
    user: () => 'Hello world!',
    users: () => {}

  },
};

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  const app = express();
  server.applyMiddleware({
     app,
     path: '/'
  });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})()

