const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const databaseConnection = require("./config/databaseConnection");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

databaseConnection();

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  const app = express();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
