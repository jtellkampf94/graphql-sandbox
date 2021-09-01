import { Context } from "../../utils/context";

const Query = {
  allUsers: async (parent, args, context: Context) => {
    const users = await context.prisma.user.findMany();
    return users;
  },
  postById: async (parent, { id }, context: Context) => {
    const post = await context.prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return post;
  },
  feed: (parent, { searchString, skip, take }, context: Context) => {
    // TODO
  },
  draftsByUser: async (parent, { id }, context: Context) => {
    const unpublishedPosts = await context.prisma.user
      .findUnique({
        where: { id: Number(id) },
      })
      .posts({
        where: {
          published: false,
        },
      });
    return unpublishedPosts;
  },
};

export default Query;
