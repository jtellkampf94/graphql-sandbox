import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";
import express from "express";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
}

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
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
