import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectReddis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });
  await apolloServer.start();

  const app = express();

  const RedisStore = connectReddis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "fwfeujnlonljn",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  apolloServer.applyMiddleware({ app, path: "/" });

  app.listen(4000, () => {
    console.log(
      `Server started at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
};

main();
