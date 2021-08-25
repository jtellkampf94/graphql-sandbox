const User = require("./models/User");

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      const { id } = args;

      const user = await User.findById(id);

      return {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
      };
    },
  },
};

module.exports = resolvers;
