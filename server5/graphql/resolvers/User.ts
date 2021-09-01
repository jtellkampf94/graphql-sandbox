import { Context } from "../../utils/context";

const User = {
  posts: async (parent, _args, context: Context) => {
    const posts = await context.prisma.user
      .findUnique({
        where: { id: parent.id },
      })
      .posts();
    return posts;
  },
};

export default User;
