import { Context } from "../../utils/context";

const Post = {
  author: async (parent, _args, context: Context) => {
    const author = await context.prisma.post
      .findUnique({
        where: { id: parent.id },
      })
      .author();
    return author;
  },
};

export default Post;
