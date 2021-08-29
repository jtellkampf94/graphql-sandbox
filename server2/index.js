const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");

const typeDefs = importSchema("./server2/graphql/schema.graphql");
const db = require("./data");
const Query = require("./graphql/resolvers/Query");
const Post = require("./graphql/resolvers/Post");
const User = require("./graphql/resolvers/User");
const Comment = require("./graphql/resolvers/Comment");

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Post,
      User,
      Comment,
    },
    context: {
      db,
    },
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
