const User = require("./models/User");
const formatError = require("./utils/formatError");

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      const { id } = args;
      try {
        const user = await User.findById(id);

        return {
          success: true,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            age: user.age,
            gender: user.gender,
          },
        };
      } catch (error) {
        return formatError(error);
      }
    },
  },
  Mutation: {
    register: async (parent, args, context, info) => {
      const { user } = args;
      try {
        const newUser = await User.create(user);

        return { user: newUser, errors: null };
      } catch (error) {
        return formatError(error);
      }
    },
  },
};

module.exports = resolvers;
