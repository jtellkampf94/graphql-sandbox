import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { DateTimeResolver } from "graphql-scalars";

import Query from "./graphql/resolvers/Query";
import Mutation from "./graphql/resolvers/Mutation";
import Post from "./graphql/resolvers/Post";
import User from "./graphql/resolvers/User";
import { context } from "./utils/context";

const typeDefs = importSchema("./server5/graphql/schema.graphql");

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Post,
      User,
      DateTime: DateTimeResolver,
    },
    context,
  });

  await server.start();
  const app = express();

  server.applyMiddleware({
    app,
    path: "/",
  });

  await app.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
