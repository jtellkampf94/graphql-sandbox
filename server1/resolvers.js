const resolvers = {
  Query: {
    user: () => "Hello world!",
    users: () => {},
  },
};

module.exports = resolvers;
