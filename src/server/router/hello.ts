import { procedure, router } from "../trpc";
import { z } from "zod";
export const helloRouter = router({
  hi: procedure.input(z.object({})).query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      take: 2,
      where: {},
    });
    return users;
  }),
});
