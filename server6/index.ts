import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  const app = express();

  apolloServer.applyMiddleware({ app, path: "/" });

  app.listen(4000, () => {
    console.log(
      `Server started at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
};

main();
