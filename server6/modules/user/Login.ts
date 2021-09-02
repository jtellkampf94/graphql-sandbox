import { MyContext } from "../../types/myContext";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "./../../entity/User";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async Login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    //@ts-ignore
    ctx.req.session.userId = user.id;

    return user;
  }
}

// @Arg('schemaName') variableName: type
