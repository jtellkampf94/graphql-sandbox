import User from "../models/User";
import formatError from "../utils/formatError";

const resolvers = {
  Query: {
    getUser: async (parent: any, args: any, context: any, info: any) => {
      const { id } = args;
      try {
        const user = await User.findById(id);
        if (user) {
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
        }
      } catch (error) {
        return formatError(error);
      }
    },
  },
  Mutation: {
    register: async (parent: any, args: any, context: any, info: any) => {
      const { user } = args;
      try {
        const newUser = await User.create(user);

        return { user: newUser, errors: null, success: true };
      } catch (error) {
        return formatError(error);
      }
    },
  },
};

export default resolvers;
