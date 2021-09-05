import { Resolver, Mutation, Arg } from "type-graphql";

import { confirmationPrefix } from "../constants/redisPrefixes";
import { User } from "./../../entity/User";
import { redis } from "../../redis";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async ConfirmUser(@Arg("token") token: string): Promise<Boolean> {
    const userId = await redis.get(confirmationPrefix + token);

    if (!userId) {
      return false;
    }

    await User.update({ id: Number(userId) }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}
