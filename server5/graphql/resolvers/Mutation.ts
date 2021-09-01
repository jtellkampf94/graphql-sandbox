import { Context } from "../../utils/context";

const Mutation = {
  signupUser: (
    _parent,
    args: { name: string | undefined; email: string },
    context: Context
  ) => {
    // TODO
  },
  createDraft: (
    _parent,
    args: { title: string; content: string | undefined; authorEmail: string },
    context: Context
  ) => {
    // TODO
  },
  incrementPostViewCount: (_parent, args: { id: number }, context: Context) => {
    // TODO
  },
  deletePost: (_parent, args: { id: number }, context: Context) => {
    // TODO
  },
};

export default Mutation;
