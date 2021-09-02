import { MyContext } from "./../../types/myContext";
import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "./../../entity/User";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    //@ts-ignore
    if (!ctx.req.session.userId) {
      return null;
    }

    //@ts-ignore
    return await User.findOne({ where: { id: ctx.req.session.userId } });
  }
}
