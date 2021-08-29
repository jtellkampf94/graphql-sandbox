const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const users = [
  {
    id: "1",
    name: "Andrew",
    email: "andrew@example.com",
    age: 27,
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
  },
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is an advanced GraphQl post...",
    published: false,
    author: "1",
  },
  {
    id: "12",
    title: "Programming Music",
    body: "",
    published: false,
    author: "2",
  },
];

const comments = [
  {
    id: "102",
    text: "This worked well for me. Thanks!",
  },
  {
    id: "103",
    text: "Glad you enjoyed it.",
  },
  {
    id: "104",
    text: "This did not work.",
  },
  {
    id: "105",
    text: "Nevermind. I got it to work.",
  },
];

const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts: (parent, args, context, info) => {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    me: (parent, args, context, info) => {
      return {
        id: "123456",
        name: "Jonathan",
        email: "jonathan@example.com",
      };
    },
    post: (parent, args, context, info) => {
      return {
        id: "354",
        title: "GraphQL 101",
        body: "",
        published: false,
      };
    },
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter((post) => post.author === parent.id);
    },
  },
};

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
