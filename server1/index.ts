import express from "express";
import { ApolloServer } from "apollo-server-express";

import databaseConnection from "./config/databaseConnection";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

databaseConnection();

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  const app = express();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await app.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
