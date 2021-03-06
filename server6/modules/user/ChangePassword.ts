import { MyContext } from "../../types/myContext";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { User } from "./../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async ChangePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    //@ts-ignore
    ctx.req.session!.userId = user.id;

    return user;
  }
}
